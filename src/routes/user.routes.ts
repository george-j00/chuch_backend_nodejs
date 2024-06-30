import express, { Router } from 'express';
import { createPrayerRequest, fetchBanners, fetchEventById, fetchParishMembers, fetchRelics, getAllImages } from '../controllers/user.controller';


const router: Router = express.Router();

router.post('/api/user/prayer-request' , createPrayerRequest);
router.get('/api/user/get-all-images' , getAllImages);
router.get('/api/user/fetchRelics' , fetchRelics);
router.get('/api/user/fetchAllBanners' , fetchBanners);
router.post('/api/user/fetchEventById' , fetchEventById);
router.get('/api/user/fetchParishMembers' , fetchParishMembers);

export default router;

