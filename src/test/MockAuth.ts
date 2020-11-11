import { Auth, Credentials } from "../services/Auth";

const uuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

type Callback = (authenticated: boolean) => void;

export class MockAuth implements Auth {
  private callbacks: Array<{ id: string; callback: Callback }> = [];

  signUp(credentials: Credentials): Promise<void> {
    return Promise.resolve();
  }

  signIn(credentials: Credentials): Promise<void> {
    return Promise.resolve();
  }

  signOut(): Promise<void> {
    return Promise.resolve();
  }

  resetPassword({ email }: { email: string }): Promise<void> {
    return Promise.resolve();
  }

  updatePassword({ password }: { password: string }): Promise<void> {
    return Promise.resolve();
  }

  onAuthStateChanged(callback: Callback): () => void {
    const id = uuid();
    this.callbacks = [...this.callbacks, { id, callback }];
    return () => {
      this.callbacks = this.callbacks.filter((cb) => id !== cb.id);
    };
  }

  fireCallbacks(authenticated: boolean): void {
    this.callbacks.forEach(({ callback }) => {
      callback(authenticated);
    });
  }

  isAuthenticated(): boolean {
    return false;
  }
}
