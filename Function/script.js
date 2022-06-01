'use strict';

let rollback = 10;
let title = prompt("Как называется ваш проект");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = prompt("Сколько это будет стоить?");

let getAllServicePrices = function (price1, price2) {
  return parseFloat(price1) + parseFloat(price2);
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

let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
let fullPrice = getFullPrice(screenPrice, allServicePrices);
let servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
let RollbackPercentage = fullPrice * (rollback / 100);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
