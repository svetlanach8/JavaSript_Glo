'use strict';

const appData = {
  rollback: 10,
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  servicePrice: 0,
  screenPriceQuestion: 0,
  servicePriceQuestion: 0,
  asking: function () {
    appData.title = prompt("Как называется ваш проект", "Калькулятор верстки");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простой, Сложный, Интерактивный");

    do {
      appData.screenPriceQuestion = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPriceQuestion));

    appData.screenPrice = Number(appData.screenPriceQuestion);

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }

      do {
        appData.servicePriceQuestion = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(appData.servicePriceQuestion));

      appData.servicePrice = Number(appData.servicePriceQuestion);
      sum += appData.servicePrice;
    }
    return sum;
  },
  getFullPrice: function (priceLayout, priceAdditional) {
    return parseFloat(priceLayout) + parseFloat(priceAdditional);
  },
  getTitle: function (text) {
    let textCorr = text.trimStart();
    let registTitle = textCorr[0].toUpperCase() + textCorr.substring(1).toLowerCase();
    return registTitle;
  },
  getServicePercentPrices: function (priceTotal, priceRollaback) {
    return priceTotal - priceRollaback;
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price > 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price <= 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.logger();
  },
  logger: function () {
    for (let key in appData) {
      console.log(`Ключ: ${key}, Значение: ${appData[key]}`);
    }

    console.log(appData.screens);
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
  }
}

appData.start();
