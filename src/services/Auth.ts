export type Credentials = { email: string; password: string };

export interface Auth {
  signUp(credentials: Credentials): Promise<void>;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): Promise<void>;
  resetPassword({ email }: { email: string }): Promise<void>;
  updatePassword({ password }: { password: string }): Promise<void>;
  onAuthStateChanged(callback: (authenticated: boolean) => void): () => void;
  isAuthenticated(): boolean;
}
