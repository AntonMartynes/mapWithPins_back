import express from 'express'
import cors from 'cors';
import { getPoints, createPoint, deletePoint } from './db/db.js';

const app = express()
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json())


app.get('/', getPoints);
app.post('/', createPoint);
app.delete('/:id', deletePoint);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})