JUI.canvas.hoverText = class extends JRENDER.canvas.renderObject{
    constructor(canvas, color, w, h, r, border = false, border_width = 1, border_color = "#000000"){
        super(canvas, 0, 0, w, h, "left", "top");
        this.color = color;
        this.radius = r;
        this.border = border;
        this.border_width = border_width;
        this.border_color = border_color;

        this.text = false;
        this.vissible = false;
        this.customText = [];
        this.elements = [];

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
        this.text_og = text;

        this.text = true;
    }

    changeText(text){
        if(!this.text) LOG.error("JUI: can't change text if text is not set");
        if(!this.text) return;

        this.canvas.ctx.font = this.text_size + "px " + this.text_font;
        this.text_messure = this.canvas.ctx.measureText(text);
        this.text_text = text;
    }

    calcTextX(){
        return (this.width - this.text_messure.width) / 2 + this.calcActualX();
    }

    calcTextY(){
        return this.text_y + (this.text_messure.actualBoundingBoxAscent + this.text_messure.actualBoundingBoxDescent) + this.calcActualY();
    }

    addElement(element, customText = null){
        if(element instanceof Array){
            for (let i = 0; i < element.length; i++) {
                const e = element[i];
                this.elements.push(e);
                this.customText.push(customText);
            }
            return;
        }
        this.elements.push(element);
        this.customText.push(customText);
    }

    checkElements(){
        this.text_text = this.text_og;
        var e = false;
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            var box = element.getBox();
            var coord = JLIB.common.convertToCoord(JLIB.api.mouse);
            if(JLIB.common.checkBoundForSingleCoord(box, coord)){
                e = true;
                this.x = coord[0];
                this.y = coord[1] - this.height;
                if(this.customText[i] != null){
                    this.text_text = this.customText[i];
                }
            }
        }

        this.vissible = e;
    }

    render(){
        this.checkElements();
        if(!this.vissible) return;
        this.canvas.drawRoundRect(this.color, this.calcActualX(), this.calcActualY(), this.width, this.height, this.radius, this.border, this.border_width, this.border_color);
        if(this.text)this.canvas.drawTextAdvanced(this.text_text, this.text_size + "px " + this.text_font, this.calcTextX(), this.calcTextY(), this.text_color, this.text_outline, this.text_outline_color);
    }
}

window.dispatchEvent(JLIB.common.scriptLoaded)
