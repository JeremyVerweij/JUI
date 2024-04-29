JUI.canvas = {};

JUI.canvas.uiCanvas = class extends JRENDER.canvas.canvas{
    constructor(name = "", pixelart = false, width = 100, height = 100){
        super("JUI/" + name, true, false, pixelart, false, 0, 0, 1, width, height, "#00000000", true, 0, 0, 0, 0);
        
        this.clear = this.clearCanvas;
    }

    customFontText(){
        
    }
}

var a = new JUI.canvas.uiCanvas("test", true, 100, 100);
var b = new JRENDER.canvas.text(a, "hello", "arial", 10, 0, 50, "#ffffff", false)

// a.render();
setInterval(() => a.render(), 100)

window.dispatchEvent(JLIB.common.scriptLoaded)
