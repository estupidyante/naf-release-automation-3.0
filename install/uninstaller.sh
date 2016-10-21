#!/bin/sh

cd $HOME
echo "Removing \$HOME/.git-nafra"
rm -rf .git-nafra > /dev/null 2>&1
echo "Cleaning up global gitconfig file"
git config --global --unset-all alias.nafra
git config --global --remove-section nafra