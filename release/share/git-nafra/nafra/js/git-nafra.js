"use strict"

var nafra = nafra || {};
var counter = 1;

nafra.repo = "/";
nafra.COLORS = ["#ffab1d", "#fd8c25", "#f36e4a", "#fc6148", "#d75ab6", "#b25ade", "#6575ff", "#7b77e9", "#4ea8ec", "#00d0f5", "#4eb94e", "#51af23", "#8b9f1c", "#d0b02f", "#d0853a", "#a4a4a4",
                "#ffc51f", "#fe982c", "#fd7854", "#ff705f", "#e467c3", "#bd65e9", "#7183ff", "#8985f7", "#55b6ff", "#10dcff", "#51cd51", "#5cba2e", "#9eb22f", "#debe3d", "#e19344", "#b8b8b8",
                "#ffd03b", "#ffae38", "#ff8a6a", "#ff7e7e", "#ef72ce", "#c56df1", "#8091ff", "#918dff", "#69caff", "#3ee1ff", "#72da72", "#71cf43", "#abbf3c", "#e6c645", "#eda04e", "#c5c5c5",
                "#ffd84c", "#ffb946", "#ff987c", "#ff8f8f", "#fb7eda", "#ce76fa", "#90a0ff", "#9c98ff", "#74cbff", "#64e7ff", "#7ce47c", "#85e357", "#b8cc49", "#edcd4c", "#f9ad58", "#d0d0d0",
                "#ffe651", "#ffbf51", "#ffa48b", "#ff9d9e", "#ff8de1", "#d583ff", "#97a9ff", "#a7a4ff", "#82d3ff", "#76eaff", "#85ed85", "#8deb5f", "#c2d653", "#f5d862", "#fcb75c", "#d7d7d7",
                "#fff456", "#ffc66d", "#ffb39e", "#ffabad", "#ff9de5", "#da90ff", "#9fb2ff", "#b2afff", "#8ddaff", "#8bedff", "#99f299", "#97f569", "#cde153", "#fbe276", "#ffc160", "#e1e1e1",
                "#fff970", "#ffd587", "#ffc2b2", "#ffb9bd", "#ffa5e7", "#de9cff", "#afbeff", "#bbb8ff", "#9fd4ff", "#9aefff", "#b3f7b3", "#a0fe72", "#dbef6c", "#fcee98", "#ffca69", "#eaeaea",
                "#763700", "#9f241e", "#982c0e", "#a81300", "#80035f", "#650d90", "#082fca", "#3531a3", "#1d4892", "#006f84", "#036b03", "#236600", "#445200", "#544509", "#702408", "#343434",
                "#9a5000", "#b33a20", "#b02f0f", "#c8210a", "#950f74", "#7b23a7", "#263dd4", "#4642b4", "#1d5cac", "#00849c", "#0e760e", "#287800", "#495600", "#6c5809", "#8d3a13", "#4e4e4e",
                "#c36806", "#c85120", "#bf3624", "#df2512", "#aa2288", "#933bbf", "#444cde", "#5753c5", "#1d71c6", "#0099bf", "#188018", "#2e8c00", "#607100", "#907609", "#ab511f", "#686868",
                "#e47b07", "#e36920", "#d34e2a", "#ec3b24", "#ba3d99", "#9d45c9", "#4f5aec", "#615dcf", "#3286cf", "#00abca", "#279227", "#3a980c", "#6c7f00", "#ab8b0a", "#b56427", "#757575",
                "#ff911a", "#fc8120", "#e7623e", "#fa5236", "#ca4da9", "#a74fd3", "#5a68ff", "#6d69db", "#489bd9", "#00bcde", "#36a436", "#47a519", "#798d0a", "#c1a120", "#bf7730", "#8e8e8e"]

nafra.randomCOLORS = function() {
    var boxColor = ['bg-lime', 'bg-green', 'bg-emerald', 'bg-teal', 'bg-blue', 'bg-red', 'bg-orange', 'bg-cyan', 'bg-cobalt', 'bg-indigo', 'bg-violet', 'bg-pink', 'bg-magenta', 'bg-crimson', 
                    'bg-amber', 'bg-yellow', 'bg-brown', 'bg-olive', 'bg-mauve', 'bg-taupe', 'bg-darkBrown', 'bg-darkCrimson', 'bg-darkPink', 'bg-darkMagenta', 'bg-darkCobalt', 'bg-darkIndigo', 
                    'bg-darkCyan', 'bg-darkTeal', 'bg-darkEmerald', 'bg-darkGreen', 'bg-darkOrange', 'bg-darkRed', 'bg-darkBlue', 'bg-lightBlue', 'bg-lightRed', 'bg-lightPink', 
                    'bg-lightGreen', 'bg-lightTeal', 'bg-lighterBlue', 'bg-lightOlive', 'bg-lightOrange'];
    var randomBC = boxColor[Math.floor(Math.random() * boxColor.length)];
    
    return randomBC;
}
/*
 *  == Globa Function =========================================================
 */
