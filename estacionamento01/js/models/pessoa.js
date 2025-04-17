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