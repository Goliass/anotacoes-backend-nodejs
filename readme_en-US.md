# Notes

Personal project of Node.js REST API (back-end) for notes (ideas, reminders, shopping list?).

Project also with the purpose of putting into practice / remember technologies, frameworks, concepts, etc. from the software development area I have been studying: JavaScript/ECMAScript, [Node.js](https://nodejs.org) / [Express](https://expressjs.com/).

In a not too far future I hope to improve it, apply fixes, include new features and integrate it with the [Anotacoes](https://github.com/Goliass/Anotacoes) project (front-end).

## How to run (one of the ways) this project (Ubuntu / Linux operating system)

  * Creation of the database and tables used in the project (Note: please research how to install and access MySQL Server)
  
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

  * Project download
    * **"Clone or download"** and [**"Download ZIP"**](https://github.com/Goliass/anotacoes-backend-nodejs/archive/master.zip) options.
    
  * Server settings and execution (terminal) (after project / ZIP file extraction)
      * In the **login.js** project file, replace `<user>` and `<password>` with the username and password defined in the MySQL installation.

      * [if not installed] Install [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) package manager:
        ```bash
        $ sudo npm install npm -g 
        ```

      * Access the server directory:
        ```bash
        $ cd server
        ```
      
      * Install the dependencies (packages) used by the project:
        ```bash
        $ sudo npm install
        ```

      * Run the server (<kbd>Ctrl + C</kbd> to Cancel):
        ```bash
        $ npm start
        ```
        or
        ```bash
        $ npm run dev
        ```
        If the server runs correctly, one of the messages displayed on the terminal should look similar to *'Server running on port [port]...'*.

---

  * With the server running (see above), requests to the following routes can be performed (on the terminal with *curl* command or with [Postman](https://www.postman.com/) software, for example):
  
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
          "description": "note added"
        }' -v
    ```

    ```bash
    $ curl -X PUT http://localhost:3001/notes/notes-to-do/1 \
        -H 'Content-Type: application/json' \
        -d '{
          "description": "description update"
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
      "description": "note verified"
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
      "description": "note deleted"
    }' -v
    ```

    ```bash
    $ curl -X DELETE http://localhost:3001/notthes/notes-deleted/1 -v
    ```

  * Responses verification (some of the topics listed below do not appear on all requests / routes):
  
    - [*HTTP status code*](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) and [*Location*](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location):
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

    - Possible texts in [JSON](https://pt.wikipedia.org/wiki/JSON) format in the body response:
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
                  "description": "note added"
              }
          ],
          "notesDone": [
              {
                  "key": 1,
                  "description": "note verified"
              }
          ],
          "notesDeleted": [
              {
                  "key": 1,
                  "description": "note deleted"
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
                  "description": "notes"
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
              "description": "note added"
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
              "description": "note verified"
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
              "description": "note deleted"
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

## Thanks / study sources (among others)

  * [Alura](https://www.alura.com.br/)
  * [MDN Web Docs (Mozilla)](https://developer.mozilla.org)
  * [W3Schools](https://www.w3schools.com)
  * [Node.js](https://nodejs.org)
  * [Express](http://expressjs.com/)
  * [NPM](https://www.npmjs.com/)
  * [Stack Overflow](https://stackoverflow.com/)

## Author(s)
[Elías Sauthier](https://github.com/Goliass)

## License
[MIT License](LICENSE.txt)

--- 
