export function renderClientes(clientes) {
    const div = document.getElementById("clientesCadastrados");
    
    if (clientes.length === 0) {
      div.innerHTML = "<p>Nenhum cliente cadastrado.</p>";
      return;
    }
    
    div.innerHTML = "<ul>" + clientes.map(c => 
      `<li>${c.nome} - ${c.documento} 
      <button onclick="window.clienteController.editarCliente(${c.id})">Editar</button>
      <button onclick="window.clienteController.removerCliente(${c.id})">Remover</button></li>`
    ).join("") + "</ul>";
  }
  
  export function atualizarSelectClientes(clientes) {
    const selectCliente = document.getElementById("selectCliente");
    if (selectCliente) {
      selectCliente.innerHTML = clientes.map(c => 
        `<option value="${c.id}">${c.nome}</option>`
      ).join("");
    }
  }
  