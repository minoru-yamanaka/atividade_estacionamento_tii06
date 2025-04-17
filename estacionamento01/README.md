# Modularizando o Sistema de Estacionamento

Um sistema de estacionamento completo com várias funcionalidades. Para modularizar este projeto de forma simples e eficiente, dividimos o código em múltiplos arquivos seguindo uma estrutura organizada. Estrutura baseada no padrão MVC (Model-View-Controller) de forma simplificada.

## Estrutura de diretórios proposta

```
sistema-estacionamento/
│
├── index.html                 # Página principal com estrutura HTML
├── css/
│   └── styles.css             # Estilos extraídos do HTML
│
├── js/
│   ├── models/                # Classes e modelos de dados
│   │   ├── pessoa.js          # Classe base Pessoa
│   │   ├── cliente.js         # Classe Cliente
│   │   ├── veiculo.js         # Classe Veículo
│   │   ├── funcionario.js     # Classe Funcionário
│   │   └── registro.js        # Classe RegistroEstacionamento
│   │
│   ├── controllers/           # Lógica de negócios e operações
│   │   ├── clienteController.js    # Operações de clientes
│   │   ├── veiculoController.js    # Operações de veículos
│   │   ├── funcionarioController.js # Operações de funcionários
│   │   └── operacoesController.js  # Operações de estacionamento
│   │
│   ├── views/                 # Manipulação da UI
│   │   ├── clienteView.js     # UI para clientes
│   │   ├── veiculoView.js     # UI para veículos
│   │   ├── funcionarioView.js # UI para funcionários
│   │   └── operacoesView.js   # UI para operações
│   │
│   ├── utils/                 # Funções auxiliares
│   │   ├── storage.js         # Manipulação de localStorage
│   │   ├── formatters.js      # Formatação de dados
│   │   └── validators.js      # Validações
│   │
│   └── app.js                 # Inicialização e configuração
│
└── README.md                  # Documentação do projeto
```

