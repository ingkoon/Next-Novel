import { createContext, useContext, useState } from "react";

export const NovelContext = createContext();

export function NovelContextProvider({ children }) {
  const [novel, setNovel] = useState({
    genre: undefined,
    id: undefined,
    step: undefined,
    materials: undefined,
    newMaterials: [],
    story: undefined,
    questions: undefined,
    selectedQuestion: undefined,
    cover: undefined,
  });
  const [step, setStep] = useState(0);

  return (
    <NovelContext.Provider value={{ novel, setNovel, step, setStep }}>
      {children}
    </NovelContext.Provider>
  );
}

export function useNovelContext() {
  return useContext(NovelContext);
}
