"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const multer_1 = __importDefault(require("../services/multer"));
const router = express_1.default.Router();
router.post('/api/admin/create-event', admin_controller_1.createEvent);
router.get('/api/admin/getAllEvents', admin_controller_1.getAllEvents);
router.delete('/api/admin/delete-event/:eventId', admin_controller_1.deleteEvent);
router.get('/api/admin/prayer-requests/getAll', admin_controller_1.getAllPrayerRequests);
router.post('/api/admin/addImage', multer_1.default.single("imageFile"), admin_controller_1.addImage);
router.post('/api/admin/add-relics', multer_1.default.single("relicFile"), admin_controller_1.addRelics);
router.delete('/api/admin/delete-prayer-request/:prayerRequestId', admin_controller_1.deletePrayerRequest);
router.post('/api/admin/add-banner', multer_1.default.single("bannerFile"), admin_controller_1.addBanner);
exports.default = router;
