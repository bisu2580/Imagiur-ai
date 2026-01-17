import toast from "react-hot-toast";
import { auth } from "../config/firebase";

export const processPayment = async (selectedAmount, user) => {
  if (!user || !auth.currentUser) {
    toast.error("You must be logged in to upgrade.");
    return;
  }
  try {
    // 1. Get Firebase ID token
    const idToken = await auth.currentUser.getIdToken();

    // 2. Create a Razorpay Order on the backend (send amount to backend)
    const orderResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/create-razorpay-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ amount: selectedAmount }),
    });

    if (!orderResponse.ok) {
      throw new Error("Failed to create Razorpay order.");
    }
    const { orderId, amount, keyId, credits } = await orderResponse.json();

    const options = {
      key: keyId,
      amount: amount,
      currency: "INR",
      name: "Imagiur Premium",
      description: "Unlock all features",
      order_id: orderId,
      handler: async function (response) {
        try {
          const verificationResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/payments/verify-razorpay-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: selectedAmount,
              }),
            }
          );
          if (!verificationResponse.ok) {
            throw new Error("Payment verification failed.");
          }
          console.log("Payment successful and verified!");
          toast.success("Payment successful! Enjoy your credits 🎉");
        } catch (err) {
          console.error("Verification failed:", err);
          toast.error("Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: user.displayName || "New User",
        email: user.email,
      },
      theme: {
        color: "#6366F1", // Indigo color
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on("payment.failed", function (response) {
      toast.error("Payment failed. Please try again.");
      console.error(response.error);
    });
  } catch (err) {
    toast.error(err.message);
    console.error("Error during upgrade process:", err);
  }
};
