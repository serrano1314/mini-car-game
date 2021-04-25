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
    roadSpeed:3,
    enemyCarCount:2
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
 
function isCollide(){

}

function playGame(){
    // console.log('playing');
    let car = document.querySelector('.car');
    let road = game_area.getBoundingClientRect();
    let car_attrib = car.getBoundingClientRect();
    let lines = document.querySelectorAll('.lines');
    let enemy = document.querySelectorAll('.enemy-car');
    if(player.start){
        for(let i=0;i<line_num;i++){//loop for moving lines
            if(lines[i].y>500) lines[i].y -=600;
            lines[i].y += game_level.roadSpeed;
            lines[i].style.top = lines[i].y+"px";
        }
        for(let i=0;i<game_level.enemyCarCount;i++){//loop for enemy cars
            if(enemy[i].y>500) {
                enemy[i].x = Math.round(Math.random() * (170 - 0) ) + 0;
                // enemy[i].y = Math.round(Math.random() * (-200 - -350) ) + -350;
                enemy[i].y = -300;
            }
            enemy[i].y += game_level.roadSpeed-1;
            enemy[i].style.left = enemy[i].x+"px";
            enemy[i].style.top = enemy[i].y+"px";
            let enemy_attrib = enemy[i].getBoundingClientRect();
            if(!((car_attrib.bottom < enemy_attrib.top)||
                (car_attrib.top > enemy_attrib.bottom)||
                (car_attrib.right < enemy_attrib.left)||
                (car_attrib.left > enemy_attrib.right))){
                    alert("GAME OVER");
                    player.start=false;
                }
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
            player.y += player.speed-2;
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
    let car = document.createElement('div');
    car.setAttribute("class","car");
    
    game_area.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for(let i=0;i<game_level.enemyCarCount;i++){//creating div for enemy car
        let arrCarX = [];
        let arrCarY = [];
        let enemy = document.createElement('div');
        enemy.setAttribute("class","enemy-car");
        enemy.x = Math.round(Math.random() * (170 - 0) ) + 0;
        enemy.y = Math.round(Math.random() * (-200 - -350) ) + -350;
        arrCarX.push(enemy.x);
        if(arrCarX.includes(enemy.x))
            enemy.x = Math.round(Math.random() * (170 - 0) ) + 0;
        // if(arrCarY.includes(enemy.y))
        //     enemy.y = Math.round(Math.random() * (-200 - -400) ) + -400;
        enemy.y = ((i+1)*300)*-1;
        enemy.style.top = enemy.y+"px";
        game_area.appendChild(enemy);
    }
    
    window.requestAnimationFrame(playGame)
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