import express, { Router } from 'express';
import { createPrayerRequest, fetchBanners, fetchRelics, getAllImages } from '../controllers/user.controller';


const router: Router = express.Router();

router.post('/api/user/prayer-request' , createPrayerRequest);
router.get('/api/user/get-all-images' , getAllImages);
router.get('/api/user/fetchRelics' , fetchRelics);
router.get('/api/user/fetchAllBanners' , fetchBanners);

export default router;