Vamos implementar cada componente desta estrutura:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Sistema de Estacionamento</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <h1>🚗 Sistema de Estacionamento</h1>
  
  <div class="tab-navigation">
    <button onclick="app.showTab('tab-cliente')" class="active">Clientes</button>
    <button onclick="app.showTab('tab-veiculo')">Veículos</button>
    <button onclick="app.showTab('tab-funcionario')">Funcionários</button>
    <button onclick="app.showTab('tab-operacoes')">Operações</button>
    <button onclick="app.showTab('tab-relatorios')">Relatórios</button>
  </div>

  <!-- Tab: Clientes -->
  <div id="tab-cliente" class="tab-content active">
    <section>
      <h2>Cadastro de Cliente</h2>
      <label>Nome:</label><input type="text" id="clienteNome" /><br />
      <label>Documento:</label><input type="text" id="clienteDocumento" /><br />
      <button onclick="clienteController.cadastrar()">Cadastrar Cliente</button>
      <button onclick="clienteController.listar()">Listar Clientes</button>
      <button onclick="clienteView.limparFormulario()">Limpar</button>
      <div id="clientesCadastrados"></div>
    </section>
  </div>

  <!-- Tab: Veículos -->
  <div id="tab-veiculo" class="tab-content">
    <section>
      <h2>Cadastro de Veículo</h2>
      <label>Cliente:</label>
      <select id="selectCliente"></select><br />
      <label>Placa:</label><input type="text" id="veiculoPlaca" /><br />
      <label>Modelo:</label><input type="text" id="veiculoModelo" /><br />
      <label>Cor:</label><input type="text" id="veiculoCor" /><br />
      <label>Tipo:</label>
      <select id="veiculoTipo">
        <option value="carro">Carro</option>
        <option value="moto">Moto</option>
        <option value="caminhonete">Caminhonete</option>
        <option value="van">Van</option>
        <option value="outro">Outro</option>
      </select><br />
      <button onclick="veiculoController.cadastrar()">Cadastrar Veículo</button>
      <button onclick="veiculoController.listar()">Listar Veículos</button>
      <button onclick="veiculoView.limparFormulario()">Limpar</button>
      <div id="veiculosCadastrados"></div>
    </section>
  </div>

  <!-- Tab: Funcionários -->
  <div id="tab-funcionario" class="tab-content">
    <section>
      <h2>Cadastro de Funcionário</h2>
      <label>Nome:</label><input type="text" id="funcionarioNome"><br>
      <label>Documento:</label><input type="text" id="funcionarioDocumento"><br>
      <label>Matrícula:</label><input type="text" id="funcionarioMatricula"><br>
      <label>Cargo:</label>
      <select id="funcionarioCargo">
        <option value="atendente">Atendente</option>
        <option value="gerente">Gerente</option>
        <option value="manobrista">Manobrista</option>
        <option value="seguranca">Segurança</option>
      </select><br>
      <button onclick="funcionarioController.cadastrar()">Cadastrar Funcionário</button>
      <button onclick="funcionarioController.listar()">Listar Funcionários</button>
      <button onclick="funcionarioView.limparFormulario()">Limpar</button>
      <div id="funcionariosCadastrados"></div>
    </section>
  </div>

  <!-- Tab: Operações -->
  <div id="tab-operacoes" class="tab-content">
    <section>
      <h2>Entrada de Veículo</h2>
      <label>Placa:</label><input type="text" id="entradaPlaca" />
      <button onclick="operacoesController.registrarEntrada()">Registrar Entrada</button>
    </section>

    <section>
      <h2>Saída de Veículo</h2>
      <label>Placa:</label><input type="text" id="saidaPlaca" />
      <button onclick="operacoesController.registrarSaida()">Registrar Saída</button>
    </section>

    <section class="status-veiculos">
      <h2>Veículos no Estacionamento</h2>
      <button onclick="operacoesController.listarVeiculosEstacionados()">Atualizar Lista</button>
      <div id="veiculosEstacionados"></div>
    </section>
  </div>

  <!-- Tab: Relatórios -->
  <div id="tab-relatorios" class="tab-content">
    <section>
      <h2>📋 Registros Finalizados</h2>
      <button onclick="operacoesController.listarRegistros()">Atualizar Registros</button>
      <ul id="registrosFinalizados"></ul>
    </section>
  </div>

  <!-- Carregamento dos scripts -->
  <!-- Models -->
  <script src="js/models/pessoa.js"></script>
  <script src="js/models/cliente.js"></script>
  <script src="js/models/veiculo.js"></script>
  <script src="js/models/funcionario.js"></script>
  <script src="js/models/registro.js"></script>
  
  <!-- Utils -->
  <script src="js/utils/storage.js"></script>
  <script src="js/utils/formatters.js"></script>
  <script src="js/utils/validators.js"></script>
  
  <!-- Views -->
  <script src="js/views/clienteView.js"></script>
  <script src="js/views/veiculoView.js"></script>
  <script src="js/views/funcionarioView.js"></script>
  <script src="js/views/operacoesView.js"></script>
  
  <!-- Controllers -->
  <script src="js/controllers/clienteController.js"></script>
  <script src="js/controllers/veiculoController.js"></script>
  <script src="js/controllers/funcionarioController.js"></script>
  <script src="js/controllers/operacoesController.js"></script>
  
  <!-- App principal -->
  <script src="js/app.js"></script>
</body>
</html>

```

```css
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  line-height: 1.6;
}

section {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
}

input, select {
  margin: 5px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 250px;
}

