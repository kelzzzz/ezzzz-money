$BackendDir = "./ezzzzmoney-spring-backend" 
$FrontendDir = "./ezzzzmoney-frontend" 

Write-Host "Launching Spring..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $BackendDir; if (Test-Path ./mvnw) { ./mvnw spring-boot:run } else { mvn spring-boot:run }"

Write-Host "Launching React..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass", "-NoExit", "-Command", "cd $FrontendDir; npm start"
