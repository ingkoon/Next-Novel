import { createContext, useContext, useState } from "react";

export const NovelContext = createContext();

export function NovelContextProvider({ children }) {
  const [novel, setNovel] = useState({
    genre: undefined,
    id: undefined,
    step: undefined,
    materials: undefined,
    story: undefined,
    questions: undefined,
    selectedQuestion: undefined,
    captions: [],
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
