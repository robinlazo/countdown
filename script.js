let days = document.querySelector(".days");
let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let card = document.querySelector(".card");
let back = document.querySelector(".card-face-front");
let front = document.querySelector(".card-face-back");

let schedule = ["second",  "minute", "hour", "day"];

let time = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
}

let typeSelector = {
    "second" : seconds,
    "minute" : minutes,
    "hour" : hours,
    "day": days
}

function initTime() {
    let date = new Date();

    time.day = date.getDay();
    time.hour = date.getHours();
    time.minute = date.getMinutes();
    time.second = date.getSeconds();
  
    for(let period of schedule) {
        typeSelector[period].dataset.back = time[period];
        let date = document.querySelector(`.card-face-front-${period}`);
        date.textContent = time[period];
    }

}

initTime();
 


function flipCard(type) {
  
    let request = document.querySelector(`.card-face-back-${type}`);

    request.textContent = time[type];

    let cardFlipped = document.querySelector(`.card-${type}`);
   
    cardFlipped.classList.add("flipped");

    
    cardFlipped.addEventListener("transitionend", () => {

        typeSelector[type].dataset.back = time[type];
       
        request = document.querySelector(`.card-face-front-${type}`);
        request.textContent = time[type];

        node = cardFlipped.cloneNode(true);
        node.classList.remove("flipped");
      
        typeSelector[type].replaceChild(node, cardFlipped);
   
    })
    
}

 

function changeTime() { 

    let changeMinute = false;
    let changeHour = false;
    let changeDay = false;
  

    if(time.second >= 59) changeMinute = true;

    if(time.minute >= 59 && changeMinute) changeHour = true;

    if(time.hour >= 23 && changeHour) changeDay = true;

    if(changeMinute) {
        time.minute >= 59 ? time.minute = 0 : time.minute++;
        minutes.dataset.front = time.minute;
        flipCard("minute");
    }

    if(changeHour) {
        time.minute >= 23 ? time.hour = 0 : time.hour++;
        hours.dataset.front = time.hour;
        flipCard("hour");
    }

    if(changeDay) {
        time.day >= 6 ? time.day = 0 : time.day++;
        days.dataset.front = time.day;
        flipCard("day");
    }

    time.second >= 59 ? time.second = 0 : time.second++;
    seconds.dataset.front = time.second;
    flipCard("second");

}

setInterval(changeTime, 1000);
