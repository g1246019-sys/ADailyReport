$ErrorActionPreference = "Continue"
Set-Location "c:\Users\Administrator\WorkBuddy\Claw\ADailyReport"

Write-Host "Initializing Git..."
git init
git branch -M main

Write-Host "Adding files..."
git add -A

Write-Host "Committing..."
git commit -m "Initial commit" 2>$null

Write-Host "Adding remote..."
git remote add origin https://github.com/g1246019-sys/ADailyReport.git 2>$null

Write-Host "Pushing to GitHub..."
git push -u origin main

Write-Host "Done!"
