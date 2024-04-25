var botaoAdicionar = document.querySelector(".botaoAdicionar");
var entrada = document.getElementById("userInput");
var lista = document.getElementById("ul");

function tamanhoEntrada(){
    return entrada.value.trim().length;
}

function criarElementoLista(){
    let textoTarefa = entrada.value.trim();

    if (textoTarefa !== "") {
        let li = document.createElement("li");

        let spanTarefa = document.createElement("span");
        spanTarefa.textContent = textoTarefa;
        li.appendChild(spanTarefa);

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener("click", function() {
            li.remove();
            atualizarLocalStorage();
        });
        li.appendChild(botaoRemover);

        lista.appendChild(li);
        entrada.value = "";

        

        function editarTarefa() {
            let textoOriginal = spanTarefa.textContent;
            let novoTexto = prompt("Editar tarefa:", textoOriginal);
            if (novoTexto !== null && novoTexto.trim() !== "") {
                spanTarefa.textContent = novoTexto.trim();
                atualizarLocalStorage();
            }
        }

        li.addEventListener("dblclick", editarTarefa);

        atualizarLocalStorage();
    }
}

botaoAdicionar.addEventListener("click", criarElementoLista);
entrada.addEventListener("keypress", function(event){
    if(tamanhoEntrada() > 0 && event.keyCode === 13){
        criarElementoLista();
    }
});

function atualizarLocalStorage() {
    localStorage.clear();

    lista.querySelectorAll("li").forEach(function(li, indice) {
        let chave = "tarefa_" + indice;
        let textoTarefa = li.querySelector("span").textContent;
        localStorage.setItem(chave, textoTarefa);
    });
}

function exibirItensLista() {
    lista.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        let chave = localStorage.key(i);
        let valorItem = localStorage.getItem(chave);

        let li = document.createElement("li");

        let spanTarefa = document.createElement("span");
        spanTarefa.textContent = valorItem;
        li.appendChild(spanTarefa);

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener("click", function() {
            li.remove();
            localStorage.removeItem(chave);
            atualizarLocalStorage();
        });
        li.appendChild(botaoRemover);

        lista.appendChild(li);
    }
}

exibirItensLista();
