import mongoose from "mongoose";

const CitySchema = new mongoose.Schema(
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

export default mongoose.model('city', CitySchema);
