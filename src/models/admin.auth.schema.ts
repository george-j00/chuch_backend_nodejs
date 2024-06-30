import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Admin document
interface IAdmin extends Document {
  username: string;
  password: string;
}

// Define the schema for the Admin model
const AdminSchema: Schema<IAdmin> = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the Admin model
const AdminModel = mongoose.model<IAdmin>('Admin', AdminSchema);
export default AdminModel;
