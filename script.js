const atividade = {
    nome: "Café da manhã",
    data: new Date("2024-07-03 08:00"),
    finalizada: true
}

const atividades = [
    atividade, 
    {
        nome: 'Academia em grupo',
        data: new Date("2024-07-08 12:00"),
        finalizada: true
    },
    {
        nome: 'Almoço',
        data: new Date("2024-07-08 13:00"),
        finalizada: true
    }
]

const criarItemAtividade = (atividade) => {

    let input = '<input type="checkbox"'

    if (atividade.finalizada) {
        input += 'checked'
    }

    input += '>'

    return `
        <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>${atividade.data}</time>
    </div>
    `
}

const section = document.querySelector('section')
for (let atividade of atividades) {
    section.innerHTML += criarItemAtividade(atividade)   
}
