const { Router } = require('express'); 

const NotesToDoController = require('../controllers/NotesToDoController');

const router = Router();

const routes = NotesToDoController.routes();
const params = NotesToDoController.reqParams();

router.get(routes.listing, NotesToDoController.load);

router.post(routes.creation,
  NotesToDoController.paramsValidation(params.key, params.description),
  NotesToDoController.add
);

router.get(routes.searchByKey, 
  NotesToDoController.paramsValidation(params.key),
  NotesToDoController.searchByKey
);

router.put(routes.update,
  NotesToDoController.paramsValidation(params.key, params.description),
  NotesToDoController.update
)

router.delete(routes.delete,
  NotesToDoController.paramsValidation(params.key),
  NotesToDoController.delete
);

module.exports = router;