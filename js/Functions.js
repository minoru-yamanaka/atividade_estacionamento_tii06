// Importa o banco de dados simulado (db) e o gerenciador de armazenamento local (LocalStorageManager)
import { db, LocalStorageManager } from './Storage.js';

/////////////////////////////
// CLIENTES
/////////////////////////////

// Função para cadastrar um novo cliente
function cadastrarCliente() {
    // Obtém os valores dos campos do formulário
    // Utiliza trim() para remover espaços em branco no início e no fim dos valores 
    // Captura o valor do campo de nome do cliente e remove espaços extras nas extremidades
    const nome = document.getElementById("clienteNome").value.trim(); 
    // Captura o valor do campo de documento do cliente e remove espaços extras nas extremidades
    const documento = document.getElementById("clienteDocumento").value.trim(); 


    // Verifica se todos os campos foram preenchidos
    // O operador lógico "||" verifica se pelo menos um dos campos está vazio
    if (!nome || !documento) {
        alert("Preencha todos os campos!"); // Exibe um alerta se algum campo estiver vazio
        return; // Encerra a execução da função, impedindo o cadastro com dados incompletos
    }

    // Verifica se já existe um cliente com o mesmo documento
    const clienteExistente = db.clientes.some(c => c.documento === documento);
    if (clienteExistente) {
        alert("Cliente já cadastrado!"); // Exibe um alerta se o cliente já estiver cadastrado
        return; // Encerra a execução da função para evitar duplicidade
    }

    // Cria o objeto cliente com os dados fornecidos no formulário
    const cliente = { nome, documento };

    // Adiciona o novo cliente ao array de clientes no banco de dados (db)
    db.clientes.push(cliente);

    // Salva a lista atualizada de clientes no localStorage usando o gerenciador customizado
    LocalStorageManager.salvarDados('clientes', db.clientes);

    // Atualiza a interface do usuário:
    // 1. Atualiza a listagem de clientes exibida na tela
    listarClientes();

    // 2. Limpa os campos do formulário para permitir novo cadastro
    limparFormularioCliente();

    // 3. Atualiza o select de clientes com os dados mais recentes
    popularSelectClientes();

    // Exibe uma mensagem confirmando o cadastro com sucesso
    alert("Cliente cadastrado com sucesso!");

}

// Exibe todos os clientes cadastrados
function listarClientes() {
    // Seleciona a div onde os clientes cadastrados serão exibidos
    const div = document.getElementById("clientesCadastrados");

    // Limpa o conteúdo atual da div para evitar duplicação
    div.innerHTML = "";

    // Percorre o array de clientes do banco de dados
    db.clientes.forEach((cliente, index) => {
        // Adiciona um parágrafo (<p>) para cada cliente na div,
        // incluindo o índice (posição), nome e documento
        div.innerHTML += `<p>${index + 1}.[ nome: ${cliente.nome} | documento: ${cliente.documento} ]</p>`;
    });
}

// Popula o select com os clientes cadastrados
function popularSelectClientes() {
    // Seleciona o elemento <select> onde os clientes serão inseridos
    const select = document.getElementById("selectCliente");

    // Limpa todas as opções anteriores do <select>
    select.innerHTML = "";

    // Caso não haja clientes cadastrados no banco de dados
    if (db.clientes.length === 0) {
        // Cria uma opção informando que não há clientes
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Nenhum cliente cadastrado";
        select.appendChild(option); // Adiciona a opção ao <select>
        return; // Encerra a função
    }

    // Adiciona cada cliente ao <select>
    db.clientes.forEach((cliente) => {
        // Cria uma nova opção para o cliente
        const option = document.createElement("option");

        // Define o valor da opção como o documento do cliente (identificador único)
        option.value = cliente.documento;

        // Define o texto da opção com o nome e o documento do cliente
        option.textContent = `${cliente.documento} (${cliente.documento})`;

        // Adiciona a opção ao <select>
        select.appendChild(option);
    });
}

// Limpa os campos do formulário de cliente
function limparFormularioCliente() {
    // Define o valor do campo "clienteNome" como vazio, limpando o conteúdo digitado
    document.getElementById("clienteNome").value = "";

    // Define o valor do campo "clienteDocumento" como vazio, limpando o conteúdo digitado
    document.getElementById("clienteDocumento").value = "";
}

