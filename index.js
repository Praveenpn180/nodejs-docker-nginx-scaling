const express = require("express")
const dotenv = require("dotenv")
const app = express()
const port = process.env.PORT || 3000
dotenv.config()
app.get("/", (req, res) => {
  res.send(`Hello from server: ${process.env.SERVER_NAME}`)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
