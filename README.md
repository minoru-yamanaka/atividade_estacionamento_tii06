# 🧾 Descrição do Problema — Sistema de Estacionamento
Você deve implementar um sistema de estacionamento com foco em operações básicas de cadastro, registro de entrada/saída de veículos e cálculo de cobrança. O sistema deve ser desenvolvido utilizando JavaScript com uma abordagem orientada a objetos. A persistência dos dados pode ser feita com Local Storage.

## 🎯 Objetivo
Registrar a entrada e saída de veículos em um estacionamento, mantendo o controle dos clientes, funcionários e dos registros de uso do estacionamento.

---

## 🧩 Classes e Atributos
1. Pessoa (classe abstrata)
Classe base para Cliente e Funcionario.

> - nome: string
> - documento: string (CPF ou RG)

2. Cliente extends Pessoa
> - id: number (único e incremental)
> - veiculos: Veiculo[] — lista de veículos cadastrados para o cliente

3. Funcionario extends Pessoa
> - matricula: string
> - cargo: string

4. Veiculo
> - placa: string (única, usada como identificador)
> - modelo: string
> - cor: string
> - tipo: string (carro, moto, etc.)
> - clienteId: number — dono do veículo

5. RegistroEstacionamento
Representa uma entrada/saída no estacionamento.

> - id: number
> - veiculo: Veiculo
> - cliente: Cliente
> - horaEntrada: Date
> - horaSaida: Date | null
> - valorCobrado: number | null

## 📋 Regras de Negócio
✅ Cadastro
Deve ser possível cadastrar:

- Clientes (com seus veículos).
- Funcionários (para fins de histórico, ainda que não usados no CRUD principal).
- Veículos associados a clientes.

✅ Estacionar Veículo
Um cliente pode registrar a entrada de um veículo, criando um novo RegistroEstacionamento com:

- horaEntrada = new Date()
- horaSaida = null
- valorCobrado = null

✅ Saída de Veículo
Ao sair, deve ser registrado:

- horaSaida = new Date()
O valor é calculado com base no tempo de permanência:
```
primeiraHora = R$ 10
horas adicionais = R$ 5 por hora cheia
Exemplo: 2h40min → R$ 10 + R$ 5 × 2 = R$ 20
```

✅ Listagem
Deve ser possível listar:

- Todos os clientes e seus veículos
- Veículos atualmente no estacionamento
- Registros finalizados com o valor cobrado

✅ Restrições
- Um mesmo veículo não pode entrar novamente sem ter uma saída registrada.
- Cada veículo deve estar vinculado a um único cliente.
- As placas dos veículos devem ser únicas.

## 💾 Persistência
Utilize Local Storage para armazenar:

- CRUD de clientes (com seus veículos)
- Lista de registros de estacionamento
- CRUD de funcionários (opcional, mas bem vindo)

## 🧪 Funcionalidades Esperadas

| Funcionalidade |	Página |
|----------------|---------|
| Cadastrar Cliente | cadastro-cliente.html |
| Cadastrar Veículo | cadastro-veiculo.html |
| Estacionar Veículo | entrada.html |
| Finalizar Estacionamento | saida.html |
| Listar Registros | registros.html |
