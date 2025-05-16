import mongoose,{Schema, Document} from "mongoose";
import Review from "./Review";

export interface IProduct extends Document{
    // id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    dateAdded: string;
    averageRating?: number;
    image?: string;
}

const productSchema = new Schema<IProduct>({
    name: {type: String, required: true},
    description: String,
    price: { type: Number, required: true},
    image: String,
    category: { type: String, required: true},
    averageRating: Number,
});

productSchema.index({name: "text", description: "text"});

productSchema.pre("deleteOne", { document: true, query: false }, async function () {
    const product = this as IProduct;
    await Review.deleteMany({ productId: product._id });
});

export default mongoose.model<IProduct>("Product", productSchema);
