// Define uma classe base chamada Pessoa
export class Pessoa {
    constructor(nome, documento) {
        // Garante que a classe Pessoa não pode ser instanciada diretamente (classe abstrata)
        if (new.target === Pessoa) {
            throw new Error("Pessoa é uma classe abstrata.");
        }

        // Atribui o nome e o documento passados como parâmetros
        this.nome = nome;
        this.documento = documento;
    }
}

// Define a classe Cliente que herda de Pessoa
export class Cliente extends Pessoa {
    // Atributo estático para controlar o último ID atribuído a um cliente
    static ultimoId = 1;

    constructor(nome, documento) {
        super(nome, documento); // Chama o construtor da classe Pessoa

        // clienteId serve para criar o vínculo entre o veículo e seu proprietário (o cliente), o que permite, por exemplo:
        // Buscar todos os veículos de um cliente,
        // Verificar quem é o dono de um veículo específico,
        // Gerenciar registros de estacionamento por cliente.
        this.id = Cliente.ultimoId++; // Atribui um ID único e incrementa o contador

        this.veiculos = []; // Inicializa um array vazio de veículos associados ao cliente
    }
}

// Exemplo de uso das classes:
// 1 Suponha que você crie um cliente assim:
// const cliente1 = new Cliente("Ana", "123456789");
// 2 Esse cliente terá um id gerado automaticamente:
// console.log(cliente1.id); // Ex: 1
// 3 E depois você cria um veículo pertencente a esse cliente:
// const carro1 = new Veiculo("ABC1234", "Civic", "Preto", "Carro", cliente1.id);
// 4 Agora, o carro está associado ao cliente Ana, porque:
// carro1.clienteId === cliente1.id; // true

// 2. Criar alguns veículos e associar ao cliente pelo id:
// const veiculo1 = new Veiculo("ABC1234", "Civic", "Preto", "Carro", cliente1.id);
// const veiculo2 = new Veiculo("XYZ5678", "Fit", "Prata", "Carro", cliente1.id);

// 3. Adicionar os veículos no array do cliente:
// cliente1.veiculos.push(veiculo1, veiculo2);

// 4. Buscar os veículos associados a esse cliente (por clienteId):
// const todosVeiculos = [veiculo1, veiculo2];

// Define a classe Funcionario que também herda de Pessoa
export class Funcionario extends Pessoa {
    constructor(nome, documento, matricula, cargo) {
        super(nome, documento); // Chama o construtor da classe Pessoa
        this.matricula = matricula; // Atribui a matrícula do funcionário
        this.cargo = cargo;         // Atribui o cargo do funcionário
    }
}

// Define a classe Veiculo (não herda de nenhuma outra classe)
export class Veiculo {
    constructor(placa, modelo, cor, tipo, clienteId) {
        // Atribui os dados do veículo passados como parâmetros
        this.placa = placa;
        this.modelo = modelo;
        this.cor = cor;
        this.tipo = tipo;
        // Armazena o ID do cliente dono do veículo serve para associar um veículo a um cliente específico por meio de um identificador único (clienteId), que foi atribuído anteriormente à instância de Cliente.
        this.clienteId = clienteId; 
    }
}

// Define a classe RegistroEstacionamento que representa uma entrada no estacionamento
export class RegistroEstacionamento {
    // Atributo estático que garante IDs únicos para cada registro
    static ultimoId = 1;

    constructor(veiculo, cliente) {
        this.id = RegistroEstacionamento.ultimoId++; // Gera um ID único para o registro
        this.veiculo = veiculo;    // Armazena o objeto do veículo relacionado
        this.cliente = cliente;    // Armazena o objeto do cliente relacionado
        this.horaEntrada = new Date(); // Registra a hora atual como hora de entrada
        this.horaSaida = null;         // Inicialmente não há hora de saída
        this.valorCobrado = null;      // Inicialmente o valor cobrado é indefinido
    }
}

// O código utiliza conceitos de POO:

// 1. Abstração
// Classe Pessoa representa uma entidade genérica.

// Não pode ser instanciada diretamente (classe abstrata).

// 2. Herança
// Cliente e Funcionario herdam de Pessoa.

// Reaproveitamento de atributos e lógica.

// 3. Encapsulamento
// Organização dos dados dentro de classes.

// Embora sem getters/setters, os dados estão encapsulados.

// 4. Polimorfismo (preparado)
// Estrutura permite criar métodos sobrescritos.

// Ainda não está implementado, mas é possível aplicar.

// 5. Atributos Estáticos
// Usados para controle automático de IDs (Cliente, RegistroEstacionamento).

// 6. Modularização
// Uso de export class permite reutilizar as classes em outros arquivos.

