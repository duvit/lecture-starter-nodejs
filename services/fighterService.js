import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAllFighters() {
    try {
      return fighterRepository.getAll();
    } catch (error) {
      throw new Error(`Failed to get fighters: ${error.message}`);
    }
  }

  getFighterById(id) {
    try {
      return fighterRepository.getById(id);
    } catch (error) {
      throw new Error(`Failed to get fighter by id ${id}: ${error.message}`);
    }
  }

  createFighter(fighterData) {
    try {
      // Add your business logic here, e.g. validating fighterData

      return fighterRepository.create(fighterData);
    } catch (error) {
      throw new Error(`Failed to create fighter: ${error.message}`);
    }
  }

  updateFighter(id, fighterData) {
    try {
      // Add your business logic here, e.g. validating fighterData

      return fighterRepository.update(id, fighterData);
    } catch (error) {
      throw new Error(`Failed to update fighter with id ${id}: ${error.message}`);
    }
  }

  deleteFighter(id) {
    try {
      return fighterRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete fighter with id ${id}: ${error.message}`);
    }
  }

}

const fighterService = new FighterService();

export { fighterService };
