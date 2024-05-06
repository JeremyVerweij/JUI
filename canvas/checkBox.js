JUI.canvas.checkBox = class extends JRENDER.canvas.renderObject{
    constructor(canvas, color, secondary_color, x, y, w, h, r, margin, line_width, alignHorizontal = "left", alignVertical = "top", border = false, border_width = 1, border_color = "#000000"){
        super(canvas, x, y, w, h, alignHorizontal, alignVertical);
        this.color = color;
        this.secondary_color = secondary_color;
        this.radius = r;
        this.border = border;
        this.border_width = border_width;
        this.border_color = border_color;
        this.line_width = line_width;
        this.margin = margin;

        this.select = false;

        if(this.radius < 0){
            this.radius = 0;
            LOG.error("JRENDER: drawRoundRect radius can't be a negative number")
        }

        canvas.elements.push(this);

        this.clickId = JLIB.api.addClickEvent(this.getBox(), () => this.select = !this.select);
    }

    checkClickBounds(){
        JLIB.api.clickEvents[this.clickId].bounds = this.getBox();
    }

    render(){
        this.checkClickBounds();
        this.canvas.drawRoundRect(this.color, this.calcActualX(), this.calcActualY(), this.width, this.height, this.radius, this.border, this.border_width, this.border_color);
        
        if(!this.select) return;
        
        this.canvas.drawLine(this.secondary_color, this.line_width, this.calcActualX() + this.margin, this.calcActualY() + this.margin, this.calcActualX() - this.margin + this.width, this.calcActualY() - this.margin + this.height)
        this.canvas.drawLine(this.secondary_color, this.line_width, this.calcActualX() + this.margin, this.calcActualY()  - this.margin + this.height, this.calcActualX() - this.margin + this.width, this.calcActualY()  + this.margin)
    }
}

window.dispatchEvent(JLIB.common.scriptLoaded)
