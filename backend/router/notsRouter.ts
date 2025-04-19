const express = require('express');
import authenticateJWT from "../middleware/authantication";

import {AddLikepost,savePost, showMyPosts , deletePost, updatedNotes,ExplorePost} from "../controller/Post"
const notsRouter = express.Router();

notsRouter.use('/save-post',authenticateJWT,savePost);
notsRouter.use('/show-my-post',authenticateJWT,showMyPosts);
notsRouter.use('/add-like/',authenticateJWT,AddLikepost);
notsRouter.use('/delete-post/:post_id',authenticateJWT,deletePost);
notsRouter.use('/update-note',authenticateJWT,updatedNotes);
notsRouter.use('/explore-post',authenticateJWT,ExplorePost);


export default notsRouter;
