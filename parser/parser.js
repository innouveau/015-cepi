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
    $('#text-out').val('var paths = [' + textOut + ']');
}

function addProperties(properties) {
    var isPath = false,
        sidestreams = '[7]';
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

            // detect sidestream by color
            if (set[0] === 'stroke') {
                // PART 1
                if (set[1] === '"#FF00FF') {
                    sidestreams = '[0,1,2,3,4,5]';
                } else if (set[1] === '"FFFF00') {
                    sidestreams = '[1,2,3,4,5]';
                }
            }
            // check if it is a path
            if (set[0] === 'd') {
                isPath = true;
            }
        }
    }
    if (isPath) {
        return "{\n\tname: '', \n\tsidestreams: " + sidestreams + ", \n\tdash: 20, \n\tgap: 4, \n\tanimationStart: 0, \n\tcover: false, \n\tpoints: '" + value + "'\n}, ";
    }
    return '';
}

function getProperties(path) {
    return path.split('" ');

}

function findPaths(text) {
    var paths = text.split('<path ');
    return paths;
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