nafra.showDialog = function(type, content) {
    counter = counter + 1;
    var caption = nafra.titleCase(type);
    setTimeout(function() {
        $.Notify({
            type: type,
            caption: caption,
            content: content,
            shadow: true
        });
        counter = 1;
        if (type == 'alert') {
            $('#preLoading').fadeOut('slow');
        }
    }, 500 * counter);
}

nafra.showMessage = function(type, message) {
    var messageBox = $("#message-box");
    var header = (type == 'alert') ? nafra.titleCase('error') : nafra.titleCase(type);

    if (type == 'success') {
        message = '<p>Release package for <span class="fg-indigo">'+ nafra.current_branch + '</span> is ' + message + '</p>';
    }
    else {
        message = '<p>' + message + '</p>'
    }
    messageBox.empty();
    $('<div id="dialog" class="padding20 dialog '+ type + '" data-role="dialog" data-type="' + type + '" data-windows-style="true" data-close-button="true">'
    +     '<div class="container">'
    +         '<h1>' + header + '</h1>'
    +         message
    +     '</div>'
    + '</div>').appendTo(messageBox);

    $('#preLoading').fadeOut('slow', function() {
        var dialog = $('#dialog').data('dialog');
        dialog.open();
    });
}

nafra.showError = function(message) {
    $("#error-modal .alert").text(message);
    $('#preLoading').fadeOut('slow');
    $("#error-modal").modal('show');
    $("#info-modal").modal('hide');
}

nafra.showInfo = function(message) {
    $("#info-modal .alert").text(message);
    $('#preLoading').fadeOut('slow');
    $("#error-modal").modal('hide');
    $("#info-modal").modal('show');
}

nafra.showWarning = function(message) {
    var messageBox = $("#message-box");
    messageBox.empty();
    $(  '<div class="alert alert-warning alert-dismissible" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert">' +
                '<span aria-hidden="true">&times;</span>' +
                '<span class="sr-only">Close</span>' +
            '</button>' +
            message +
        '</div>').appendTo(messageBox);
    $("#error-modal").modal('hide');
}

nafra.process = function(request, cmd, arg1, arg2) {
    // cmd = process 'git', 'grunt', 'npm' command line arguments
    // other arguments = optional stdin content and a callback function:
    // ex:
    // process("git","log", mycallback)
    // process("git","commit -F -", "my commit message", mycallback)
    if (typeof(arg1) == "function") {
        var callback = arg1;
    }
    else {
        // Convention : first line = process 'git', 'grunt', 'npm' arguments, rest = process 'git', 'grunt', 'npm' stdin
        cmd += "\n" + arg1;
        var callback = arg2;
    }
    $.post(request, cmd, function(data, status, xhr) {
        if (xhr.status == 200) {
            // Convention : last lines are footer meta data like headers. An empty line marks the start if the footers
            var footers = {};
            var fIndex = data.length;
            if (fIndex > 25) {
                while (true) {
                    var oldFIndex = fIndex;
                    var fIndex = data.lastIndexOf("\r\n", fIndex - 1);
                    var line = data.substring(fIndex + 2, oldFIndex);
                    if (line.length > 0) {
                        var footer = line.split(": ");
                        footers[footer[0]] = footer[1];
                    }
                    else {
                        break;
                    }
                }

                var messageStartIndex = fIndex - parseInt(footers["Git-Stderr-Length"]);
                var message = data.substring(messageStartIndex, fIndex);
                var output = data.substring(0, messageStartIndex);
                var rcode = parseInt(footers["Git-Return-Code"]);
                if (rcode == 0) {
                    if (callback) {
                        callback(output);
                    }
                    // Return code is 0 but there is stderr output: this is a warning message
                    if (message.length > 0) {
                        console.log(message);
                        // nafra.showInfo(message);
                        nafra.showDialog('success', message);
                    }
                }
                else {
                    if (!message) {
                        message = 'Error unknown';
                    }
                    console.log(message);
                    // nafra.showError(message);
                    nafra.showDialog('alert', message);
                }
            }
            else {
                console.log(data);
                nafra.showMessage('success', data);
            }
        }
        else {
            console.log(data);
            // nafra.showError(data);
            nafra.showDialog('alert', data);
        }
    }, "text")
    .fail(function(xhr, status, error) {
        // nafra.showError("Git nafra server not running");
        nafra.showDialog('alert', 'Git nafra server not running');
    });
}

