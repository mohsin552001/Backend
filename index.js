let express = require('express')
let app = express()

app.get('/test', (req, res) => {
    res.send('<h1> sa worldlfsdldf world</h1>')
})


app.listen(3400, () => {
    console.log('App is running on http://localhost:3400')
})