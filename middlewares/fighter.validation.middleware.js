import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const { id, name, power, defense, health } = req.body;

  if (!name || !power || !defense) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (power < 1 || power > 100) {
    return res.status(400).json({ message: "Power must be between 1 and 100" });
  }

  if (defense < 1 || defense > 10) {
    return res.status(400).json({ message: "Defense must be between 1 and 10" });
  }


  if (health && (health < 80 || health > 120)) {
    return res.status(400).json({ message: "Health must be between 80 and 120" });
  }

  const fighterKeys = Object.keys(FIGHTER);
  const reqKeys = Object.keys(req.body);
  const extraKeys = reqKeys.filter(key => !fighterKeys.includes(key));
  if (extraKeys.length > 0) {
    return res.status(400).json({ message: "Invalid properties in request body" });
  }

  if (id) {
    return res.status(400).json({ message: "ID should not be provided" });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const { id, name, power, defense, health } = req.body;

  if (!name && !power && !defense && !health) {
    return res.status(400).json({ message: "At least one field must be provided for update" });
  }

  if (id) {
    return res.status(400).json({ message: "ID should not be provided" });
  }

  if (power && (power < 1 || power > 100)) {
    return res.status(400).json({ message: "Power must be between 1 and 100" });
  }

  if (defense && (defense < 1 || defense > 10)) {
    return res.status(400).json({ message: "Defense must be between 1 and 10" });
  }

  if (health && (health < 80 || health > 120)) {
    return res.status(400).json({ message: "Health must be between 80 and 120" });
  }


  const fighterKeys = Object.keys(FIGHTER);
  const reqKeys = Object.keys(req.body);
  const extraKeys = reqKeys.filter(key => !fighterKeys.includes(key));
  if (extraKeys.length > 0) {
    return res.status(400).json({ message: "Invalid properties in request body" });
  }


  next();
};

export { createFighterValid, updateFighterValid };
