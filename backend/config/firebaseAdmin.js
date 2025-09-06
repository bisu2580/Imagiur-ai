import dotenv from "dotenv";
import admin from "firebase-admin";
dotenv.config();
if (!process.env.FIREBASE_CREDENTIALS) {
  throw new Error("The FIREBASE_CREDENTIALS environment variable is not set.");
}
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export const db = admin.firestore();
export default admin;
