var canvasg = document.getElementById("game_zone");
var context = canvasg.getContext("2d");



// Перемеменные
var Name_player = ""; // Имя игрока


canvasg.width = 900; // Ширина игрового поля
canvasg.height = 700; // Высота игрового поля

var xHeroPosition = 480; // Начало по x
var yHeroPosition = 570;  // Начало по y

var HeroWidth = 100; // Ширина героя
var HeroHeight = 150; // Высота героя

var Speed=3; //скорость обьекта
	//значения клавиш
var up = false;
var down = false;
var left = false;
var right = false;
var Pause = false;
var space = false;
var Bonus_Speed = 4;
var deg = 0;
var Score = 0;
var Fuel = 100;
var lives = 1; // Жизни

var milsec = 0; // Мил.секунды
var sec = 0; // Секунды
var min = 0; // Мин


var Pause = false; // Статус паузы выкл

// Объекты
var Hero = new Image(); // Персонаж

	var line = new Image()
	line.src = "assets/img/road.png"
	line.X = 0
	line.Y = 0
	
	var line2 = new Image()
	line2.src = "assets/img/road.png"
	line2.X = 0
	line2.Y = 0

	var enemyCar1 = new Image()
	enemyCar1.src = "assets/img/car_02.png"
	enemyCar1.X = 0
	enemyCar1.Y = 0
	
	var enemyCar2 = new Image()
	enemyCar2.src = "assets/img/car_03.png"
	enemyCar2.X = 0
	enemyCar2.Y = 0

	var bonus = new Image()
	bonus.src = "assets/img/bonus.png"
	bonus.X = 0
	bonus.Y = 0

	var java = new Image()
	java.src = "assets/img/java.png"
	java.X = 0
	java.Y = 0

 function drawRotated(image,x,y,imgWidth,imgHeight,degree) {
    context.save();
    context.translate(x+imgWidth/2,y+imgHeight/2);
    context.rotate(degree * Math.PI / 180);

    context.drawImage(image,-imgWidth/2,-imgHeight/2,imgWidth,imgHeight);
    xHeroPosition=x;
    yHeroPosition=y;
    context.restore();
  }



		function degChange() {

	if(right == true ){
	if(deg<15){
	deg++;
	}
	}

	if(left == true && right == false){
	if(deg>-15){
	deg--;
	}
	}

	if(deg > 0 && right == false&& left == false){
	deg--;
	xHeroPosition++;
	}
	if(deg < 0 && left == false && right == false){
	deg++;
	xHeroPosition--;}
}	


function drawLines(){ //Отрисовка дороги
		context.drawImage(line, line.X, line.Y)
		line.Y +=20 // Ускорение дороги
		if (line.Y > 0){ // Если больше 0
			line.Y = -700 // Смещать 
		}
		
		context.drawImage(line2, line2.X, line2.Y)
		line2.Y +=20
		if (line2.Y > 700){
			line2.Y = 0
		}
	}