nafra.titleCase = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

nafra.detachChildren = function(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

nafra.splitLines = function(data) {
    return data.split("\n").filter(function(s) { return s.length > 0; });
}

nafra.getNodeIndex = function(element) {
    var index = 0;
    while (element.previousElementSibling) {
        element = element.previousElementSibling;
        ++index;
    }
    return index;
}

nafra.getFormattedDate = function(input) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

    var date = new Date(input * 1000);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var result = day + ' ' + monthNames[monthIndex] + ', ' + year;

    return result;
}

nafra.timeSince = function(date) {

    var seconds = Math.floor(((new Date().getTime()/1000) - date)),
    interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        if (interval == 1) {
            return "a day";
        }
        else {
            return interval + " days";
        }
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        if (interval == 1) {
            return "an hour";
        }
        else {
            return interval + " hours";
        }
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }

    return Math.floor(seconds) + " seconds";
}

nafra.truncateWord = function( n, useWordBoundary ){
    var isTooLong = this.length > n,
        s_ = isTooLong ? this.substr(0,n-1) : this;
        s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
    return  isTooLong ? s_ + '...' : s_;
};
/*
 *  == LogView ================================================================
 */
nafra.LogView = function(commitView, count, showmore) {

    var self = this;

    self.update = function(ref) {
        streams = []
        $(content).empty();
        self.nextRef = ref;
        self.populate();
    };

    self.populate = function() {
        var maxCount = (count == null || isNaN(count)) ? 1 : count;
        if (content.childElementCount > 0) {
            // The last node is the 'Show more commits placeholder'. Remove it.
            content.removeChild(content.lastElementChild);
        }
        var startAt = content.childElementCount;
        nafra.process("git", "log --date=raw --date-order --pretty=raw --decorate=full --max-count=" + (maxCount + 1) + " " + self.nextRef + " --", function(data) {
            var start = 0;
            var count = 0;
            var prevEntry = null;
            self.nextRef = undefined;

            while (true) {
                var end = data.indexOf("\ncommit ", start);
                if (end != -1) {
                    var len = end - start;
                }
                else {
                    var len = undefined;
                }

                var entry = new Entry(self, data.substr(start, len));
                if (count < maxCount) {
                    if (prevEntry == null) {
                        content.appendChild(entry.elementHeader);
                        content.appendChild(entry.element);
                    }
                    else {
                        if (prevEntry.author.date == entry.author.date) {
                            content.appendChild(entry.element);
                        }
                        else {
                            content.appendChild(entry.elementHeader);
                            content.appendChild(entry.element);
                        }
                    }

                    prevEntry = entry;

                    if (!currentSelection) {
                        entry.select();
                    }
                }
                else {
                    self.nextRef = entry.commit;
                    break;
                }

                if (len == undefined) {
                    break;
                }
                start = end + 1;
                ++count;
            }

            if (self.nextRef != undefined && (showmore == null || showmore == true)) {
                var moreTag = $('<a class="log-entry log-entry-more list-group-item">');
                $('<a class="list-group-item-text">Show previous commits</a>').appendTo(moreTag[0]);
                moreTag.click(self.populate);
                moreTag.appendTo(content);
            }
        });
    };

    function Person(data) {
        var nameEnd = data.indexOf("<");
        this.name = data.substr(0, nameEnd - 1);
        var emailEnd = data.indexOf(">", nameEnd);
        this.email = data.substr(nameEnd + 1, emailEnd - nameEnd - 1);
        var dateEnd = data.indexOf(" ", emailEnd + 2);
        var secs = data.substr(emailEnd + 2, dateEnd - emailEnd - 2);
        this.longDate = new Date(0);
        this.longDate.setUTCSeconds(parseInt(secs));
        this.date = nafra.getFormattedDate(parseInt(secs));
        this.timeAgo = nafra.timeSince(parseInt(secs));
        this.dateUnix = secs;
    };

    function Entry(logView, data) {
        var self = this;

        self.abbrevCommitHash = function(char) {
            return self.commit.substr(0, char);
        };

        self.abbrevMessage = function() {
            var end = self.message.indexOf("\n");
            if (end == -1) {
                return self.message
            }
            else {
                return self.message.substr(0, end);
            }
        };

        self.createElement = function() {
            self.elementHeader = $('<li class="commit-header">'+ self.author.date +'</li>')[0];
            self.element = $('<li class="commit js-toggle-container" id="'+ self.abbrevCommitHash(8) +'">'
            +                    '<div class="commit-info-block">'
            +                        '<div class="commit-row-title clearfix">'
            +                            '<h6></h6>'
            +                            '<span class="item-title">'
            +                                '<a class="commit-row-message" href="https://gitlab.dcclabs.tv/seachange/naf/commit/'+ self.commit +'" target="_blank"></a>'
            +                                '<span class="commit-row-message visible-xs-inline">'+ self.abbrevCommitHash(8) +'</span>'
            +                                '<a class="text-expander hidden-xs js-toggle-button" role="button" data-toggle="collapse" href="#collapseExample-'+ self.abbrevCommitHash(8) +'" aria-expanded="false" aria-controls="collapseExample-'+ self.abbrevCommitHash() +'">...</a>'
            +                            '</span>'
            +                            '<div class="commit-actions hidden-xs">'
            +                                '<a class="commit-short-id" href="https://gitlab.dcclabs.tv/seachange/naf/commit/'+ self.commit +'" target="_blank">'+ self.abbrevCommitHash(8) +'</a>'
            +                            '</div>'
            +                        '</div>'
            +                        '<div id="collapseExample-'+ self.abbrevCommitHash(8) +'" class="collapse"><pre class="commit-row-description js-toggle-content">'+ self.message +'</pre></div>'
            +                        '<div class="commit-row-info"></div>'
            +                    '</div>'
            +                 '</li.')[0];

            $('<a class="commit-author-link has-tooltip" title="'+ self.author.email +'" target="_blank" href="mailto:' + self.author.email + '">' + self.author.name + '</a> authored <time class="time_ago js-timeago" datetime="' + self.author.longDate + '" title="" data-toggle="tooltip" data-placement="top" data-container="body" data-original-title="' + self.author.longDate + '">about '+ self.author.timeAgo +' ago</time>').appendTo($(".commit-row-info", self.element));
            var message = nafra.truncateWord.apply(self.abbrevMessage(), [120, true]);
            $(".commit-row-message", self.element)[0].appendChild(document.createTextNode(message));

            if (self.refs) {
                var entryName = $("h6", self.element);
                self.refs.forEach(function (ref) {
                    if (ref.indexOf("refs/remotes") == 0) {
                        ref = ref.substr(13);
                        var reftype = "danger";
                    }
                    else if (ref.indexOf("refs/heads") == 0) {
                        ref = ref.substr(11);
                        var reftype = "success";
                    }
                    else if (ref.indexOf("tag: refs/tags") == 0) {
                        ref = ref.substr(15);
                        var reftype = "info";
                    }
                    else {
                        var reftype = "warning";
                    }
                    $('<span>&nbsp;</span><span class="label label-' + reftype + '">' + ref + '</span>').appendTo(entryName);
                });
            }
            self.element.model = self;
            var model = self;

            $(self.element).click(function (event) {
                model.select();
            });

            return self.element;
        };

        self.select = function() {
            if (currentSelection != self) {
                if (currentSelection) {
                    $(currentSelection.element).removeClass("active");
                }
                $(self.element).addClass("active");
                currentSelection = self;
            }
        };

        self.parents = [];
        self.message = ""

        data.split("\n").forEach(function(line) {
            if (line.indexOf("commit ") == 0) {
                self.commit = line.substr(7, 40);
                if (line.length > 47) {
                    self.refs = []
                    var s = line.lastIndexOf("(") + 1;
                    var e = line.lastIndexOf(")");
                    line.substr(s, e - s).split(", ").forEach(function(ref) {
                        self.refs.push(ref);
                    });
                }
            }
            else if (line.indexOf("parent ") == 0) {
                self.parents.push(line.substr(7));
            }
            else if (line.indexOf("tree ") == 0) {
                self.tree = line.substr(5);
            }
            else if (line.indexOf("author ") == 0) {
                self.author = new Person(line.substr(7));
            }
            else if (line.indexOf("committer ") == 0) {
                self.committer = new Person(line.substr(10));
            }
            else if (line.indexOf("    ") == 0) {
                self.message += line.substr(4) + "\n";
            }
        });

        self.message = self.message.trim();
        self.createElement();
    };

    self.commitView = commitView;
    self.element = $('<div id="log-view"><ol id="commits-list" class="list-unstyled content_list"></ol></div>')[0];
    var content = self.element.children[0];
    var currentSelection = null;
    var lineHeight = null;
    var streams = [];
    var streamColor = 0;
};
// ============================================================================
/*
 *  == populateNav ============================================================
 */
