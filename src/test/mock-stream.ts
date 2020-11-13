import { Stream } from "../services/Stream";

export class MockStream implements Stream {
  addStream = jest.fn().mockReturnValue(Promise.resolve());
  deleteStream = jest.fn().mockReturnValue(Promise.resolve());
  addEntryToStream = jest.fn().mockReturnValue(Promise.resolve());
  getStreams = jest.fn().mockReturnValue(Promise.resolve([]));
  getEntries = jest.fn().mockReturnValue(Promise.resolve([]));
}
