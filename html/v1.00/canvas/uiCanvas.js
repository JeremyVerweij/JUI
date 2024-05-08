JUI.canvas = {};

JUI.canvas.uiCanvas = class extends JRENDER.canvas.canvas{
    constructor(name = "", pixelart = false, width = 100, height = 100){
        super("JUI/" + name, true, true, false, pixelart, false, 0, 0, 1, width, height, "#00000000", true, 0, 0, 0, 0);
        
        this.clear = this.clearCanvas;
    }

    drawRoundRect(color, x, y, w, h, r, border = false, border_width, border_color){
        this.ctx.beginPath();
        this.ctx.roundRect(x, y, w, h, [r]);
        
        this.ctx.fillStyle = color;
        this.ctx.fill();

        if(!border) return;

        this.ctx.lineWidth = border_width;
        this.ctx.strokeStyle = border_color;
        this.ctx.stroke();
    }

    drawTextAdvanced(text, font, x, y, color, outline = false, outline_color){
        var t = text.split("\n");
        this.ctx.font = font;
        var text_messure = this.ctx.measureText(text);
        var w = (text_messure.width / t.length) * (t.length - 1);
        w *= 0.5;

        for (let i = 0; i < t.length; i++) {
            const element = t[i];
            this.drawText(element, font, x + w, y + (i * parseInt(font)), color, outline, outline_color)
        }
    }
}

window.dispatchEvent(JLIB.common.scriptLoaded)
