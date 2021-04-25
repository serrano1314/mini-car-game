const welcome_screen=document.querySelector('.welcome-screen');
const game_screen=document.querySelector('.game-screen');
const score_screen=document.querySelector('.score-screen');
const game_area=document.querySelector('.game-area');

document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);
welcome_screen.addEventListener("click",gameStarto);
let line_num = 5;
let player = { 
    car:1,
    start:false,
    speed:5
}
let game_level = {
    roadSpeed:3
}
let keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,
    Enter:false
};

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
    let enemy = document.querySelector('.enemy-car');
    if(player.start){
        for(let i=0;i<line_num;i++){//loop for moving lines
            if(lines[i].y>500) lines[i].y -=600;
            lines[i].y += game_level.roadSpeed;
            lines[i].style.top = lines[i].y+"px";
        }
        if(enemy.y>500) {
            enemy.y= -200;
            enemy.x = Math.round(Math.random() * (70 - -100 + 1) ) + -100;
            
        }
        enemy.style.left = enemy.x+"px";
        enemy.y += game_level.roadSpeed-1;
        enemy.style.top = enemy.y+"px";
        if(enemy.y==car.y||enemy.x==car.x){
            console.log('colision');
        }
        //key controls and prevent out of bound
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
        car.style.left = player.x+"px";
        car.style.top = player.y+"px";
        window.requestAnimationFrame(playGame);
    }
}
   
function gameStarto(){ //this is the function where prepare objects in the game
    player.start = true;
    game_screen.classList.remove('hide');
    welcome_screen.classList.add('hide');
    let title = document.querySelector('title');
    title.innerText = "Playing Game"
    for(let i=0;i<line_num;i++){//creating div for road lines
        let lines = document.createElement('div')
        lines.setAttribute("class","lines")
        lines.y = i*150;
        lines.style.top = i*150+"px";
        game_area.appendChild(lines);
    }
    let enemy = document.createElement('div');
    enemy.setAttribute("class","enemy-car");
    
    enemy.style.margin="100px";
    let car = document.createElement('div');
    car.setAttribute("class","car");
    game_area.appendChild(enemy);
    game_area.appendChild(car);
    window.requestAnimationFrame(playGame)
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    enemy.x = car.offsetLeft;
    enemy.y = -200;
}

function pressOn(e){
    keys[e.key] = true;
    if(e.key != 'F5')
        e.preventDefault();
}
function pressOff(e){
    keys[e.key]=false;
    e.preventDefault();
    // console.log(`${keys[e.key]} ${e.key}`);
}