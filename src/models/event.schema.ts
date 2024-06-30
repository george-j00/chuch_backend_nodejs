import mongoose, { Document, Schema } from 'mongoose';

// Define interface for event
interface IEvent extends Document {
    eventDate: Date;
    endDate: Date;
    eventTime: string;
    endTime: string;
    eventLocation: string;
    eventTheme: string;
    eventDescription: string;
    status:"Upcoming" | "Ongoing" | "Completed"
    imageUrls : string[];
}

// Define mongoose schema for event
const EventSchema: Schema = new Schema({
    eventDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    endTime: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventTheme: { type: String, required: true },
    eventDescription: { type: String, required: true },
    status: { type: String,  default: 'Upcoming'},
    imageUrls: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now }
});

// Create and export the model
const EventModel = mongoose.model<IEvent>('Event', EventSchema);
export default EventModel;
