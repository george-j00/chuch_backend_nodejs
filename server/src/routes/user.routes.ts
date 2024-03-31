import express, { Router } from 'express';
import { createPrayerRequest, getAllImages } from '../controllers/user.controller';


const router: Router = express.Router();

router.post('/api/user/prayer-request' , createPrayerRequest);
router.get('/api/user/get-all-images' , getAllImages);

export default router;

