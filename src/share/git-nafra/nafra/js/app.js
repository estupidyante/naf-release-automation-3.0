/*
 *  == CommitView ============================================================
 */
nafra.CommitView = function(mainView) {
    var self = this;

    self.show = function() {
        mainView.switchTo(self.element);
    }

    self.update = function(ref) {
        self.show();
        self.logView.update(ref);
    }

    self.element = $('<div id="history-view">')[0];
    self.logView = new nafra.LogView(self, 2, false);
    self.element.appendChild(self.logView.element);

    self.mainView = mainView;
}
/*
 *  == FetchData ============================================================
 */
nafra.fetchData = function(mainView) {
    var self = this;

    // update current branch
    nafra.process('git', 'config user.name', function(data) {
        nafra.user = data;
        document.getElementById('userName').innerHTML = nafra.user;
    });
    nafra.process('git', 'remote update origin --prune', function(data) {
        $.get('/dirname', function(data) {
            nafra.repo = data;
            $.get('/viewonly', function(data) {
                nafra.viewonly = data;
                $.get('/repo_location', function(data) {
                    nafra.repo_location = data;
                    $.get('/hostname', function(data) {
                        nafra.hostname = data;
                        $.get('/get_naf_version', function(data) {
                            nafra.current_version = data;
                            $.get('/get_config', function(data) {
                                nafra.app_config = JSON.parse(data);
                                new nafra.populateMainUI(self);
                            });
                        });
                    });
                });
            });
        });
    });

    self.mainView = mainView;
}
/*
 *  == CreateSettingsView ============================================================
 */
nafra.createSettingsView = function(mainView) {
    var self = this;
    // <div class="cell"><label>Simple input text</label><div class="input-control text full-size"><input type="text" disabled></div></div>
    var settingsContainer = document.getElementById('settingsContainer');
    $('<div class="tabcontrol" data-role="tabcontrol">'
    +     '<ul class="tabs">'
    +         '<li><a href="#release-folder">Release Folder</a></li>'
    +         '<li><a href="#download-files">Download Files</a></li>'
    +         '<li><a href="#ftp-accounts">FTP Accounts</a></li>'
    +     '</ul>'
    +     '<div class="frames">'
    +         '<div id="release-folder" class="frame">'
    +             '<div class="cell">'
    +                 '<label>Directory:</label>'
    +                 '<div class="input-control text full-size">'
    +                     '<input type="text" disabled value="' + nafra.app_config['release_path'] + '">'
    +                 '</div>'
    +             '</div>'
    +         '</div>'
    +         '<div id="download-files" class="frame">'
    +             '<ul id="pageBodyBlock" class="grid">'
    +                 '<li class="row cells2">'
    +                     '<div class="cell">'
    +                         '<label>Document Folder:</label>'
    +                         '<div class="input-control text full-size">'
    +                             '<input type="text" disabled value="' + nafra.app_config['file_download']['folder_id'] + '">'
    +                         '</div>'
    +                     '</div>'
    +                     '<div class="cell">'
    +                         '<label>Release Notes:</label>'
    +                         '<div class="input-control text full-size">'
    +                             '<input type="text" disabled value="' + nafra.app_config['file_download']['release_notes'] + '">'
    +                         '</div>'
    +                     '</div>'
    +                 '</li>'
    +                 '<li class="row cell">'
    +                     '<label>Excluded Files:</label>'
    +                     '<ul id="excludedFiles" class="grid metro-overwrite clearfix"></ul>'
    +                 '</li>'
    +             '</ul>'
    +         '</div>'
    +         '<div id="ftp-accounts" class="frame">'
    +             '<ul id="ftpAccounts" class="grid metro-overwrite clearfix"></ul>'
    +         '</div>'
    +     '</div>'
    + '</div>').appendTo(settingsContainer)[0];

    var exclude_files = nafra.app_config['file_download']['exclude_files'];
    var excluded_files_container = document.getElementById('excludedFiles');
    if (exclude_files.length > 0) {
        for (var h = 0; len = exclude_files.length, h < len; h++) {
            excluded_files_container.innerHTML += '<li class="row cell no-margin"><div class="input-control text"><input type="text" disabled value="' + exclude_files[h] + '"></div></li>';
        }
    }

    var ftp_accounts = nafra.app_config['ftp_accounts'];
    var ftp_accounts_container = document.getElementById('ftpAccounts');
    for (var ftp_name in ftp_accounts) {
        ftp_accounts_container.innerHTML += '<li class="row cell no-margin"><label>' + ftp_name.toUpperCase() + '</label>'
        + '<ul class="grid">'
        +     '<li class="row cell no-margin"><label class="margin-right-20">Host: </label><div class="input-control text"><input type="text" disabled value="' + ftp_accounts[ftp_name].host + '"></div></li>'
        +     '<li class="row cell no-margin"><label class="margin-right-20">Username: </label><div class="input-control text"><input type="text" disabled value="' + ftp_accounts[ftp_name].user + '"></div></li>'
        +     '<li class="row cell no-margin"><label class="margin-right-20">Password: </label><div class="input-control text"><input type="text" disabled value="' + ftp_accounts[ftp_name].password + '"></div></li>'
        +     '<li class="row cell no-margin"><label class="margin-right-20">Path: </label><div class="input-control text"><input type="text" disabled value="' + ftp_accounts[ftp_name].path + '"></div></li>'
        + '</ul></li>';
    }
}
/*
 *  == CreateProcessView ============================================================
 */
