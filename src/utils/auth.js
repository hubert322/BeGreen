import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://hubert322.github.io/BeGreen/#/verify',
  // url: 'http://localhost:3000/#/verify',
  // This must be true.
  handleCodeInApp: true,
};

export function loginWithEmail(app, email) {

  const auth = getAuth(app);
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ...
    });
}

export async function emailRedirectLogin(app) {
  // Confirm the link is a sign-in with email link.
  const auth = getAuth(app);
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Confirm the link is a sign-in with email link.
    const auth = getAuth(app);
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      return true;
    } catch (error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
      alert(error);
      return false;
    }
  } else {
    return Promise.resolve(false);
  }
}
