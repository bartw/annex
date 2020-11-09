import React from "react";
import { Auth } from "../../services/Auth";

export const AuthContext = React.createContext<Auth | null>(null);
