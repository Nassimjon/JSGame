const score = document.querySelector('.score'),
    //получаем из нашей вёрстки элемент с классом 'score' и сохранеям в переменную score
    start = document.querySelector('.start'),
    //получаем из нашей вёрстки элемент с классом 'start' и сохранеям в переменную start
    gameArea = document.querySelector('.gameArea'),
    //получаем из нашей вёрстки элемент с классом 'gameArea' и сохранеям в переменную gameArea

    car = document.createElement('div');
// создаём новый элемент div, у которого пока нет ни класса не id, 
// и сохранеяем его в переменную car

car.classList.add('car');
//добавляем в созданный наш div, класс  car.

start.addEventListener('click', startGame);
//добавляем в нашу переменную (элемент из нашей вёрстки) событие click, и
// пишем название функции которая должна выполняться если наше событие произойдёт, т.е. если мы кликнем на наш элемент.

document.addEventListener('keydown', startRun);
//добавляем в наш document (в нашу вёрстку)  событие keydown, и пишем 
//название функции которая должна выполняться если наше событие произойдёт, т.е если мы нажмём на клавишу


document.addEventListener('keyup', stopRun);
//добавляем в наш document (в нашу вёрстку)  событие keyup, и пишем 
//название функции которая должна выполняться если наше событие произойдёт, 
//т.е если мы отпустим клавишу которую нажимали ранее

const keys = {
    ArrowUp: false,
    ArrowDown: false, //создаём объект keys с свойствами ArrowUp, ...
    ArrowLeft: false,
    ArrowRight: false
}

const setting = {
    start: false,
    score: 0,  //создаём объект setting с свойствами 'start', 'score', и 'speed' 
    speed: 7,
    traffic: 2
}

function getQuantityElementElements(heightElement) {
    //создали функции чтоб опрпеделить сколько полос помешаеется в нашу дорогу
    return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
    //эта функция (startGame) запускает нашу игру. А именно скрывает нашу кнопку старта, добавляет машину
    //добавляет полосу 
    start.classList.add('hide'); //добавляем в наш элемент 'start', новый класс hide.
    gameArea.innerHTML = '';
    
    for (let i = 0; i < getQuantityElementElements(100); i++) { //создаём цикл для создания полосы по мередине дороги

        const line = document.createElement('div'); //создаём новый элемент div и присваиааем его в переменную line
        line.classList.add('line'); //добавляем класс нашей переменной line (<div class = "line"> </div>)
        line.style.top = (i * 100) + 'px'; //добавляем стиль нашему div-у с классом 'line', а именно отступ сверху 

        line.y = i * 100
        //добавляем нашему элементу div c классом 'line'
        //(элемент который мы берём из document(из нашей вёрски) также являетс объектом), новоё свойство y

        gameArea.appendChild(line); //добавляем div-у c классом 'gameArea', дочерний элемент (div)
    }

    for (let i = 0; i < getQuantityElementElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px'
        enemy.style.background = 'transparent url(./image/enemy2.png) center / cover no-repeat';
        gameArea.appendChild(enemy);
    }

    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    
    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2;
    car.style.top = 'auto'
    car.style.bottom = '10px'
    //добавляем в наш элемент 'gameArea' новый ребёнок (элемент div которого мы сохранили в переменную car)

    setting.x = car.offsetLeft;
    //добавляем в наш объект setting, новоё свойство 'x'
    //Свойство offsetLeft содержит левое 
    //смещение элемента относительно offsetParent. Содержит расстояние от offsetParent до границы элемента.

    setting.y = car.offsetTop;
    //добавляем в наш объект setting, новоё свойство 'y'
    //HTMLElement.offsetTop - свойство элемента 
    //доступно только для чтения, возвращает расстояние текущего элемента по отношению к верхней части



    requestAnimationFrame(playGame);     //метод requestAnimationFram предназначена для анимаций
}

function playGame() {

    if (setting.start) {
        setting.score += setting.speed;//
        score.innerHTML = 'SCORE<br> ' + setting.score;//выводим очки на нашу вёрстку
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            //проверяем нажата ли клавиша влево и чтоб машина не вышло за левую границу дороги
            setting.x -= setting.speed; //если да то увеличиваем позицию машины влево на
        }

        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            //проверяем нажата ли клавиша вправо и чтоб машина не вышло за правую границу дороги
            setting.x += setting.speed;
        }

        if (keys.ArrowUp && setting.y > 0) { //проверяем нажата ли клавиша вверх и что машина не вышло за верхнюю границу
            setting.y -= setting.speed;
        }

        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            //проверяем нажата ли клавиша вниз и чтоб машина не вышло за нижнюю границу
            setting.y += setting.speed;
        }

        car.style.left = setting.x + 'px'; //чтобы свойство выше заработали нужно, стиль left передать на страницу
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame)
    }
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

function moveRoad() {
    //эта функция создаёт иллюзию движения нашей дороги
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += setting.speed;

        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function (item) {
        let carRect = car.getBoundingClientRect(); 
        //метод который возвращает координаты элемента, высоту ширину топ ботом (в данном случае нашей машинки)
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
                setting.start = false
                console.warn('ДТП');
                start.classList.remove('hide');
                start.style.top = score.offsetHeight;
                
        }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        if(item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * gameArea.offsetWidth - 50 ) + 'px';
        }
    });
}