// main.js
import * as TabController from './controllers/tabController.js';
import * as ClienteController from './controllers/clienteController.js';
import * as VeiculoController from './controllers/veiculoController.js';
import * as FuncionarioController from './controllers/funcionarioController.js';
import * as OperacoesController from './controllers/operacoesController.js';

// Expor os controllers globalmente para uso nos event handlers inline
window.clienteController = ClienteController;
window.veiculoController = VeiculoController;
window.funcionarioController = FuncionarioController;
window.operacoesController = OperacoesController;

// Inicializar o sistema quando a página carregar
window.addEventListener('DOMContentLoaded', function() {
  // Inicializar arrays no localStorage se não existirem
  if (!localStorage.getItem("clientes")) {
    localStorage.setItem("clientes", JSON.stringify([]));
  }
  if (!localStorage.getItem("veiculos")) {
    localStorage.setItem("veiculos", JSON.stringify([]));
  }
  if (!localStorage.getItem("funcionarios")) {
    localStorage.setItem("funcionarios", JSON.stringify([]));
  }
  if (!localStorage.getItem("registros")) {
    localStorage.setItem("registros", JSON.stringify([]));
  }
  
  // Inicializar controladores
  TabController.initTabController();
  ClienteController.initClienteController();
  VeiculoController.initVeiculoController();
  FuncionarioController.initFuncionarioController();
  OperacoesController.initOperacoesController();
  
  // Mostrar a aba inicial
  TabController.showTab('tab-cliente');
});
