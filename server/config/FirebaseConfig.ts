import admin from 'firebase-admin';

let firebase: admin.app.App;

export const connectFirebase = async () => {
    try {
        if (!firebase) {
            // Check if the environment variable exists
            if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
                throw new Error("GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable is not set. Please check your .env file.");
            }

            firebase = admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON))
            });
            
            console.log("Firebase connected successfully");
        }
        return firebase;
    } catch (error) {
        console.error("Error connecting to Firebase:", error);
        throw error;
    }
}