const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}

const atividade = {
    nome: "Treino de Ombro",
    data: new Date("2024-07-01 19:00"),
    finalizada: true
}

let atividades = [
    atividade,
    {
        nome: 'Treino de Costas',
        data: new Date("2024-07-02 19:00"),
        finalizada: true
    },
    {
        nome: 'Treino de Perna',
        data: new Date("2024-07-03 19:00"),
        finalizada: true
    },
    {
        nome: 'Treino de Biceps',
        data: new Date("2024-07-04 19:00"),
        finalizada: true
    },
    {
        nome: 'Treino de Triceps',
        data: new Date("2024-07-05 19:00"),
        finalizada: true
    },
    {
        nome: 'Treino de Peito',
        data: new Date("2024-07-06 19:00"),
        finalizada: true
    }
]

const criarItemAtividade = (atividade) => {
    let input = `
    <input 
    onchange="concluirAtividade(event)"
    value="${atividade.data.toISOString()}"
    type="checkbox"
    `

    if (atividade.finalizada) {
        input += ' checked'
    }

    input += '>'

    const formatar = formatador(atividade.data)

    return `
        <div class="card-bg">
            ${input}
            <span>${atividade.nome},</span>
            <time>${formatar.dia.semana.longo}, 
            dia ${formatar.dia.numerico} de 
            ${formatar.mes} às ${formatar.hora}h</time>
        </div>
    `
}

const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section')
    section.innerHTML = ''

    if (atividades.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
        return;
    }

    for (let atividade of atividades) {
        section.innerHTML += criarItemAtividade(atividade)
    }
}

atualizarListaDeAtividades();

const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade');
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = new Date(`${dia} ${hora}`)

    const novaAtividade = {
        nome: nome,
        data: data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data.getTime() === novaAtividade.data.getTime()
    })

    if (atividadeExiste) {
        return alert('Dia/Hora não disponível')
    }

    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03",
        "2024-03-04",
        "2024-03-05",
    ]

    let diasSelecao = '';

    for (let dia of dias) {
        const formatar = formatador(dia)
        const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`
        diasSelecao += `<option value="${dia}">${diaFormatado}</option>`
    }

    document
        .querySelector('select[name="dia"]')
        .innerHTML = diasSelecao
}

criarDiasSelecao()

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    for (let index = 6; index <= 23; index++) {
        const hora = String(index).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    document
        .querySelector('select[name="hora"]')
        .innerHTML = horasDisponiveis
}

criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = new Date(input.value)

    const atividade = atividades.find((atividade) => {
        return atividade.data.getTime() === dataDesteInput.getTime()
    })

    if (!atividade) {
        return
    }

    atividade.finalizada = !atividade.finalizada
    atualizarListaDeAtividades()
}
