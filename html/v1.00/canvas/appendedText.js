JUI.canvas.appendedText = class extends JRENDER.canvas.renderObject{
    constructor(canvas, parent, pre, x, y, text, font, size, color, outline = false, outline_color = "#000000"){
        super(canvas, x, y, null, null, null, null)

        this.parent = parent;
        this.pre = pre
        this.text = text;
        this.font = font;
        this.size = size;
        this.color = color;
        this.outline = outline;
        this.outline_color = outline_color;

        canvas.elements.push(this);
    }

    calcActualX(){
        var x = this.parent.calcActualX();
        if(this.pre) {
            this.canvas.ctx.font = this.size + "px " + this.font;
            var m = this.canvas.ctx.measureText(this.text);
            x -= m.width;
        }
        else x += this.parent.width;
        return x + this.x;
    }

    calcActualY(){
        var y = this.parent.calcActualY();
        y += this.parent.height;
        return y + this.y;
    }

    render(){
        this.canvas.drawText(this.text, this.size + "px " + this.font, this.calcActualX(), this.calcActualY(), this.color, this.outline, this.outline_color);
    }
}

window.dispatchEvent(JLIB.common.scriptLoaded)
