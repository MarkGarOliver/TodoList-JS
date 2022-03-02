'use strict';

//comentar código..

//busca o "DB" no LocalStorage, porém como o no localstorage tudo é armazenado como string
//estou convertendo o que tem dentro do localstore para um json e após o ?? quer dizer que caso seja vazio ele me traz
//um array vazio. Lembrando que o todolist é a chave key que está no localStorage
const getBanco = () => JSON.parse(localStorage.getItem('todolist')) ?? [] 

//Nessa parte do código, eu estou fazendo um set do banco de dados que foi alterado em alguma outra função, criando 
//uma nova tarefa por exemplo, que seria subir o banco de dados que foi buscado com a função GetBanco, com as alterações
//feitas em determinada função, como exemplo adicionar uma nova tarefa, que estará detalhado o funcionamento nos comentario
//dessa função.

//para fazer esse upload, como o banco aqui no js está sendo tratado como array eu estou convertendo ele para string
//pois como dito anteriormente o localstorage armezena como string os dados. (JSON.stringify(banco))
const setBanco = (banco) => localStorage.setItem('todolist', JSON.stringify(banco))

//Função usada para criar uma tarefa nova no todolist, a função recebe o nome da tarefa, o seu status que pode ser 
//ja realizado que seria o checked, ou vazio, além disso, recebe também um indice do array para o bom funcionamento
//de outras funções do js.
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
            <div>${tarefa}</div>
        <input type="button" value="X" data-indice = ${indice}>

    `  
    //aqui eu estou adicionando um filho que é o item criado acima, dentro da div pai todolist
    document.getElementById('todolist').appendChild(item)
    


}

//atribuindo a variável o input de um novo item do html
let novoItem = document.getElementById('novoItem')

//nesta função estou tratando o evento Enter do teclado, para que quando precionado
//acione a criação da nova tarefa
//buscando o banco com a função getBanco descrita anteriormente
//fazendo a alteração no array que foi buscado
//e por fim fazendo o upload das alterações com a função SetBanco também já descrita
const enter = (event) => {
    console.log(event.key)
    const txt = event.target.value
    if (event.key == 'Enter'){
        const banco = getBanco()
        banco.push({'tarefa:': txt, 'status': ''})
        setBanco(banco)

        atualizarTela()
        event.target.value = '' //basicamente limpa o campo input
    }
}



//essa função é chamada pela função Atualizar tela, que é chamada sempre que há alguma alteração
//como a adição ou exclusão de uma tarefa, e também quando uma tarefa é marcada como checked.
//basicamente manipula o html para remover todos itens do pai todolist que é onde fica as tarefas(filhos)
//isso ocorre para que na tela não seja recarrecado/duplicado esses elementos em html.
const limparTarefa = () =>{
    const todolist = document.getElementById('todolist')
    //aqui diz que enquanto existe o primeiro filho ele remove o ultimo
    while(todolist.firstChild){
        todolist.removeChild(todolist.lastChild)
    }
}

//a função atualizar tela como sobre ja descreve atualizar os itens/tarefas na tela
//sempre que houver uma alteração como a exclusão de um item, deve ser atualizado o html para que esse item suma
//por exemplo.
const atualizarTela = () => {
    limparTarefa() //limpa a tela, descrito anteriormente
    const banco = getBanco() //busca o banco no localstorage com a função getBanco
    //ForEach percorre todo o array. Aqui estou criando as tarefas na tela conforme o forEach percorre pelo array,
    //com cada item usando as propriedades que contem nele e que são especificadas na função criarItem
    // (nome da tarefa, status e indice)
    banco.forEach( (item, indice) => criarItem(item["tarefa:"], item.status, indice))
}

//Função responsável pela Exclusão de tarefas. Recebe o indice da tarefa que será excluida
//busca o banco no localstorage, lembrando que nessa busca ocorre uma conversao para array
//a partir disos splice exclui o item do indice que veio junto com a função
//depois faz o upload e atualiza a tela.
const removerItem = (indice) => {
    const banco = getBanco()

    banco.splice(indice, 1)
    setBanco(banco)
    atualizarTela
    ()
}

//Função usada para identificar quando é marcado uma tarefa como feita | checked
//assim como nas outras, busca o banco, muda o a propriedade status do item do indice especificado dentro do array
//faz o upload e atualiza a tela novamente.
const atualizarItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status == '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela()
}

//Parte importante do código
//aqui eu trago na função o evento do click dentro de um item/tarefa
//e trato de identificar onde foi esse click, pois se ele tiver sido dentro da div/checkbox, eu 
//chamo a função atualizarItem que muda o status do item no localStorage para checked.
//porem se caso o elemento clicado for o botão dentro da div já sei que é para excluir
//e chamo a função remover item passando o indice de onde clicado para a remoção
//essa passagem do indice também acontece no atualizarItem.
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

//aqui o js fica escutando quando o usuario teclar enter no input e chamo a função que trata esse evento Enter
novoItem.addEventListener('keypress', enter)
//basicamente estou ouvindo os eventos da div todolist, e chamando a função clickItem
document.getElementById('todolist').addEventListener('click', clickItem)


atualizarTela()