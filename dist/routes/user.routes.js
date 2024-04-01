"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post('/api/user/prayer-request', user_controller_1.createPrayerRequest);
router.get('/api/user/get-all-images', user_controller_1.getAllImages);
router.get('/api/user/fetchRelics', user_controller_1.fetchRelics);
exports.default = router;
