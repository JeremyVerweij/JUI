JUI.canvas.progressBar = class extends JRENDER.canvas.renderObject{
    constructor(canvas, progress_color, color, x, y, w, h, r, margin, alignHorizontal = "left", alignVertical = "top", border = false, border_width = 1, border_color = "#000000"){
        super(canvas, x, y, w, h, alignHorizontal, alignVertical);
        this.color = color;
        this.progress_color = progress_color;
        this.radius = r;
        this.margin = margin;
        this.border = border;
        this.border_width = border_width;
        this.border_color = border_color;

        this.text = false;
        this.watch = () => 100;

        if(this.radius < 0){
            this.radius = 0;
            LOG.error("JRENDER: drawRoundRect radius can't be a negative number")
        }

        canvas.elements.push(this);
    }

    
    setText(text, font, size, color, textYOffset = 0, outline = false, outline_color = "#000000"){
        this.canvas.ctx.font = size + "px " + font;
        this.text_messure = this.canvas.ctx.measureText(text);
        this.text_text = text;
        this.text_font = font;
        this.text_size = size;
        this.text_color = color;
        this.text_outline = outline;
        this.text_outline_color = outline_color;
        this.text_y = textYOffset;

        this.text = true;
    }

    setWatchValue(_calback){
        this.watch = _calback;
    }

    changeText(text){
        if(!this.text) LOG.error("JUI: can't change text if text is not set");
        if(!this.text) return;

        this.canvas.ctx.font = this.text_size + "px " + this.text_font;
        this.text_messure = this.canvas.ctx.measureText(text);
        this.text_text = text;
    }

    calcProgressWidth(){
        return ((this.width / 100) * this.watch()) - this.margin * 2;
    }

    calcTextX(){
        return (this.width - this.text_messure.width) / 2 + this.calcActualX();
    }

    calcTextY(){
        return this.text_y + (this.text_messure.actualBoundingBoxAscent + this.text_messure.actualBoundingBoxDescent) + this.calcActualY();
    }

    render(){
        this.canvas.drawRoundRect(this.color, this.calcActualX(), this.calcActualY(), this.width, this.height, this.radius, this.border, this.border_width, this.border_color);
        this.canvas.drawRoundRect(this.progress_color, this.calcActualX() + this.margin, this.calcActualY() + this.margin, this.calcProgressWidth(), this.height - (this.margin * 2), this.radius, false);
        if(this.text)this.canvas.drawText(this.text_text, this.text_size + "px " + this.text_font, this.calcTextX(), this.calcTextY(), this.text_color, this.text_outline, this.text_outline_color);
    }
}

window.dispatchEvent(JLIB.common.scriptLoaded)