/////////////////////////////
// FUNCIONÁRIOS
/////////////////////////////

// Função para cadastrar um novo funcionário
function cadastrarFuncionario() {
    // Obtém os valores inseridos nos campos do formulário e remove espaços em branco extras
    const nome = document.getElementById("funcionarioNome").value.trim();
    const documento = document.getElementById("funcionarioDocumento").value.trim();
    const matricula = document.getElementById("funcionarioMatricula").value.trim();
    const cargo = document.getElementById("funcionarioCargo").value;

    // Verifica se todos os campos foram preenchidos
    // Se algum campo estiver vazio, exibe um alerta e retorna da função
    if (!nome || !documento || !matricula || !cargo) {
        alert("Preencha todos os campos!"); // Exibe uma mensagem de alerta
        return; // Encerra a execução da função se algum campo estiver vazio
    }

    // Verifica se já existe um funcionário com a mesma matrícula cadastrada
    // A função some percorre a lista de funcionários para verificar se a matrícula já existe
    const matriculaExistente = db.funcionarios.some(funcionario => funcionario.matricula === matricula);
    if (matriculaExistente) {
        alert("Essa matrícula já está cadastrada!"); // Exibe alerta se a matrícula já existir
        return; // Encerra a execução da função se a matrícula já estiver cadastrada
    }

    // Cria o objeto funcionario com os dados inseridos no formulário
    const funcionario = { nome, documento, matricula, cargo };
    
    // Adiciona o novo funcionário ao array de funcionários no banco de dados (db)
    db.funcionarios.push(funcionario);
    
    // Salva os dados atualizados no LocalStorage para persistir as informações
    LocalStorageManager.salvarDados('funcionarios', db.funcionarios);

    // Atualiza a listagem de funcionários na interface
    listarFuncionarios();

    // Limpa o formulário de cadastro de funcionário
    limparFormularioFuncionario();
}

// Exibe todos os funcionários cadastrados
function listarFuncionarios() {
    // Obtém o elemento da página onde a lista de funcionários será exibida
    const div = document.getElementById("funcionariosCadastrados");

    // Limpa o conteúdo da div para garantir que a lista seja atualizada
    div.innerHTML = "";

    // Itera sobre o array de funcionários armazenados no banco de dados
    db.funcionarios.forEach((f, index) => {
        // Para cada funcionário, cria uma linha no formato de texto para exibição
        div.innerHTML += `<p>${index + 1}. [ nome: ${f.nome} | cargo: ${f.cargo} | matricula: ${f.matricula} | documento: ${f.documento} ]</p>`;
    });
}

// Limpa os campos do formulário de funcionário
function limparFormularioFuncionario() {
    // Limpa o campo de nome do funcionário
    document.getElementById("funcionarioNome").value = "";
    
    // Limpa o campo de documento do funcionário
    document.getElementById("funcionarioDocumento").value = "";
    
    // Limpa o campo de matrícula do funcionário
    document.getElementById("funcionarioMatricula").value = "";
    
    // Restaura o campo de cargo para o primeiro item da lista (geralmente uma opção vazia ou 'Selecione')
    document.getElementById("funcionarioCargo").selectedIndex = 0;
}

/////////////////////////////
// VEÍCULOS
/////////////////////////////

// Cadastra um veículo associado a um cliente
function cadastrarVeiculo() {
    // Obtém os valores dos campos do formulário
    const cliente = document.getElementById("selectCliente").value; // Identificador do cliente selecionado
    const placa = document.getElementById("veiculoPlaca").value.trim().toUpperCase(); // Obtém a placa e converte para maiúsculas
    const modelo = document.getElementById("veiculoModelo").value.trim(); // Obtém o modelo do veículo
    const cor = document.getElementById("veiculoCor").value.trim(); // Obtém a cor do veículo
    const tipo = document.getElementById("veiculoTipo").value; // Obtém o tipo de veículo (por exemplo, carro, moto)

    // Validação básica para garantir que os campos obrigatórios estão preenchidos
    if (!cliente || !placa || !modelo) {
        alert("Por favor, preencha os campos obrigatórios!"); // Exibe alerta se algum campo obrigatório estiver vazio
        return; // Encerra a função se a validação falhar
    }

    // Verifica se já existe um veículo com a mesma placa
    const placaExistente = db.veiculos.some(veiculo => veiculo.placa.toUpperCase() === placa); // Compara as placas, considerando maiúsculas toUpperCase
    if (placaExistente) {
        alert("Essa placa já está cadastrada!"); // Exibe alerta caso a placa já tenha sido registrada
        return; // Encerra a função se a placa já existir
    }

    // Cria um objeto veiculo com as informações obtidas
    const veiculo = { cliente, placa, modelo, cor, tipo };

    // Adiciona o veículo no banco de dados (no array de veículos)
    db.veiculos.push(veiculo);

    // Salva os dados atualizados no LocalStorage
    LocalStorageManager.salvarDados('veiculos', db.veiculos);

    // Atualiza a listagem de veículos cadastrados
    listarVeiculos();

    // Limpa os campos do formulário de cadastro de veículo
    limparFormularioVeiculo();

    // Exibe uma mensagem de sucesso
    alert("Veículo cadastrado com sucesso!");
}

