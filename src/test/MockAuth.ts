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

  signUp = jest.fn().mockReturnValue(Promise.resolve());
  signIn = jest.fn().mockReturnValue(Promise.resolve());
  signOut = jest.fn().mockReturnValue(Promise.resolve());
  resetPassword = jest.fn().mockReturnValue(Promise.resolve());
  updatePassword = jest.fn().mockReturnValue(Promise.resolve());
  isAuthenticated = jest.fn().mockReturnValue(false);

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
}
