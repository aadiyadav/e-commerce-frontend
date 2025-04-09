import { createContext } from "react";

// Define a type for the context value
interface ContextValue {
  fetchUserDetails: () => Promise<void>;
}

const Context = createContext<ContextValue | null>(null);

export default Context;
