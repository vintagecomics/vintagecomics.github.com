var slideshow = {
  currentIndex: 0,
  imgs: [],
  create: function(options) {
    options.element.className+= ' slideshow'; //add a class to the main element for styling

    this.imgs = this.getImgs(options.sources); //make img html
      
    var controls = this.getControls(); //make controls
      
    //add the html to the element from the options
    var frag = document.createDocumentFragment();
    var pagination = document.getElementById('pagination');
    this.imgs.forEach(function(img) {
      frag.appendChild(img);
    });
    pagination.appendChild(controls);
    options.element.appendChild(frag);
  },
  getImgs: function(sources) {
    var imgs = [];
    sources.forEach(function(src, i) {
    	var img = document.createElement('img');
      	img.src = src;
      	imgs.push(img);
      
	    if (i > 0) {
    	    img.style.display = 'none'; //hide all but first image
      	}
    });
    return imgs;
  },
  getControls: function() {
    var that = this; //so that we can access "this" within the click functions
    var controls = document.createElement('div');
    controls.className = 'controls';
      
    var counter = document.createElement('span');
    counter.className = 'counter';
    this.setCounter(counter);
    
    var prev = document.createElement('a');
    prev.textContent = '« Previous';
    prev.className = 'prev';
    prev.addEventListener('click', function() {
      newIndex = (that.currentIndex) ? that.currentIndex-1 : that.imgs.length-1;
      that.changeImg(newIndex, counter);
    });
    
    var sep = document.createElement('span');
    sep.textContent = ' / ';
    var next = document.createElement('a');
    next.textContent = 'Next »';
    next.className = 'next';
    next.addEventListener('click', function() {
      newIndex = (that.currentIndex !== that.imgs.length-1) ? that.currentIndex+1 : 0;
      that.changeImg(newIndex, counter);
    });
      
    controls.appendChild(prev);
    controls.appendChild(sep);
    controls.appendChild(next);
    controls.appendChild(counter);
      
    return controls;
  },
  changeImg: function(newIndex, counter) {
    this.imgs[this.currentIndex].style.display = 'none';
    this.imgs[newIndex].style.display = 'inline';
    this.currentIndex = newIndex;
    this.setCounter(counter);
  },
  setCounter: function(counter) {
    counter.textContent = (this.currentIndex+1)+' / '+this.imgs.length;
  }
};