const db = require("../database/dbConfig");

const find = () => {
  return db("users").select("id", "username");
};

const findBy = filter => {
  return db("users").where(filter);
};

const findById = id => {
  return db("users")
    .where({ id })
    .first();
};

const add = async user => {
  const [id] = await db("users").insert(user);

  return findById(id);
};

const remove = async id => {
  const removed = await findById(id);

  await db("users")
    .where({ id })
    .del();

  return removed;
};

module.exports = {
  find,
  findBy,
  add,
  remove
};
