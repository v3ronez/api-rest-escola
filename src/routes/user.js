import { Router } from 'express';
import user from '../controllers/User';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
// NÃO DEVERIA EXISTIR EM UM SISTEMA REAL (apenas para estudo)
router.get('/', user.index);
router.get('/:id', user.show);
//

router.put('/', loginRequired, user.update);
router.post('/', loginRequired, user.store);
router.delete('/', loginRequired, user.delete);

export default router;
