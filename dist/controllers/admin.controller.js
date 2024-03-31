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
exports.deletePrayerRequest = exports.addImage = exports.getAllPrayerRequests = exports.deleteEvent = exports.getAllEvents = exports.createEvent = void 0;
const event_schema_1 = __importDefault(require("../models/event.schema"));
const prayerRequests_schema_1 = __importDefault(require("../models/prayerRequests.schema"));
const cloudinary_1 = __importDefault(require("../services/cloudinary"));
const gallery_schema_1 = __importDefault(require("../models/gallery.schema"));
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event } = req.body;
    try {
        // Create a new event instance based on the request body
        const newEvent = new event_schema_1.default({
            eventDate: event.eventDate,
            eventLocation: event.eventLocation,
            eventTheme: event.eventTheme,
            eventTime: event.eventTime,
            eventDescription: event.eventDescription,
        });
        // Save the new event to the database
        yield newEvent.save();
        // Respond with success message
        res
            .status(201)
            .json({ message: "Event created successfully", event: newEvent });
    }
    catch (error) {
        // Handle any errors
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createEvent = createEvent;
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query the database to get all events
        const events = yield event_schema_1.default.find().sort({ createdAt: 1 });
        // Respond with the retrieved events
        res.status(200).json({ events });
    }
    catch (error) {
        // Handle any errors
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllEvents = getAllEvents;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        // delete the event with the specified eventId
        yield event_schema_1.default.findByIdAndDelete(eventId);
        // Respond with the retrieved events
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (error) {
        // Handle any errors
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteEvent = deleteEvent;
const getAllPrayerRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPrayerRequests = yield prayerRequests_schema_1.default.find();
        // Respond with the retrieved events
        res.status(200).json({ prayerRequests: allPrayerRequests });
    }
    catch (error) {
        // Handle any errors
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllPrayerRequests = getAllPrayerRequests;
const addImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageTitle } = req.body;
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path);
            const imageUrl = result.secure_url;
            const newImage = new gallery_schema_1.default({
                imageTitle: imageTitle,
                imageUrl: imageUrl
            });
            console.log(newImage);
            yield newImage.save();
            res.status(200).json({ message: 'Image added successfully' });
        }
        else {
            res.status(400).json({ message: 'No image file provided' });
        }
    }
    catch (error) {
        console.error('Error adding image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addImage = addImage;
const deletePrayerRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prayerRequestId = req.params.prayerRequestId;
        // delete the event with the specified eventId
        yield prayerRequests_schema_1.default.findByIdAndDelete(prayerRequestId);
        // Respond with the retrieved events
        res.status(200).json({ message: "Prayer request deleted successfully" });
    }
    catch (error) {
        // Handle any errors
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletePrayerRequest = deletePrayerRequest;
