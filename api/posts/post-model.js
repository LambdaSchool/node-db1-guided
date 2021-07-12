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

async function create({ title, contents }) {
  // const newlyCreatedPost = await db('posts')
  //   .insert(
  //     { title, contents },
  //     ['id', 'title', 'contents', 'created_at', 'updated_at']
  //   )
  const [id] = await db('posts').insert({ title, contents })
  const newlyCreatedPost = await getById(id)
  return newlyCreatedPost
}

async function update() {
  return 'update wired'
}

async function remove() {
  return 'delete wired'
}
