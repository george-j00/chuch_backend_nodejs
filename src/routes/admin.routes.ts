import express, { Router } from 'express';
import { addBanner, addEventImages, addImage, addParishMember, addRegister, addRelics, adminLogin, createEvent, deleteEvent, deleteMember, deletePrayerRequest, deleteRegister, getAllPrayerRequests, getEvents, getParishMembersList, getRegisters, updateEventStatus } from '../controllers/admin.controller';
import upload from '../services/multer';


const router: Router = express.Router();

router.post('/api/admin/login',adminLogin);
router.post('/api/admin/create-event' , createEvent);
router.post('/api/admin/change-event-status' , updateEventStatus);
router.post('/api/admin/getEvents' , getEvents);
router.delete('/api/admin/delete-event/:eventId' , deleteEvent);
router.delete('/api/admin/delete-member/:memberId' , deleteMember);
router.post('/api/admin/add-event-images' , upload.array("eventImageFile" , 5), addEventImages);
router.get('/api/admin/prayer-requests/getAll' , getAllPrayerRequests);
router.post('/api/admin/addImage' , upload.single("imageFile"), addImage);
router.post('/api/admin/add-relics' , upload.single("relicFile"), addRelics);
router.delete('/api/admin/delete-prayer-request/:prayerRequestId' , deletePrayerRequest);
router.post('/api/admin/add-banner', upload.single("bannerFile"), addBanner);
router.post('/api/admin/add-parish-member', upload.single("imageFile"), addParishMember);
router.get('/api/admin/get-parish-members', getParishMembersList);
router.post('/api/admin/add-register' , addRegister);
router.get('/api/admin/get-registers', getRegisters);
router.delete('/api/admin/delete-register/:registerId', deleteRegister);

export default router; 

 