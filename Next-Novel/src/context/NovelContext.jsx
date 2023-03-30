import { createContext, useContext, useState } from "react";

export const NovelContext = createContext();

export function NovelContextProvider({ children }) {
  const [novel, setNovel] = useState({
    materials: undefined,
    story: undefined,
  });

  return (
    <NovelContext.Provider value={{ novel, setNovel }}>
      {children}
    </NovelContext.Provider>
  );
}

export function useNovelContext() {
  return useContext(NovelContext);
}
