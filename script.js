const welcome_screen=document.querySelector('.welcome-screen');
const game_screen=document.querySelector('.game-screen');
const score_screen=document.querySelector('.score-screen');
const game_area=document.querySelector('.game-area');
let car1=document.getElementById('svg-car1');
welcome_screen.classList.add('centered');
welcome_screen.style['background-color']="cadetblue";
welcome_screen.style.color="white";
let svgcar = document.querySelectorAll('.carsvg');
svgcar[0].classList.add('hide');

let carColor = document.getElementById('car2-color');
carColor.style.fill="pink";

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
let touch = {
    z:false,
    up:false,
    down:false,
    left:false,
    right:false
};
buttons[0].addEventListener("touchstart",()=>{
    touch.up = true
});
buttons[0].addEventListener("touchend",()=>{
    touch.up = false
});

buttons[1].addEventListener("touchstart",()=>{
    touch.left = true
});
buttons[1].addEventListener("touchend",()=>{
    touch.left = false
});

buttons[2].addEventListener("touchstart",()=>{
    touch.right = true
});
buttons[2].addEventListener("touchend",()=>{
    touch.right = false
});

buttons[3].addEventListener("touchstart",()=>{
    touch.down = true
});
buttons[3].addEventListener("touchend",()=>{
    touch.down = false
});

buttons[4].addEventListener("touchstart",()=>{
    touch.z = true
});
buttons[4].addEventListener("touchend",()=>{
    game_level.speed=7;
    touch.z = false
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
    let fire = document.querySelector('.turbo-fire');
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
        player.x = player.x<0?0:player.x;
        if((keys.ArrowRight||touch.right)&&player.x<road.width-car_attrib.width){ 
            player.x += player.speed;
            car.classList.add('right-turn');
        } else {
            car.classList.remove('right-turn');
        }
        if((keys.ArrowLeft||touch.left)&&player.x>0) {
            player.x -= player.speed;
            car.classList.add('left-turn');
        } else {
            car.classList.remove('left-turn');
        }
        if((keys.ArrowUp||touch.up)&&player.y>road.top-300) {
            player.y -= player.speed;
        }
        if((keys.ArrowDown||touch.down)&&player.y<road.height-car_attrib.height) {
            player.y += player.speed;
        }
        if(keys.z||touch.z){
            game_level.speed +=1;
            fire.classList.remove('hide');
        } else {
            fire.classList.add('hide');
        }
        car.style.left = player.x+"px";
        car.style.top = player.y+"px";
        window.requestAnimationFrame(playGame);
    }
    
}

function gameOver(){
    player.start=false;
    score_screen.innerText = `GAME OVER\nSCORE: ${player.score}`;
    welcome_screen.innerText ='TAP/CLICK HERE TO RESTART GAME';
    welcome_screen.setAttribute("class","hide centered");
}

function gameStarto(){ //this is the function where prepare objects in the game
    game_screen.classList.remove('hide');
    welcome_screen.setAttribute("class","hide");
    game_area.innerHTML = "";
    player.start = true;
    player.score=0;
    touch.left = false;
    touch.right = false;
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
    let fire = document.createElement('img');
    fire.setAttribute('src','img/turbo-fire.png');
    fire.classList.add('turbo-fire');
    fire.classList.add('hide');
    // svgcar[0].classList.remove('hide');
    svgcar[0].classList.remove('hide');
    
    car.appendChild(svgcar[0]);
    car.setAttribute("class","car");
    car.appendChild(fire);
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
}
function pressOff(e){
    game_level.speed=7;
    let car = document.querySelector('.car');
    car.classList.remove('car-turbo');
    keys[e.key]=false;
    e.preventDefault();
    // console.log(`${keys[e.key]} ${e.key}`);
}

function touchOn(e){
    touch[e] = true;
}
function touchOff(e){
    game_level.speed=7;
}
