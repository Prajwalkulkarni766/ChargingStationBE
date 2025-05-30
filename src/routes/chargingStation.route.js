import express from "express";
import { getChargingStation, createChargingStation, updateChargingStation, deleteChargingStation } from "../controllers/chargingStation.controller";

const router = express.Router();

router.route("/").get(getChargingStation).post(createChargingStation);
router.route("/{chargingStationId}").put(updateChargingStation).delete(deleteChargingStation);

export default router;