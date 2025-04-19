
import { NextFunction, Request, Response } from "express";
import connection from '../Database';

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
const dotenv = require('dotenv');

dotenv.config();

interface userRegistredInterface {
    user_id: string   
    user_name: string,
    user_email: string,
    password: string,
    user_role: string
  }

export const hello = (req: Request, res: Response) => {
  res.status(200).json({ message: 'hello from api' });
};

// ================================================================


export const signup = async (req: Request, res: Response) => {
  const { name, email, password, } = req.body
  const newUserId = uuidv4();

  console.log(name, email, password)

  if (name && email && password) {
console.log(req.body)
    var hashedPassword = await bcrypt.hash(password, 10)

    const sql = `INSERT INTO users (user_id, user_name, email, password, user_role, created_at) 
VALUES (?, ?, ?, ?, ?, ?)`;

   
    const values = [newUserId, name, email, hashedPassword, 'user', new Date()];

    connection.execute(sql, values, (error, results) => {
      if (error) {
        res.status(300).json({ data: 'User already registered ' })
        // console.log(error)
      }
      else {
        // for login in signup
       
        const sql = `select * from users where email = '${email}'`
        connection.query(sql, (error: any, result: Array<userRegistredInterface>) => {

          var paylode = { 'email': result[0].user_email, 'id': result[0].user_id }
          var key = 'keyhaikya'

          var token = jwt.sign(paylode, key, { expiresIn: '1d' });
          res.status(200).json({ data: 'login Sucessfuly', 'role': result[0].user_role, 'token': token, 'id': result[0].user_id ,'name': result[0].user_name })
        })
      }
    })
    console.log('Hashed password:', hashedPassword)
  }
  else {
    res.status(404).json({ data: 'data not found' })
  }
};



export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  console.log(email, password)
  if (email && password) {
   

    const sql = `select * from users where email = '${email}'`
 
    connection.query(sql, (error: any, result: Array<userRegistredInterface>) => {
      if (error) {
        res.status(300).json({ data: 'something wents wrong ' })

      }
      else {
        console.log(result)
        if (result[0]) {
          // console.log(result)
          // console.log(password)

          var databasePassword = result[0].password

          bcrypt.compare(password, databasePassword, (err, isMatch) => {

            if (isMatch) {
              var paylode = { 'email': result[0].user_email, 'id': result[0].user_id }
              var key = 'keyhaikya'

              var token = jwt.sign(paylode, key, { expiresIn: '1d' });
              console.log(token)
              res.cookie('token', token)
              var userDetailObject = { id: result[0].user_id, name: result[0].user_name, email: result[0].user_email }
              res.status(200).json({ data: 'login Sucessfuly', 'name': result[0].user_name, 'token': token, 'id': result[0].user_id,'role': result[0].user_role })
              console.log(req.cookies)
              console.log("password match => " + result)
            }

            else {
              res.status(500).json({ message: 'womething went wrong ' })

              console.log("password not match",err)

            }
          })
        }
        else {
          res.status(500).json({ err: 'womething went wrong ' })
        }
      }
    })

  }
  else {
    res.status(404).json({ data: 'data not found' })
  }
};



export const ShowUser = (req:Request, res:Response) => {
  // const query = req.query.query;



  const sqlQ = `SELECT * FROM users WHERE user_role IN ('user', 'moderatora', 'moderator')`;


  connection.query(sqlQ,  (err: any, result:Array<userRegistredInterface>) => {
    if (err) {
      console.log("Error =>", err);
      return res.status(500).json({ message: 'An error occurred while searching for users' });
    }

    if (result.length === 0 && result.length < 0) {
      return res.status(404).json({ message: 'No users found matching the query' });
    }

    // console.log("Search result =>", result);
    // console.log(result)
    return res.status(200).json({ data: result });
  });
}
export const deleteUser = (req:Request, res:Response) => {
  const {user_Id} = req.body;
console.log(user_Id)


  const sqlQ = `delete  FROM users where user_id = '${user_Id}'`;

  connection.query(sqlQ,  (err: any, result:Array<userRegistredInterface>) => {
    if (err) {
      console.log("Error =>", err);
      return res.status(500).json({ message: 'An error occurred while searching for users' });
    }

    if (result.length === 0 && result.length < 0) {
      return res.status(404).json({ message: 'No users found matching the query' });
    }

    // console.log("Search result =>", result);
    console.log(result)
    return res.status(200).json({ data: result });
  });
}
export const UpdateRole=(req:Request,res:Response)=>{
  const {user_id,user_role}= req.body.data;
  console.log(req.body)
  var sql = `update users set user_role = '${user_role}' where user_id = '${user_id}'`
  connection.query(sql,(err,result)=>{
    if(result){
  console.log(result)

      res.status(200).json({message:'user role updated'})
    }
  else{
  console.log(err)

      res.status(400).json({message:'user role not updated'})
    }
  })
}