@ECHO OFF
CLS
SET PHANTOMJS_EXECUTABLE=%APPDATA%\npm\phantomjs.exe
%~dp0\node_modules\casperjs\bin\casperjs %*