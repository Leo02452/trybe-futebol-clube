<h1 align="center">Trybe Futebol Clube</h1>


## Índice

- [Descrição](#page_facing_up-descrição)
- [Próximos passos](#construction-próximos-passos)
- [Habilidades desenvolvidas](#bulb-habilidades-desenvolvidas)
- [Funcionalidades](#sparkles-funcionalidades)
- [Ferramentas](#hammer_and_wrench-ferramentas)
- [Como usar a aplicação](#computer-como-usar-a-aplicação)
- [Autor](#memo-autor)


## :page_facing_up: Descrição

Esse projeto foi desenvolvido durante o módulo de backend na [Trybe](https://www.betrybe.com/). A aplicação é um site informativo sobre partidas e classificações de futebol. Com o frontend já pronto e disponibilizado pela Trybe, o desafio foi construir um backend dockerizado utilizando NODE.js e Typescript que respeitasse as regras de negócio providas no projeto.

Além disso, o desafio foi criar essa API com POO e com os princípios de SOLID.

O projeto original foi entregue, mas entendendo que há espaço para melhorias, coloquei na seção de próximos passos tarefas extras que quero implementar.


## :construction: Próximos passos
<details>
  <summary><strong>Ver mais</strong></summary>

- [ ] Criar uma documentação Swagger para a API.
- [ ] Refatorar o backend utilizando o padrão de repository (que já foi usado na rota de login)
- [ ] Terminar os testes para cobrir 100% da aplicação (cobertura atualmente em 80%)
</details>


## :bulb: Habilidades desenvolvidas
<details>
  <summary><strong>Ver mais</strong></summary>

- Criar um dockerfile para o frontend

- Criar um dockerfile para o backend

- Utilizar POO

- Utilizar SOLID

- Fazer testes de integração

- Estabelecer comunicação entre backend e frontend

- Autenticar rotas com JWT
</details>


## :sparkles: Funcionalidades
<details>
  <summary><strong>Ver mais</strong></summary>

:heavy_check_mark: Fazer login

:heavy_check_mark: Validar login

:heavy_check_mark: Listar todos os times

:heavy_check_mark: Listar apenas um time

:heavy_check_mark: Criar uma partida

:heavy_check_mark: Finalizar uma partida

:heavy_check_mark: Filtrar partidas finalizadas

:heavy_check_mark: Listar classificação dos times mandantes

:heavy_check_mark: Listar classificação dos times visitantes

:heavy_check_mark: Listar classificação geral
</details>


## :hammer_and_wrench: Ferramentas
<details>
  <summary><strong>Ver mais</strong></summary>

* [NODE.js](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [Express](https://expressjs.com/pt-br/) para criar a API
* [Express-async-errors](https://www.npmjs.com/package/express-async-errors) para capturar erros
* [Eslint](https://eslint.org/) para padronizar o código e evitar code-smells
* [Nodemon](https://nodemon.io/) para monitorar a aplicação em tempo real durante o desenvolvimento
* [JWT](https://jwt.io/) para autenticação de rotas
* [Bcrypt](https://www.npmjs.com/package/bcrypt) para criptografar e validar senha de usuários
* [Joi](https://joi.dev/) para validar dados vindos de requisições
* [Dotenv](https://www.npmjs.com/package/dotenv) para usar variáveis de ambiente
* [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) e [Sinon](https://sinonjs.org/) para testar a aplicação
* [Istanbul](https://istanbul.js.org/) para medir a cobertura de testes da aplicação
* [Sequelize](https://sequelize.org/) para mapear o banco de dados
* [MySQL](https://www.mysql.com/) para banco de dados
</details>


## :computer: Como usar a aplicação
<details>
  <summary><strong>Pré-requisitos</strong></summary>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Node.js (v16)](https://nodejs.org/en/)
- [Git](https://git-scm.com)
- [MySQL](https://www.mysql.com/)
</details>

<details>
  <summary><strong>Instale as dependências</strong></summary>
1 - Clone esse repositório para sua máquina com o seguinte comando:

```bash
 git clone git@github.com:Leo02452/trybe-futebol-clube.git
```

2 - Entre na pasta criada:

```
 cd trybe-futebol-clube
```

3 - Instale as dependências:

```
 npm install
```
</details>

<details>
  <summary><strong>Rodando a aplicação localmente</strong></summary>
4 - Entre na pasta do backend e inicie a aplicação:

```
 cd app/backend && npm start
```

5 - Em um novo terminal, entre na pasta do frontend e inicie a aplicação:

```
 cd app/frontend && npm start
```

</details>

<details>
  <summary><strong>Rodando a aplicação via docker</strong></summary>

Antes de começar, você vai precisar ter instalado em sua máquina, além de NODE e Git, as seguintes ferramentas:

- [Docker](https://www.docker.com/)
- [Docker-compose](https://docs.docker.com/compose/) na versão igual ou superior a 16.05.0

4 - Inicie a aplicação no terminal:

```
 npm run compose:up:dev
```

Se não abrir uma página no navegador automáticamente, acesse o endereço `localhost:3000/`
</details>

<details>
  <summary><strong>Outros scripts da aplicação (backend)</strong></summary>

* `npm run build` para buildar a aplicação
* `npm run db:reset` para deletar, re-criar, fazer a migração e alimentação do banco de dados
* `npm run dev` para rodar a aplicação com Nodemon e atualizá-la automaticamente após alteração de qualquer arquivo dentro da pasta src;
* `npm run test` para rodar todos os testes;
* `npm run test:coverage` para rodar todos os testes e gerar o relatório de cobertura na tela do terminal;
* `npm run test:coverage:json` para rodar todos os testes e gerar o relatório de cobertura em json, acessível na pasta `/coverage`;
* `npm run lint` para rodar o ESLint;
</details>


## :memo: Autor

Desenvolvido por Leonardo Araujo

Email: leonardo_02452@hotmail.com

Github: https://github.com/Leo02452

LinkedIn: https://www.linkedin.com/in/leo02452/

---
