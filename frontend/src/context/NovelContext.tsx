import React, { createContext, useContext, useState } from "react";

type Material = {
  caption: string;
  image: string;
};
type Question = {
  index: number;
  query: string;
};

type Novel = {
  genre: string;
  id: string | undefined;
  step: number | undefined;
  materials: Material[] | undefined;
  newMaterials: Material[] | undefined;
  story: string | undefined;
  questions: Question[] | undefined;
  selectedQuestion: number | undefined;
  cover: string | undefined;
};

type NovelContextType = {
  novel: Novel;
  setNovel: React.Dispatch<React.SetStateAction<Novel>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export const NovelContext = createContext<NovelContextType>({
  novel: {
    genre: "romance",
    id: undefined,
    step: undefined,
    materials: undefined,
    newMaterials: undefined,
    story: undefined,
    questions: undefined,
    selectedQuestion: undefined,
    cover: undefined,
  },
  setNovel: () => {},
  step: 1,
  setStep: () => {},
  count: 0,
  setCount: () => {},
});

export function NovelContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [novel, setNovel] = useState<Novel>({
    genre: "romance",
    id: undefined,
    step: undefined,
    materials: undefined,
    newMaterials: undefined,
    story: undefined,
    questions: undefined,
    selectedQuestion: undefined,
    cover: undefined,
  });
  const [step, setStep] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  return (
    <NovelContext.Provider
      value={{ novel, setNovel, step, setStep, count, setCount }}
    >
      {children}
    </NovelContext.Provider>
  );
}

export function useNovelContext() {
  return useContext<NovelContextType>(NovelContext);
}
