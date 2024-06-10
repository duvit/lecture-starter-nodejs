import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
  res.data = userService.getAllUsers();
  next();
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  const user = userService.getUserById(req.params.id);
  if (user) {
    res.data = user;
  } else {
    res.error = { status: 404, message: "User not found" };
  }
  next();
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
  res.data = userService.createUser(req.body);
  next();
}, responseMiddleware);

router.patch('/:id', updateUserValid, (req, res, next) => {
  const user = userService.updateUser(req.params.id, req.body);
  if (user) {
    res.data = user;
  } else {
    res.error = { status: 404, message: "User not found" };
  }
  next();
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  const success = userService.deleteUser(req.params.id);
  if (success) {
    res.data = { message: "User deleted successfully" };
  } else {
    res.error = { status: 404, message: "User not found" };
  }
  next();
}, responseMiddleware);

export { router };
