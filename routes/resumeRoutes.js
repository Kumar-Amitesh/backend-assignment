// Desc: Routes for resume processing and search
import express from 'express';
import {processResume, searchResume} from '../controllers/resumeController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post("/process", authMiddleware, processResume);
router.get("/search", authMiddleware, searchResume);

export default router;