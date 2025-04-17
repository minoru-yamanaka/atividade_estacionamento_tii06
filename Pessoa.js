// 1. Pessoa (classe abstrata)
// Classe base para Cliente e Funcionario.

// > - nome: string
// > - documento: string (CPF ou RG)

export class Pessoa {

    constructor(nome, documento) {
        this.nome = nome;
        this.documento = documento;
        
    }
}