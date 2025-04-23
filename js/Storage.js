// Exporta um objeto chamado LocalStorageManager que contém métodos para salvar e carregar dados do localStorage
export const LocalStorageManager = {
    
    // Método para salvar dados no localStorage
    // Recebe uma chave (string) e os dados (objeto/array) a serem salvos
    salvarDados(chave, dados) {
        // Converte os dados em string JSON e salva no localStorage usando a chave fornecida
        localStorage.setItem(chave, JSON.stringify(dados));
    },

    // Método para carregar dados do localStorage
    // Recebe uma chave (string) e retorna os dados armazenados, se existirem
    carregarDados(chave) {
        // Recupera os dados da chave do localStorage
        const dados = localStorage.getItem(chave);

        // Se houver dados, retorna o conteúdo convertido de volta para objeto/array com JSON.parse
        // Caso contrário, retorna um array vazio como valor padrão
        return dados ? JSON.parse(dados) : [];
    }
};

// Exporta um objeto chamado db que armazena as estruturas principais do sistema
// Cada propriedade tenta carregar os dados do localStorage, e se não existir nada, usa um array vazio como padrão
export const db = {
    // Carrega a lista de clientes do localStorage ou inicia como array vazio
    clientes: JSON.parse(localStorage.getItem('clientes')) || [],

    // Carrega a lista de funcionários do localStorage ou inicia como array vazio
    funcionarios: JSON.parse(localStorage.getItem('funcionarios')) || [],

    // Carrega a lista de veículos do localStorage ou inicia como array vazio
    veiculos: JSON.parse(localStorage.getItem('veiculos')) || [],

    // Carrega os registros de estacionamento do localStorage ou inicia como array vazio
    registrosEstacionamento: JSON.parse(localStorage.getItem('registrosEstacionamento')) || []
};

// Resumo do que o código faz:

// LocalStorageManager: Um utilitário para facilitar o salvamento e carregamento de dados com localStorage, usando JSON.stringify e JSON.parse.

// db: Um objeto centralizado que mantém os dados do sistema (clientes, funcionários, veículos e registros) carregados diretamente do localStorage ao iniciar a aplicação.