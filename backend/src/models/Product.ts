import mongoose,{Schema, Document} from "mongoose";

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

export default mongoose.model<IProduct>("Product", productSchema);
