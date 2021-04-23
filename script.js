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
let keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,
    Enter:false
};

function moveRoadLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach((line)=>{
        // console.log(line.y);
        if(line.y>500){
            line.y -= 600;
        }
        line.y += player.speed;
        line.style.top = line.y+"px";
    })

}

function playGame(){
    // console.log('playing');
    let car = document.querySelector('.car');
    let road = game_area.getBoundingClientRect();
    let car_attrib = car.getBoundingClientRect();
    let lines = document.querySelectorAll('.lines');
    if(player.start){
        moveRoadLines();
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

function gameStarto(){
    player.start = true;
    game_screen.classList.remove('hide');
    welcome_screen.classList.add('hide');
    for(let i=0;i<line_num;i++){
        let lines = document.createElement('div')
        lines.classList.add('lines');
        lines.y = i*150;
        lines.style.top = i*150+"px";
        game_area.appendChild(lines);
    }
    let car = document.createElement('div');
    car.setAttribute("class","car");
    game_area.appendChild(car);
    window.requestAnimationFrame(playGame)
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
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