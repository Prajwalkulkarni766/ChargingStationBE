import { ChargingStation } from "../models/chargingStation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getChargingStation = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const total = await ChargingStation.countDocuments();
  const chargingStations = await ChargingStation.find()
    .skip(skip)
    .limit(limit);

  return res.status(200).json(
    new ApiResponse(200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      chargingStations
    }, "Charging stations fetched successfully")
  );
})

const createChargingStation = asyncHandler(async (req, res) => {
  const { name, location, status, powerOutput, connectorType } = req.body;

  // provided insufficient data
  if (!name && !location && !status && !powerOutput && !connectorType) {
    throw new ApiError(400, "Provided insufficient data");
  }

  // creating and checking of charging station
  const chargingStation = await ChargingStation.create(req.body);

  const createdChargingStation = await ChargingStation.findById(chargingStation._id);

  if (!createdChargingStation) {
    throw new ApiError(500, "Something went wrong while creating the charging station");
  }

  return res.status(201).json(
    new ApiResponse(201, createdChargingStation, "Charging station created Successfully")
  )
})

const updateChargingStation = asyncHandler(async (req, res) => {
  const { chargingStationId } = req.params;

  // finding and updating charging station
  const updatedChargingStation = await ChargingStation.findByIdAndUpdate(
    chargingStationId,
    req.body,
    { new: true }
  );

  if (!updatedChargingStation) {
    throw new ApiError(404, "Charging station not found");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedChargingStation, "Charging station updated successfully")
  );
})

const deleteChargingStation = asyncHandler(async (req, res) => {
  const { chargingStationId } = req.params;

  // finding and deleting charging station
  const chargingStation = await ChargingStation.findByIdAndDelete(chargingStationId);

  if (!chargingStation) {
    throw new ApiError(404, "Charging station not found");
  }

  return res.status(204).json(
    new ApiResponse(204, chargingStation, "Charging station deleted successfully")
  );
})

export { getChargingStation, createChargingStation, updateChargingStation, deleteChargingStation }