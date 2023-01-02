let express = require("express");
let cors = require("cors");
const { connection } = require("./src/common/database");
let app = express();

app.use(express.json());
app.use(cors());

app.post("/create", (req, res) => {
  console.log(req.body);
  connection.query(
    `insert into contactsforgoogle (fullname,phone,email,website) values ('${req.body.fullname}','${req.body.phone}','${req.body.email}','${req.body.website}')`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let contactId = result.insertId;
        connection.query(
          `select * from contactsforgoogle where id=${contactId}`,
          (err, result) => {
            res.send(result[0]);
          }
        );
      }
    }
  );
});


//Edit contact 

app.post("/update", (req, res) => {
let id =req.body.id
  connection.query(
    `update contactsforgoogle set fullname='${req.body.fullname}',phone='${req.body.phone}',email='${req.body.email}',website='${req.body.website}' where id=${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(501).send({error:err})
      } else {
       res.sendStatus(201)
      }
    }
  );
});




app.get("/contact", (req, res) => {
  let sql = `select * from contactsforgoogle`;
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(503).json({ error: err });
    } else {
      res.send(result);
    }
  });
});

app.delete("/contact", (req, res) => {
 
  let sql = `delete  from contactsforgoogle where id in (${req.body.ids.join(
    ", "
  )})`;
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(503).json({ error: err });
     
    } else {
      res.sendStatus(201);
    }
  });
});



app.get("/contact/:id", (req, res) => {
    let sql = `select * from contactsforgoogle where id=${req.params.id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(503).json({ error: err });
      } else {
        if(result.length>0) return res.send(result[0])
        res.send(result([]))
      }
    });
  });


app.listen(3400, () => {
  console.log("App is running on http://localhost:3400");
});
