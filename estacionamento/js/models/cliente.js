import { Pessoa } from './pessoa.js';

export class Cliente extends Pessoa {
  constructor(id, nome, documento) {
    super(nome, documento);
    this.id = id;
  }
}