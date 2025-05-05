let btns = document.querySelectorAll(".demonstracao .primeiro_ex");
let flex_ex = document.getElementsByClassName("aplicacao")[0];

/*for...in não é o ideal para NodeLists ou arrays, porque ele itera índices como strings, não os elementos em si. Então, dentro do loop, btn é o índice ("0", "1", etc.), e btn.onclick não existe, por isso nada acontece.*/
for(let btn of btns){  
    
    btn.onclick = function(e){
        flex_ex.style.flexDirection = e.target.innerText;
    }
}


btns = document.querySelectorAll(".demonstracao .segundo_ex");
let wrap_ex = document.getElementsByClassName("aplicacao2")[0];

for (let btn of btns){

    btn.onclick = function(e){
        wrap_ex.style.flexWrap = e.target.innerText;
      
    }
}

btns = document.querySelectorAll(".demonstracao .terceiro_ex");
let justify_ex = document.getElementsByClassName("aplicacao3")[0];

for (let btn of btns){

    btn.onclick = function(e){
        justify_ex.style.justifyContent = e.target.innerText;
      
    }
}

btns = document.querySelectorAll(".demonstracao .quarto_ex");
let align_ex = document.getElementsByClassName("aplicacao4")[0];

for (let btn of btns){

    btn.onclick = function(e){
        align_ex.style.alignItems = e.target.innerText;
      
    }
}

function setAlign(value) {
    const demo = document.getElementById('alignment-demo');
    demo.style.justifyItems = value;
    demo.style.alignItems = value;
  }