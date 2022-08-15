'use strict';

const DomElement = function (selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createElement = function () {
  if (this.selector[0] === '.') {
    const blockDiv = document.createElement('div');
    document.body.append(blockDiv);
    blockDiv.textContent = '.block';
    blockDiv.classList.add(this.selector.substring(1));
    blockDiv.style.cssText = `height: ${this.height}; width: ${this.width}; background: ${this.bg}; font-size: ${this.fontSize}`;
  } else if (this.selector[0] === '#') {
    const blockParagraph = document.createElement('p');
    document.body.append(blockParagraph);
    blockParagraph.setAttribute('id', this.selector.substring(1));
    blockParagraph.textContent = '#block';
    blockParagraph.style.cssText = `height: ${this.height}; width: ${this.width}; background: ${this.bg}; font-size: ${this.fontSize}`;
  }
}

const blockElement = new DomElement('.block', '100px', '100px', 'red', '22px');
blockElement.createElement();
