$(document).ready(function() {

	var Name_hero = $("input.input_name");// Поле для ввода имени
	var Canvass = $("canvas#game_zone"); // Зона отрисовки игры
   var Menu = $("div.menu"); // Блок с элементами меню
var Video = $("div.video video"); // Блок с видео
var Skip_button = $("div.video p"); // Кнопка пропустить видео
var Music = $("div.audio audio"); // Блок музыки
var Select_hero = $("div.menu img"); // Выбор игрока
var hero = ""; // Переменная для записи выбранного игрока
var StatusGame = "DontStart"; // Статус игры не запущена

Select_hero.click(function(){ // Функция при нажатии на персонажа выбирает его
hero = $(this).attr("alt");
Select_hero.removeClass("select");
$(this).addClass("select");
});

	$("input.button_start").click(function(){ // Событие клик по кнопке отправить

if(Name_hero.val() !="" && hero != "") { // .val - Получение значения поля. Происходит проверка на заполненность поля
Select_hero_car(hero,Name_hero.val());
Menu.fadeOut(); // .fadeOut() - скрыть объект
Skip_button.fadeIn(); // .fadeIn() - показать объект
Video.fadeIn(); // .fadeIn() - показать объект
Video.get(0).play(); // .get(0).play() - Обращение к свойству объекта видео и его запуск
Video.prop("volume", 0.05); // Уменьшение громкости видео
setTimeout(StartGame,500000); // setTimeout(StartGame,63000) - Функция по таймеру действующая 1 раз
}

		});


	function StartGame(){ // Функция запуска игра
		if(StatusGame == "Start"){ // Если нажали пропустить запускаем игру
			StatusGame = "";
		Music.get(0).play(); // .get(0).play() - Обращение к свойству объекта музыки и его запуск
		Music.prop("volume", 0.05); // Уменьшение громкости музыки
		Video.fadeOut(); // .fadeOut() - скрыть объект
		Skip_button.fadeOut(); // .fadeOut() - скрыть объект
		Video.get(0).pause();  // .get(0).play() - Обращение к свойству объекта видео и его пауза
		Canvass.fadeIn(); // .fadeOut() - скрыть объект
		Game();		

		}
		if(StatusGame == "DontStart") // Если не нажали пропустить запускаем игру
		{
		Music.get(0).play(); // .get(0).play() - Обращение к свойству объекта музыки и его запуск
		Music.prop("volume", 0.05); // Уменьшение громкости музыки
		Video.fadeOut(); // .fadeOut() - скрыть объект
		Skip_button.fadeOut(); // .fadeOut() - скрыть объект
		Video.get(0).pause();  // .get(0).play() - Обращение к свойству объекта видео и его пауза
		Canvass.fadeIn(); // .fadeOut() - скрыть объект
		Game();	
		}
		
	}


	Skip_button.click(function(){ // Событие клик по кнопке пропустить
		StatusGame = "Start"; // Статус игры старт
StartGame(); // Запуск функции
	});
});









