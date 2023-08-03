const tarefas = document.querySelectorAll(".tarefas li");
const colunas = document.querySelectorAll(".tarefas");
let arrastarTarefa = null;

for (let i = 0; i < tarefas.length; i++) {

    const tarefa = tarefas[i];

    // Puxar tarefa  
    tarefa.addEventListener("dragstart", function (event) {

        arrastarTarefa = tarefa;

        event.dataTransfer.effectAllowed = "move";

        event.dataTransfer.setData("text/html", tarefa.innerHTML);

        tarefa.classList.add("dragging");

    });

    // Soltar tarefa
    tarefa.addEventListener("dragend", function () {

        arrastarTarefa.classList.remove("dragging");

        arrastarTarefa = null;
    });
}

for (let i = 0; i < colunas.length; i++) {

    const coluna = colunas[i];

    coluna.addEventListener("dragover", function (event) {

        event.preventDefault();

        event.dataTransfer.dropEffect = "move";

        coluna.classList.add("dragover");

    });

    coluna.addEventListener("dragleave", function () {

        coluna.classList.remove("dragover");

    });

    coluna.addEventListener("drop", function (event) {

        event.preventDefault();

        const tarefa = document.createElement("li");

        tarefa.innerHTML = event.dataTransfer.getData("text/html");

        tarefa.setAttribute("draggable", true);

        tarefa.addEventListener("dragstart", function (event) {

            arrastarTarefa = tarefa;

            event.dataTransfer.effectAllowed = "move";

            event.dataTransfer.setData("text/html", tarefa.innerHTML);

            tarefa.classList.add("dragging");

        });

        coluna.appendChild(tarefa);

        coluna.classList.remove("dragover");

        const colunaAnterior = arrastarTarefa.parentNode;

        colunaAnterior.removeChild(arrastarTarefa);

    });

    // Adicionar tarefa
    const adicionarTarefaForm = document.querySelector("#add-tarefa");
    const adicionarTarefaInput = document.querySelector("input");

    adicionarTarefaForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const novaTarefaTexto = adicionarTarefaInput.value.trim();

        if (!novaTarefaTexto == "") {

            const novaTarefa = document.createElement("li");

            novaTarefa.innerHTML = novaTarefaTexto;

            novaTarefa.setAttribute("draggable", true);

            novaTarefa.addEventListener("dragstart", function (event) {

                arrastarTarefa = novaTarefa;

                event.dataTransfer.effectAllowed = "move";

                event.dataTransfer.setData("text/html", novaTarefa.innerHTML);

                novaTarefa.classList.add("dragging");

            });

            document.querySelector("#to-do").appendChild(novaTarefa);

            adicionarTarefaInput.value = "";

        }

    });

}