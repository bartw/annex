import React from "react";
import {
  act,
  render as rtlRender,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { StreamContext } from "../stream";
import { MockStream } from "../../test/mock-stream";
import { Dashboard } from ".";

const deferred = (): {
  promise: Promise<unknown>;
  resolve: any;
  reject: any;
} => {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

const render = (
  ui: React.ReactElement,
  {
    stream = null,
    ...options
  }: { stream?: MockStream | null } & Omit<RenderOptions, "queries"> = {}
) => {
  const Wrapper: React.ComponentType = ({ children }) => (
    <StreamContext.Provider value={stream}>{children}</StreamContext.Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

let streamMock: MockStream;

describe("without stream", () => {
  test("it renders nothing", () => {
    const { container } = render(<Dashboard />, { stream: null });
    expect(container).toBeEmptyDOMElement();
  });
});

describe("with stream", () => {
  let resolveStreams: (value?: unknown) => void;

  beforeEach(() => {
    streamMock = new MockStream();
    const { promise, resolve } = deferred();
    resolveStreams = resolve;
    streamMock.getStreams = jest.fn().mockReturnValueOnce(promise);
    render(<Dashboard />, { stream: streamMock });
    act(() => {
      streamMock.getStreams.mockReturnValueOnce(
        Promise.resolve(["stream1", "stream2"])
      );
    });
  });

  test("shows a title", () => {
    expect(
      screen.getByRole("heading", { level: 2 }).textContent
    ).toMatchInlineSnapshot(`"Dashboard"`);
  });

  test("shows a loader when fetching the streams", () => {
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders all streams", async () => {
    act(() => {
      resolveStreams(["stream1", "stream2"]);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const streamNames = screen
      .queryAllByRole("listitem")
      .map(({ textContent }) => textContent);

    expect(streamNames).toEqual(["stream1", "stream2"]);
  });
});
