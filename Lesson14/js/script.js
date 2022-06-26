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
    this.addTitle();
    startBtn.addEventListener('click', this.checkValue);
    resetBtn.addEventListener('click', this.reset);
    btnOpen.addEventListener('click', this.addScreenBlock);
    inputRange.addEventListener('input', this.addRange);
  },
  addRange: function () {
    rangeValue.textContent = inputRange.value + '%';
    appData.rollback = inputRange.value;
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  showResult: function () {
    inputTotalOne.value = this.screenPrice;
    inputTotalTwo.value = this.screenCount;
    inputTotalThree.value = this.servicePricesPercent + this.servicePricesNumber;
    inputTotalFour.value = this.fullPrice;
    inputTotalFive.value = this.servicePercentPrice;
  },
  checkValue: function () {
    screen = document.querySelectorAll('.screen');
    appData.isError = false;
    screen.forEach(screen => {
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
    screen.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: input.value,
      })
    })
  },
  addServices: function () {
    blockPercent.forEach(item => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    blockNumber.forEach(item => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    })
  },
  addScreenBlock: function () {
    screen = document.querySelectorAll('.screen');
    const cloneScreen = screen[0].cloneNode(true);

    screen[screen.length - 1].after(cloneScreen);
  },
  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
      this.screenCount += +screen.count;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.servicePercentPrice = this.fullPrice - this.rollback;
  },
  blockElements: function () {
    screen = document.querySelectorAll('.screen');
    screen.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      select.setAttribute('disabled', '');
      input.setAttribute('disabled', '');
    });
    resetBtn.style.display = 'block';
    startBtn.style.display = 'none';
  },
  unlockElements: function () {
    screen = document.querySelectorAll('.screen');
    screen.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      select.removeAttribute('disabled', '');
      input.removeAttribute('disabled', '');
      input.value = '';
      select.value = '';
    });

    if (screen.length > 1) {
      for (let i = 0; i < screen.length - 1; i++) {
        screen[i].remove();
      }
    };

    resetBtn.style.display = 'none';
    startBtn.style.display = 'block';
  },
  clearAppData: function () {
    this.rollback = 0;
    this.screens = [];
    this.screenPrice = 0;
    this.screenCount = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
  },
  clearResult: function () {
    inputTotalOne.value = 0;
    inputTotalTwo.value = 0;
    inputTotalThree.value = 0;
    inputTotalFour.value = 0;
    inputTotalFive.value = 0;
  },
  clearRange: function () {
    rangeValue.textContent = '0%';
    inputRange.value = 0;
  },
  clearServices: function () {
    blockPercent.forEach(item => {
      const check = item.querySelector('input[type=checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    });

    blockNumber.forEach(item => {
      const check = item.querySelector('input[type=checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    })
  },
  start: function () {
    this.blockElements();
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    // this.logger();
  },
  reset: function () {
    appData.unlockElements();
    appData.clearAppData();
    appData.clearResult();
    appData.clearRange();
    appData.clearServices();
  },
  logger: function () {
    for (let key in this) {
      console.log(`Ключ: ${key}, Значение: ${this[key]}`);
    }

    console.log(this.screens);
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
  }
}

appData.init();
