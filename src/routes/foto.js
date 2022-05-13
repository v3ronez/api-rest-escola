import { Router } from 'express';
import foto from '../controllers/Foto';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, foto.store);

export default router;
