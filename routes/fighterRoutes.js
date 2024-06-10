import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
  fighterService.getAllFighters()
    .then(fighters => {
      res.data = fighters;
      next();
    })
    .catch(error => {
      res.error = { status: 400, message: error.message };
      next();
    });
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  fighterService.getFighterById(req.params.id)
    .then(fighter => {
      if (fighter) {
        res.data = fighter;
      } else {
        res.error = { status: 404, message: 'Fighter not found' };
      }
      next();
    })
    .catch(error => {
      res.error = { status: 400, message: error.message };
      next();
    });
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
  fighterService.createFighter(req.body)
    .then(newFighter => {
      res.data = newFighter;
      next();
    })
    .catch(error => {
      res.error = { status: 400, message: error.message };
      next();
    });
}, responseMiddleware);

router.patch('/:id', updateFighterValid, (req, res, next) => {
  fighterService.updateFighter(req.params.id, req.body)
    .then(updatedFighter => {
      if (updatedFighter) {
        res.data = updatedFighter;
      } else {
        res.error = { status: 404, message: 'Fighter not found' };
      }
      next();
    })
    .catch(error => {
      res.error = { status: 400, message: error.message };
      next();
    });
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  fighterService.deleteFighter(req.params.id)
    .then(deletedFighter => {
      if (deletedFighter) {
        res.data = deletedFighter;
      } else {
        res.error = { status: 404, message: 'Fighter not found' };
      }
      next();
    })
    .catch(error => {
      res.error = { status: 400, message: error.message };
      next();
    });
}, responseMiddleware);



export { router };
