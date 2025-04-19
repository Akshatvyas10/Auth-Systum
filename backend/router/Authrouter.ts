const express = require('express');

import { hello, login, ShowUser, signup ,deleteUser,UpdateRole} from "../controller/Auth"
const router = express.Router();

router.use('/app',hello);
router.use('/signup',signup);
router.use('/login',login);

router.use('/show-user',ShowUser);
router.use('/delete-User',deleteUser);
router.use('/update-role',UpdateRole);

// router.get("/google", googleAuth);
export default router;
