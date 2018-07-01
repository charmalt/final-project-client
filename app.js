const express = require('express')

const app = express()
const port = process.env.PORT || 3001

app.get('/api/emails', (req, res) => {
  res.json([{
    id: 1,
    mailto: 'charlene@charlene.com'
  }, {
    id: 2,
    mailto: 'igor@igor.com'
  }, {
    id: 3,
    mailto: 'john@john.com'
  }])
})

app.listen(port, () => console.log(`Listening on port ${port}`))
