// models/registro.js
export class RegistroEstacionamento {
    constructor(id, veiculo, cliente, horaEntrada) {
      this.id = id;
      this.veiculo = veiculo;
      this.cliente = cliente;
      this.horaEntrada = horaEntrada;
      this.horaSaida = null;
      this.valorCobrado = null;
    }
  }