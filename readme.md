*[English readme](https://github.com/Goliass/anotacoes-backend-nodejs/blob/master/readme_en-US.md)*

# Anotações

Projeto pessoal de API REST Node.js (back-end) para anotações (ideias, lembretes, compras?).

Projeto também com o objetivo de colocar em prática / relembrar tecnologias, frameworks, conceitos, etc. da área de desenvolvimento de software que estou estudando: JavaScript/ECMAScript, [Node.js](https://nodejs.org) / [Express](https://expressjs.com/).

Em um futuro não muito distante espero melhorá-lo, aplicar correções,  incluir novas funcionalidades e integrá-lo com o projeto [Anotacoes](https://github.com/Goliass/Anotacoes) (front-end).

## Como executar (uma das formas) este projeto (sistema operacional Ubuntu/Linux)
  * Criação do banco de dados e tabelas utilizadas no projeto (Obs: favor pesquisar como instalar e acessar o MySQL Server)
  
    ```SQL
    CREATE DATABASE notes;
    USE notes;

    CREATE TABLE `notesToDo` (
      `key` INT UNSIGNED NOT NULL PRIMARY KEY,
      `description` VARCHAR(255) NOT NULL
    );

    CREATE TABLE `notesDone` (
      `key` INT UNSIGNED NOT NULL PRIMARY KEY,
      `description` VARCHAR(255) NOT NULL
    );

    CREATE TABLE `notesDeleted` (
      `key` INT UNSIGNED NOT NULL PRIMARY KEY,
      `description` VARCHAR(255) NOT NULL
    );
    ```

  * Download do projeto
    * opções **"Clone or download"** e [**"Download ZIP"**](https://github.com/Goliass/anotacoes-backend-nodejs/archive/master.zip).
    
  * Configurações e execução do servidor (terminal) (após extração do projeto / arquivo ZIP)
      * No arquivo **login.js** do projeto, substituir `<user>` e `<password>` pelo usuário e senha definidos na instalação do MySQL.

      * [se não estiver instalado] Instalar o gerenciador de pacotes [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):
        ```bash
        $ sudo npm install npm -g 
        ```

      * Acessar o diretório do servidor:
        ```bash
        $ cd server
        ```
      
      * Instalar as dependências (pacotes) utilizados pelo projeto:
        ```bash
        $ sudo npm install
        ```

      * Executar o servidor (<kbd>Ctrl + C</kbd> para Cancelar):
        ```bash
        $ npm start
        ```
        ou
        ```bash
        $ npm run dev
        ```
        Se o servidor executar corretamente, uma das mensagens exibidas no terminal deverá ser parecida com *'Server running on port [porta]...'*.

---

  * Com o servidor executando (ver acima), as requisições às seguintes rotas podem ser realizadas (no terminal com o comando *curl* ou com o programa [Postman](https://www.postman.com/), por exemplo):
  
    ```bash
    $ curl -X GET http://localhost:3001/ -v
    ```

    ```bash
    $ curl -X GET 'http://localhost:3001/search?description=o' -v
    ```
    ---

    ```bash   
    $ curl -X GET http://localhost:3001/notes/notes-to-do -v 
    ```

    ```bash
    $ curl -X GET http://localhost:3001/notes/notes-to-do/1 -v 
    ```

    ```bash
    $ curl -X POST http://localhost:3001/notes/notes-to-do \
        -H 'Content-Type: application/json' \
        -d '{
          "key": 1,
          "description": "anotacao adicionada"
        }' -v
    ```

    ```bash
    $ curl -X PUT http://localhost:3001/notes/notes-to-do/1 \
        -H 'Content-Type: application/json' \
        -d '{
          "description": "atualizacao da descricao"
        }' -v
    ```

    ```bash
    $ curl -X DELETE http://localhost:3001/notes/notes-to-do/1 -v
    ```

    ---

    ```bash
    $ curl -X GET http://localhost:3001/notes/notes-done -v 
    ```

    ```bash
    $ curl -X GET http://localhost:3001/notes/notes-done/1 -v
    ```

    ```bash
    $ curl -X POST http://localhost:3001/notes/notes-done \
    -H 'Content-Type: application/json' \
    -d '{
      "key": 1,
      "description": "anotacao verificada"
    }' -v
    ```

    ```bash
    $ curl -X DELETE http://localhost:3001/notes/notes-done/1 -v
    ```

    ---


    ```bash
    $ curl -X GET http://localhost:3001/notes/notes-deleted -v 
    ```

    ```bash
    $ curl -X GET http://localhost:3001/notes/notes-deleted/1 -v 
    ```

    ```bash
    $ curl -X POST http://localhost:3001/notes/notes-deleted \
    -H 'Content-Type: application/json' \
    -d '{
      "key": 1,
      "description": "anotacao excluida"
    }' -v
    ```

    ```bash
    $ curl -X DELETE http://localhost:3001/notes/notes-deleted/1 -v
    ```

  * Verificação das respostas (alguns dos tópicos listados abaixo não aparecem em todas as requisições / rotas):
  
    - [*HTTP status code*](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) e [*Location*](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Localiza%C3%A7%C3%A3o):
      ```
      >
      < HTTP/1.1 200 OK
      <
      ```

      ```
      >
      < HTTP/1.1 201 Created
      <...
      < Location: /notes/notes-to-do/1
      ```

      ```
      >
      < HTTP/1.1 201 Created
      <...
      < Location: /notes/notes-done/1
      ```

      ```
      >
      < HTTP/1.1 201 Created
      <...
      < Location: /notes/notes-deleted/1
      ```

      ```
      >
      < HTTP/1.1 204 No Content
      <...
      ```

      ```
      >
      < HTTP/1.1 400 Bad Request
      <...
      ```

      ```
      >
      < HTTP/1.1 404 Not Found
      <...
      ```

      ```
      >
      < HTTP/1.1 409 Conflict      
      <...
      ```

      ```
      >
      < HTTP/1.1 500 Internal Server Error
      <...
      ```

    - Textos possíveis em formato [JSON](https://pt.wikipedia.org/wiki/JSON) no corpo da resposta:
      ```json
      {
        "message": "https://github.com/Goliass/anotacoes-backend-nodejs"
      }
      ```

      ```json
      {
          "notesToDo": [
              {
                  "key": 1,
                  "description": "anotacao adicionada"
              }
          ],
          "notesDone": [
              {
                  "key": 1,
                  "description": "anotacao verificada"
              }
          ],
          "notesDeleted": [
              {
                  "key": 1,
                  "description": "anotacao excluida"
              }
          ]
      }
      ```

      ---

      ```json
      {
          "notes": [
              {
                  "key": 1,
                  "description": "anotacoes"
              }
          ]
      }
      ```

      ```json
      {
          "notes": []
      }
      ```

      ```json
      {
          "note": {
              "key": 1,
              "description": "anotacao adicionada"
          },
          "links": [
              {
                  "href": "http://localhost:3001/notes/notes-to-do/1",
                  "rel": "Update",
                  "method": "PUT",
                  "params": {
                      "description": "new value"
                  }
              },
              {
                  "href": "http://localhost:3001/notes/notes-to-do/1",
                  "rel": "Delete",
                  "method": "DELETE"
              }
          ]
      }
      ```

      ---

      ```json
      {
          "note": {
              "key": 1,
              "description": "anotacao verificada"
          },
          "links": [
              {
                  "href": "http://localhost:3001/notes/notes-done/1",
                  "rel": "Delete",
                  "method": "DELETE"
              }
          ]
      }
      ```

      ```json
      {
          "note": {
              "key": 1,
              "description": "anotacao excluida"
          },
          "links": [
              {
                  "href": "http://localhost:3001/notes/notes-deleted/1",
                  "rel": "Delete",
                  "method": "DELETE"
              }
          ]
      }
      ```

      ```json
      {
          "errors": [
              {
                  "value": 0,
                  "msg": "The key parameter must be an integer value greater than or equal to 1",
                  "param": "key",
                  "location": "body"
              },
              {
                  "value": "",
                  "msg": "The description parameter must have at least 1 character",
                  "param": "description",
                  "location": "body"
              }
          ]
      }
      ```

## Agradecimentos / fontes de estudo (entre outros)

  * [Alura](https://www.alura.com.br/)
  * [MDN Web Docs (Mozilla)](https://developer.mozilla.org)
  * [W3Schools](https://www.w3schools.com)
  * [Node.js](https://nodejs.org)
  * [Express](http://expressjs.com/)
  * [NPM](https://www.npmjs.com/)
  * [Stack Overflow](https://stackoverflow.com/)

## Autor(es)
[Elías Sauthier](https://github.com/Goliass)

## Licença
[Licença MIT](LICENSE.txt)

--- 
