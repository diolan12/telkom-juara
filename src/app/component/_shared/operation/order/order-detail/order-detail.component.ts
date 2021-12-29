import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'src/app/_data/model/account';
import { Order, OrderDTO } from 'src/app/_data/model/order';
import { OrderPhoto } from 'src/app/_data/model/order-photo';
import { OrderService } from 'src/app/_data/repository/order/order.service';
import { AuthService } from 'src/app/_data/service/auth.service';
import { DatetimeService } from 'src/app/_data/service/datetime/datetime.service';
import { environment } from 'src/environments/environment';
import { OrderPhotoDialogComponent } from './order-photo-dialog/order-photo-dialog.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderUniqueID = "---"
  whatsappReport: string = "";

  xSmall: MediaQueryList;
  small: MediaQueryList;
  medium: MediaQueryList;
  large: MediaQueryList;
  private _xSmallQueryListener: () => void;
  private _smallQueryListener: () => void;
  private _mediumQueryListener: () => void;
  private _largeQueryListener: () => void;
  tileCols = 2

  user: Account | null = null;
  order: Order | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private datetimeService: DatetimeService,
    public orderService: OrderService,
    changeDetectorRef: ChangeDetectorRef,
    mediaMatcher: MediaMatcher,
    public dialog: MatDialog
    ) {
    this.authService.account().then((account: Account) => {
      this.user = account;
    })
    this.xSmall = mediaMatcher.matchMedia('(max-width: 599.98px)');
    this.small = mediaMatcher.matchMedia('(min-width: 600px) and (max-width: 959.98px)');
    this.medium = mediaMatcher.matchMedia('(min-width: 960px) and (max-width: 1279.98px)');
    this.large = mediaMatcher.matchMedia('(min-width: 1280px) and (max-width: 1919.98px)');
    this._xSmallQueryListener = () => changeDetectorRef.detectChanges();
    this._smallQueryListener = () => changeDetectorRef.detectChanges();
    this._mediumQueryListener = () => changeDetectorRef.detectChanges();
    this._largeQueryListener = () => changeDetectorRef.detectChanges();
    this.xSmall.matches ? this.tileCols = 2 : this.tileCols = this.tileCols;
    this.small.matches ? this.tileCols = 3 : this.tileCols = this.tileCols;
    this.medium.matches ? this.tileCols = 4 : this.tileCols = this.tileCols;
    this.large.matches ? this.tileCols = 5 : this.tileCols = this.tileCols;
    this.xSmall.addEventListener('change', (event) => {
      if (event.matches) {
        this.tileCols = 2
      }
      return this._xSmallQueryListener
    });
    this.small.addEventListener('change', (event) => {
      if (event.matches) {
        this.tileCols = 3
      }
      return this._smallQueryListener
    })
    this.medium.addEventListener('change', (event) => {
      if (event.matches) {
        this.tileCols = 4
      }
      return this._mediumQueryListener
    })
    this.large.addEventListener('change', (event) => {
      if (event.matches) {
        this.tileCols = 5
      }
      return this._largeQueryListener
    })
  }

  ngOnInit(): void {
    this.orderUniqueID = this.router.url.split('/')[4]
    this.getOrderByUniqueID(this.orderUniqueID)
  }

  async getOrderByUniqueID(uid: string) {
    await this.orderService.get<Array<Order>>(uid).then((order) => {
      this.order = order[0]
    })
    console.log(this.order)
    this.buildReport()
  }
  private buildReport(){
    let waApi = "https://api.whatsapp.com/send?"
    let phone = this.order!.office.whatsapp
    let header = "*Laporan Order "+this.order?.uid+"* "
    let content = " \n\n"+
    "Nama: "+this.order?.customer.name+"\n"+
    "Layanan "+this.order?.service.type.name+": "+this.order?.service.name+"\n"+
    "Status: "+this.orderService.getStatusDisplay(this.order!.status)
    let note = ""
    if (this.order?.status == "completed") {
      note = "\n\nCatatan: \n*Siap diarsipkan*"
    }
    let text = header+content+note
    this.whatsappReport = waApi+"phone="+phone+"&text="+encodeURI(text)
  }
  uploadCustPotrait(order: Order, event: any) {
    console.log('uploadCustPotrait');
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    this.orderService.upload(order.id, 'doc_customer', order, event.target.files[0]).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      this.order!.doc_customer = null
      this.ngOnInit();
    })
  }
  
  uploadCustHouse(order: Order, event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    this.orderService.upload(order.id, 'doc_house', order, event.target.files[0]).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      this.order!.doc_house = null
      this.ngOnInit();
    })
  }

  setStatus(status: string, order: Order) {
    let o: OrderDTO = {
      uid: order.uid,
      field: (this.user?.id === undefined) ? null : this.user.id,
      office: order.office.id,
      status: status,
      customer: order.customer.id,
      service: order.service.id,
    }
    this.orderService.update(order.id, o).then((response) => {

    }).catch((error) => {

    }).finally(() => {
      this.ngOnInit();
    })
  }
  parseLocale(datetime: string){
    return this.datetimeService.UTCStringtoLocal(datetime).toLocaleString()
  }
  parseLocaleDate(datetime: string){
    return this.datetimeService.UTCStringtoLocal(datetime).toLocaleDateString()
  }
  parseLocaleTime(datetime: string){
    return this.datetimeService.UTCStringtoLocal(datetime).toLocaleTimeString()
  }
  newDocDialog(orderId: number) {
    const newDialogRef = this.dialog.open(OrderPhotoDialogComponent, {
      width: environment.modalWidth,
      data: {
        order: orderId,
        description: null
      }
    });
    newDialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  detailDocDialog(data: OrderPhoto) {
    const newDialogRef = this.dialog.open(OrderPhotoDialogComponent, {
      width: environment.modalWidth,
      data: data
    });
    newDialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

}
