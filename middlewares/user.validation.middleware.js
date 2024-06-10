import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const { id, name, email, phoneNumber, password } = req.body;

  if (!name || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Email must be a Gmail address" });
  }

  const phoneNumberRegex = /^\+380\d{9}$/;
  if (!phoneNumberRegex.test(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }


  if (password.length < 3) {
    return res.status(400).json({ message: "Password must be at least 3 characters long" });
  }

  const userKeys = Object.keys(USER);
  const reqKeys = Object.keys(req.body);
  const extraKeys = reqKeys.filter(key => !userKeys.includes(key));
  if (extraKeys.length > 0) {
    return res.status(400).json({ message: "Invalid properties in request body" });
  }

  if (id) {
    return res.status(400).json({ message: "ID should not be provided" });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const { id, name, email, phoneNumber, password } = req.body;

  if (!name && !email && !phoneNumber && !password) {
    return res.status(400).json({ message: "At least one field must be provided for update" });
  }

  if (id) {
    return res.status(400).json({ message: "ID should not be provided" });
  }

  if (email && !email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Email must be a Gmail address" });
  }

  const phoneNumberRegex = /^\+380\d{9}$/;
  if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  if (password && password.length < 3) {
    return res.status(400).json({ message: "Password must be at least 3 characters long" });
  }

  const userKeys = Object.keys(USER);
  const reqKeys = Object.keys(req.body);
  const extraKeys = reqKeys.filter(key => !userKeys.includes(key));
  if (extraKeys.length > 0) {
    return res.status(400).json({ message: "Invalid properties in request body" });
  }

  next();
};

export { createUserValid, updateUserValid };
