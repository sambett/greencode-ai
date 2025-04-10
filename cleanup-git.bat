@echo off
echo Removing large files from Git history...

REM First, update .gitignore to properly exclude model files
echo # Node.js files > .gitignore
echo node_modules/ >> .gitignore
echo npm-debug.log* >> .gitignore
echo yarn-debug.log* >> .gitignore
echo yarn-error.log* >> .gitignore
echo .env >> .gitignore
echo .env.local >> .gitignore
echo # Build directories >> .gitignore
echo /build/ >> .gitignore
echo # Python files >> .gitignore
echo __pycache__/ >> .gitignore
echo *.py[cod] >> .gitignore
echo # Model files - IMPORTANT! >> .gitignore
echo backend/models/ >> .gitignore
echo **/*.bin >> .gitignore
echo **/*.safetensors >> .gitignore
echo **/*.model >> .gitignore
echo # IDE files >> .gitignore
echo .idea/ >> .gitignore
echo .vscode/ >> .gitignore
echo # System files >> .gitignore
echo .DS_Store >> .gitignore
echo Thumbs.db >> .gitignore

REM Create a new commit that will serve as our new starting point
git add .gitignore
git commit -m "Update .gitignore to properly exclude model files"

REM Remove the most recent commit that has the large files
git reset --soft HEAD~1

REM Reset the model directories to remove them from Git
git rm -r --cached backend/models/
git rm -r --cached backend/__pycache__/

REM Commit the changes with proper exclusions
git add .
git commit -m "Clean repository by removing large model files"

echo.
echo Done! Now try pushing with: git push -f origin master
echo NOTE: Use -f carefully as it will overwrite remote history!
