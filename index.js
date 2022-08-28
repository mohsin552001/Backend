let express = require('express')
const { connection } = require('./src/common/database')
let app = express()

app.use(express.json())



app.post('/create', (req, res) => {
    console.log(req.body)
    connection.query(`insert into contactsforgoogle (fullname,phone,email,website) values ('${req.body.fullname}','${req.body.phone}','${req.email}','${req.website}')`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('data has been inserted successfully')
        }
    })

})


app.listen(3400, () => {
    console.log('App is running on http://localhost:3400')
})