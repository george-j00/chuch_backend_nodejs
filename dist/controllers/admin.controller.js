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
exports.getParishMembersList = exports.addParishMember = exports.addBanner = exports.deletePrayerRequest = exports.addRelics = exports.addImage = exports.getAllPrayerRequests = exports.addEventImages = exports.deleteMember = exports.deleteEvent = exports.getEvents = exports.updateEventStatus = exports.createEvent = exports.adminLogin = void 0;
const event_schema_1 = __importDefault(require("../models/event.schema"));
const prayerRequests_schema_1 = __importDefault(require("../models/prayerRequests.schema"));
const cloudinary_1 = __importDefault(require("../services/cloudinary"));
const gallery_schema_1 = __importDefault(require("../models/gallery.schema"));
const relic_schema_1 = __importDefault(require("../models/relic.schema"));
const banner_schema_1 = __importDefault(require("../models/banner.schema"));
const parishMembers_schema_1 = __importDefault(require("../models/parishMembers.schema"));
const admin_auth_schema_1 = __importDefault(require("../models/admin.auth.schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "your_secret_key";
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Missing username or password" });
    }
    try {
        const admin = yield admin_auth_schema_1.default.findOne({ username: username });
        if (!admin) {
            return res.status(401).json({ message: "Invalid username" });
        }
        // Check if the password is correct
        const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: admin._id, username: admin.username }, SECRET_KEY, {
            expiresIn: "1h", // Token expires in 1 hour
        });
        return res.status(200).json({ message: "Login successful!", token: token });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.adminLogin = adminLogin;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event } = req.body;
    try {
        // Create a new event instance based on the request body
        const newEvent = new event_schema_1.default({
            eventDate: event.eventDate,
            endDate: event.endDate,
            eventTime: event.eventTime,
            endTime: event.endTime,
            eventLocation: event.eventLocation,
            eventTheme: event.eventTheme,
            eventDescription: event.eventDescription,
        });
        yield newEvent.save();
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
const updateEventStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId, status } = req.body;
    try {
        // console.log(eventId, status);
        // Find the event by ID and update its status
        const updatedEvent = yield event_schema_1.default.findByIdAndUpdate(eventId, { status: status }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({
            message: "Event status updated successfully",
            event: updatedEvent,
        });
    }
    catch (error) {
        // Handle any errors
        console.error("Error updating event status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateEventStatus = updateEventStatus;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        // Query the database to get all events
        let events = {};
        if (status === "All") {
            events = yield event_schema_1.default.find().sort({ createdAt: -1 });
        }
        else {
            events = yield event_schema_1.default.find({ status: status }).sort({
                createdAt: -1,
            });
        }
        // Respond with the retrieved events
        res.status(200).json({ events });
    }
    catch (error) {
        // Handle any errors
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getEvents = getEvents;
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
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberId = req.params.memberId;
        // delete the event with the specified eventId
        yield parishMembers_schema_1.default.findByIdAndDelete(memberId);
        // Respond with the retrieved events
        res.status(200).json({ message: "Member deleted successfully" });
    }
    catch (error) {
        // Handle any errors
        console.error("Error deleting member:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteMember = deleteMember;
const addEventImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.body;
        const files = req.files;
        if (!eventId || !files || files.length === 0) {
            return res
                .status(400)
                .json({ message: "Event ID and images are required" });
        }
        const uploadedImages = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield cloudinary_1.default.uploader.upload(file.path);
            return result === null || result === void 0 ? void 0 : result.secure_url;
        })));
        const event = yield event_schema_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        event.imageUrls = uploadedImages;
        yield event.save();
        res.status(200).json({ message: "Images added successfully", event });
    }
    catch (error) {
        console.error("Error adding image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addEventImages = addEventImages;
const getAllPrayerRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPrayerRequests = yield prayerRequests_schema_1.default.find().sort({
            createdAt: -1,
        });
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
                imageUrl: imageUrl,
            });
            console.log(newImage);
            yield newImage.save();
            res.status(200).json({ message: "Image added successfully" });
        }
        else {
            res.status(400).json({ message: "No image file provided" });
        }
    }
    catch (error) {
        console.error("Error adding image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addImage = addImage;
const addRelics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description } = req.body;
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path);
            const imageUrl = result.secure_url;
            const newRelic = new relic_schema_1.default({
                description: description,
                imageUrl: imageUrl,
            });
            console.log(newRelic);
            yield newRelic.save();
            res.status(200).json({ message: "Relics added successfully" });
        }
        else {
            res.status(400).json({ message: "No image file provided" });
        }
    }
    catch (error) {
        console.error("Error adding image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addRelics = addRelics;
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
const addBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quote, author } = req.body;
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path);
            const imageUrl = result.secure_url;
            const newBanner = new banner_schema_1.default({
                quote: quote,
                author: author,
                imageUrl: imageUrl,
            });
            console.log("new Banner ", newBanner);
            yield newBanner.save();
            res.status(200).json({ message: "Banner added successfully" });
        }
        else {
            res.status(400).json({ message: "No image file provided" });
        }
    }
    catch (error) {
        console.error("Error adding banner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addBanner = addBanner;
const addParishMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, houseName, category } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Image file is required" });
        }
        let imageUrl = "";
        // Assuming the image file is stored as a Base64 string
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const newParishMember = new parishMembers_schema_1.default({
            name,
            houseName,
            image: imageUrl,
            category,
        });
        yield newParishMember.save();
        res.status(201).json({ message: "Parish member added successfully" });
    }
    catch (error) {
        console.error("Error adding parish member:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.addParishMember = addParishMember;
const getParishMembersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parishMembersLis = yield parishMembers_schema_1.default.find();
        res.status(201).json({ memebersList: parishMembersLis });
    }
    catch (error) {
        console.error("Error adding parish member:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getParishMembersList = getParishMembersList;
