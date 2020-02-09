const { Router } = require('express'); 

const NotesDoneController = require('../controllers/NotesDoneController');

const router = Router();

const routes = NotesDoneController.routes();
const params = NotesDoneController.reqParams();

router.get(routes.listing, NotesDoneController.load);

router.post(routes.creation,
  NotesDoneController.paramsValidation(params.key, params.description),
  NotesDoneController.add
);

router.get(routes.searchByKey, 
  NotesDoneController.paramsValidation(params.key),
  NotesDoneController.searchByKey
);

router.delete(routes.delete,
  NotesDoneController.paramsValidation(params.key),
  NotesDoneController.delete
);

module.exports = router;