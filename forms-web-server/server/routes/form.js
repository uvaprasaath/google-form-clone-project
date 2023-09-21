import express from 'express';
import * as formController from '../controllers/formController';
import * as responseController from "../controllers/responsecontroller";
import Authenticate from '../utils/token'
const router = express.Router();



router.get('/:id',formController.getForm)
router.post('/response',responseController.addFormResponseController);
router.use(Authenticate.verifyToken)  
router.post('/',formController.createFormController);
router.put('/:id',formController.updateFormController);
router.put('/:id/views',formController.incrementViews);
router.get('/response/statistics',formController.getStatistics);
router.delete('/:id',formController.deleteFormController);
router.get('/response/:id',responseController.getAllResponses);

export default router;