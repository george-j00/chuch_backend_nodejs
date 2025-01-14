// models/ParishMember.ts
import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IParishMember extends Document {
  name: string;
  houseName: string;
  image?: string;
  category: 'spiritual-leaders' | 'parish-council' | 'eminent-personalities' | 'parish-members';
}

// Create a Schema corresponding to the document interface.
const ParishMemberSchema: Schema = new Schema({
  name: { type: String, required: true },
  houseName: { type: String, required: true },
  image: { type: String , optional: true},
  phoneNumber: { type: String , optional: true},
  category: { 
    type: String, 
    required: true,
    enum: ['spiritual-leaders', 'parish-council', 'eminent-personalities', 'parish-members']
  },
});

// Create a Model.
const ParishMember: Model<IParishMember> = model<IParishMember>('ParishMember', ParishMemberSchema);

export default ParishMember;
