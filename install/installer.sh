#!/bin/sh

if [ "$OS" = "Windows_NT" ]; then
	# We are on windows, check if Python is installed
	python -V > /dev/null 2>&1
	if [ $? -eq 0 ]; then
		PYTHON=python
	else
		reg query "HKLM\SOFTWARE\Python\PythonCore" > /dev/null 2>&1
		if [ $? -ne 0 ]; then
			echo "Please install Python first"
			echo "You can download it from http://python.org/downloads/"
			exit 1
		fi
		PYTHON_REG_PATH=`reg query "HKLM\SOFTWARE\Python\PythonCore" | grep HKEY | sort | tail -n 1`
		PYTHON_ROOT=/`reg query "${PYTHON_REG_PATH}\InstallPath" -ve | grep REG_SZ | sed -e "s/.*REG_SZ\s\+\(.*\)/\1/" | sed -e "s/://" | sed -e "s/\\\\\/\//g"`
		PYTHON=${PYTHON_ROOT}python.exe
	fi
fi

cd $HOME
rm -rf .git-nafra > /dev/null 2>&1
echo "Cloning git-nafra repository"
git clone --depth 1 https://github.com/estupidyante/naf-release-automation-3.0.git .git-nafra
echo "Enabling auto update"
git config --global --replace-all nafra.autoupdate true
echo "Installing 'nafra' alias"
if [ "$OS" = "Windows_NT" ]; then
	git config --global --replace-all alias.nafra "!${PYTHON} $HOME/.git-nafra/release/libexec/git-core/git-nafra"
else
	git config --global --replace-all alias.nafra !$HOME/.git-nafra/release/libexec/git-core/git-nafra
fi