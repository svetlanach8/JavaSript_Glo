'use strict';

const book = document.querySelectorAll('.book');
const titleLink = document.querySelectorAll('.book a');
const advertising = document.querySelector('.adv');
const item = document.querySelectorAll('li');

book[1].after(book[0]);
book[0].after(book[4]);
book[4].after(book[3]);
book[3].after(book[5]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
titleLink[4].textContent = 'Книга 3. this и Прототипы Объектов';
advertising.remove();

item[1].after(item[3]);
item[3].after(item[6]);
item[6].after(item[8]);
item[8].after(item[4]);
item[9].after(item[2]);

item[47].after(item[55]);
item[50].after(item[48]);
item[54].before(item[51]);

const newItem = document.createElement('li');
newItem.textContent = 'Глава 8: За пределами ES6';
item[25].insertAdjacentElement("afterend", newItem);
