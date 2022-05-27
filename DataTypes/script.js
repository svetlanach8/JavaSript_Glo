let title = "Типы данных, операторы, методы и свойства";
let screens = "ЭЛТ-мониторы, ЖК-мониторы (LCD), Плазменные-мониторы (PDP), LED-мониторы, OLED-мониторы, QLED-мониторы";
let screenPrice = 256;
let rollback = 10;
let fullPrice = 60000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей/ долларов/гривен/юани`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юани`);

console.log(screens.toLowerCase().split(", "));

let RollbackPercentage = fullPrice * (rollback / 100);
console.log(`Процент отката посреднику за работу ${RollbackPercentage}`);
