import { Request, Response } from "express";
import admin from "firebase-admin";

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await admin.firestore().collection("Users").doc(userId).get();
        if(!user.exists) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User fetched successfully",
            user: user.data()
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
}