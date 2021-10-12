import LiveData from "./Livedata"

/**
 * Basic mutable instance of a {@link LiveData}.
 */
class MutableLiveData<T> extends LiveData<T> {

    /**
     * Basic mutable instance of a {@link LiveData} with initial data.
     *
     * @param value The initial value to set.
     */
    constructor(value: T | null = null) {
        super()
        if (value) this.data = value
    }

    /**
     * Sets current LiveData value, and notifies observers.
     *
     * @param value The value to set.
     */
    public postValue(value: T) {
        this.data = value
        this.observers.forEach(observer => {
            observer(value)
        })
    }

    

}

export default MutableLiveData