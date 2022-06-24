'use strict';

const title = document.getElementsByTagName('h1')[0];
const btn = document.getElementsByClassName('handler_btn');
const btnOpen = document.querySelector('.screen-btn');
const blockPercent = document.querySelectorAll('.other-items.percent');
const blockNumber = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback input[type=range]');
const rangeValue = document.querySelector('.rollback .range-value');
const inputTotal = document.getElementsByClassName('total-input');
const inputTotalOne = inputTotal[0];
const inputTotalTwo = inputTotal[1];
const inputTotalThree = inputTotal[2];
const inputTotalFour = inputTotal[3];
const inputTotalFive = inputTotal[4];
let screen = document.querySelectorAll('.screen');

const startBtn = btn[0];
const resetBtn = btn[1];

const select = document.querySelector('.screen select');
const input = document.querySelector('.screen input');

const appData = {
  rollback: 0,
  title: '',
  screens: [],
  screenPrice: 0,
  screenCount: 0,
  adaptive: true,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isError: false,
  init: function () {
    appData.addTitle();
    startBtn.addEventListener('click', appData.checkValue);
    btnOpen.addEventListener('click', appData.addScreenBlock);
    inputRange.addEventListener('input', appData.addRange);
  },
  addRange: function () {
    rangeValue.textContent = inputRange.value + '%';
    appData.rollback = inputRange.value;
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  showResult: function () {
    inputTotalOne.value = appData.screenPrice;
    inputTotalTwo.value = appData.screenCount;
    inputTotalThree.value = appData.servicePricesPercent + appData.servicePricesNumber;
    inputTotalFour.value = appData.fullPrice;
    inputTotalFive.value = appData.servicePercentPrice;
  },
  checkValue: function () {
    screen = document.querySelectorAll('.screen');
    appData.isError = false;
    screen.forEach(function(screen) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if (input.value === '' || select.value === '') {
        appData.isError = true;
      }
    })

    if (!appData.isError) {
      appData.start();
    } else {
      alert('Заполните все поля по типу экрана')
    }
  },
  addScreens: function () {
    screen = document.querySelectorAll('.screen');
    screen.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: input.value,
      })
    })
  },
  addServices: function () {
    blockPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    blockNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    })
  },
  addScreenBlock: function () {
    screen = document.querySelectorAll('.screen');
    const cloneScreen = screen[0].cloneNode(true);

    screen[screen.length - 1].after(cloneScreen);
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
      appData.screenCount += +screen.count;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
    appData.servicePercentPrice = appData.fullPrice - appData.rollback;
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    // appData.logger();
  },
  logger: function () {
    for (let key in appData) {
      console.log(`Ключ: ${key}, Значение: ${appData[key]}`);
    }

    console.log(appData.screens);
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  }
}

appData.init();
