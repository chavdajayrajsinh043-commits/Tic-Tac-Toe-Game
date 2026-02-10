"use strict";

let boxes = document.querySelectorAll(".box");

let t = turn();
let turns = document.querySelector(".turn");
showTurn();

let count = 0;
let countX = 0;
let countO = 0;
let gameOver = false;
let msg = document.querySelector(".msg");
let xScore = document.querySelector(".x_score");
let oScore = document.querySelector(".o_score");
let restart = document.querySelector(".rest_game_btn");

let win_msg = document.querySelector(".win_msg");
let pa_btn = document.querySelector(".pa_btn");

showWins();

let wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function turn(){
    return Math.floor(Math.random()*2);
}
function disableButtons(ind){
    for(let box of boxes) {
        box.disabled = ind;;
    }
}
function showWins() {
    xScore.innerText = countX;
    oScore.innerText = countO
}
function showTurn() {
    turns.innerText = (t)?"X":"O";
}
function winMsg(w){

    if(w==='X'||w==='O'){
     win_msg.innerHTML = `<span>${w}</span> Wins`;
    }else{
        win_msg.innerText = "Match Draw";
    }

    
    win_msg.hidden = false;
    document.querySelector(".game_space").classList.add("game");
    document.querySelector(".pa_btn").hidden = false;

    document.querySelector(".pa_btn").addEventListener("click",()=>{
     refresh();
        win_msg.hidden = true;
     document.querySelector(".game_space").classList.remove("game");
     document.querySelector(".pa_btn").hidden = true;

    boxes.forEach(box => {
        if(box.classList.contains('w'))  box.classList.remove('w') ;
        
     });

});
}
function checkWins() {
    for(let win of wins) {
        let pos1 = boxes[win[0]].innerText;
        let pos2 = boxes[win[1]].innerText;
        let pos3 = boxes[win[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1==pos2 && pos2==pos3){
                if (pos1==="X"){

                    countX++;
                    // msg.innerText = "X Wins";
                }else{
                    countO++;
                    // msg.innerText="O Wins";;
                }

                boxes[win[0]].classList.add('w');
                boxes[win[1]].classList.add('w');
                boxes[win[2]].classList.add('w');

                // document.querySelector('pa_btn').addEventListener("click",()=>{
                //       boxes[win[0]].classList.add('w');
                //       boxes[win[1]].classList.add('w');
                //     boxes[win[2]].classList.add('w');
                // });
                
                disableButtons(true);
                gameOver = true;
                showWins();
                setTimeout(()=>winMsg(pos1),700);
                //refresh();
            }
        }
    }
}
function refresh() {
    for(let box of boxes){
        box.innerText = "";
    }
    count=0;
    disableButtons(false);
    gameOver = false;
    showTurn();
    showWins();
}
restart.addEventListener("click",()=>{
    t = turn();
    refresh();
});

boxes.forEach(box=>{
    box.onclick=()=>{
        if(t){
            box.innerText="X";
            t=false;
            box.disabled = true;
        }else{
            box.innerText="O";
            t=true;
            box.disabled=true;
        }
        showTurn();
        count++;
        checkWins();

        if(!gameOver && count===9){
            // msg.innerText = "Match Draw";
            disableButtons(true);
            winMsg("Draw");
            //refresh();
        }
    }
});
let new1 = document.querySelector(".new_game_btn");

new1.addEventListener("click",()=>{
    t = turn();
    countX = 0;
    countO = 0;
    refresh();
});





