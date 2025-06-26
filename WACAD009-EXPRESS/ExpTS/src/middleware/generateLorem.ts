import { LoremIpsum } from 'lorem-ipsum';


const Loremtext = (num: number) => {
   
    const pageText = generateLoremText(num);
    return pageText;
}


const generateLoremText = (num: number): string => {
    // Configuração para gerar o texto Lorem Ipsum
    let text = "";
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });

    for (let i = 0; i < num; i++) {
        text += lorem.generateParagraphs(1) + "<br><br>"; // Chama o método corretamente
    }

    return text;
};


export default Loremtext;