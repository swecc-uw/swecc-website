import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// False during prerender and hydration, true once mounted on the client.
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
