const express = require('express');
const bodyParser = require('body-parser');
const {getUsers,getUserById,createUser, updateUser,deleteUser} = require('./queries');
const app = express();
const port =process.env.PORT | 3000;

app.use (bodyParser.json())
app.use(
	bodyParser.urlencoded({extended:true,}))

app.get('/',(_req,res)=>{
	res.send("hello world");
})

app.get('/users',getUsers);
app.post('/users',createUser);
app.get('/user/:id',getUserById);
app.put('/user/:id',updateUser);
app.delete('/user/:id',deleteUser)
app.listen(port,()=>{
	console.log(`APP runing on http://localhost:${port}`);

})


