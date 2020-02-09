const { Router } = require('express'); 

const NotesDeletedController = require('../controllers/NotesDeletedController');

const router = Router();

const routes = NotesDeletedController.routes();
const params = NotesDeletedController.reqParams();

router.get(routes.listing, NotesDeletedController.load);

router.post(routes.creation,
  NotesDeletedController.paramsValidation(params.key, params.description),
  NotesDeletedController.add
);

router.get(routes.searchByKey, 
  NotesDeletedController.paramsValidation(params.key),
  NotesDeletedController.searchByKey
);

router.delete(routes.delete,
  NotesDeletedController.paramsValidation(params.key),
  NotesDeletedController.delete
);

module.exports = router;