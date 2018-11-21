'use strict';
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var LEFT_GAP = 145;
var BAR_HEIGHT = 150;
var DISTANCE = 50;
var BAR_WIDTH = 40;

/**
 * Показываем облако
 * @param {Object} ctx - Объект холста, на котором рисуем
 * @param {number} x - начальная координата по оси x
 * @param {number} y - начальная координата по оси y
 * @param {number} color - цвет заливки
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(50 + x, 1 + y);
  ctx.lineTo(100 + x, 10 + y);
  ctx.lineTo(200 + x, 5 + y);
  ctx.lineTo(420 + x, 20 + y);
  ctx.lineTo(410 + x, 140 + y);
  ctx.lineTo(390 + x, 270 + y);
  ctx.lineTo(290 + x, 280 + y);
  ctx.lineTo(180 + x, 265 + y);
  ctx.lineTo(80 + x, 270 + y);
  ctx.lineTo(1 + x, 265 + y);
  ctx.lineTo(-5 + x, 180 + y);
  ctx.lineTo(1 + x, 90 + y);
  ctx.lineTo(-10 + x, 40 + y);
  ctx.lineTo(1 + x, 1 + y);
  ctx.fill();
};

/**
 * Поиск элемента с максимальным значением в массиве
 * @param {Object} arr - Массив данных, из которого выбирается максимальное значение
 * @return {number} arr[i] - Элемент с максимальным значением
 */
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
/**
 * Окно с результатами игры
 * @param {Object} ctx - Объект холста
 * @param {string} names - Имена игроков
 * @param {number} times - Время прохождения
 */
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var textLines = [
    'Ура, вы победили!',
    'Список результатов:'
  ];
  /**
   * Выдача элементов из массива сообщений
   * @param {string} lines - Массив текстов
   * @param {number} i - Индекс текста
   */
  textLines.forEach(function (lines, i) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText(lines, LEFT_GAP, 30 + 20 * i);
  });

  var maxTime = getMaxElement(times);

  /**
   * Выдача элементов из массива игроков
   * @param {string} players - Массив игроков
   * @param {number} i - Индекс игрока
   */
  names.forEach(function (players, i) {
    ctx.fillStyle = '#000';
    ctx.fillText(players, LEFT_GAP + (DISTANCE + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), LEFT_GAP + (DISTANCE + BAR_WIDTH) * i, -(BAR_HEIGHT * times[i]) / maxTime + 235);

    ctx.fillStyle = players === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';
    ctx.fillRect(LEFT_GAP + (DISTANCE + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 2, BAR_WIDTH, -(BAR_HEIGHT * times[i]) / maxTime);
  });
};
