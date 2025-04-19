
import { NextFunction, Request, Response } from "express";
import connection from '../Database';
import jwt from 'jsonwebtoken';
const dotenv = require('dotenv');
import { v4 as uuidv4 } from 'uuid';

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



import { oauth2Client } from '../config/pasport';
import axios from "axios";


// Sign JWT Token
const signToken = (id: string): string => {
    const key: any = process.env.JWT_KEY;
    if (!key) {
        console.log('JWT_KEY is not defined')
        // throw new Error('JWT_KEY is not defined');
    }
    return jwt.sign({ id }, key, {
        expiresIn: '1d',
    });
};

// Create and send Cookie
const createSendToken = (user: any, statusCode: number, res: Response): void => {
    const token = signToken(user.email);
    user.password = ''; // Remove password before sending response

    res.status(statusCode).json({
        message: 'success',
        token,
        data: {
            user,
        },
    });
};

// Convert to async function
const getUserByEmail = (email: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        connection.query(sql, [email], (error: any, results: any) => {
            if (error) {
                // console.error('Database Error:', error);
                return reject(error);
            }
            if (results.length === 0) {
                return resolve(null); // No user found
            }
            return resolve(results[0]);
        });
    });
};


const CreateUserByEmail = (email: string, name: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (!name || !email) {
            return reject(new Error('Name and Email are required'));
        }

        const newUserId = uuidv4();
        console.log('Creating user:', { newUserId, name, email });

        const sql = `INSERT INTO users (user_id, user_name, email, user_role, created_at) 
                     VALUES (?, ?, ?, ?, ?)`;

        const values = [newUserId, name, email, 'user', new Date()];

        connection.query(sql, values, (error: any, results: any) => {
            if (error) {
                console.error('Database Error:', error);
                return reject(error);
            }
            console.log('User created successfully:', results);
            return resolve(results);
        });
    });
};


// Google Authentication
export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
    const code: string = req.query.code as string;
    console.log("USER CREDENTIAL -> ", code);

    try {
        // Exchange code for tokens
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        // Fetch user info from Google with authorization header
        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
            headers: {
                Authorization: `Bearer ${googleRes.tokens.access_token}`,
            },
        });

        // Fetch user from database
        let user: any = await getUserByEmail(userRes.data.email);
console.log('userRes =>',userRes)
        
console.log('user => ',user)
        if (!user) {
            const createUser:any =await CreateUserByEmail(userRes.data.email,userRes.data.name)
            var newUser :any = await getUserByEmail(userRes.data.email);
            console.log('newUser => ',newUser)
            // return res.status(202).json({ message: 'User not found' });
        }
       user = newUser
console.log('user => ',user)

        // Send token to client
        createSendToken(user, 201, res);
    } catch (error) {
        console.log('Error during Google Authentication', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