nafra.createProcessView = function(mainView) {
    var self = this;

    self.selectRef = function(refName) {
        var checkoutBranch = refName.replace('origin/','');
        nafra.current_branch = checkoutBranch.replace('rel/','');

        nafra.process('git', 'checkout ' + checkoutBranch, function(data) {
            console.log(data);
            nafra.showDialog('info', data);
            $.get('/get_naf_version', function(data) {
                nafra.current_version = data;
                document.getElementById('branchName').innerHTML = nafra.current_branch;

                var versionEntry = $('<div id="versionEntryContainer" class="grid no-margin-top">'
                + '<div class="row cells2 version-entry">'
                +     '<div class="cell">'
                +         '<label>Current Version:</label>'
                +         '<div class="input-control text full-size">'
                +             '<input id="currentVersion" type="text" disabled value="' + nafra.current_version + '">'
                +         '</div>'
                +     '</div>'
                +     '<div class="cell">'
                +         '<label>New Version:</label>'
                +         '<div class="input-control text full-size">'
                +             '<input id="newVersion" type="text" value="' + nafra.current_version + '">'
                +         '</div>'
                +     '</div>'
                + '</div></div>')[0];

                var btnReleaseOption = $('<div id="btnReleaseOption" class="grid margin-bottom-20">'
                +     '<button id="completeFlow" class="button margin-left-20" data-type="complete" onclick="nafra.processButton(this)">complete flow</button>'
                +     '<button id="smokeTestBuild" class="button margin-left-20" data-type="smokebuild" onclick="nafra.processButton(this)">smoke test build</button>'
                +     '<button id="gruntOnly" class="button bg-green fg-white margin-left-20" data-type="gruntonly" onclick="nafra.processButton(this)">grunt only</button>'
                +     '<button id="apiDocsDownload" class="button margin-left-20" data-type="apidoc" onclick="nafra.processButton(this)">api document only</button>'
                +     '<button id="releaseNotesDownload" class="button disabled margin-left-20" data-type="notesonly" onclick="nafra.processButton(this)">release note only</button>'
                +     '<button id="ftpUpload" class="button disabled margin-left-20" data-type="ftponly" onclick="nafra.processButton(this)">ftp upload only</button>'
                + '</div>')[0];

                var processContainer = document.getElementById("processContainer");
                processContainer.insertBefore(btnReleaseOption, processContainer.childNodes[0]);
                processContainer.insertBefore(versionEntry, processContainer.childNodes[1]);

                console.log(data);
                nafra.showDialog('info', data);
                showCharms('#charmProcess');
            })
        });

        self.mainView.commitView.update(refName);
    }

    self.fetchBranches = function(section, title, id, gitCommand) {
        nafra.process('git', gitCommand, function(data) {
            var currentBranch;
            var refs = nafra.splitLines(data);
            if (id == "remote-branches") {
                refs = refs.map(function(ref) {
                    var end = ref.lastIndexOf(' -> ');
                    if (end == -1) {
                        return ref.substr(2);
                    }
                    else {
                        return ref.substring(2, end);
                    }
                });
            }

            if (refs.length > 0) {
                var idx = refs.indexOf('origin/master');
                currentBranch = refs[idx];
                var branches = [];
                for (var i = 0; i < refs.length; ++i) {
                    var ref = refs[i];
                    if (ref.indexOf('origin/codereview') < 0 && ref.indexOf('origin/release') < 0 && ref.indexOf('origin/HEAD') < 0) {
                        if (ref[2] == '(' && ref[ref.length - 1] == ')') {
                            // This is a '(detached from XXXXXX)'
                            var newref = ref.substring(ref.lastIndexOf(' ') + 1, ref.length - 1)
                            if (ref[0] == '*') {
                                ref = '* ' + newref;
                            }
                            else {
                                ref = '  ' + newref;
                            }
                        }
                        var tile = $('<div class="tile ' + nafra.randomCOLORS() + ' fg-white box" data-role="tile">').appendTo(section)[0];
                        if (id == "local-branches") {
                            tile.refName = ref.substr(2);
                            if (ref[0] == "*") {
                                $(tile).addClass("branch-current");
                                window.setTimeout(function() {
                                    var current = $(".branch-current", self.element)[0];
                                    if (current) {
                                        self.selectRef(current.refName);

                                        console.log(current.refName);
                                    }
                                }, 0);
                            }
                        }
                        else {
                            tile.refName = ref;
                        }

                        $(tile).attr("title", tile.refName);
                        var branchName = tile.refName.replace('origin/','');
                            branchName = branchName.replace('rel/', '');
                        
                        $('<div class="tile-content iconic"><span class="icon mif-flow-branch"></span></div><span class="tile-label">' + branchName + '</span>').appendTo(tile);

                        $(tile).click(function (event) {
                            self.selectRef(event.currentTarget.refName);
                        });

                        branches.push(ref);
                    }
                }
            }
            else {
                $(section).remove();
            }

            var checkoutBranch = (currentBranch) ? currentBranch.replace('origin/','') : null;
            if (checkoutBranch != null) {
                nafra.current_branch = checkoutBranch;
                nafra.process('git', 'checkout ' + checkoutBranch, function(data) {
                    nafra.process('git', 'pull', function(data) {
                        new nafra.finishInit(self);
                        console.log(data);
                        nafra.showDialog('info', data);
                    });
                });
    
                self.mainView.commitView.update(currentBranch);
            }
            else {
                console.log('there is a problem regarding your openvpn credentials cannot connect right now.');
                nafra.showMessage('alert', 'there is a problem regarding your openvpn credentials cannot connect right now.');
            }
        });
    };

    self.mainView = mainView;

    self.fetchBranches($("#project-branches")[0], "Remote Branches", "remote-branches", "branch --remotes");
}
/*
 *  == ProcessButton ============================================================
 */
