import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USERNAME || "postgres",
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_BDNAME || 'mape_task',
  password: process.env.DB_PASSWORD || '123',
  port: 5432,
});

export const getPoints = (request, response) => {
  pool.query('SELECT * FROM places ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const createPoint = (request, response) => {
  const { name, description, latitude, longitude } = request.body

  pool.query('INSERT INTO places (name, description, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *', [name, description, latitude, longitude], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

export const deletePoint = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM places WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}