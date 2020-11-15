import app from "firebase/app";
import "firebase/auth";
import { Auth, Credentials } from "./Auth";

export class FirebaseAuth implements Auth {
  private auth: app.auth.Auth;
  private user: app.User | null = null;

  constructor() {
    this.auth = app.auth();
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
    return this.auth.onAuthStateChanged((user: app.User | null) => {
      this.user = user;
      callback(!!user);
    });
  };

  isUserAuthenticated = (): boolean => !!this.user;
  
  getUserId = (): string | null => this.user?.uid ?? null;
  
  getUserName = (): string | null => this.user?.displayName ?? null;
}
