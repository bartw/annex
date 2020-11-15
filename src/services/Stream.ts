export interface Stream {
  addStream(streamName: string): Promise<void>;
  deleteStream(streamName: string): Promise<void>;
  addEntryToStream(streamName: string, entry: string): Promise<void>;
  getStreams(): Promise<string[]>;
  getEntries(streamName: string): Promise<string[]>;
}
