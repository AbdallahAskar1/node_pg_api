const {pool} = require('./db');

const getUsers=async(req,res)=> {
	try{
	const data= await pool.query('SELECT * FROM users ORDER BY id');
	res.status(200).json(data.rows);
	console.log(data.rows);
	}catch(err) {
	console.error(err)
	res.status(500).json({error:`${err}`})
	};
};
const getUserById=async(req,res)=>{
	try{

	 const data= await pool.query('SELECT * FROM users WHERE id=$1',[req.params.id])
		res.status(200).json(data.rows.length>0?data.rows:"USER NOT FOUND");
	 

	}catch(err){	
	  res.status(500).json({error:`${err}`})
	}
}
const createUser = async(req,res)=>{
	const {name,email}=req.body;

	try{
	const data=await pool.query("INSERT INTO users (name,email) VALUES ($1,$2)",[name,email]);
	res.status(201).send(`User Added succesfully`);
	}catch(err){
		res.status(500).json({error:`${err}`})
	}
}

const updateUser =async(req,res)=> {
	const id = parseInt(req.params.id);
	const {name ,email}=req.body
	try{
	await pool.query("UPDATE users SET name=$1,email=$2 WHERE id=$3",[name,email,id]);
	res.status(200).send(`user updated with id=${id}`);	
	}catch(err){
		  res.status(500).json({error:`${err}`})

	}


}

const deleteUser = async (req,res)=>{
	const id = parseInt(req.params.id);
console.log(id)
	try{
		await pool.query("DELETE FROM users where users.id=$1",[id]);
		res.status(200).send(`user deleted with id=${id}`);	
	}catch(err){
		  res.status(500).json({error:`${err}`})

	}


}
module.exports ={getUsers,getUserById,updateUser,createUser,deleteUser};



