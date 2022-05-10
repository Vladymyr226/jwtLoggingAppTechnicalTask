import Helper from "../../../../helper/helper.js";
import db from "../../../../db/db.config.js";

export async function registration(req, res) {
  console.log(req.body);

  if (!req.body.first_name.trim() || !req.body.last_name.trim || !req.body.email.trim || !req.body.phone.trim || !req.body.password.trim) {
    return res.status(400).send({ 'message': 'Some values are missing' });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).send({ 'message': 'Please enter a valid email address' });
  }
  if (!Helper.isValidPhone(req.body.phone)) {
    return res.status(400).send({ 'message': 'Please enter a valid phone number' });
  }
  if (!Helper.isValidPasswords(req.body.password)) {
    return res.status(400).send({ 'message': 'Please enter a valid password' });
  }

  const hashPassword = Helper.hashPassword(req.body.password);

  console.log(hashPassword);

  try {
    const obj = { first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, phone: req.body.phone, password: hashPassword };
    const rows = await db('users').insert(obj).returning('*');

    console.log(rows);

    const token = Helper.generateToken(rows[0].id);
    console.log(token);
    return res.status(201).send({ token });
  } catch (error) {
    console.log("eee", error);
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ 'message': 'User with that EMAIL already exist' });
    }
    return res.status(400).send(error);
  }
}

export async function login(req, res) {

  if (!req.body.email.trim() || !req.body.password.trim()) {
    return res.status(400).send({ 'message': 'Some values are missing' });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).send({ 'message': 'Please enter a valid email address' });
  }
  if (!Helper.isValidPasswords(req.body.password)) {
    return res.status(400).send({ 'message': 'Please enter a valid password' });
  }

  try {
    const rows = await db.select().from('users').where('email', '=', req.body.email);
    if (!rows[0]) {
      return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
    }
    if (!Helper.comparePassword(rows[0].password, req.body.password)) {
      return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
    }
    const token = Helper.generateToken(rows[0].id);
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(400).send(error);
  }
}