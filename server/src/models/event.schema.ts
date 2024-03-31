import mongoose, { Document, Schema } from 'mongoose';

// Define interface for event
interface IEvent extends Document {
    eventDate: Date;
    eventLocation: string;
    eventTheme: string;
    eventTime: string;
    eventDescription: string;
}

// Define mongoose schema for event
const EventSchema: Schema = new Schema({
    eventDate: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    eventTheme: { type: String, required: true },
    eventTime: { type: String, required: true },
    eventDescription: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create and export the model
const EventModel = mongoose.model<IEvent>('Event', EventSchema);
export default EventModel;
