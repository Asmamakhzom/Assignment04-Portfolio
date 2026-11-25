import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema( 
    {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    },

    { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;