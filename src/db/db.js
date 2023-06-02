import pkg from 'pg';
import 'dotenv/config'
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgres://zfpvqiuoinhoyy:68d94a690217394f4376454c37b347b3d4aa2b0b9e4c4e43f9451cc7b5e72fbf@ec2-52-215-68-14.eu-west-1.compute.amazonaws.com:5432/d3dmmvu4ppv9k',
  ssl: {
    rejectUnauthorized: false
  },
  user: process.env.DB_USERNAME || "zfpvqiuoinhoyy",
  host: process.env.DB_HOST || 'ec2-52-215-68-14.eu-west-1.compute.amazonaws.com',
  database: process.env.DB_BDNAME || 'd3dmmvu4ppv9k',
  password: process.env.DB_PASSWORD || '68d94a690217394f4376454c37b347b3d4aa2b0b9e4c4e43f9451cc7b5e72fbf',
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