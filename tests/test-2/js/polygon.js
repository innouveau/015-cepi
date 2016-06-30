function getPolyPoints(corners, radius) {
    var angle = (Math.PI * 2) / corners,
        points = [],
        sideAngle,
        o,
        i,
        rect,
        ratioX,
        ratioY,
        ratio,
        string = '';
    for (i = 0; i < corners; i++) {
        var a = angle * i;
        points.push({
            x: (Math.sin(a) * 1),
            y: (Math.cos(a) * 1)
        })
    }
    // get the angle of a side
    sideAngle = Math.atan2(points[1].y - points[0].y, points[1].x - points[0].x);
    // rotate point around bottom one
    o = points[0];
    for (i = 1; i < points.length; i++) {
        points[i] = {
            x: Math.cos(sideAngle) * (points[i].x - o.x) - Math.sin(sideAngle) * (points[i].y-o.y) + o.x,
            y: Math.sin(sideAngle) * (points[i].x - o.x) + Math.cos(sideAngle) * (points[i].y - o.y) + o.y
        };
    }
    //by this point the figure is "flat on the floor" lets measure its size
    rect = {
        top: 2,
        left: 2,
        right: -2,
        bottom: -2};
    for (i = 0; i < points.length; i++) {
        rect.top = Math.min(rect.top,points[i].y);
        rect.bottom = Math.max(rect.bottom,points[i].y);
        rect.left = Math.min(rect.left, points[i].x);
        rect.right = Math.max(rect.right, points[i].x);
    }
    rect.width = Math.abs(rect.right - rect.left);
    rect.height = Math.abs(rect.bottom - rect.top);
    //make points relative to top left of rect
    for (i = 0; i < points.length; i++) {
        points[i] = {
            x: points[i].x - rect.left,
            y: points[i].y - rect.top
        };
    }
    // lets scale and position the poly based on its rect
    ratioX = radius / rect.width;
    ratioY = radius / rect.height;
    ratio = Math.min(ratioX, ratioY);
    for (i = 0; i < points.length; i++) {
        points[i] = {
            x: (points[i].x * ratio),
            y: (points[i].y * ratio)
        };
    }
    return points;
}