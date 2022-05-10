import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import validator from 'validator';

dotenv.config();


const Helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return validator.isEmail(email);
  },

  isValidPhone(phone) {
    return validator.isMobilePhone(phone);
  },

  isValidPasswords(password) {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/;

    return reg.test(password);
  },

  generateToken(id) {
    const token = jwt.sign(
      { id: id },
      process.env.SECRET,
      { expiresIn: '1d' }
    );
    return token;
  }
};

export default Helper;