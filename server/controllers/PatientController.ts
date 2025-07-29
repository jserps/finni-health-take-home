import { Request, Response } from "express";
import admin from "firebase-admin";

type Patient = {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    status: string;
    gender?: string;
    address: string;
}

/**
 * @description Create a new patient in Firestore
 * @param {Request} req - Express request object containing patient data in body
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with success message and patient reference
 */
export const createPatient = async (req: Request, res: Response) => {
    try {
        console.log(req);
        if(!req.body.patient) {
            return res.status(400).json({
                message: "Patient is required"
            });
        }

        console.log(req.body);
        const patient: Patient = req.body.patient;
        const patientRef = await admin.firestore().collection("patients").add(patient);
        return res.status(200).json({
            message: "Patient created successfully",
            patient: patientRef
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating patient",
            error: error.message
        });
    }
}

/**
 * @description Get a specific patient by ID from Firestore
 * @param {Request} req - Express request object with patient ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with patient data or error message
 */
export const getPatient = async (req: Request, res: Response) => {
    try {
        const patientId = req.params.id;
        const patientRef = await admin.firestore().collection("patients").doc(patientId).get();
        if(!patientRef.exists) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }
        return res.status(200).json({
            message: "Patient fetched successfully",
            patient: patientRef.data()
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching patient",
            error: error.message
        });
    }
}


/**
 * @description Get all patients from Firestore
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with patients list or error message
 */
export const getPatients = async (req: Request, res: Response) => {
    try {   
        const patients = await admin.firestore().collection("patients").get();
        return res.status(200).json({   
            message: "Patients fetched successfully",
            patients: patients.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching patients",
            error: error.message
        });
    }
}

/**
 * @description Delete a patient by ID from Firestore
 * @param {Request} req - Express request object with patient ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with success or error message
 */
export const deletePatient = async (req: Request, res: Response) => {
    try {
        const patientId = req.params.id;
        await admin.firestore().collection("patients").doc(patientId).delete();
        return res.status(200).json({
            message: "Patient deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting patient",
            error: error.message
        });
    }
}

/**
 * @description Update a patient by ID in Firestore
 * @param {Request} req - Express request object with patient ID in params and updated data in body
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with success or error message
 */
export const updatePatient = async (req: Request, res: Response) => {
    try {
        const patientId = req.params.id;
        if(!req.body.patient) {
            return res.status(400).json({
                message: "Patient is required"
            });
        }
        const patient: Patient = req.body.patient;
        await admin.firestore().collection("patients").doc(patientId).update(patient);
        return res.status(200).json({
            message: "Patient updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating patient",
            error: error.message
        });
    }
}