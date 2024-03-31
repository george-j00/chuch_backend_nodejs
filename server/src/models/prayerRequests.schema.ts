import mongoose, { Document, Schema } from 'mongoose';

// Define interface for prayer request
interface IPrayerRequest extends Document {
    name: string;
    phoneNumber: string;
    place: string;
    requestType: string;
    specialPrayer?: string; // Optional field
    amount: string;
}

// Define mongoose schema for prayer request
const PrayerRequestSchema: Schema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    place: { type: String, required: true },
    requestType: { type: String, required: true },
    specialPrayer: { type: String }, // Optional field
    amount: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create and export the model
const PrayerRequestModel = mongoose.model<IPrayerRequest>('PrayerRequest', PrayerRequestSchema);
export default PrayerRequestModel;
