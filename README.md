# 🛡️ Rota Segura – API de Seguros de Viagem

O **Rota Segura** é uma API desenvolvida para o gerenciamento de **seguros de viagem**, permitindo o cadastro, atualização e consulta de seguros, categorias e usuários.  
O projeto conta com autenticação JWT, documentação via Swagger e endpoints prontos para testes.

---

## 🚀 Funcionalidades

- **Cadastro e autenticação de usuários** (Cliente e Administrador)
- **Cadastro, listagem, atualização e exclusão** de seguros de viagem
- **Gerenciamento de categorias** de seguros
- **Relacionamento** entre seguros e categorias
- **Documentação interativa** via Swagger
- **Validações** para segurança e integridade dos dados

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** com **NestJS**
- **TypeORM** com **MySQL**
- **Swagger** para documentação
- **JWT** para autenticação
- **Class Validator** para validações
- **Insomnia** (para testes manuais da API)

---

## 📂 Estrutura do Projeto

src/
├── auth/ # Módulo de autenticação
├── categoria/ # CRUD de categorias
├── seguro/ # CRUD de seguros
├── usuario/ # CRUD de usuários
├── app.module.ts
└── main.ts

## 📜 Endpoints Principais

A documentação completa está disponível no Swagger, mas aqui vão alguns exemplos:

| Método | Rota                       | Descrição                                  | Autenticação 
|--------|----------------------------|--------------------------------------------|--------------
| POST   | `/usuarios`                | Cadastra um novo usuário                   | ❌           
| POST   | `/usuario/logar`           | Realiza login e gera token JWT             | ❌         
| GET    | `/seguros`                 | Lista todos os seguros                     | ✅           
| POST   | `/seguros`                 | Cria um novo seguro de viagem              | ✅ Admin     
| GET    | `/categoria`               | Lista todas as categorias                  | ✅           
| POST   | `/categoria`               | Cadastra uma nova categoria                | ✅ Admin     

---

## 🧪 Como Testar a API no Swagger

1. Rodar o projeto localmente:
   ```bash
   npm install
   npm run start:dev

2. Acessar a documentação:

   http://localhost:3000/api

3. Autenticar-se para testar rotas protegidas:

  - Fazer login no endpoint /usuario/logar
  - Copiar o token JWT retornado
  - Clicar em Authorize no Swagger e colar o token no formato:
    Bearer seu_token_aqui

--- 

👥 Participantes do Projeto
| Nome             | Função no Projeto |
| ---------------- | ----------------- |
| Dayse dos Santos | Product Owner     |
| Miguel Junior    | Tester            |
| Letícia Betman   | Desenvolvedora    |
| Maeli Oliveira   | Desenvolvedora    |
| Vitor Nazareth   | Desenvolvedor     |
| Luis Bispo       | Desenvolvedor     |

📌 Observações
- O projeto Rota Segura foi desenvolvido como parte de um trabalho prático para gerenciamento de seguros de viagem.
- Toda a API segue padrões REST e boas práticas de desenvolvimento.
- Para testes, pode-se utilizar tanto o Swagger quanto o Insomnia.

📄 Licença

Este projeto é de uso acadêmico e não possui fins comerciais.
