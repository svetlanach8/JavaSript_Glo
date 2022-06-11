'use strict';

const appData = {
  rollback: 10,
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  screenPriceQuestion: 0,
  asking: function () {
    do {
      appData.title = prompt("Как называется ваш проект");
    } while (appData.isNumber(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (appData.isNumber(name));
      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({id: i, name: name, price: price});
    }

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (appData.isNumber(name));
      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));

      appData.services[name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getFullPrice: function (priceLayout, priceAdditional) {
    appData.fullPrice = parseFloat(priceLayout) + parseFloat(priceAdditional);
  },
  getTitle: function (text) {
    let textCorr = text.trimStart();
    let registTitle = textCorr[0].toUpperCase() + textCorr.substring(1).toLowerCase();
    return registTitle;
  },
  getServicePercentPrices: function (priceTotal, priceRollaback) {
    appData.servicePercentPrice = priceTotal - priceRollaback;
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
    appData.addPrices();
    appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
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
    console.log(appData.screens);
  }
}

appData.start();
