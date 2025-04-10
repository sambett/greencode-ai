@echo off
echo Cleaning large files from Git repository...

REM Create better .gitignore
echo # Node.js files > .gitignore.new
echo node_modules/ >> .gitignore.new
echo .env >> .gitignore.new
echo .env.local >> .gitignore.new
echo .env.development.local >> .gitignore.new
echo .env.test.local >> .gitignore.new
echo .env.production.local >> .gitignore.new
echo # Build folders >> .gitignore.new
echo /build/ >> .gitignore.new
echo # Python files >> .gitignore.new
echo *.py[cod] >> .gitignore.new
echo __pycache__/ >> .gitignore.new
echo # Model files >> .gitignore.new
echo backend/models/ >> .gitignore.new
echo *.bin >> .gitignore.new
echo *.safetensors >> .gitignore.new
echo *.model >> .gitignore.new
echo # System files >> .gitignore.new
echo .DS_Store >> .gitignore.new
echo Thumbs.db >> .gitignore.new

REM Replace .gitignore
move /y .gitignore.new .gitignore

REM Setup Git LFS
git lfs install
git lfs track "*.bin"
git lfs track "*.safetensors"
git lfs track "*.model"
git add .gitattributes

REM Reset local repository to match remote
git fetch origin
git reset --hard origin/master

REM Stage and commit the new .gitignore
git add .gitignore
git commit -m "Update .gitignore to exclude large files"

REM Try to push again
git push origin master

echo Done!
