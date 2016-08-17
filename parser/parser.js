function parseText() {
    var text = $('#text-in').val(),
        paths = findPaths(text),
        textOut = '';
    for (var i = 0, l = paths.length; i < l; i++) {
        var pathString = cleanPath(paths[i]),
            properties = getProperties(pathString),
            path = addProperties(properties);
        textOut += path;
    }
    textOut = textOut.substr(0, textOut.length - 2);
    $('#text-out').val('var paths = [' + textOut + '];');
}

function addProperties(properties) {
    var isPath = false,
        sidestreams = '[6,7,8]',
        dash = 22 - Math.round(Math.random() * 6),
        cover = 'false',
        type = 'regular',
        start = 0;
    for (var i = 0, l = properties.length; i < l; i++) {
        var set = properties[i].split('=');
        if (set.length > 1) {
            var value = set[1];

            // strip hyphens
            if (value[0] === '"') {
                value = value.substr(1, value.length);
            }
            if (value[value.length - 1] === '"') {
                value = value.substr(0, value.length - 1);
            }




            if (set[0] === 'stroke') {
                // detect cover
                if (set[1] === '"#FF0055') {
                    cover = 'false';
                }

                // detect whether is the cover
                if (set[1] === '"#441515') {
                    type = 'cover';
                    cover = 'true';
                }

                // detect sidestream by color
                if (set[1] === '"#FF00FF' || set[1] === '"#FF0055') {
                    sidestreams = '[0,1,2,3,4,5,6,7,8]';
                } else if (set[1] === '"#FFFF00') {
                    sidestreams = '[1,2,3,4,5,6,7,8]';
                } else if (set[1] === '"#00FFFF') {
                    sidestreams = '[2,3,4,5,6,7,8]';
                } else if (set[1] === '"#0000FF') {
                    sidestreams = '[3,4,5,6,7,8]';
                } else if (set[1] === '"#DE0000') {
                    sidestreams = '[4,5,6,7,8]';
                } else if (set[1] === '"#00FF00') {
                    sidestreams = '[5,6,7,8]';
                } else if (set[1] === '"#FF6D00') {
                    sidestreams = '[0]';
                    cover = 'true';
                    start = 200;
                } else if (set[1] === '"#49FF8D') {
                    sidestreams = '[1]';
                    cover = 'true';
                    start = 300;
                } else if (set[1] === '"#FF827C') {
                    sidestreams = '[2]';
                    cover = 'true';
                    start = 400;
                } else if (set[1] === '"#D1C49A') {
                    sidestreams = '[3]';
                    cover = 'true';
                    start = 500;
                } else if (set[1] === '"#00011F') {
                    sidestreams = '[4]';
                    cover = 'true';
                    start = 600;
                } else if (set[1] === '"#00DF22') {
                    sidestreams = '[5]';
                    cover = 'true';
                    start = 700;
                }
            }
            // check if it is a path
            if (set[0] === 'd') {
                isPath = true;
            }
        }
    }
    if (isPath) {
        console.log(sidestreams);
        return "{\n\tname: '', \n\ttype: '" + type + "',\n\tsidestreams: " + sidestreams + ", \n\tdash: " + dash + ", \n\tgap: 4, \n\tanimationStart: " + start + ", \n\tcover: " + cover + ", \n\tpoints: '" + value + "'\n}, ";
    }
    return '';
}

function getProperties(path) {
    return path.split('" ');

}

function findPaths(string) {
    var newString = polyToPath(string),
        paths = newString.split('<path ');
    return paths;
}

function polyToPath(string) {
    var newString = replace(string, 'polyline', 'path');
    newString = replace(newString, 'points="', 'd="M');
    return newString;
}




function cleanPath(pathRaw) {
    var path = pathRaw.split('/>')[0];
    path = removeBreaks(path);
    path = removeTabs(path);
    path = removeSpaces(path);
    return path;
}

function removeBreaks(text) {
    var chunks = text.split('\n');
    while (chunks.length > 1) {
        var text = mergeChunks(chunks);
        chunks = text.split('\n');
    }
    return text;
}

function removeTabs(text) {
    var chunks = text.split('\t');
    while (chunks.length > 1) {
        var text = mergeChunks(chunks);
        chunks = text.split('\t');
    }
    return text;
}

function removeSpaces(text) {
    var chunks = text.split('  ');
    while (chunks.length > 1) {
        var text = mergeChunks(chunks);
        chunks = text.split('  ');
    }
    return text;
}

function mergeChunks(chunks) {
    var text ='';
    for (var i = 0, l = chunks.length; i < l; i++) {
        if (chunks[i].length) {
            text += chunks[i] + ' ';
        }
    }
    return text;
}

function replace(string, search, replacement) {
    return string.split(search).join(replacement);
}