nafra.PopulateNav = function(mainView) {

    var self = this;

    self.selectRef = function(refName) {
        $('#remote-branches').html(refName + '   <span class="caret"></span>');
        var checkoutBranch = refName.replace('origin/','');
        nafra.current_branch = checkoutBranch;
            
        nafra.process("git", "checkout " + checkoutBranch, function(data) {
            console.log(data);
            // nafra.showInfo(data);
            nafra.showDialog('info', data);
            $.get("/get_naf_version", function(data) {
                console.log(data);
                // nafra.showInfo(data);
                nafra.showDialog('info', data);
                document.getElementById("currentVersion").value = data;
                document.getElementById("newVersion").value = "";
                $('#start-create').prop('disabled', false);
            });
        });

        self.mainView.commitView.update(refName);
    };

    self.addPopup = function(section, title, id, refs) {
        var popup = $(  '<div class="modal fade" id="' + id + '" role="dialog">' +
                            '<div class="modal-dialog modal-sm">' +
                                '<div class="modal-content">' +
                                    '<div class="modal-header">' +
                                        '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                                        '<h4 class="modal-title">' + title + '</h4>' +
                                    '</div>' +
                                    '<div class="modal-body"><div class="list-group"></div></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>')[0];
        var body = $("body")[0];
        body.insertBefore(popup, body.firstChild);
        var popupContent = $(".list-group", popup)[0];
        refs.forEach(function(ref) {
            var link = $('<a class="list-group-item sidebar-ref">')[0];
            link.section = section;
            if (id == "local-branches-popup") {
                link.refName = ref.substr(2);
                if (ref[0] == "*") {
                    $(link).addClass("branch-current");
                }
            } else {
                link.refName = ref;
            }
            $(link).text(link.refName);
            popupContent.appendChild(link);
            $(link).click(function (event) {
                $(popup).modal('hide');
                self.selectRef(event.target.refName);
            });
        });
        return popup;
    };

    self.fetchBranch = function(section, title, id, gitCommand) {
        nafra.process("git", gitCommand, function(data) {
            var refs = nafra.splitLines(data);
            if (id == "remote-branches") {
                refs = refs.map(function(ref) {
                    var end = ref.lastIndexOf(" -> ");
                    if (end == -1) {
                        return ref.substr(2);
                    }
                    else {
                        return ref.substring(2, end);
                    }
                });
            }

            if (refs.length > 0) {
                var idx = refs.indexOf("origin/master");
                var currentBranch = refs[idx];
                var branches = [];
                $('<button id="remote-branches" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'+ currentBranch +'   <span class="caret"></span>').appendTo(section)[0];
                var ul = $('<ul class="dropdown-menu aria-labelledby="remote-branches">').appendTo(section)[0];
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
                        var li = $('<li class="sidebar-ref">').appendTo(ul)[0];
                        if (id == "local-branches") {
                            li.refName = ref.substr(2);
                            if (ref[0] == "*") {
                                $(li).addClass("branch-current");
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
                            li.refName = ref;
                        }
                        $(li).attr("title", li.refName);
                        $('<a>' + li.refName + '</a>').appendTo(li);

                        $(li).click(function (event) {
                            self.selectRef(event.currentTarget.refName);
                        });

                        branches.push(ref);
                    }
                }
            }
            else {
                $(section).remove();
            }

            var checkoutBranch = currentBranch.replace('origin/','');
            nafra.current_branch = checkoutBranch;
            nafra.process("git","checkout " + checkoutBranch, function(data) {
                console.log(data);
                // nafra.showInfo(data);
                nafra.showDialog('info', data);
            });

            self.mainView.commitView.update(currentBranch);
        });
    };

    self.mainView = mainView;

    self.fetchBranch($("#project-refs-dropdown")[0], "Remote Branches", "remote-branches", "branch --remotes");
}
// ============================================================================

/*
 *  == ProjectManager =========================================================
 */
nafra.ProjectManager = function(mainView) {

    var self = this;

    var exist = false;

    //check if browser supports file api and filereader features
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('onload', function(e) {
            var file = fileInput.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    fileDisplayArea.innerText = reader.result;
                }
                reader.readAsText(file);
        });
    }
    else {
      alert('The File APIs are not fully supported in this browser.');

    }
}