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