button {
  margin: 5px;
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

h1 {
  color: #333;
  text-align: center;
}

h2 {
  margin-top: 0;
  color: #444;
}

label {
  display: inline-block;
  width: 150px;
  margin-right: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border-left: 3px solid #4CAF50;
}

.tab-navigation {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab-navigation button {
  margin: 0 5px;
  background-color: #ddd;
  color: #333;
}

.tab-navigation button.active {
  background-color: #4CAF50;
  color: white;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.status-veiculos {
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

```

Agora vamos criar os arquivos do diretório models:

```javascript
// arquivo: js/models/pessoa.js
class Pessoa {
  constructor(nome, documento) {
    if (new.target === Pessoa) throw new Error("Classe abstrata!");
    this.nome = nome;
    this.documento = documento;
  }
}

// arquivo: js/models/cliente.js
class Cliente extends Pessoa {
  constructor(id, nome, documento) {
    super(nome, documento);
    this.id = id;
  }
}

// arquivo: js/models/veiculo.js
class Veiculo {
  constructor(placa, modelo, cor, tipo, clienteId) {
    this.placa = placa;
    this.modelo = modelo;
    this.cor = cor;
    this.tipo = tipo;
    this.clienteId = clienteId;
  }
}

// arquivo: js/models/funcionario.js
class Funcionario extends Pessoa {
  constructor(nome, documento, matricula, cargo) {
    super(nome, documento);
    this.matricula = matricula;
    this.cargo = cargo;
  }
}

// arquivo: js/models/registro.js
class RegistroEstacionamento {
  constructor(id, veiculo, cliente, horaEntrada) {
    this.id = id;
    this.veiculo = veiculo;
    this.cliente = cliente;
    this.horaEntrada = horaEntrada;
    this.horaSaida = null;
    this.valorCobrado = null;
  }
}

```

Agora vamos criar as utilidades:

```javascript
// arquivo: js/utils/storage.js
const storage = {
  get: key => JSON.parse(localStorage.getItem(key)) || [],
  set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  add: (key, item) => {
    const items = storage.get(key);
    items.push(item);
    storage.set(key, items);
  },
  remove: (key, id) => {
    const items = storage.get(key).filter(item => item.id !== id);
    storage.set(key, items);
  },
  update: (key, updatedItem, idField = 'id') => {
    const items = storage.get(key).map(item => 
      item[idField] === updatedItem[idField] ? updatedItem : item
    );
    storage.set(key, items);
  },
  findById: (key, id, idField = 'id') => {
    return storage.get(key).find(item => item[idField] === id);
  }
};

// arquivo: js/utils/formatters.js
const formatters = {
  // Formata data para exibição
  formatarData: (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    const hora = String(dataObj.getHours()).padStart(2, '0');
    const minuto = String(dataObj.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
  },
  
  // Calcula e formata o tempo estacionado
  calcularTempoEstacionado: (entrada, agora) => {
    const diferencaMs = agora - entrada;
    const minutos = Math.floor(diferencaMs / (1000 * 60));
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    
    if (horas === 0) {
      return `${minutosRestantes} minuto(s)`;
    } else {
      return `${horas} hora(s) e ${minutosRestantes} minuto(s)`;
    }
  },
  
  // Formata valor para moeda brasileira
  formatarMoeda: (valor) => {
    return `R$ ${valor.toFixed(2)}`;
  }
};

// arquivo: js/utils/validators.js
const validators = {
  // Verifica se um texto está vazio
  campoVazio: (valor) => {
    return valor.trim() === '';
  },
  
  // Verifica se todos os campos do objeto estão preenchidos
  todosPreenchidos: (objeto) => {
    return Object.values(objeto).every(valor => 
      valor !== null && valor !== undefined && valor.toString().trim() !== ''
    );
  },
  
  // Verifica se um valor já existe em um array
  existeNoArray: (array, campo, valor) => {
    return array.some(item => item[campo] === valor);
  }
};

```

Vamos criar os arquivos da camada view:

```javascript
// arquivo: js/views/clienteView.js
const clienteView = {
  // Limpar formulário de cliente
  limparFormulario: () => {
    document.getElementById("clienteNome").value = "";
    document.getElementById("clienteDocumento").value = "";
    
    // Resetar botão de cadastro caso esteja em modo de edição
    const cadastrarBtn = document.querySelector("button[onclick^='clienteController.cadastrar']");
    if (cadastrarBtn) {
      cadastrarBtn.onclick = () => clienteController.cadastrar();
      cadastrarBtn.textContent = "Cadastrar Cliente";
    }
  },
  
  // Exibir lista de clientes
  exibirClientes: (clientes) => {
    const div = document.getElementById("clientesCadastrados");
    
    if (clientes.length === 0) {
      div.innerHTML = "<p>Nenhum cliente cadastrado.</p>";
      return;
    }
    
    div.innerHTML = "<ul>" + clientes.map(c => 
      `<li>${c.nome} - ${c.documento} 
      <button onclick="clienteController.editar(${c.id})">Editar</button>
      <button onclick="clienteController.remover(${c.id})">Remover</button></li>`
    ).join("") + "</ul>";
  },
  
  // Preencher o formulário para edição
  preencherFormulario: (cliente) => {
    document.getElementById("clienteNome").value = cliente.nome;
    document.getElementById("clienteDocumento").value = cliente.documento;
    
    const cadastrarBtn = document.querySelector("button[onclick^='clienteController.cadastrar']");
    cadastrarBtn.textContent = "Atualizar Cliente";
    cadastrarBtn.onclick = () => clienteController.atualizar(cliente.id);
  },
  
  // Preencher select de clientes
  preencherSelectClientes: (clientes) => {
    const selectCliente = document.getElementById("selectCliente");
    if (selectCliente) {
      selectCliente.innerHTML = clientes.map(c => 
        `<option value="${c.id}">${c.nome}</option>`
      ).join("");
    }
  }
};

// arquivo: js/views/veiculoView.js
const veiculoView = {
  // Limpar formulário de veículo
  limparFormulario: () => {
    document.getElementById("veiculoPlaca").value = "";
    document.getElementById("veiculoModelo").value = "";
    document.getElementById("veiculoCor").value = "";
    document.getElementById("veiculoTipo").value = "carro";
    
    // Resetar botão se estiver em modo de edição
    const cadastrarBtn = document.querySelector("button[onclick^='veiculoController.cadastrar']");
    if (cadastrarBtn) {
      cadastrarBtn.onclick = () => veiculoController.cadastrar();
      cadastrarBtn.textContent = "Cadastrar Veículo";
    }
  },
  
  // Exibir lista de veículos
  exibirVeiculos: (veiculos, clientes) => {
    const div = document.getElementById("veiculosCadastrados");
    
    if (veiculos.length === 0) {
      div.innerHTML = "<p>Nenhum veículo cadastrado.</p>";
      return;
    }
    
    div.innerHTML = "<ul>" + veiculos.map(v => {
      const cliente = clientes.find(c => c.id === v.clienteId);
      const clienteNome = cliente ? cliente.nome : "Cliente não encontrado";
      
      return `<li>
        <strong>${v.modelo}</strong> (${v.placa}) - ${v.cor} - ${v.tipo.toUpperCase()}<br>
        Cliente: ${clienteNome}
        <button onclick="veiculoController.editar('${v.placa}')">Editar</button>
        <button onclick="veiculoController.remover('${v.placa}')">Remover</button>
      </li>`;
    }).join("") + "</ul>";
  },
  
  // Preencher o formulário para edição
  preencherFormulario: (veiculo, clienteId) => {
    document.getElementById("veiculoPlaca").value = veiculo.placa;
    document.getElementById("veiculoModelo").value = veiculo.modelo;
    document.getElementById("veiculoCor").value = veiculo.cor;
    document.getElementById("veiculoTipo").value = veiculo.tipo;
    
    const selectCliente = document.getElementById("selectCliente");
    if (selectCliente) {
      for (let i = 0; i < selectCliente.options.length; i++) {
        if (parseInt(selectCliente.options[i].value) === clienteId) {
          selectCliente.selectedIndex = i;
          break;
        }
      }
    }
    
    const cadastrarBtn = document.querySelector("button[onclick^='veiculoController.cadastrar']");
    cadastrarBtn.textContent = "Atualizar Veículo";
    cadastrarBtn.onclick = () => veiculoController.atualizar(veiculo.placa);
  }
};

// arquivo: js/views/funcionarioView.js
const funcionarioView = {
  // Limpar formulário de funcionário
  limparFormulario: () => {
    document.getElementById("funcionarioNome").value = "";
    document.getElementById("funcionarioDocumento").value = "";
    document.getElementById("funcionarioMatricula").value = "";
    document.getElementById("funcionarioCargo").value = "atendente";
    
    // Resetar botão se estiver em modo de edição
    const cadastrarBtn = document.querySelector("button[onclick^='funcionarioController.cadastrar']");
    if (cadastrarBtn) {
      cadastrarBtn.onclick = () => funcionarioController.cadastrar();
      cadastrarBtn.textContent = "Cadastrar Funcionário";
    }
  },
  
  // Exibir lista de funcionários
  exibirFuncionarios: (funcionarios) => {
    const div = document.getElementById("funcionariosCadastrados");
    
    if (funcionarios.length === 0) {
      div.innerHTML = "<p>Nenhum funcionário cadastrado.</p>";
      return;
    }
    
    div.innerHTML = "<ul>" + funcionarios.map(f => 
      `<li>${f.nome} - ${f.cargo.toUpperCase()} (${f.matricula})<br>
      Documento: ${f.documento}
      <button onclick="funcionarioController.editar('${f.matricula}')">Editar</button>
      <button onclick="funcionarioController.remover('${f.matricula}')">Remover</button></li>`
    ).join("") + "</ul>";
  },
  
  // Preencher o formulário para edição
  preencherFormulario: (funcionario) => {
    document.getElementById("funcionarioNome").value = funcionario.nome;
    document.getElementById("funcionarioDocumento").value = funcionario.documento;
    document.getElementById("funcionarioMatricula").value = funcionario.matricula;
    document.getElementById("funcionarioCargo").value = funcionario.cargo;
    
    const cadastrarBtn = document.querySelector("button[onclick^='funcionarioController.cadastrar']");
    cadastrarBtn.textContent = "Atualizar Funcionário";
    cadastrarBtn.onclick = () => funcionarioController.atualizar(funcionario.matricula);
  }
};

// arquivo: js/views/operacoesView.js
const operacoesView = {
  // Exibir veículos no estacionamento
  exibirVeiculosEstacionados: (veiculosEstacionados) => {
    const div = document.getElementById("veiculosEstacionados");
    
    if (!div) return; // Se o elemento não existir na página atual
    
    if (veiculosEstacionados.length === 0) {
      div.innerHTML = "<p>Nenhum veículo no estacionamento.</p>";
      return;
    }
    
    div.innerHTML = "<ul>" + veiculosEstacionados.map(r => {
      const entrada = new Date(r.horaEntrada);
      const tempoEstacionado = formatters.calcularTempoEstacionado(entrada, new Date());
      
      return `<li>
        <strong>Placa:</strong> ${r.veiculo.placa}<br>
        <strong>Veículo:</strong> ${r.veiculo.modelo} (${r.veiculo.cor})<br>
        <strong>Cliente:</strong> ${r.cliente.nome}<br>
        <strong>Entrada:</strong> ${formatters.formatarData(entrada)}<br>
        <strong>Tempo:</strong> ${tempoEstacionado}
      </li>`;
    }).join("") + "</ul>";
  },
  
  // Exibir registros finalizados
  exibirRegistrosFinalizados: (registrosFinalizados) => {
    const lista = document.getElementById("registrosFinalizados");
    
    if (!lista) return; // Se o elemento não existir na página atual
    
    if (registrosFinalizados.length === 0) {
      lista.innerHTML = "<p>Nenhum registro finalizado.</p>";
      return;
    }
    
    lista.innerHTML = registrosFinalizados.map(r => {
      const entrada = new Date(r.horaEntrada);
      const saida = new Date(r.horaSaida);
      const tempoEstacionado = formatters.calcularTempoEstacionado(entrada, saida);
      
      return `<li>
        <strong>Cliente:</strong> ${r.cliente.nome}<br>
        <strong>Veículo:</strong> ${r.veiculo.modelo} (${r.veiculo.placa})<br>
        <strong>Entrada:</strong> ${formatters.formatarData(entrada)}<br>
        <strong>Saída:</strong> ${formatters.formatarData(saida)}<br>
        <strong>Tempo:</strong> ${tempoEstacionado}<br>
        <strong>Valor:</strong> ${formatters.formatarMoeda(r.valorCobrado)}
      </li>`;
    }).join("");
  },
  
  // Limpar campos de entrada e saída
  limparCamposOperacoes: () => {
    document.getElementById("entradaPlaca").value = "";
    document.getElementById("saidaPlaca").value = "";
  }
};

```

Agora vamos criar os arquivos da camada controller:

```javascript
// arquivo: js/controllers/clienteController.js
const clienteController = {
  // Cadastrar novo cliente
  cadastrar: () => {
    const nome = document.getElementById("clienteNome").value;
    const documento = document.getElementById("clienteDocumento").value;
    
    if (validators.campoVazio(nome) || validators.campoVazio(documento)) {
      return alert("Nome e documento são obrigatórios!");
    }
    
    const clientes = storage.get("clientes");
    const novoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
    const cliente = new Cliente(novoId, nome, documento);
    
    storage.add("clientes", cliente);
    alert("Cliente cadastrado com sucesso!");
    clienteController.listar();
    clienteView.limparFormulario();
  },
  
  // Listar clientes
  listar: () => {
    const clientes = storage.get("clientes");
    clienteView.exibirClientes(clientes);
    clienteView.preencherSelectClientes(clientes);
  },
  
  // Editar cliente
  editar: (id) => {
    const cliente = storage.findById("clientes", id);
    
    if (!cliente) {
      return alert("Cliente não encontrado!");
    }
    
    clienteView.preencherFormulario(cliente);
  },
  
  // Atualizar cliente
  atualizar: (id) => {
    const nome = document.getElementById("clienteNome").value;
    const documento = document.getElementById("clienteDocumento").value;
    
    if (validators.campoVazio(nome) || validators.campoVazio(documento)) {
      return alert("Nome e documento são obrigatórios!");
    }
    
    const clienteAtualizado = new Cliente(id, nome, documento);
    storage.update("clientes", clienteAtualizado);
    
    alert("Cliente atualizado com sucesso!");
    clienteController.listar();
    clienteView.limparFormulario();
  },
  
  // Remover cliente
  remover: (id) => {
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
    clienteController.listar();
  }
};

// arquivo: js/controllers/veiculoController.js
const veiculoController = {
  // Cadastrar novo veículo
  cadastrar: () => {
    const selectCliente = document.getElementById("selectCliente");
    
    if (!selectCliente || selectCliente.options.length === 0) {
      return alert("Cadastre um cliente primeiro!");
    }
    
    const clienteId = parseInt(selectCliente.value);
    const placa = document.getElementById("veiculoPlaca").value;
    const modelo = document.getElementById("veiculoModelo").value;
    const cor = document.getElementById("veiculoCor").value;
    const tipo = document.
```