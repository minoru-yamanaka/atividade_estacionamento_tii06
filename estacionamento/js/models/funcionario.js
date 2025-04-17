// models/funcionario.js

import { Pessoa } from './pessoa.js';

export class Funcionario extends Pessoa {
  constructor(nome, documento, matricula, cargo) {
    super(nome, documento);
    this.matricula = matricula;
    this.cargo = cargo;
  }
}