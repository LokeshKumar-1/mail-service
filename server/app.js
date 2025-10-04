const express = require('express')
const cors = require('cors')
const {PORT} = require("./config/env.js");
const mailRoutes = require('./src/routes/email.route')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', mailRoutes)

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`)
})