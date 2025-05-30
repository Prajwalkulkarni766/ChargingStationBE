import { model, Schema } from "mongoose";

const chargingStationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      }
    },
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true,
  },
  powerOutput: {
    type: Number,
    required: true
  },
  connectorType: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const ChargingStation = model("ChargingStation", chargingStationSchema);

export { ChargingStation };