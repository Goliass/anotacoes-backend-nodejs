const { check, validationResult } = require('express-validator');
const arrayFlat = require('../utils/arrayFlat');

const connectionFactory = require('../db/connectionFactory');
const NotesDeletedDAO = require('../db/DAO/NotesDeletedDAO');

const httpStatus = require('../utils/httpStatus');

const Note = require('../models/Note');

const logger = require('../services/logger');

const serverAddress = require('../utils/serverAddress');
const route = '/notes/notes-deleted';

const reqParams = {
  key: "key",
  description: "description"
};

const routes = {
  listing: route,
  creation: route,
  searchByKey: `${route}/:${reqParams.key}`,
  delete: `${route}/:${reqParams.key}`
};

class NotesDeletedController {
  static paramsValidation(...paramNames) {

    const validation = [

      function validationRules() {
        const params = arrayFlat(paramNames, Infinity);

        let rules = [];

        if (params) {
          params.forEach(param => {
            switch (param) {
              case reqParams.key:
                rules.push(
                  check(reqParams.key)
                    .isInt({ min: 1 }).withMessage(`The ${reqParams.key} parameter must be an integer value greater than or equal to 1`)
                )
                break;

              case reqParams.description:
                  rules.push(
                    check(reqParams.description)
                      .trim()
                      .isLength({ min: 1 }).withMessage(`The ${reqParams.description} parameter must have at least 1 character`)
                      .escape()
                  )
                break;

              default:
                break;
            }
          });
        }

        return rules;
      }(),

      function validate(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(httpStatus.badRequest).json(errors);
        }

        next();
      }
    ];

    return validation; // [ rules[], validate() ]
  }

  static searchByKey(req, res) {
    const note = new Note(req.params[`${reqParams.key}`], 'searchByKey');

    const connection = connectionFactory();
    const notesDeletedDAO = new NotesDeletedDAO(connection);

    notesDeletedDAO.searchByKey(note.key)
      .then(results => {
        if (!results.length) {
          logger.info(`Notes-deleted search by '${note.key}' result: no results`);

          let response = {
            message: `Search by '${note.key}' result: no results`
          }

          return res.status(httpStatus.notFound).json(response);
        }

        logger.info(`Notes-deleted search by ${note.key} result: ${results.length} notes`);

        let response = {
          notes: results
        };

        return res.json(response);
      })
      .catch(error => {
        logger.error(`While searching by ${note.key} in notes-deleted: ${error}`);

        return res.status(httpStatus.internalServerError).end();
      })
  }

  static searchByDescription(description) {
    // description validation by instance creation
    const note = new Note(1, description);

    const connection = connectionFactory();
    const notesDeletedDAO = new NotesDeletedDAO(connection);

    return notesDeletedDAO.searchByDescription(note.description)
      .catch(error => {
        logger.error(`While searching by ${note.description} in notes-deleted: ${error}`);

        throw new Error(error);
      })
  }

  static load(req, res) {
    const connection = connectionFactory();
    const notesDeletedDAO = new NotesDeletedDAO(connection);
  
    notesDeletedDAO.load()
      .then(results => {
        logger.info(`notes-deleted load result: ${results.length} notes`);
  
        let response = {
          notes: results
        };

        return res.json(response);
      })
      .catch(error => {
        logger.error(`While loading notes-deleted: ${error}`);
  
        return res.status(httpStatus.internalServerError).end();
      })
  }

  static add(req, res) {
    const note = new Note(req.body[`${reqParams.key}`], req.body[`${reqParams.description}`]);

    const connection = connectionFactory();
    const notesDeletedDAO = new NotesDeletedDAO(connection);

    // only add if note doesn't already exist
    notesDeletedDAO.searchByKey(note.key)
      .then(results => {
        if (results.length) {
          logger.info(`While adding note-deleted: note ${note.key} already added`);

          let response = {
            message: `Note ${note.key} already added`
          };

          return res.status(httpStatus.conflict).json(response);
        }

        notesDeletedDAO.add(note)
          .then(() => {
            // noteRes instead of the var 'note' directly, because res.json(note)/JSON.stringify(note) sends his private fields names  (eg.: note._key)
            const noteRes = {
              key: note.key,
              description: note.description
            };            

            logger.info(`Note-deleted added: ${JSON.stringify(noteRes)}`);

            let links = NotesDeletedController.hateoas(req, note);
        
            let response = {
              note: noteRes,
              links: links
            };

            res.location(`${route}/${note.key}`);
            return res.status(httpStatus.created).json(response);
          })
          .catch(error => {
            logger.error(`While adding note-deleted ${note.key}: ${error}`);
    
            return res.status(httpStatus.internalServerError).end();
          })
      })
      .catch(error => {
        logger.error(`While searching by ${note.key} in notes-deleted: ${error}`);

        return res.status(httpStatus.internalServerError).end();  
      })
  }

  static delete(req, res) {
    const note = new Note(req.params[`${reqParams.key}`], "deleted");

    const connection = connectionFactory();
    const notesDeletedDAO = new NotesDeletedDAO(connection);

    notesDeletedDAO.delete(note)
      .then(results => {
        if (!results.affectedRows) {
          logger.info(`While removing note-deleted: note ${note.key} does not exist`);

          let response = {
            message: `Note ${note.key} does not exist`
          };
          
          return res.status(httpStatus.notFound).json(response);
        }

        logger.info(`note-deleted ${note.key} deleted`);
  
        return res.status(httpStatus.noContent).end();
      })
      .catch(error => {
        logger.error(`While removing note-deleted ${note.key}: ${error}`);

        return res.status(httpStatus.internalServerError).end();
      })
  }

  static routes() {
    return routes;
  }

  static reqParams() {
    return reqParams;
  }

  static hateoas(request="", note="") {
    let links = "";

    if (request && request.method && note && note.key) {
      links = [];
      let address = serverAddress(request);

      if (request.method == "POST") {
        links.push(
          {
            href: `${address}${route}/${note.key}`,
            rel: "Delete",
            method: "DELETE"
          }
        );
      }
    }

    return links;
  }
}

module.exports = NotesDeletedController;