@echo off
pocketbase --version
pocketbase serve  --encryptionEnv="BookApp" --http="localhost:4000" --origins="http://localhost:5173"
pause