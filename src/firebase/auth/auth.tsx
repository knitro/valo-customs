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
