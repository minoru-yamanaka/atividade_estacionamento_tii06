// Importa o banco de dados e o gerenciador do LocalStorage do arquivo Storage.js
import { db, LocalStorageManager } from './Storage.js';

// Importa diversas funções de controle do arquivo Functions.js
import {
    cadastrarCliente,             // Função para cadastrar um novo cliente
    listarClientes,               // Função para listar clientes cadastrados
    limparFormularioCliente,     // Função para limpar os campos do formulário de cliente
    cadastrarFuncionario,        // Função para cadastrar um novo funcionário
    listarFuncionarios,          // Função para listar funcionários cadastrados
    limparFormularioFuncionario, // Função para limpar os campos do formulário de funcionário
    cadastrarVeiculo,            // Função para cadastrar um novo veículo
    listarVeiculos,              // Função para listar veículos cadastrados
    limparFormularioVeiculo,     // Função para limpar os campos do formulário de veículo
    registrarEntrada,            // Função para registrar entrada de veículo no estacionamento
    registrarSaida,              // Função para registrar saída de veículo do estacionamento
    listarVeiculosNoEstacionamento, // Função para listar veículos atualmente estacionados
    listarRegistros,             // Função para listar todos os registros de entrada/saída
    popularSelectClientes        // Função que popula o <select> com a lista de clientes
} from './Functions.js';

// Carrega os dados do localStorage para o banco (db), garantindo que não seja nulo
db.clientes = LocalStorageManager.carregarDados('clientes') || [];
db.funcionarios = LocalStorageManager.carregarDados('funcionarios') || [];
db.veiculos = LocalStorageManager.carregarDados('veiculos') || [];
db.registrosEstacionamento = LocalStorageManager.carregarDados('registrosEstacionamento') || [];

// Aguarda o carregamento completo do DOM antes de adicionar os event listeners
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM carregado com sucesso");

    // Popula o select de clientes na tela (útil para cadastro de veículos)
    popularSelectClientes();

    // CLIENTES
    document.getElementById("btnCadastrarCliente")?.addEventListener("click", cadastrarCliente); // Botão para cadastrar cliente
    document.getElementById("btnListarClientes")?.addEventListener("click", listarClientes);     // Botão para listar clientes
    document.getElementById("btnLimparFormularioCliente")?.addEventListener("click", limparFormularioCliente); // Botão para limpar formulário de cliente

    // FUNCIONÁRIOS
    document.getElementById("btnCadastrarFuncionario")?.addEventListener("click", cadastrarFuncionario); // Cadastrar funcionário
    document.getElementById("btnListarFuncionarios")?.addEventListener("click", listarFuncionarios);     // Listar funcionários
    document.getElementById("btnLimparFormularioFuncionario")?.addEventListener("click", limparFormularioFuncionario); // Limpar formulário

    // VEÍCULOS
    document.getElementById("btnCadastrarVeiculo")?.addEventListener("click", cadastrarVeiculo); // Cadastrar veículo
    document.getElementById("btnListarVeiculos")?.addEventListener("click", listarVeiculos);     // Listar veículos
    document.getElementById("btnLimparFormularioVeiculo")?.addEventListener("click", () => {
        limparFormularioVeiculo();     // Limpa formulário
        popularSelectClientes();       // E repopula o select de clientes
    });

    // OPERAÇÕES DE ESTACIONAMENTO
    document.getElementById("btnRegistrarEntrada")?.addEventListener("click", registrarEntrada); // Registrar entrada de veículo
    document.getElementById("btnRegistrarSaida")?.addEventListener("click", registrarSaida);     // Registrar saída de veículo
    document.getElementById("btnListarVeiculosNoEstacionamento")?.addEventListener("click", listarVeiculosNoEstacionamento); // Listar veículos estacionados

    // RELATÓRIOS
    document.getElementById("btnListarRegistros")?.addEventListener("click", listarRegistros);   // Botão para gerar relatório de registros
});

// O que esse código FAZ?

// Ele carrega dados do localStorage para uso interno.

// Espera o DOM estar completamente carregado antes de iniciar a lógica.

// Adiciona eventos de clique nos botões para acionar funções do sistema: cadastro, listagem, registro de entradas/saídas, etc.

// É a estrutura principal para conectar a interface HTML com as ações JavaScript da sua aplicação de estacionamento.



// O código usa DOM:

// Escuta o carregamento da página com DOMContentLoaded.

// Manipula elementos HTML com document.getElementById(...).

// Adiciona eventos de clique em botões da interface.

// Integra com formulários e campos de seleção (<select>).

// Conecta o HTML com a lógica JS da aplicação.