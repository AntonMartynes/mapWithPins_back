import express from 'express'
import 'dotenv/config'
import cors from 'cors';
import { getPoints, createPoint, deletePoint } from './db/db.js';

const app = express()
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json())


app.get('/', getPoints);
app.post('/', createPoint);
app.delete('/:id', deletePoint);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
  console.log(process.env.DB_USERNAME)
})