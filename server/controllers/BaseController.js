const { check, validationResult } = require('express-validator');
const arrayFlat = require('../utils/arrayFlat');

const httpStatus = require('../utils/httpStatus');

const logger = require('../services/logger');

const NotesToDoController = require('./NotesToDoController');
const NotesDoneController = require('./NotesDoneController');
const NotesDeletedController = require('./NotesDeletedController');

const reqParams = {
  key: "key",
  description: "description"
};

const routes = {
  root: '/',
  searchByDescription: `/search`
};

class BaseController {
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

  static root(req, res) {
    let response = {
      message: "https://github.com/Goliass/anotacoes-backend-nodejs"
    }

    return res.json(response);
  }

  static searchByDescription(req, res) {
    let description = req.query[`${reqParams.description}`];

    const notesToDoPromise = 
      NotesToDoController.searchByDescription(description);

    const notesDonePromise = 
      NotesDoneController.searchByDescription(description);

    const notesDeletedPromise = 
      NotesDeletedController.searchByDescription(description);

    Promise.all([notesToDoPromise, notesDonePromise, notesDeletedPromise])
      .then((results) => {
        let notes = arrayFlat(results, Infinity);

        if (!notes.length) {
          logger.info(`Notes search by '${description}' result: no results`);

          let response = {
            message: `Search by '${description}' result: no results`
          };

          return res.status(httpStatus.notFound).json(response);
        } 

        logger.info(`Notes search by ${description} result: ${notes.length} notes`);

        let response = {
          notesToDo: results[0],
          notesDone: results[1],
          notesDeleted: results[2]
        }
        
        return res.json(response);
      })
      .catch((error) => {
        logger.error(`While searching by ${description} in all notes: ${error}`);
        return res.status(httpStatus.internalServerError).end();
      });
  }

  static routes() {
    return routes;
  }

  static reqParams() {
    return reqParams;
  }
}

module.exports = BaseController;