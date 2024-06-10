import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
  userService.getAllUsers()
    .then(users => {
      res.data = users;
      next();
    })
    .catch(error => {
      res.error = { status: 400, message: error.message };
      next();
    });
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  userService.getUserById(req.params.id)
    .then(user => {
      if (user) {
        res.data = user;
      } else {
        res.error = { status: 404, message: 'User not found' };
      }
      next();
    })
    .catch(error => {
      res.error = { status: 400, message: error.message };
      next();
    });
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
  userService.createUser(req.body)
    .then(newUser => {
      res.data = newUser;
      next();
    })
    .catch(error => {
      res.error = { status: 400, message: error.message };
      next();
    });
}, responseMiddleware);

router.patch('/:id', updateUserValid, (req, res, next) => {
  userService.updateUser(req.params.id, req.body)
    .then(updatedUser => {
      if (updatedUser) {
        res.data = updatedUser;
      } else {
        res.error = { status: 404, message: 'User not found' };
      }
      next();
    })
    .catch(error => {
      res.error = { status: 400, message: error.message };
      next();
    });
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  userService.deleteUser(req.params.id)
    .then(deletedUser => {
      if (deletedUser) {
        res.data = deletedUser;
      } else {
        res.error = { status: 404, message: 'User not found' };
      }
      next();
    })
    .catch(error => {
      res.error = { status: 400, message: error.message };
      next();
    });
}, responseMiddleware);

export { router };
