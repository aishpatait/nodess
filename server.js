const express = require('express')
const app = express()
const port = 4000
const mysql = require('mysql2')
const cors=require('cors')
const bodyParser = require('body-parser')


app.use(cors('*'))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'exam',
    password:'Ak@165667t',
    connectionLimit: 10,
    queueLimit: 0
  })

app.get('/', (req, res) => {
  res.send("<h1> Welcome </h1>")
})

app.get('/getStudents', (req, res) => {
    const query=`select * from student`
   
   db.query(query,(err,result)=>{
    res.send(result)
   })
})

app.post('/createStudent', (req, res) => {
    const { name, email, city } = req.body;
    const query = `INSERT INTO student (name, email, city) VALUES (?,?,?)`;
    db.query(query, [name, email, city], (error, results, fields) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Student created successfully' });
        }
    });
});

app.put('/updateStudent/:id', (req, res) => {
    const { name, email, city } = req.body;
    const { id } = req.params;
    const query = `UPDATE student SET name = ?, email = ?, city = ? WHERE id = ?`;
    db.query(query, [name, email, city, id], (error, results, fields) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Student updated successfully' });
        }
    });
});

app.delete('/deleteStudent/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM student WHERE id = ?`;
    db.query(query, [id], (error, results, fields) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Student deleted successfully' });
        }
    });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// get the client

