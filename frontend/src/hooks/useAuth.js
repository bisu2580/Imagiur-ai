import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import { auth, db } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const unsubscribeSnapshot = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUser({ uid: currentUser.uid, ...docSnap.data() });
            } else {
              console.warn("User authenticated, but no data in Firestore.");
              setUser(null);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Failed to listen to user document:", error);
            setUser(null);
            setLoading(false);
          }
        );
        return () => unsubscribeSnapshot();
      } else {
        setUser(null);
        setLoading(false);
        navigate("/");
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  return { user, loading };
};
