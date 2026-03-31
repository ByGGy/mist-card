import express, { Express, Request, Response } from 'express'

const app: Express = express()
const PORT: number = parseInt(process.env.PORT || '3000', 10)

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Backend is healthy')
})

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`)
})