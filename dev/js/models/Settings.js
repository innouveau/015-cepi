function Settings(app) {
    this.app = app;

    this.device = '';
    this.container = {};

    this.properties = {
        path: {
            stroke: 2
        },
        radar: {
            r: 30, // to prevent a valorisation radar to overlap the graph (when value 1 or 10), this value should be < this.bottomFrame.height / 10
            gap: 3
        },
        story: {
            chapters: 3
        }
    };

    this.typography = {
        lineHeight: 15
    };

    this.animation = {
        valorisation: 750,
        popup: 200,
        showBottomFrame: 1000,
        hideTopFrame: 1000,
        labelFade: 500,
        radar: 500
    };
    
    this.timing = {
        sidestreamBars: [100, 220, 340, 460, 580, 700],
        story: {
            wait: 300
        }
    };
    
    this.sizes = {};
    this.addWindowListener();
    this.measure();
}

Settings.prototype.addWindowListener = function() {
    var self = this;
    $(window).resize(function(){
        self.measure();
    });
};

Settings.prototype.measure = function() {
    this.container = this.measureContainer();
    this.sizes = this.getSizes();
    if (this.app.canvas && this.app.canvas.drawn) {
        // do a redraw
        this.app.redraw();
    }
};


Settings.prototype.measureContainer = function() {
    var width = $(this.app.container).outerWidth(),
        height = $(this.app.container).outerHeight();
    if (width < 700) {
        this.device = 0; // smartphone
    } else if (width < 768) {
        this.device = 1; // tablet portrait
    } else if (width < 1024) {
        this.device = 2; // table landscape
    } else {
        this.device = 3; // desktop
    }
    return {
        width: width,
        height: height,
        margin: 20
    }
};

Settings.prototype.getSizes = function() {
    switch (this.device) {
        case 0:
        case 1:
        case 2:  // tablet sizing set:
            return {
                artboard : {
                    left: 20,
                    top : 0
                },
                layers: {
                    top: {
                        positions: [90, -200, -800],
                        left: 0,
                        bar: {
                            left: 0,
                            top: 420,
                            width: 20
                        }
                    },
                    bottom: {
                        positions: [2000, 2000, 30],
                        marginTop: 160,
                        header: 75,
                        left: 0,
                        width: 630,
                        height: 160,
                        margin: 20
                    },
                    labels: {
                        positions: [2000, 330, 20],
                        left: 24,
                        offset: 100
                    }
                },
                labels: {
                    raw: {
                        left: 170,
                        top: 70
                    },
                    profit: {
                        left: 628,
                        top: 240
                    },
                    sidestream: {
                        left: 520,
                        top: 470
                    }
                },
                filterSidestreams: {
                    top: 20,
                    left: 24,
                    setWidth: 100,
                    labelLeft: 540,
                    labelsTop: 620 // the top position of the labels next to each sidestream
                },
                story: {
                    offset: 1000,
                    buffer: 20,
                    margin: 15
                }
            };
            break;
        case 2:  // tablet sizing set:
            return {
                artboard : {
                    left: 60,
                    top : 0
                },
                layers: {
                    top: {
                        positions: [180, -200, -640],
                        left: 60,
                        bar: {
                            left: 0,
                            top: 420,
                            width: 20
                        }
                    },
                    bottom: {
                        positions: [2000, 2000, 100],
                        marginTop: 160,
                        header: 85,
                        left: 60,
                        width: 630,
                        height: 200,
                        margin: 20
                    },
                    labels: {
                        positions: [2000, 330, 70],
                        left: 84,
                        offset: 100
                    }
                },
                labels: {
                    raw: {
                        left: 170,
                        top: 70
                    },
                    profit: {
                        left: 628,
                        top: 240
                    },
                    sidestream: {
                        left: 520,
                        top: 470
                    }
                },
                filterSidestreams: {
                    top: 20,
                    left: 24,
                    setWidth: 100,
                    labelLeft: 540,
                    labelsTop: 620 // the top position of the labels next to each sidestream
                },
                story: {
                    offset: 1000,
                    buffer: 20,
                    margin: 15
                }
            };
            break;
        case 3: // desktop sizing set:
            return {
                artboard : {
                    left: 60,
                    top : 0
                },
                layers: {
                    top: {
                        positions: [180, -200, -640],
                        left: 60,
                        bar: {
                            left: 0,
                            top: 420,
                            width: 20
                        }
                    },
                    bottom: {
                        positions: [2000, 2000, 100],
                        marginTop: 180,
                        header: 100,
                        left: 60,
                        width: 630,
                        height: 320,
                        margin: 20
                    },
                    labels: {
                        positions: [2000, 330, 70],
                        left: 84,
                        offset: 100
                    }
                },
                labels: {
                    raw: {
                        left: 170,
                        top: 70
                    },
                    profit: {
                        left: 628,
                        top: 240
                    },
                    sidestream: {
                        left: 520,
                        top: 470
                    }
                },
                filterSidestreams: {
                    top: 20,
                    left: 24,
                    setWidth: 100,
                    labelLeft: 630,
                    labelsTop: 620 // the top position of the labels next to each sidestream
                },
                story: {
                    offset: 1000,
                    buffer: 20,
                    margin: 15
                }
            };
            break;
    }
};