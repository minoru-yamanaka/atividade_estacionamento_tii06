
// npm init -y -> cria o package.json no seu projeto
// npm install -> instala as dependências do projeto
// node .\teste.js -> executa o arquivo teste.js

// class Pessoa  

class Pessoa {
    #nome;
    #documento;

    constructor(nome, documento) {
        this.#nome = nome;
        this.#documento = documento;
    }

    get nome() { return this.#nome; }
    get documento() { return this.#documento; }
}

PessoaJoao= new Pessoa("João", "12345678900");
console.log(PessoaJoao.nome, PessoaJoao.documento) // Imprimi João

// class Utils
class Utils {

    static getProximoId(prefixo = '') {
        let maxId = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            if (chave.startsWith(prefixo)) {
                const idNum = parseInt(chave.replace(prefixo, ''));
                if (!isNaN(idNum)) {
                    maxId = Math.max(maxId, idNum);
                }
            }
        }
        return prefixo + (maxId + 1);
    }   
}

// class Cliente
class Cliente {
    #id;
    #nome;
    #ativo;

    constructor(nome) {        
        this.#id = Utils.getProximoId('cliente-');
        this.#nome = nome;
        this.#ativo = true;
    }
    
    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get ativo() { return this.#ativo; }

    toString() {
        let mensagem = `Nome: ${this.#nome} ID: ${this.#id}`;
        if (!this.#ativo) {
            mensagem += " [INATIVO]";
        }
        return mensagem;
    }

    atualizarNome(novoNome) {
        if(!novoNome || novoNome.length < 3) {
            throw new Error("Dados inválidos para atualização");
        }

        this.#nome = novoNome;
    }

    static fromJSONorObject(json) {
        const cliente = new Cliente(json.nome);
        cliente.#id = json.id;
        return cliente;
    }
}

ClientePaulo = new Cliente("Paulo");
console.log(ClientePaulo.nome, ClientePaulo.id) // Imprimi Paulo e o ID



