import React, { createContext, useContext, useState } from "react";

type Material = {
  caption: string;
  image: string;
};

type Novel = {
  genre: number;
  id?: string;
  step?: number;
  materials?: Material[];
  newMaterials?: Material[];
  story?: string;
  questions?: string[];
  selectedQuestion?: number;
  cover?: string;
  oldCover?: string;
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
    genre: 0,
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
    genre: 0,
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
