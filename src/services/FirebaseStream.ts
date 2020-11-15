import app from "firebase/app";
import "firebase/firestore";
import { Stream } from "./Stream";

export class FirebaseStream implements Stream {
  private userId: string;
  private db: app.firestore.Firestore;

  constructor(userId: string) {
    this.userId = userId;
    this.db = app.firestore();
  }

  addStream(streamName: string): Promise<void> {
    return this.db
      .collection("users")
      .doc(this.userId)
      .collection("streams")
      .add({ name: streamName })
      .then(() => {});
  }
  deleteStream(streamName: string): Promise<void> {
    return Promise.resolve();
  }
  addEntryToStream(streamName: string, entry: string): Promise<void> {
    return Promise.resolve();
  }
  getStreams(): Promise<string[]> {
    return this.db
      .collection("users")
      .doc(this.userId)
      .collection("streams")
      .get()
      .then((querySnapshot) => {
        const streamNames: string[] = [];

        querySnapshot.forEach((doc) => {
          const { name } = doc.data();
          streamNames.push(name);
        });

        return streamNames;
      });
  }
  getEntries(streamName: string): Promise<string[]> {
    return Promise.resolve([]);
  }
}
