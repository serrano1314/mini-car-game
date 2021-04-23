const welcome_screen=document.querySelector('.welcome-screen');
const game_screen=document.querySelector('.game-screen');
const score_screen=document.querySelector('.score-screen');
const game_area=document.querySelector('.game-area');

document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);
welcome_screen.addEventListener("click",gameStarto);

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

function playGame(){
    let car = document.querySelector('.car');
    let lines = document.querySelector('.lines');
    let road = game_area.getBoundingClientRect();
    let car_attrib = car.getBoundingClientRect();
    
    // lines.style.left = road.width/2-10+"px";
    if(player.start){
        window.requestAnimationFrame(playGame);
        if(keys.ArrowRight&&player.x<road.width-car_attrib.width){ 
            player.x += player.speed;
        }
        if(keys.ArrowLeft&&player.x>0) {
            player.x -= player.speed;
        }
        if(keys.ArrowUp&&player.y>road.top) {
            player.y -= player.speed;
        }
        if(keys.ArrowDown&&player.y<road.bottom+car_attrib.height) {
            player.y += player.speed;
        }
        car.style.left = player.x+"px";
        car.style.top = player.y+"px";
        
    }
}

function gameStarto(){
    player.start = true;
    game_screen.classList.remove('hide');
    welcome_screen.classList.add('hide');
    for(let i=0;i<5;i++){
        let lines = document.createElement('div')
        lines.classList.add('lines');
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