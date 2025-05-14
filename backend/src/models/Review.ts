import mongoose,{Schema, Document} from "mongoose";

export interface IReview extends Document {
    // id: string;
    productId: mongoose.Types.ObjectId;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

const reviewSchema = new Schema<IReview>({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true},
    author: String,
    rating: { type: Number, required: true},
    comment: String,
    date: String,
});

export default mongoose.model<IReview>("Review", reviewSchema);