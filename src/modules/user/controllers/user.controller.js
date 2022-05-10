import db from "../../../../db/db.config.js";

export async function createUser(req, res) {

  await db('users').insert({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, phone: req.body.phone, password: req.body.password });

  res.sendStatus(200);
}

export async function getUser(req, res) {

  const resultUser = await db.select().from('users').where('id', '=', req.params.id);

  res.send(resultUser);
}

export async function updateUser(req, res) {

  await db('users')
    .where('id', '=', req.params.id)
    .update(req.body);

  res.sendStatus(200);
}

export async function deleteUser(req, res) {

  await db('users')
    .where('id', '=', req.params.id)
    .del();

  res.sendStatus(200);
};