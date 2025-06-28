import { Prof , Tecnologias} from './helpersTypes';

export function listProfs(profs: Prof[]){
    console.log(profs);
    const list = profs.map((p) => `<li>${p.nome}-${p.sala}</li>`);
    return `<ul>${list.join('')}</ul>`;
}

export function listTechnologies(techs: Tecnologias[]): string {
    console.log(techs);
    if (!techs || techs.length === 0) {
        return "<p>No technologies available</p>";  // Caso não haja tecnologias
    }

    const lista = techs.map((p) => `<li>${p.name} - ${p.type}</li>`);
    if (lista.length === 0 ){
        console.log("nada na lista");
    }
    return `<ul>${lista.join('')}</ul>`;
}