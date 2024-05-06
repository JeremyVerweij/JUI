JUI.canvas.selectionBoxCollection = class{
    constructor(){
        this.current = 0;
        this.arr = [];
    }

    add(item){
        this.arr.push(item);
        return this.arr.length - 1;
    }

    set(id){
        this.current = id;
    }

    getCurrentSelected(){
        return this.current;
    }
}

JUI.canvas.selectionBox = class extends JRENDER.canvas.renderObject{
    constructor(canvas, collection, color, secondary_color, x, y, w, h, r, margin, alignHorizontal = "left", alignVertical = "top", border = false, border_width = 1, border_color = "#000000"){
        super(canvas, x, y, w, h, alignHorizontal, alignVertical);
        this.color = color;
        this.secondary_color = secondary_color;
        this.radius = r;
        this.border = border;
        this.border_width = border_width;
        this.border_color = border_color;
        this.margin = margin;
        this.collection = collection;

        if(this.radius < 0){
            this.radius = 0;
            LOG.error("JRENDER: drawRoundRect radius can't be a negative number")
        }

        canvas.elements.push(this);

        this.id = this.collection.add(this);

        this.clickId = JLIB.api.addClickEvent(this.getBox(), () => this.collection.set(this.id));
    }

    selected(){
        return this.id == this.collection.getCurrentSelected();
    }

    checkClickBounds(){
        JLIB.api.clickEvents[this.clickId].bounds = this.getBox();
    }

    render(){
        this.checkClickBounds();
        this.canvas.drawRoundRect(this.color, this.calcActualX(), this.calcActualY(), this.width, this.height, this.radius, this.border, this.border_width, this.border_color);
        
        if(!this.selected()) return;

        this.canvas.drawRoundRect(this.secondary_color, this.calcActualX() + this.margin, this.calcActualY() + this.margin, this.width - (this.margin * 2), this.height - (this.margin * 2), this.radius, false);
    }
}

window.dispatchEvent(JLIB.common.scriptLoaded)