nafra.processButton = function(elem) {
    nafra.new_version = document.getElementById("newVersion").value;
    var _type = $(elem).data('type');
    var _continue = true;

    $('#preLoading').fadeIn('slow', function() {
        if (_type == 'complete') {
            if (nafra.new_version != nafra.current_version && 
                nafra.new_version.indexOf('NAF-') >= 0) {
                console.log('start to create release build for branch ' + nafra.current_branch);
                nafra.showDialog('info', 'start to create release build for branch ' + nafra.current_branch);
                _continue = true;
            }
            else {
                if (nafra.new_version == null || 
                    nafra.new_version == undefined || 
                    nafra.new_version == "") {
                    console.log("new version is empty");
                    nafra.showMessage('alert', 'new version is empty, process is terminated.');
                }
                else if (nafra.new_version == nafra.current_version) {
                    console.log("new version is same as current version");
                    nafra.showMessage('warning', 'new version is same as current version, process is terminated.');
                }
                else {
                    console.log("new version is not valid");
                    nafra.showMessage('alert', 'new version is not valid, process is terminated.');
                }
                _continue = false;
            }
        }

        if (_continue) {
            nafra.process(_type, nafra.new_version, nafra.current_branch, function(data) {
                console.log(data);
                nafra.showDialog('info', data);
            });
        }
    });
}
/*
 *  == FinishInit ============================================================
 */
nafra.finishInit = function(mainView) {
    var self = this;

    $('#preLoading').fadeOut('slow', function() {
        $(function() {
            var current_tile_area_scheme = localStorage.getItem('tile-area-scheme') || "tile-area-scheme-dark";
            $(".tile-area").removeClass (function (index, css) {
                return (css.match (/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
            }).addClass(current_tile_area_scheme);
        
            $(".schemeButtons .button").hover(
                    function(){
                        var b = $(this);
                        var scheme = "tile-area-scheme-" +  b.data('scheme');
                        $(".tile-area").removeClass (function (index, css) {
                            return (css.match (/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
                        }).addClass(scheme);
                    },
                    function(){
                        $(".tile-area").removeClass (function (index, css) {
                            return (css.match (/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
                        }).addClass(current_tile_area_scheme);
                    }
            );
        
            $(".schemeButtons .button").on("click", function(){
                var b = $(this);
                var scheme = "tile-area-scheme-" +  b.data('scheme');
        
                $(".tile-area").removeClass (function (index, css) {
                    return (css.match (/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
                }).addClass(scheme);
        
                current_tile_area_scheme = scheme;
                localStorage.setItem('tile-area-scheme', scheme);
        
                showSettings();
            });
        });

        $(function() {
            $.StartScreen();
        
            var tiles = $(".tile, .tile-small, .tile-sqaure, .tile-wide, .tile-large, .tile-big, .tile-super");
        
            $.each(tiles, function(){
                var tile = $(this);
                setTimeout(function(){
                    tile.css({
                        opacity: 1,
                        "-webkit-transform": "scale(1)",
                        "transform": "scale(1)",
                        "-webkit-transition": ".3s",
                        "transition": ".3s"
                    });
                }, Math.floor(Math.random()*500));
            });
        
            $(".tile-group").animate({
                left: 0
            });
        });
    });

    self.mainView = mainView;
}
/*
 *  == PopulateMainUI ============================================================
 */
nafra.populateMainUI = function(mainView) {
    var self = this;

    self.switchTo = function(element) {
        nafra.detachChildren(self.mainView);
        self.mainView.appendChild(element);
    }

    document.getElementById('appVersion').innerHTML = 'version ' + nafra.app_config['version'];
    self.createSettingsView = new nafra.createSettingsView(self);
    self.createProcessView = new nafra.createProcessView(self);

    self.mainView = $('#processContainer')[0];
    self.commitView = new nafra.CommitView(self);
}

$(document).ready(function() {
    new nafra.fetchData(self);
});
