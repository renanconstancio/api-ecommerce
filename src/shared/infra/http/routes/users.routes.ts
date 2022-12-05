import { Router } from 'express';

import PatchUserController from '@modules/users/useCases/patchUser/patchUserController';
import DeleteUserController from '@modules/users/useCases/deleteUser/deleteUserController';

const usersRoutes = Router();

usersRoutes
  .post('/', new PatchUserController().handle)
  .put('/:id', new PatchUserController().handle)
  .patch('/', new PatchUserController().handle)
  .delete('/:id', new DeleteUserController().handle);
// .get('/:id', new FindProductSkuController().handle);

export default usersRoutes;
