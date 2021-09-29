import express from 'express'
import cors from 'cors'
import { Pool } from 'pg'
import path from 'path'

const app = express()

const postgresString = process.env.DATABASE_URL || process.env.DB_URL

const pool = new Pool({
  connectionString: postgresString
})

const connectWithRetry = () => {
  pool
    .connect()
    .then(() => console.log('successfully connected to db'))
    .catch((e) => {
      console.log(e)
      setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '../build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

app.get('/api/', async (req, res) => {
  try {
    res.json('Its working')
  } catch (err) {
    console.error(err.message)
  }
})

app.post('/api/testpost', async (req, res) => {
  try {
    const { text } = req.body
    const newTest = await pool.query('INSERT INTO test (text) VALUES ($1)', [text])
    res.json(newTest.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/api/testget', async (req, res) => {
  try {
    const tests = await pool.query('SELECT * FROM test')
    res.json(tests.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/api/', (req, res) => { return res.json({ message: 'Api Working!' }) })

const PORT = process.env.NODE_PORT || 3333
app.listen(PORT, () => { console.log(`NodeApp listening on http://localhost:${PORT}`) })
