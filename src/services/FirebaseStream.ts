import { Stream } from "./Stream";

export class FirebaseStream implements Stream {
  addStream(streamName: string): Promise<void> {
    return Promise.resolve()
  }
  deleteStream(streamName: string): Promise<void> {
    return Promise.resolve()
  }
  addEntryToStream(streamName: string, entry: string): Promise<void> {
    return Promise.resolve()
  }
  getStreams(): Promise<string[]> {
    return Promise.resolve([])
  }
  getEntries(streamName: string): Promise<string[]> {
    return Promise.resolve([])
  }
}
