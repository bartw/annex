import React from "react";
import {
  fireEvent,
  render as rtlRender,
  RenderOptions,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StreamContext } from "../stream";
import { MockStream } from "../../test/mock-stream";
import { AddStream } from ".";

const streamName = "new stream";

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
beforeEach(() => {
  streamMock = new MockStream();
  render(<AddStream />, { stream: streamMock });
});

test("renders name and submit button", () => {
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /add stream/i })
  ).toBeInTheDocument();
});

test("on click submit button call addStream with name", () => {
  userEvent.type(screen.getByLabelText(/name/i), streamName);
  userEvent.click(screen.getByRole("button", { name: /add stream/i }));

  expect(streamMock.addStream).toHaveBeenCalledTimes(1);
  expect(streamMock.addStream).toHaveBeenCalledWith(streamName);
});

test("on submit from name field call addStream with name", () => {
  userEvent.type(screen.getByLabelText(/name/i), streamName);
  fireEvent.submit(screen.getByLabelText(/name/i));

  expect(streamMock.addStream).toHaveBeenCalledTimes(1);
  expect(streamMock.addStream).toHaveBeenCalledWith(streamName);
});

// these 👇 don't work (yet) because of issues with jsdom
// https://github.com/jsdom/jsdom/issues/2933
// https://github.com/jsdom/jsdom/issues/2898

// test("addStream is not called when name is empty", () => {
//   userEvent.click(screen.getByRole("button", { name: /add stream/i }));

//   expect(streamMock.addStream).not.toHaveBeenCalled();
// });
