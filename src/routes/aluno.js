import { Router } from 'express';
import aluno from '../controllers/Aluno';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

//
router.get('/', aluno.index);
router.get('/:id', aluno.show);
//

router.post('/', loginRequired, aluno.store);
router.put('/:id', loginRequired, aluno.update);
router.delete('/:id', loginRequired, aluno.delete);

export default router;
