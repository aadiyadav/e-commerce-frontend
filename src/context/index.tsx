import { createContext } from "react";

interface ContextValue {
  fetchUserDetails: () => Promise<void>;
  cartCount: number;
  cartCountFunc: () => Promise<void>;
}

const Context = createContext<ContextValue | null>(null);

export default Context;
