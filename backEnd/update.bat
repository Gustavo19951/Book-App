@ECHO OFF

:choice
set /P c=Are you sure you want to continue[Y/N]?
if /I "%c%" EQU "Y" goto :update
if /I "%c%" EQU "N" goto :noUpdate
goto :choice


:update

echo "Updating Pocketbase..."
pocketbase update
pause
exit

:noUpdate

echo "canceled update"

pause