//Случайное условие
function getRandomInt(min, max) {
  min = Math.ceil(min); // минимум
  max = Math.floor(max); // максимум
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

	function drawEnemyCar1(){ // Отрисовка вражеской машины
	
			if (enemyCar1.Y+96 >= yHeroPosition && enemyCar1.X+100 > xHeroPosition && enemyCar1.X < xHeroPosition+100){
			crash = true
			lives--
			if(lives <1){
				alert("Вы попали в аварию!");
				location.reload();
			}		
		}else{
			crash = false
		}	
	
		if (!crash){
			context.drawImage(enemyCar1, enemyCar1.X, enemyCar1.Y)
			enemyCar1.Y +=10
			if (enemyCar1.Y > 700){
				enemyCar1.Y = -710
				enemyCar1.X = getRandomInt(50,350)
			}
		}
	}   
	
	function drawEnemyCar2(){ // Отрисовка вражеской машины
		
				if (enemyCar2.Y+96 >= yHeroPosition && enemyCar2.X+100 > xHeroPosition && enemyCar2.X < xHeroPosition+100){
			crash = true
			lives--
			if(lives <1){
				alert("Вы попали в аварию!");
				location.reload();
			}		
		}else{
			crash = false
		}	
	
		if (!crash){
			context.drawImage(enemyCar2, enemyCar2.X, enemyCar2.Y)
			enemyCar2.Y +=5
			if (enemyCar2.Y > 700){
				enemyCar2.Y = -710
				enemyCar2.X = getRandomInt(350,700)
			}
		}
	}   



	function drawBonus(){ // Отрисовка бонуса(бензина)
		
			context.drawImage(bonus, bonus.X, bonus.Y)
			bonus.Y +=10
			if (bonus.Y > 700){
				bonus.Y = -700
				bonus.X = getRandomInt(50,700)
			}
		}

		function drawJava(){ // Отрисовка ямы
		
			context.drawImage(java, java.X, java.Y)
			java.Y +=10
			if (java.Y > 700){
				java.Y = -700
				java.X = getRandomInt(70,700)
			}
		}
	
	
function render(){ // Рендер

	drawLines()	
			drawEnemyCar1()
			drawEnemyCar2()
			drawBonus()
			drawJava()

		if (Pause != true) {
			myReq = requestAnimationFrame(render)
		}
     
		
	}	
	render()	



// Функции
// Выбор героя
function Select_hero_car(alt_hero,name) { // Выбор героя и запись имени
	Name_player = name;
	if (alt_hero == "White") {
		Hero.src = "assets/img/car_01.png"; // Герой 1

	}
	else{
     Hero.src = "assets/img/car_03.png"; // Герой 2
	}
}



function moveUp(e) { // реакция на отжатие кнопки
	var key = e.keyCode;
	console.log("отжата");
	switch(key){

		case 38://стрелка вверх
		up=false;
		break;

		case 40://стрелка вних
		down=false;
		break;

		case 37://стрелка влево
		left=false;
		break;

		case 39://стрелка вправо
		right=false;
		break;

		case 87:// кнопка "W"
		up=false;
		break;

		case 83:// кнопка "S"
		down=false;
		break;

		case 65:// кнопка "A"
		left=false;
		break;

		case 68:// кнопка "D"
		right=false;
		break;

		case 32:// кнопка "space/пробел"
		space=false;
		break;

		 case 27: // Escape пауза
            if(Pause == false){ // Вкл паузу
               	Pause = true;
               }
               else
               {
               	Pause = false;
              
               	render();
               	 	Game(); // Запуск игры
               }
               	break;


	}
	
}
function moveDown(e) {//реакция на нажатие кнопки
	// body...
	var key = e.keyCode;
	console.log("нажата");
		switch(key){

		case 38://стрелка вверх
		up=true;
		break;

		case 40://стрелка вних
		down=true;
		break;

		case 37://стрелка влево
		left=true;
		break;

		case 39://стрелка вправо
		right=true;
		break;

		case 87:// кнопка "W"
		up=true;
		break;

		case 83:// кнопка "S"
		down=true;
		break;

		case 65:// кнопка "A"
		left=true;
		break;

		case 68:// кнопка "D"
		right=true;
		break;

		case 32:// кнопка "space/пробел"
		space=true;
		break;
	}
	
}


//Таймер
function Time(){
milsec ++; // Добавлять мил.секунды
if (milsec == 60) { // Если мил.секунды равно 60
	milsec =0; // Сброс мил.секунды
	sec++; // Добавить секунды
	Score++;
	Fuel--;
}
if(sec == 60){ // Если сек равно 60
	sec =0; // Сброс секунды
	min++; // Добавить минуты
	

}
}

// Игра
function Game(){ // Обработка игры
	Time();
	document.addEventListener("keydown",moveDown); //определение нажатия клавиши и отправка в moweUP\
	document.addEventListener("keyup",moveUp);

	degChange();
	drawRotated(Hero,xHeroPosition,yHeroPosition,HeroWidth,HeroHeight,deg);


// Если игрок взял бонус
	if (xHeroPosition <= bonus.X+80 && xHeroPosition >= bonus.X || xHeroPosition+100 <= bonus.X+80 && xHeroPosition+100 >= bonus.X
		&& yHeroPosition <= bonus.Y && yHeroPosition >= bonus.Y-150) {
		Fuel += 5;
		bonus.Y = 710;
	}

	// Если игрок заехал в яму
	if (xHeroPosition <= java.X+100 && xHeroPosition >= java.X || xHeroPosition+100 <= java.X+100 && xHeroPosition+100 >= java.X
		&& yHeroPosition <= java.Y && yHeroPosition >= java.Y-150) {
		Fuel -= 5;
		java.Y = 710;
	}



   if(Fuel <= 0){
	alert("У вас закончился бензин:(");
	location.reload();
}


		//Движение транспорта
 		if (space==true &&  yHeroPosition > 0) {
                yHeroPosition-=Speed/2*Bonus_Speed;
 				}


		if(up==true && yHeroPosition>0){
			yHeroPosition-=Speed/2;
		}
		if (down==true && yHeroPosition+HeroHeight < canvasg.height){
			if (up==false){
				yHeroPosition+=Speed*2;
			}
		}
		if(right==true && xHeroPosition+HeroWidth<canvasg.width){
			xHeroPosition+=Speed;
		}
		if (left==true && xHeroPosition>0) {
			if(right==false){
				xHeroPosition-=Speed;
			}
		}
//Вывод текста на Canvas
context.fillStyle = "White"; // Цвет
context.font = "2em Arial"; // 1: размер шрифта, 2: шрифт
context.fillText('Имя:'+Name_player,0,30); // 1: Сам текст, 2: x координата, 3: y координата
context.fillText('Бензин:'+Fuel+"/л",0,60); // Бензин
context.fillText('Очки:'+Score,0,90); // Очки


// Вывод таймера на Canvas

// if(sec < 10){
// 	context.fillText("Время: 0" + min+":0"+sec, 0,70);
// }
// else
// {
// 	if (min < 10) {
// 	context.fillText("Время: 0" + min+":"+sec, 0,70);
// }
// else{
// 	context.fillText("Время: 0" + min+":"+sec, 0,70);
// }
// }



if (Pause == true || yHeroPosition>canvasg.height+100) { // Если статус пазуы вкл
	if(Pause == true){
		context.fillStyle = "White";
		context.fillText("Пауза",canvasg.width/2,canvasg.height/2); // Нарисовать паузу
	}
	else {
		location.reload(); // Обновить экран
	}
}
else {
	requestAnimationFrame(Game); // Обновление функции игры каждый фрэйм примерно 60 в секунду
}

}



