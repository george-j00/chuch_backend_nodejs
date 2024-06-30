"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define mongoose schema for event
const EventSchema = new mongoose_1.Schema({
    eventDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    endTime: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventTheme: { type: String, required: true },
    eventDescription: { type: String, required: true },
    status: { type: String, default: 'Upcoming' },
    imageUrls: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now }
});
// Create and export the model
const EventModel = mongoose_1.default.model('Event', EventSchema);
exports.default = EventModel;
