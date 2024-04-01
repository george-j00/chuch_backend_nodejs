import express, { Router } from 'express';
import { createPrayerRequest, fetchRelics, getAllImages } from '../controllers/user.controller';


const router: Router = express.Router();

router.post('/api/user/prayer-request' , createPrayerRequest);
router.get('/api/user/get-all-images' , getAllImages);
router.get('/api/user/fetchRelics' , fetchRelics);

export default router;

