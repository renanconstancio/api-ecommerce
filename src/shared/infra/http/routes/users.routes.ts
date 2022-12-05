import { Router } from 'express';

import PatchUserController from '@modules/users/useCases/patchUser/patchUserController';
import DeleteUserController from '@modules/users/useCases/deleteUser/deleteUserController';
import LoginUserController from '@modules/users/useCases/loginUser/loginUserController';

const usersRoutes = Router();

usersRoutes
  .post('/login', new LoginUserController().handle)
  .post('/', new PatchUserController().handle)
  .put('/:id', new PatchUserController().handle)
  .patch('/', new PatchUserController().handle)
  .delete('/:id', new DeleteUserController().handle);
// .get('/:id', new FindProductSkuController().handle);

export default usersRoutes;
