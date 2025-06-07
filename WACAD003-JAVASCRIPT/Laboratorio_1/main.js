const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "Mano, era umas 10 da manhã, tava quente pra burro lá fora, aí, do nada, eu vi o :insertx: de casaco andando na rua, tu acredita?. Esse :inserty: só podia tá com febre. só sei que eu entrei e fui tomar :insertz:. Mano, aí eu fiquei pensando o :insertx: deve ter vindo do inferno pra tá com aquela roupa nesse calor.";
const insertX = ["Genisvaldo", "Poloncio", "Cornivaldo"];
const insertY = ["mocorongo", "pintacui", "pia"];
const insertZ = ["chá", "café", "suco"];

randomize.addEventListener('click', result);


function result() {

    let newStory = storyText;

    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory.replace(':insertx:', xItem);
    newStory = newStory.replace(':insertx:', xItem); // caso :insertx: apareça duas ezes
    newStory = newStory.replace(':inserty:', yItem);
    newStory = newStory.replace(':insertz:', zItem);


    if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replace('Bob', name);
    }

    if(document.getElementById("uk").checked) {
        const vocativo = "mona";

        const temperature =  Math.round((94-32) * 5/9);
        newStory = newStory.replace('mano', vocativo);
        newStory = newStory.replace('quente pra burro', "demasiadamente quente");

    }

    story.textContent = newStory  ;
    story.style.visibility = 'visible';
}

