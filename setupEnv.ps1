
# install chocolatey (windows package manager)
Set-ExecutionPolicy Bypass -Scope Process -Force; Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
# install android studio (required for Android emulator)
Start-Process 'choco' -ArgumentList 'install androidstudio -y'

## NOTES
# Expo CLI docs: https://docs.expo.io/versions/latest/workflow/exp-cli
# Start Android server: `adb shell am start`
