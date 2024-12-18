@echo off
title Mobile Shougun Build Guideline
echo Welcome to Mobile Shougun!

:: Assign the directory of the batch file to the variable 'dir'
SET "dir=%~dp0"
SET "buildDir=%dir%build"

:: Check if the source build folder exists
if exist "%buildDir%" (
    echo The build folder already exists at: "%buildDir%"
    goto ChoiceStep
) else (
    echo The build folder does not exist. Starting the build process...
    npm run build
    goto ChoiceStep
    if errorlevel 1 (
        echo Error: Build failed. Exiting script.
        @REM pause
        @REM exit /b
    )
)

:ChoiceStep
echo Do you want to copy the build folder to another location?
choice /C YN /M "Choose [Y]es or [N]o"

if errorlevel 2 (
    echo No copy operation performed.
    goto End
) else (
    :: Prompt for the destination folder
    SETLOCAL ENABLEDELAYEDEXPANSION
    set /p pastedPath="Where do you want to paste the copied folder (Path)? :"
    
    echo Copying the build folder from "%buildDir%" to "!pastedPath!"...
    xcopy "%buildDir%" "!pastedPath!" /E /H /K /Y
    if errorlevel 1 (
        echo Error: Failed to copy the build folder. Please try again.
        goto ChoiceStep
    ) else (
        echo Successfully copied the build folder to: "!pastedPath!"
    )
)

:End
echo Exiting script. Thank you!
pause
