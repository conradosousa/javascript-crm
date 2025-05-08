

let clientes = JSON.parse(sessionStorage.getItem("clientes")) ? JSON.parse(sessionStorage.getItem("clientes")) : [];


function buscarClientes() {
    fetch("http://localhost:3000/clientes")
        .then((res) => res.json())
        .then((lista) => {
            clientes = lista;
            carregarClientes(clientes);
        })
}
buscarClientes();


function carregarClientes(listaDeClientes) {
    let tbodyElement = document.querySelector("#tabela");
    tbodyElement.innerHTML = '';
    listaDeClientes.map((cliente) => {
        tbodyElement.innerHTML += `
        <tr class="*:leading-[40px]">
                        <td>${cliente.id}</td>
                        <td>${cliente.nome}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.telefone}</td>
                        <td>${cliente.data}</td>
                        <td class="w-[100px] flex justify-center gap-4">
                            <box-icon name="pencil"></box-icon>
                            <box-icon name="trash" onclick="deletarCliente('${cliente.id}')"></box-icon>
                        </td>
                    </tr>
                    `;
    })
}

carregarClientes(clientes);

function cadastrarCliente(form) {
    event.preventDefault();

    //vão pegar os valores dos inputs do formulario e transformar em um objeto
    let formData = new FormData(form);
    let cliente = Object.fromEntries(formData.entries());

    //inserir o novo cliente no final do array clientes
    fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(cliente)
    })
        .then(res => res.json())
        .then(res => {
            alert("Registro cadastrado com sucesso!")
            mostrarOverlay();
            carregarClientes(clientes);
        })


}
function deletarCliente(id) {
    fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(res => {
            alert(`Item ${id} apagado!`);

        })
}


