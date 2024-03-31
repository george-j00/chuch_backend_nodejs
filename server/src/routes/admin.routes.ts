import express, { Router } from 'express';
import { addImage, createEvent, deleteEvent, deletePrayerRequest, getAllEvents, getAllPrayerRequests } from '../controllers/admin.controller';
import upload from '../services/multer';


const router: Router = express.Router();

router.post('/api/admin/create-event' , createEvent);
router.get('/api/admin/getAllEvents' , getAllEvents);
router.delete('/api/admin/delete-event/:eventId' , deleteEvent);
router.get('/api/admin/prayer-requests/getAll' , getAllPrayerRequests);
router.post('/api/admin/addImage' , upload.single("imageFile"), addImage);
router.delete('/api/admin/delete-prayer-request/:prayerRequestId' , deletePrayerRequest);


export default router;

