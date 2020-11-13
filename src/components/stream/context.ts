import React from "react";
import { Stream } from "../../services/Stream";

export const StreamContext = React.createContext<Stream | null>(null);
