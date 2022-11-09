let ticking = new Audio('start_ticking_zen.mp3');
let alarm = new Audio('alarm_zen.mp3');

let book = document.getElementById('Book');
let creepy = document.getElementById('Creepy');

let start = document.getElementById('start');
let reset = document.getElementById('reset');

let h = document.getElementById('hour');
let m = document.getElementById('minute');
let s = document.getElementById('sec');

let secMinus = document.getElementById('secMinus');
let secPlus = document.getElementById('secPlus');
let minuteMinus = document.getElementById('minuteMinus');
let minutePlus = document.getElementById('minutePlus');
let hourMinus = document.getElementById('hourMinus');
let hourPlus = document.getElementById('hourPlus');


//store a value for startEventListener
let startTimer = -1;


function timer(){
if(h.value == 0 && m.value == 0 && s.value == 0){
    ticking.pause();
    book.style.zIndex = -2;
    creepy.style.zIndex = -1;
    alarm.play();
    h.value = 0;
    s.value = 0; 
    m.value = 0;
} else if(s.value != 0){
    s.value--;
}   else if(m.value != 0 && s.value == 0){
    s.value = 59;
    m.value--;
}   else if(h.value != 0 && m.value == 0 && s.value == 0 ){
    s.value = 59;
    m.value = 59;
    h.value--;
}
}



start.addEventListener('click', () => {
    if (startTimer == -1 && ( h.value != 0 || m.value != 0 || s.value != 0 )){


        //Begin Sounds

        if (typeof ticking.loop == 'boolean') {
            ticking.loop = true;
        }
        else {
            ticking.addEventListener('ended', () => {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        ticking.play();
    


        start.innerHTML = "Stop";
        
        startTimer = setInterval(() => {
            timer();
        }, 1000);

    } else {
        start.innerHTML = "Start";
        clearInterval(startTimer);
        ticking.pause();
        alarm.pause();
        startTimer = -1;
    }
    });


reset.addEventListener('click', () => {
    h.value = 0;
    m.value = 0;
    s.value = 0;
    clearInterval(startTimer);
    start.innerHTML = "Start";
    start.style.backgroundColor = "dimgray";
    start.style.color = "gray";
    book.style.zIndex = -1;
    creepy.style.zIndex = -2;
    ticking.pause();
    alarm.pause();
    stopTimer()
})




// Minus-Buttons set 'start' to disabled when value = 0;

hourMinus.addEventListener('click', startGray);
minuteMinus.addEventListener('click', startGray);
secMinus.addEventListener('click', startGray);

function startGray () {
    if ( h.value == 0 && m.value == 0 && s.value == 0 ){
    start.style.backgroundColor = "dimgray";
    start.style.color = "gray";
    } 
}


//Plus-Butons set 'start' to enabled when clicked

hourPlus.addEventListener('click', changeColor);
minutePlus.addEventListener('click', changeColor);
secPlus.addEventListener('click', changeColor);


function changeColor() {
    if ( h.value == 0 || m.value == 0 || s.value == 0 ){
        start.style.backgroundColor = "black";
        start.style.color = "white";
    return false;
    } 
}


// sec+ Events

secPlus.addEventListener('click', incrementSec);

function incrementSec(){
    sec.stepUp(5);
    if (s.value == 60){
        minute.stepUp(1);
        sec.stepDown(60);
    }
    return false;
}

// sec- Events

secMinus.addEventListener('click', decrementSec);

function decrementSec(){
    if (m.value != 0 && s.value == 0){
        minute.stepDown(1);
        sec.stepUp(59);
    }
    else if (s.value == 59){
        sec.stepDown(4);
    }
    else {
        sec.stepDown(5);
    }
}

// minute+ Events

minutePlus.addEventListener('click', incrementMin);

function incrementMin(){
    minute.stepUp(1);
    if (m.value == 60){
        hour.stepUp(1);
        minute.stepDown(60);
    }
    return false;
}

// minute- Events

minuteMinus.addEventListener('click', decrementMin);

function decrementMin(){
    minute.stepDown(1);
    if (h.value != 0 && m.value == 0){
        hour.stepDown(1);
        minute.stepUp(59);
    }
    return false;
}

// hour+ Events

hourPlus.addEventListener('click', incrementHour);

function incrementHour(){
    hour.stepUp(1);
}

// hour- Events

hourMinus.addEventListener('click', decrementHour);

function decrementHour(){
    hour.stepDown(1);
}

const slide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navbar');
    const navlinks = document.querySelectorAll('.links li');
    burger.addEventListener('click', () => {
        nav.classList.toggle('navbaract');

        navlinks.forEach((link, index) => {

            if (link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `navlinkfade 2s ease backwards ${index / 500}s`;
            }
        });
    });
}
slide();
