# Git NAFRA

This git extension is a standalone NAF Release Automation web based user interface for git repositories.

It has very few dependencies, you probably already have them on your
Mac / Linux : git, python, and a web browser. please insure that you have the latest version of nodejs

## Installation

At the automatic installation process, you need to have [cURL](https://curl.haxx.se/dlwiz/?type=bin&os=Win32&flav=-&ver=2000%2FXP)

### Automatic (Do you trust me ?)

The following command will install git-nafra in `$HOME/.git-nafra` and add a `nafra` alias to your global `.gitconfig` file.

*Note for windows users:* These install scripts work for you too. Run them from your Git-Bash shell.
You need to install [Python](https://www.python.org/downloads/) first.
You should also install [NodeJS](https://nodejs.org/en/)

Using curl (MacOS X & Windows):
```
curl https://raw.githubusercontent.com/estupidyante/naf-release-automation-3.0/master/install/installer.sh | bash
```
Using wget (Linux):
```
wget -O - https://raw.githubusercontent.com/estupidyante/naf-release-automation-3.0/master/install/installer.sh | bash
```
Upon installation git-nafra will update itself automatically every couple of weeks.
You can deactivate auto-update by removing the `autoupdate = true` line from the
`nafra` section of your global `.gitconfig` file.

### Manual

Simply clone the repository and install the alias

```
git clone https://estupidyante@bitbucket.org/seachangeph/naf-release-automation-3.0.git
git config --global alias.nafra \!$PWD/git-nafra/release/libexec/git-core/git-nafra
```

If you want to allow auto-update:
```
git config --global nafra.autoupdate true
```

## Uninstallation

### Automatic

Using curl (MacOS X & Windows):
```
curl https://raw.githubusercontent.com/estupidyante/naf-release-automation-3.0/master/install/uninstaller.sh | bash
```
Using wget (Linux):
```
wget -O - https://raw.githubusercontent.com/estupidyante/naf-release-automation-3.0/master/install/uninstaller.sh | bash
```

### Manual

```
rm -rf <git-nafra-clone-path>
git config --global --unset-all alias.nafra
git config --global --remove-section nafra
```

## Usage

### Starting

First cd to any of your project versioned with git
```
cd <my-local-git-clone>
git nafra
```

This will start an embedded HTTP server and open your default browser with the GUI.

## Dependencies

### Runtime

- [git](https://git-scm.com/downloads)
- python 2.7+ or python 3.0+ (Generally already installed on your Mac / Linux)
- An up-to-date modern browser (google chrome)

### Development

- Runtime dependencies and ...
- node.js (get the latest version)
- grunt-cli

```
rm -rf <git-nafra-clone-path>
git config --global --unset-all alias.nafra
git config --global --remove-section nafra
```

## Author

[Harold Magbanua](mailto:estupidyante@gmail.com) ([@estupidyante](https://twitter.com/estupidyante))
