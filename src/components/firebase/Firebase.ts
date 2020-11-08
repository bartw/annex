import app from "firebase/app";
import "firebase/auth";
import config from "./config";

type Credentials = { email: string; password: string };

class Firebase {
  private auth: app.auth.Auth;
  private authenticated: boolean = false;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();

    this.onAuthStateChanged((authenticated) => {
      this.authenticated = authenticated;
    });
  }

  signUp = ({ email, password }: Credentials): Promise<void> =>
    this.auth.createUserWithEmailAndPassword(email, password).then(() => {});

  signIn = ({ email, password }: Credentials): Promise<void> =>
    this.auth.signInWithEmailAndPassword(email, password).then(() => {});

  signOut = (): Promise<void> => this.auth.signOut();

  resetPassword = ({ email }: { email: string }): Promise<void> =>
    this.auth.sendPasswordResetEmail(email);

  updatePassword = ({ password }: { password: string }): Promise<void> => {
    if (!this.auth.currentUser) {
      throw new Error("not logged in");
    }

    return this.auth.currentUser.updatePassword(password);
  };

  onAuthStateChanged = (
    callback: (authenticated: boolean) => void
  ): (() => void) => {
    return this.auth.onAuthStateChanged((user) => {
      callback(!!user);
    });
  };

  isAuthenticated = (): boolean => this.authenticated;
}

export default Firebase;