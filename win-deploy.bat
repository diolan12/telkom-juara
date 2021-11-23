@echo off

http-server -p 80 -c-1 dist/telkom-juara

set /P id="The batch file is complete:"

pause
exit