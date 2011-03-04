function Sprite(path) {
  var sprite = this;
  this.ready = false;
  this.path = path;
  this.spriteSize = [48, 64];
  this.outputSize = [48, 64];
  
  this.load = function() {
    image = new Image();
    if (sprite.callback != undefined) {
      image.onload = function() {
        sprite.ready = true;
        sprite.callback();
      }
    } else {
      image.onload = function() {
        sprite.ready = true;
      }
    }
    image.src = this.path;
  }
  
  var image;
  this.load();
  
  this.getSprite = function(state, step) {
    if (this.ready) {
      state = (state == undefined) ? 0 : state;
      step  = (step  == undefined) ? 0 : step;
      return [step * this.spriteSize[0],
              state * this.spriteSize[1],
              this.spriteSize[0], this.spriteSize[1],
              this.outputSize[0], this.outputSize[1]];
    }
  }
  
  this.drawSpriteToCanvas = function(destX, destY, canvas, state, step) {
    if (this.ready) {
      state = (state == undefined) ? 0 : state;
      step = (step == undefined) ? 0 : step;
      coords = this.getSprite(state, step);
      console.log(coords);
      canvas.drawImage(image, coords[0], coords[1], coords[2], coords[3], destX, destY, coords[4], coords[5]);
    }
  }
}