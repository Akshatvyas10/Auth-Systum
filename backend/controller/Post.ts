import { Request, Response } from "express";
import connection from '../Database';

import { v4 as uuidv4 } from 'uuid';
import multer from "multer";

interface postData{
  post_id:string;
  user_id:string;
  post_content:string;
  post_image_name:string;
  created_at:string
  isActive:boolean
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
}
});


const upload = multer({ storage: storage });


export const savePost = (req: Request, res: Response) => {
 
  upload.single('image')(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file', error: err });
    }

    const { content, user_id ,user_name} = req.body;
    const image = req.file?.filename; 
    const post_Id = uuidv4();

    const sql = `
      INSERT INTO users_post(post_id, user_id, post_content, post_image_name, created_at, isActive ,by_user_name,like_count)
      VALUES ('${post_Id}','${user_id}','${content}','${image}','${new Date()}',${true},'${user_name}',${0})`;
    const values = [post_Id, user_id, content, image, new Date(), true,user_name, 0];

   
    connection.query(sql, (err, result) => {
      if (err) {
        // console.log('Post not saved');
        // console.log(err);
        return res.status(400).json({ message: 'Post not saved' });
      } else {
        // console.log('Data saved');
        return res.status(200).json({ message: 'Post saved' });
      }
    });
  });
};

export const showMyPosts =(req:Request,res:Response)=>{
   
    //  console.log('showNotes')
    const {user_id} = req.body;
    // console.log('dcccccccccccc========================',user_id)
     var sql = `SELECT * FROM users_post where user_id = '${user_id}' `;
     connection.query(sql,(err:any,result:postData)=>{
         if(err){
             console.log('Data not shows',err)
             res.status(400).json({message:'Data not shows'})
         }
         else{

             console.log('Data shows => ',result)
             res.status(200).json({message:"Notes retrieved successfully" ,data:result})
 
         }
     })
 }

 export const ExplorePost =(req:Request,res:Response)=>{
   
  // console.log('ExplorePost')
 const {user_id} = req.body;
//  console.log('dcccccccccccc========================',user_id)
  var sql = `SELECT * FROM users_post where user_id != '${user_id}' `;
  connection.query(sql,(err:any,result:postData)=>{
      if(err){
          // console.log('Data not shows')
          res.status(400).json({message:'Data not shows'})
      }
      else{

          // console.log('Data shows => ')
          res.status(200).json({message:"Notes retrieved successfully" ,data:result})

      }
  })
}


 export const AddLikepost =(req:Request,res:Response)=>{
   
    // console.log('deleteNotes')
   const {Like,user_id,post_id}= req.body;

   var sql = `UPDATE users_post SET like_count='${Like}' WHERE post_id = '${post_id}'`;

    connection.query(sql,(err,result:any)=>{
        if(result){
            console.log('updete  shows =>', result[0])
            res.status(200).json({message:"Notes retrieved successfully" ,result:result})
        }
        else{
            
            console.log('not updete shows => ',err)
            res.status(400).json({message:'Data not shows'})

        }
    })
}






  export const deletePost =(req:Request,res:Response)=>{
   
    console.log('deleteNotes')
   const post_id = req.params.post_id;
   console.log(post_id)
    var sql = `DELETE FROM users_post WHERE post_id = '${post_id}' `;
    connection.query(sql,(err,result)=>{
        if(result){
            console.log('Data  deleted =>', result)
            res.status(200).json({message:" Data deleted successfully" })
        }
        else{
            
            console.log('Data not deleted  ')
            res.status(400).json({message:'Data not deleted'})

        }
    })
}



export const updatedNotes =(req:Request,res:Response)=>{
   
    console.log('updatedNotes')
   const {post_content ,post_image_name ,user_id ,post_id}= req.body;
   console.log(req.body)
//  post_image_name='${post_image_name}'
   var sql = `UPDATE users_post SET post_content='${post_content}' WHERE post_id = '${post_id}' `;

    connection.query(sql,(err,result:any)=>{
        if(result){
            console.log('updete  shows =>', result)
            res.status(200).json({message:"Notes retrieved successfully" ,result:result})
        }
        else{
            
            console.log('not updete shows => ',err)
            res.status(400).json({message:'Data not shows'})

        }
    })
}