import mongoose, { Schema, Document } from 'mongoose';

interface Gallery {
    imageTitle:string;
    imageUrl:string;
}

const GallerySchema = new Schema<Gallery>({
  imageTitle: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const GalleryModel = mongoose.model<Gallery>('Gallery', GallerySchema);

export default GalleryModel;
