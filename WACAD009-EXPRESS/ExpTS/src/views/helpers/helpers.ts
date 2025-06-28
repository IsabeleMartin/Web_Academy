import { Prof , Tecnologias} from './helpersTypes';

export function listProfs(profs: Prof[]){
    const list = profs.map((p) => `<li>${p.nome}-${p.sala}</li>`);
    return `<ul>${list.join('')}</ul>`;
}

export function listTechnologies(techs: Tecnologias[]): string {
    if (!techs || techs.length === 0) {
        return "<p>No technologies available</p>";  // Caso não haja tecnologias
    }

    const lista = techs.map((p) => `<li>${p.name} - ${p.type}</li>`);
    return `<ul>${lista.join('')}</ul>`;
}