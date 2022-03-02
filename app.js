'use strict';

//comentar código..

const getBanco = () => JSON.parse(localStorage.getItem('todolist')) ?? [] 
const setBanco = (banco) => localStorage.setItem('todolist', JSON.stringify(banco))

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
            <div>${tarefa}</div>
        <input type="button" value="X" data-indice = ${indice}>

    `  

    document.getElementById('todolist').appendChild(item)
    


}

let novoItem = document.getElementById('novoItem')

const enter = (event) => {
    console.log(event.key)
    const txt = event.target.value
    if (event.key == 'Enter'){
        const banco = getBanco()
        banco.push({'tarefa:': txt, 'status': ''})
        setBanco(banco)

        atualizarTela
        ()
        event.target.value = ''
    }
}



const limparTarefa = () =>{
    const todolist = document.getElementById('todolist')
    while(todolist.firstChild){
        todolist.removeChild(todolist.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefa()
    const banco = getBanco()
    banco.forEach( (item, indice) => criarItem(item["tarefa:"], item.status, indice))
}

const removerItem = (indice) => {
    const banco = getBanco()

    banco.splice(indice, 1)
    setBanco(banco)
    atualizarTela
    ()
}

const atualizarItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status == '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela()
}
const clickItem = (event) => {
    const elemento = event.target
    console.log(elemento.dataset.indice)

    if (elemento.type == 'button'){
        const indice = elemento.dataset.indice
        removerItem(indice)
    } else if (elemento.type == 'checkbox'){
        const indice = elemento.dataset.indice
        atualizarItem(indice)
    }
}

novoItem.addEventListener('keypress', enter)
document.getElementById('todolist').addEventListener('click', clickItem)

atualizarTela
()