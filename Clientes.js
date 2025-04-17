// 2. Cliente extends Pessoa
// > - id: number (único e incremental)
// > - veiculos: Veiculo[] — lista de veículos cadastrados para o cliente

import { Pessoa } from "./Pessoa";
import { Utils } from "./Utils.js";

export class Cliente {
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