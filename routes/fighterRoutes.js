import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
  res.data = fighterService.getAllFighters();
  next();
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  const fighter = fighterService.getFighterById(req.params.id);
  if (fighter) {
    res.data = fighter;
  } else {
    res.error = { status: 404, message: "Fighter not found" };
  }
  next();
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
  res.data = fighterService.createFighter(req.body);
  next();
}, responseMiddleware);

router.patch('/:id', updateFighterValid, (req, res, next) => {
  const fighter = fighterService.updateFighter(req.params.id, req.body);
  if (fighter) {
    res.data = fighter;
  } else {
    res.error = { status: 404, message: "Fighter not found" };
  }
  next();
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  const success = fighterService.deleteFighter(req.params.id);
  if (success) {
    res.data = { message: "Fighter deleted successfully" };
  } else {
    res.error = { status: 404, message: "Fighter not found" };
  }
  next();
}, responseMiddleware);

export { router };
