import { Router } from 'express';
import { getSystemStatus } from '../controllers/system.controller.js';

const router = Router();
/*

GET:

/api/v1/system/status


*/

router.get('/status', getSystemStatus);

export default router;
