import mongoose, { Schema } from 'mongoose';

interface Banner {
    imageUrl: string;
    quote: string;
    author: string;
}

const bannerSchema = new Schema<Banner>({
  imageUrl: { type: String , required: true },
  quote: { type: String , required: true},
  author: { type: String ,required: true}
});

const BannerModel = mongoose.model<Banner>('Banner', bannerSchema);

export default BannerModel;
