import express from 'express';
import { applyForJob, getApplications } from '../controllers/careerController.js';

const careerRouter = express.Router();

careerRouter.post('/apply', applyForJob);
careerRouter.get('/list', getApplications);

export default careerRouter;
