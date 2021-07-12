const db = require('../../data/db-config')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  // SELECT * FROM posts;
  // const records = await db.raw('SELECT * FROM posts;')
  // const records = await db.select().from('posts')
  const records = await db('posts')
  console.log(records)
  return records
}

async function getById(id) {
  // const records = await db.raw(`
  //   SELECT * FROM posts WHERE id = ?;
  // `, [id])
  // const [record] = await db('posts').where('id', id)
  const record = await db('posts').where('id', id).first()
  return record
}

async function create(post) {
  // const newlyCreatedPost = await db('posts') // ONLY POSTGRES
  //   .insert(
  //     { title, contents },
  //     ['id', 'title', 'contents', 'created_at', 'updated_at']
  //   )
  const [id] = await db('posts').insert(post)
  const newlyCreatedPost = await getById(id)
  // further js processing here
  return newlyCreatedPost
}

async function update(id, { title, contents }) {
  console.log(id, { title, contents })
  const numOfUpdatedRecords = await db('posts')
    .where('id', id)
    .update({ title, contents })
  const updatedPost = await getById(id)
  return updatedPost
}

async function remove(id) {
  const removed = await db('posts')
    .where('id', id)
    .del()
  return removed
}
