import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import admin, { db } from "../config/firebaseAdmin.js";
import dotenv from "dotenv";
import verifyToken from "../middleware/verifyToken.js";

dotenv.config();
const router = express.Router();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const creditsMap = {
  25: 100,
  50: 500,
  2000: 4000,
  4999: "UNLIMITED",
};

// route to create subscription checkout session
router.post("/create-razorpay-order", verifyToken, async (req, res) => {
  const { uid, email } = req.user;
  const { amount } = req.body;
  try {
    if (!amount || !creditsMap[amount]) {
      return res.status(400).json({ error: "Invalid Amount" });
    }
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${new Date().getTime()}`,
      notes: { uid, email, plan: creditsMap[amount] },
    };
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Error creating Razorpay order.");
    }
    res.json({
      orderId: order.id,
      amount: order.amount,
      keyId: process.env.RAZORPAY_KEY_ID,
      credits: creditsMap[amount],
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

router.post("/verify-razorpay-payment", verifyToken, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } =
    req.body;
  const { uid } = req.user;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res
      .status(400)
      .json({ error: "Payment verification data is missing." });
  }

  try {
    // 1. Verify the signature
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ error: "Transaction not legit!" });
    }

    let creditsToAdd = creditsMap[amount];
    // 2. Signature is valid, now update the database
    if (!creditsToAdd) {
      return res.status(400).json({ error: "Invalid amount." });
    }
    const userDocRef = db.collection("users").doc(uid);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = userDoc.data();
    const paymentDetails = {
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      paymentDate: new Date(),
      amountPaid: amount,
    };
    const activity = {
      type: "purchased_credits",
      creditsToAdd: creditsToAdd,
      timestamp: new Date(),
    };
    const prevActivities = userData.activities || [];
    const updatedActivities = [...prevActivities, activity].slice(-20);
    if (creditsToAdd === "UNLIMITED") {
      await userDocRef.set(
        {
          plan: "UNLIMITED",
          credits: admin.firestore.FieldValue.delete(), // optional: remove credits field
          activities: updatedActivities,
          paymentDetails,
        },
        { merge: true }
      );
    } else {
      await userDocRef.set(
        {
          credits: admin.firestore.FieldValue.increment(creditsToAdd),
          activities: updatedActivities,
          paymentDetails,
        },
        { merge: true }
      );
    }
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully!",
      creditsAdded: creditsToAdd,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Payment verification failed." });
  }
});

export default router;
