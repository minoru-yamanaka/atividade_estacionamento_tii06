export function calcularCusto(entrada, saida) {
    const horaEntrada = new Date(entrada);
    const horaSaida = new Date(saida);
    
    // Calcular a diferença em horas (arredondar para cima)
    const diferencaMs = horaSaida - horaEntrada;
    const horas = Math.ceil(diferencaMs / (1000 * 60 * 60));
    
    // Primeira hora custa R$ 10, horas adicionais custam R$ 5 cada
    const valorPrimeiraHora = 10;
    const valorHorasAdicionais = Math.max(0, horas - 1) * 5;
    
    return valorPrimeiraHora + valorHorasAdicionais;
  }
  