import { signOut } from "firebase/auth";
import { auth } from "../firebase";

/**
 * Signs out the current user from Firebase Authentication.
 * @returns
 */
export async function doSignOut(): Promise<void> {
  signOut(auth)
    .then(() => {
      return;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}

/**
 * Gets the Current Auth User's Email
 * @returns the email address or null if the user is not logged in
 */
export function getUserEmail(): string | null {
  if (auth.currentUser) {
    return auth.currentUser.email;
  }
  return null;
}
