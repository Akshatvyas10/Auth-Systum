const express = require('express');

import { googleAuth} from "../controller/GoogleAuth"
const googleRouter = express.Router();



googleRouter.get("/google", googleAuth);
export default googleRouter;
