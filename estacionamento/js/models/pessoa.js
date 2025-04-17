// models/pessoa.js
export class Pessoa {
    constructor(nome, documento) {
      if (new.target === Pessoa) throw new Error("Classe abstrata!");
      this.nome = nome;
      this.documento = documento;
    }
  }