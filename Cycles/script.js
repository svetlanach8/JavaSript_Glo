'use strict';

let rollback = 10;
let title;
let screens;
let screenPrice;
let adaptive;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;
let servicePrice;
let screenPriceQuestion;
let servicePriceQuestion;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

const asking = function () {
  title = prompt("Как называется ваш проект", "Калькулятор верстки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простой, Сложный, Интерактивный");

  do {
    screenPriceQuestion = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPriceQuestion));
  
  screenPrice = Number(screenPriceQuestion);

  adaptive = confirm("Нужен ли адаптив на сайте?");
}

let getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }

    do {
      servicePriceQuestion = prompt("Сколько это будет стоить?");
    } while (!isNumber(servicePriceQuestion));
    
    servicePrice = Number(servicePriceQuestion);
    sum += servicePrice;
  }
  return sum;
}

function getFullPrice(priceLayout, priceAdditional) {
  return parseFloat(priceLayout) + parseFloat(priceAdditional);
}

let getTitle = function (text) {
  let textCorr = text.trimStart();
  let registTitle = textCorr[0].toUpperCase() + textCorr.substring(1).toLowerCase();
  return registTitle;
}

let getServicePercentPrices = function (priceTotal, priceRollaback) {
  return priceTotal - priceRollaback;
}

let showTypeOf = function (variable) {
  console.log(variable, typeof variable);
}

let getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price > 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price >= 0 && price <= 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
let RollbackPercentage = fullPrice * (rollback / 100);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);

console.log('allServicePrices' + " " + allServicePrices);
