import mongoose, { Schema } from 'mongoose';

interface Relic {
    imageUrl: string;
    description: string;
}

const RelicSchema = new Schema<Relic>({
  imageUrl: { type: String, required: true },
  description: { type: String, required: true }
});

const RelicModel = mongoose.model<Relic>('Relic', RelicSchema);

export default RelicModel;
