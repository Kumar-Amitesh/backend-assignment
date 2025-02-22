// Desc: This file is the main router file that will be used to route all the requests to the appropriate route files.
import express from 'express';
import authRoutes from './authRoutes.js';
import resumeRoutes from './resumeRoutes.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Resume Processing API' });
});

router.use('/', authRoutes);
router.use('/resumes', resumeRoutes);

export default router;