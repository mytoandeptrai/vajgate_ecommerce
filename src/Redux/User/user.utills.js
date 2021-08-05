import { firestore } from "../../Utilities/firebase/utils";

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  console.log(userAuth);
  if (!userAuth) return;
  const { uid } = userAuth;
  //check user in collection
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const defaultImage = "https://graph.facebook.com/491658451867422/picture";
    const timestamp = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt: timestamp,
        image: defaultImage,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userRef;
};
