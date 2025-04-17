// controllers/tabController.js
export function initTabController() {
    document.querySelectorAll('.tab-navigation button').forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        showTab(tabId);
      });
    });
  }
  
  export function showTab(tabId) {
    // Ocultar todas as tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Remover classe ativa de todos os botões
    document.querySelectorAll('.tab-navigation button').forEach(button => {
      button.classList.remove('active');
    });
    
    // Ativar a tab selecionada
    document.getElementById(tabId).classList.add('active');
    
    // Ativar o botão correspondente
    document.querySelector(`.tab-navigation button[data-tab="${tabId}"]`).classList.add('active');
    
    // Atualizar o conteúdo da tab ativa
    switch(tabId) {
      case 'tab-cliente':
        import('./clienteController.js').then(module => module.listarClientes());
        break;
      case 'tab-veiculo':
        import('./veiculoController.js').then(module => module.listarVeiculos());
        break;
      case 'tab-funcionario':
        import('./funcionarioController.js').then(module => module.listarFuncionarios());
        break;
      case 'tab-operacoes':
        import('./operacoesController.js').then(module => module.listarVeiculosNoEstacionamento());
        break;
      case 'tab-relatorios':
        import('./operacoesController.js').then(module => module.listarRegistros());
        break;
    }
  }
  