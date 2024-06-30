"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchParishMembers = exports.fetchEventById = exports.fetchBanners = exports.fetchRelics = exports.getAllImages = exports.createPrayerRequest = void 0;
const prayerRequests_schema_1 = __importDefault(require("../models/prayerRequests.schema"));
const gallery_schema_1 = __importDefault(require("../models/gallery.schema"));
const relic_schema_1 = __importDefault(require("../models/relic.schema"));
const banner_schema_1 = __importDefault(require("../models/banner.schema"));
const event_schema_1 = __importDefault(require("../models/event.schema"));
const parishMembers_schema_1 = __importDefault(require("../models/parishMembers.schema"));
const createPrayerRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prayerRequest } = req.body;
    try {
        console.log(prayerRequest);
        // Create a new event instance based on the request body
        const newRequest = new prayerRequests_schema_1.default({
            name: prayerRequest.name,
            phoneNumber: prayerRequest === null || prayerRequest === void 0 ? void 0 : prayerRequest.phoneNumber,
            place: prayerRequest === null || prayerRequest === void 0 ? void 0 : prayerRequest.place,
            requestType: prayerRequest === null || prayerRequest === void 0 ? void 0 : prayerRequest.requestType,
            specialPrayer: prayerRequest === null || prayerRequest === void 0 ? void 0 : prayerRequest.specialPrayer,
            amount: prayerRequest.amount,
        });
        // Save the new event to the database
        yield newRequest.save();
        // Respond with success message
        res.status(201).json({
            message: "Prayer Request created successfully",
            prayerRequest: newRequest,
        });
    }
    catch (error) {
        // Handle any errors
        console.error("Error creating prayer request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createPrayerRequest = createPrayerRequest;
const getAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield gallery_schema_1.default.find();
        console.log(images);
        res.status(200).json({ images: images });
    }
    catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllImages = getAllImages;
const fetchRelics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRelics = yield relic_schema_1.default.find();
        console.log(allRelics);
        res.status(200).json({ relics: allRelics });
    }
    catch (error) {
        console.error('Error fetching relics:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.fetchRelics = fetchRelics;
const fetchBanners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBanners = yield banner_schema_1.default.find();
        console.log(allBanners);
        res.status(200).json({ banners: allBanners });
    }
    catch (error) {
        console.error('Error fetching banners:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.fetchBanners = fetchBanners;
const fetchEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.body;
        console.log(eventId);
        const selectedEvent = yield event_schema_1.default.findById({ _id: eventId });
        res.status(200).json({ event: selectedEvent });
    }
    catch (error) {
        console.error('Error fetching banners:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.fetchEventById = fetchEventById;
const fetchParishMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield parishMembers_schema_1.default.find();
        res.status(200).json({ members: members });
    }
    catch (error) {
        console.error('Error fetching banners:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.fetchParishMembers = fetchParishMembers;
