// models/veiculo.js
export class Veiculo {
    constructor(placa, modelo, cor, tipo, clienteId) {
      this.placa = placa;
      this.modelo = modelo;
      this.cor = cor;
      this.tipo = tipo;
      this.clienteId = clienteId;
    }
  }