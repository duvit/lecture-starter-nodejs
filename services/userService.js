import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAllUsers() {
    return userRepository.getAll();
  }

  getUserById(id) {
    return userRepository.getOne({ id });
  }

  createUser(userData) {
    return userRepository.create(userData);
  }

  updateUser(id, userData) {
    return userRepository.update(id, userData);
  }

  deleteUser(id) {
    return userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
