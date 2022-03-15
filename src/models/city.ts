import mongoose from "mongoose";

const City = new mongoose.Schema(
  {
    fips: {
      type: String
    },
    state: {
      type: String
    },
    name: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model('city', City);