// Exibe todos os veículos cadastrados
function listarVeiculos() {
    // Obtém o elemento da página onde a lista de veículos será exibida
    const div = document.getElementById("veiculosCadastrados");

    // Limpa o conteúdo da div para garantir que não haja dados duplicados
    div.innerHTML = "";

    // Percorre a lista de veículos cadastrados (db.veiculos)
    db.veiculos.forEach((v, index) => {
        // Adiciona um novo parágrafo para cada veículo, exibindo suas informações
        // O "index + 1" exibe a numeração dos veículos de forma sequencial
        div.innerHTML += `<p>${index + 1}. [ ${v.placa} | ${v.cliente} | ${v.modelo} | ${v.cor} | ${v.tipo} ]</p>`;
    });
}

// Limpa os campos do formulário de veículo
function limparFormularioVeiculo() {
    // Limpa o campo de placa do veículo, deixando-o vazio
    document.getElementById("veiculoPlaca").value = "";

    // Limpa o campo de modelo do veículo, deixando-o vazio
    document.getElementById("veiculoModelo").value = "";

    // Limpa o campo de cor do veículo, deixando-o vazio
    document.getElementById("veiculoCor").value = "";

    // Reseta o campo de tipo de veículo para o primeiro valor da lista (índice 0)
    document.getElementById("veiculoTipo").selectedIndex = 0;
}


/////////////////////////////
// OPERAÇÕES DE ESTACIONAMENTO
/////////////////////////////

// Registra a entrada de um veículo no estacionamento
function registrarEntrada() {
    // Obtém o valor da placa do veículo a partir do campo de entrada
    const placa = document.getElementById("entradaPlaca").value.trim();

    // Verifica se o campo da placa está vazio
    if (!placa) {
        alert("Informe a placa do veículo!"); // Exibe um alerta caso o campo esteja vazio
        return; // Interrompe a execução da função se a placa não for informada
    }

    // Verifica se o veículo já está estacionado
    const veiculoJaEstacionado = db.registrosEstacionamento.some(
        r => r.placa === placa && !r.saida // A condição verifica se o veículo está no estacionamento e não tem saída registrada
    );

    // Se o veículo já estiver no estacionamento
    if (veiculoJaEstacionado) {
        alert("Este veículo já está registrado no estacionamento!"); // Exibe um alerta informando que o veículo já está no local
        return; // Interrompe a execução da função
    }

    // Cria um registro de entrada com a placa do veículo e a data e hora da entrada
    const entrada = new Date().toISOString(); // Obtém a data e hora atual no formato ISO 8601
    db.registrosEstacionamento.push({ placa, entrada }); // Adiciona o registro ao banco de dados de registros de estacionamento

    // Salva os registros atualizados no localStorage
    LocalStorageManager.salvarDados('registrosEstacionamento', db.registrosEstacionamento);

    // Atualiza a lista de veículos no estacionamento
    listarVeiculosNoEstacionamento();

    // Exibe uma mensagem de sucesso
    alert("Entrada registrada com sucesso!");
}

