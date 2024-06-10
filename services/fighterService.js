import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighterById(id) {
    return fighterRepository.getOne({ id });
  }

  createFighter(fighterData) {
    return fighterRepository.create(fighterData);
  }

  updateFighter(id, fighterData) {
    return fighterRepository.update(id, fighterData);
  }

  deleteFighter(id) {
    return fighterRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

}

const fighterService = new FighterService();

export { fighterService };
