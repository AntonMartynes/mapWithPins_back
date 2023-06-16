import pkg from 'pg';
import 'dotenv/config'
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgres://czxkmmszrguixh:20f998c6b041b0b07c3888cc57fe970aa6eae1d2736ae3c651f588bf1f536cc6@ec2-34-240-122-104.eu-west-1.compute.amazonaws.com:5432/d2ei70d1elghjo',
  ssl: {
    rejectUnauthorized: false
  },
  user: process.env.DB_USERNAME || "czxkmmszrguixh",
  host: process.env.DB_HOST || 'ec2-34-240-122-104.eu-west-1.compute.amazonaws.com',
  database: process.env.DB_BDNAME || 'd2ei70d1elghjo',
  password: process.env.DB_PASSWORD || '20f998c6b041b0b07c3888cc57fe970aa6eae1d2736ae3c651f588bf1f536cc6',
  port: 5432,
});

client.connect();

export const getPoints = (request, response) => {
  client.query('SELECT * FROM places ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error.message
    }
    response.status(200).json(results.rows)
  })
}

export const createPoint = (request, response) => {
  const { name, description, latitude, longitude } = request.body

  client.query('INSERT INTO places (name, description, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *', [name, description, latitude, longitude], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

export const deletePoint = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM places WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}