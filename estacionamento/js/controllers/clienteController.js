// controllers/clienteController.js
import { Cliente } from '../models/cliente.js';
import { storage } from '../utils/storage.js';
import * as ClienteView from '../views/clienteView.js';

export function initClienteController() {
  document.getElementById('btnCadastrarCliente').addEventListener('click', cadastrarCliente);
  document.getElementById('btnListarClientes').addEventListener('click', listarClientes);
  document.getElementById('btnLimparCliente').addEventListener('click', limparFormularioCliente);
}

export function cadastrarCliente() {
  const nome = document.getElementById("clienteNome").value;
  const documento = document.getElementById("clienteDocumento").value;
  
  if (!nome || !documento) {
    return alert("Nome e documento são obrigatórios!");
  }
  
  const clientes = storage.get("clientes");
  const novoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
  const cliente = new Cliente(novoId, nome, documento);
  storage.add("clientes", cliente);
  alert("Cliente cadastrado com sucesso!");
  listarClientes();
  limparFormularioCliente();
}

export function listarClientes() {
  const clientes = storage.get("clientes");
  ClienteView.renderClientes(clientes);
  ClienteView.atualizarSelectClientes(clientes);
}

export function limparFormularioCliente() {
  document.getElementById("clienteNome").value = "";
  document.getElementById("clienteDocumento").value = "";
  
  // Resetar botão de cadastro caso esteja em modo de edição
  const cadastrarBtn = document.getElementById("btnCadastrarCliente");
  if (cadastrarBtn) {
    cadastrarBtn.onclick = cadastrarCliente;
    cadastrarBtn.textContent = "Cadastrar Cliente";
  }
}

export function editarCliente(id) {
  const clientes = storage.get("clientes");
  const cliente = clientes.find(c => c.id === id);
  
  if (!cliente) {
    return alert("Cliente não encontrado!");
  }
  
  document.getElementById("clienteNome").value = cliente.nome;
  document.getElementById("clienteDocumento").value = cliente.documento;
  
  const cadastrarBtn = document.getElementById("btnCadastrarCliente");
  cadastrarBtn.textContent = "Atualizar Cliente";
  cadastrarBtn.onclick = function() {
    atualizarCliente(id);
  };
}

export function atualizarCliente(id) {
  const nome = document.getElementById("clienteNome").value;
  const documento = document.getElementById("clienteDocumento").value;
  
  if (!nome || !documento) {
    return alert("Nome e documento são obrigatórios!");
  }
  
  const clienteAtualizado = new Cliente(id, nome, documento);
  
  const clientes = storage.get("clientes");
  const index = clientes.findIndex(c => c.id === id);
  
  if (index === -1) {
    return alert("Cliente não encontrado!");
  }
  
  clientes[index] = clienteAtualizado;
  storage.set("clientes", clientes);
  
  alert("Cliente atualizado com sucesso!");
  listarClientes();
  limparFormularioCliente();
}

export function removerCliente(id) {
  if (!confirm("Tem certeza que deseja remover este cliente?")) {
    return;
  }
  
  // Verificar se o cliente possui veículos
  const veiculos = storage.get("veiculos");
  const veiculosCliente = veiculos.filter(v => v.clienteId === id);
  
  if (veiculosCliente.length > 0) {
    return alert("Este cliente possui veículos cadastrados. Remova os veículos primeiro.");
  }
  
  const clientes = storage.get("clientes");
  const novosClientes = clientes.filter(c => c.id !== id);
  
  if (clientes.length === novosClientes.length) {
    return alert("Cliente não encontrado!");
  }
  
  storage.set("clientes", novosClientes);
  alert("Cliente removido com sucesso!");
  listarClientes();
}
