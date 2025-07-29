import { Router } from "express";
import { createPatient, deletePatient, getPatient, getPatients, updatePatient } from "../controllers/patientController";

const patientRouter = Router();

/**
 * @route GET /patients
 * @description Get all patients
 * @access Public
 */
patientRouter.get("/getPatients", getPatients);

/**
 * @route GET /patients/:id
 * @description Get a specific patient by ID
 * @param {string} id - Patient ID
 * @access Public
 */
patientRouter.get("/:id", getPatient);

/**
 * @route POST /patients/createPatient
 * @description Create a new patient
 * @body {Patient} patient - Patient object
 * @access Public
 */
patientRouter.post("/createPatient", createPatient);

/**
 * @route DELETE /patients/deletePatient/:id
 * @description Delete a patient by ID
 * @param {string} id - Patient ID
 * @access Public
 */
patientRouter.delete("/deletePatient/:id", deletePatient);

/**
 * @route PUT /patients/updatePatient/:id
 * @description Update a patient by ID
 * @param {string} id - Patient ID
 * @body {Patient} patient - Updated patient object
 * @access Public
 */
patientRouter.put("/updatePatient/:id", updatePatient);

export default patientRouter;