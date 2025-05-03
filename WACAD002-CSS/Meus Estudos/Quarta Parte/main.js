let btns = document.querySelectorAll(".demonstracao .primeiro_ex");
let flex_ex = document.getElementsByClassName("aplicacao")[0];

/*for...in não é o ideal para NodeLists ou arrays, porque ele itera índices como strings, não os elementos em si. Então, dentro do loop, btn é o índice ("0", "1", etc.), e btn.onclick não existe, por isso nada acontece.*/
for(let btn of btns){  
    
    btn.onclick = function(e){
        flex_ex.style.flexDirection = e.target.innerText;
    }
}