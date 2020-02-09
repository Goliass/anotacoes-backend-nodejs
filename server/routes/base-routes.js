const express = require('express'); 
const BaseController = require('../controllers/BaseController');

const router = express.Router();

const routes = BaseController.routes();
const reqParams = BaseController.reqParams();

router.get(routes.root, BaseController.root);

router.get(routes.searchByDescription, 
  BaseController.paramsValidation(reqParams.description),
  BaseController.searchByDescription
);

module.exports = router;