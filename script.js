const welcome_screen=document.querySelector('.welcome-screen');
const game_screen=document.querySelector('.game-screen');
const score_screen=document.querySelector('.score-screen');
const game_area=document.querySelector('.game-area');
welcome_screen.classList.add('centered');
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);
welcome_screen.addEventListener("click",gameStarto);
const buttons = document.querySelectorAll('.button');
let line_num = 4;
let player = { 
    score:0,
    car:1,
    start:false,
    speed:5
}
let game_level = {
    speed:7,
    enemyCarCount:3
}
let keys = {
    z:false,
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,
    Enter:false
};
buttons[0].addEventListener("click",()=>{
    if(player.x>0)
        player.x -= player.speed;
});
buttons[1].addEventListener("click",()=>{
    if(player.x<170)
        player.x += player.speed;
});
// function moveRoadLines(){
//     let lines = document.querySelectorAll('.lines');
//     lines.forEach((line)=>{
//         if(line.y>500){
//             line.y -= 600;
//         }
//         line.y += player.speed;
//         line.style.top = line.y+"px";
//     })

// }

function playGame(){
    // console.log('playing');
    let car = document.querySelector('.car');
    let road = game_area.getBoundingClientRect();
    let car_attrib = car.getBoundingClientRect();
    let lines = document.querySelectorAll('.lines');
    let enemy = document.querySelectorAll('.enemy-car');
    for(let i=0;i<line_num;i++){//loop for moving lines
        if(lines[i].y>500) lines[i].y -=600;
        lines[i].y += game_level.speed;
        lines[i].style.top = lines[i].y+"px";
    }
    for(let i=0;i<game_level.enemyCarCount;i++){//loop for enemy cars
        if(enemy[i].y>500) {
            enemy[i].x = Math.round(Math.random() * (170 - 0) ) + 0;
            enemy[i].y = -300;
            score_screen.innerText = `SCORE: ${player.score++}`;
        }
        enemy[i].y += game_level.speed-2;
        enemy[i].style.left = enemy[i].x+"px";
        enemy[i].style.top = enemy[i].y+"px";
        let enemy_attrib = enemy[i].getBoundingClientRect();
        if(!((car_attrib.bottom < enemy_attrib.top)||
            (car_attrib.top > enemy_attrib.bottom-4)||
            (car_attrib.right < enemy_attrib.left)||
            (car_attrib.left > enemy_attrib.right))){
            gameOver();
        }
    }
    //key controls and prevent out of bound
    if(player.start){
        if(keys.ArrowRight&&player.x<road.width-car_attrib.width){ 
            player.x += player.speed;
        }
        if(keys.ArrowLeft&&player.x>0) {
            player.x -= player.speed;
        }
        if(keys.ArrowUp&&player.y>road.top-300) {
            player.y -= player.speed;
        }
        if(keys.ArrowDown&&player.y<road.bottom) {
            player.y += player.speed;
        }
        if(keys.z){
            game_level.speed +=1;
            car.classList.add("car-turbo");
        } else {
            car.classList.remove("car-turbo");
        }
        
        car.style.left = player.x+"px";
        car.style.top = player.y+"px";
        window.requestAnimationFrame(playGame);
    }
    
}

function gameOver(){
    player.start=false;
    score_screen.innerText = `GAME OVER\nSCORE: ${player.score}`;
    welcome_screen.setAttribute("class","hide centered");
}

function gameStarto(){ //this is the function where prepare objects in the game
    game_screen.classList.remove('hide');
    welcome_screen.setAttribute("class","hide");
    game_area.innerHTML = "";
    player.start = true;
    player.score=0;
    score_screen.innerText = `SCORE: ${player.score}`;
    let title = document.querySelector('title');
    title.innerText = "Playing Game"
    for(let i=0;i<line_num;i++){//creating div for road lines
        let lines = document.createElement('div')
        lines.setAttribute("class","lines")
        lines.y = i*150;
        lines.style.top = i*150+"px";
        game_area.appendChild(lines);
    }
    let car = document.createElement('div');
    car.setAttribute("class","car");
    game_area.appendChild(car);
    car.style.left="82px";
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for(let i=0;i<game_level.enemyCarCount;i++){//creating div for enemy car
        let enemy = document.createElement('div');
        enemy.setAttribute("class","enemy-car");
        enemy.x = Math.round(Math.random() * (170 - 0) ) + 0;
        enemy.y = Math.round(Math.random() * (-200 - -350) ) + -350;
        enemy.y = ((i+1)*300)*-1;
        enemy.style.top = enemy.y+"px";
        game_area.appendChild(enemy);
    }
    player.score++;
    window.requestAnimationFrame(playGame)
}

function pressOn(e){
    keys[e.key] = true;
    if(e.key != 'F5')
        e.preventDefault();
    if(e.key == 'Enter'&&!player.start)
        gameStarto();
    console.log(e.key);
}
function pressOff(e){
    game_level.speed=7;
    let car = document.querySelector('.car');
    car.classList.remove('car-turbo');
    keys[e.key]=false;
    e.preventDefault();
    // console.log(`${keys[e.key]} ${e.key}`);
}

class clickAndHold {
    constructor(target, callback){
        this.target = target;
        this.callback = callback;
        this.isHold = false;
        this.activeHoldTimeoutId = null;
        ['touchstart','mousedown'].forEach(type =>{
            this.target.addEventListener(type, this._onholdBegin.bind(this));
        });
        ['mouseup','mouseleave','mouseout','touchend','touchcancel'].forEach(type =>{
            this.target.addEventListener(type, this._onholdStop.bind(this));
        });
    }
    _onholdBegin(){
        this.isHold = true;
        this.activeHoldTimeoutId = setTimeout(() => {
            if(this.isHold){
                this.callback();
            }
        }, 1000);
    }
    _onholdStop(){
        clearTimeout(this.activeHoldTimeoutId);
        this.isHold = false;
    }
    static apply(target, callback){
        new clickAndHold(target,callback);
    }
}