// Registra a saída de um veículo
function registrarSaida() {
    // Obtém o valor da placa do veículo a partir do campo de entrada de saída
    const placa = document.getElementById("saidaPlaca").value.trim();

    // Encontra o registro de entrada do veículo que ainda não tem uma data de saída registrada
    const registro = db.registrosEstacionamento.find(r => r.placa === placa && !r.saida);

    // Se um registro válido for encontrado (veículo está estacionado e não tem saída registrada)
    if (registro) {
        registro.saida = new Date().toISOString(); // Registra a data e hora atual como a saída do veículo
        LocalStorageManager.salvarDados('registrosEstacionamento', db.registrosEstacionamento); // Atualiza os dados no localStorage
        listarVeiculosNoEstacionamento(); // Atualiza a exibição dos veículos no estacionamento
        alert("Saída registrada com sucesso!"); // Exibe um alerta de sucesso
    } else {
        // Se não encontrar o veículo ou o veículo já tiver saído
        alert("Veículo não encontrado ou já saiu."); // Exibe um alerta de erro
    }
}

// Lista veículos atualmente estacionados (sem saída registrada)
function listarVeiculosNoEstacionamento() {
    // Obtém a referência do elemento da página onde os veículos estacionados serão exibidos
    const div = document.getElementById("veiculosEstacionados");
    div.innerHTML = ""; // Limpa o conteúdo da div antes de atualizar a listagem

    // Filtra os veículos no banco de dados para encontrar os que não possuem uma data de saída registrada
    const veiculosEstacionados = db.registrosEstacionamento.filter(r => !r.saida);

    // Se não houver veículos estacionados (sem saída registrada)
    if (veiculosEstacionados.length === 0) {
        div.innerHTML = "<p>Não há veículos estacionados no momento.</p>"; // Exibe mensagem de ausência de veículos estacionados
        return; // Interrompe a execução da função
    }

    // Para cada veículo estacionado (sem saída registrada), cria uma linha de exibição
    veiculosEstacionados.forEach((r, index) => {
        // Exibe a placa do veículo e a data/hora de entrada formatada para cada veículo
        div.innerHTML += `<p>${index + 1}. [ Placa: ${r.placa} | Entrada: ${new Date(r.entrada).toLocaleString()} ]</p>`;
    });
}

/////////////////////////////
// RELATÓRIOS
/////////////////////////////

// Lista registros finalizados (veículos que já saíram)
function listarRegistros() {
    // Obtém a referência do elemento da página onde os registros finalizados serão exibidos
    const ul = document.getElementById("registrosFinalizados");
    ul.innerHTML = ""; // Limpa o conteúdo da lista antes de atualizá-la

    // Filtra os registros para pegar apenas os veículos que já saíram (que possuem data de saída)
    db.registrosEstacionamento
        .filter(r => r.saida) // Apenas registros com a data de saída definida
        .forEach((r, index) => {
            // Para cada registro, adiciona um item de lista na tela com a placa do veículo,
            // a data de entrada e a data de saída, formatadas como data e hora local
            ul.innerHTML += `<li>${index + 1}. [ Placa: ${r.placa} | Entrada: ${new Date(r.entrada).toLocaleString()} | Saída: ${new Date(r.saida).toLocaleString()} ]</li>`;
        });
}

/////////////////////////////
// EXPORTAÇÕES
/////////////////////////////

// Exporta todas as funções para uso em outros arquivos
// Exporta várias funções que podem ser usadas em outros módulos ou arquivos
export {
    cadastrarCliente, // Função responsável por cadastrar um cliente
    listarClientes, // Função que exibe todos os clientes cadastrados
    limparFormularioCliente, // Função que limpa os campos do formulário de cliente
    popularSelectClientes, // Função que preenche o select de clientes com os cadastrados
    cadastrarFuncionario, // Função responsável por cadastrar um funcionário
    listarFuncionarios, // Função que exibe todos os funcionários cadastrados
    limparFormularioFuncionario, // Função que limpa os campos do formulário de funcionário
    cadastrarVeiculo, // Função responsável por cadastrar um veículo associado a um cliente
    listarVeiculos, // Função que exibe todos os veículos cadastrados
    limparFormularioVeiculo, // Função que limpa os campos do formulário de veículo
    registrarEntrada, // Função que registra a entrada de um veículo no estacionamento
    registrarSaida, // Função que registra a saída de um veículo do estacionamento
    listarVeiculosNoEstacionamento, // Função que exibe os veículos atualmente estacionados
    listarRegistros // Função que exibe os registros de veículos que já saíram do estacionamento
};

