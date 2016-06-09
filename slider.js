var defaults = {
    parent: document.body,
    // vertical: false,
    // range: false,
    // highlight: false
};


function DragSlider(options) {

    this._parent = options.parent && options.parent || defaults.parent;
    
    this._render();

    this._parent.ondragstart = function() {
        return false;
    };

    this._wrapper = this._parent.getElementsByClassName('ds-wrapper')[0];
    this._rail = this._wrapper.getElementsByClassName('ds-rail')[0];
    this._dragger = this._wrapper.getElementsByClassName('ds-dragger')[0];

    this._railStart = this._wrapper.getBoundingClientRect().left + parseInt(getComputedStyle(this._wrapper).paddingLeft);
    this._railEnd = this._rail.clientWidth - this._dragger.clientWidth;

    this._wrapper.onmousedown = this._mouseDown.bind(this);
    this._wrapper.onmouseup = this._mouseUp.bind(this);
    this._wrapper.onmousemove = this._mouseMove.bind(this);

}

DragSlider.prototype._render = function() {

    var wrapper = document.createElement('div');
    var rail = document.createElement('div');
    var dragger = document.createElement('div');

    wrapper.className = 'ds-wrapper';
    rail.className = 'ds-rail';
    dragger.className = 'ds-dragger';
    

    wrapper.appendChild(rail);
    rail.appendChild(dragger);

    this._parent.appendChild(wrapper);
};

DragSlider.prototype._mouseDown = function (e) {
    this.draggerCanMove = true;
    this._moveDragger(e);

};

DragSlider.prototype._mouseMove = function (e) {
    if (this.draggerCanMove) {
        this._moveDragger(e); 
    }
};

DragSlider.prototype._mouseUp = function(e) {
    this.draggerCanMove = false;
};

DragSlider.prototype._moveDragger = function(e) {
    
        this._pos = e.clientX - this._railStart - (this._dragger.clientWidth / 2);
        
        if (this._pos <= 0) this._pos = 0;
        if (this._pos >= this._railEnd) this._pos = this._railEnd;

        this._dragger.style.left = this._pos + 'px';
      
};


var slider = new DragSlider({
    parent: document.querySelector('.slider-wrapper1')
});

var slider2 = new DragSlider({
    parent: document.querySelector('.slider-wrapper2')
});












