import React, { createContext, useContext, useState } from "react";

type Material = {
  caption: string;
  image: string;
};

type Novel = {
  genreIndex: number;
  engGenreName: string;
  korGenreName: string;
  materials: Material[];
  newMaterials: Material[];
  startStory: string;
  continueStory: string[];
  endStory: string;
  questions: string[]; //의문
  selectedQuestion: string; //의문
  totalQuestions: string[];
  cover: string;
  oldCover: string;
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
    genreIndex: 0,
    engGenreName: "romance",
    korGenreName: "로맨스",
    materials: [],
    newMaterials: [],
    startStory: "",
    continueStory: [],
    endStory: "",
    questions: [], //의문
    selectedQuestion: "", //의문
    totalQuestions: [],
    cover: "",
    oldCover: "",
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
    genreIndex: 0,
    engGenreName: "romance",
    korGenreName: "로맨스",
    materials: [],
    newMaterials: [],
    startStory: "",
    continueStory: [],
    endStory: "",
    questions: [], //의문
    selectedQuestion: "", //의문
    totalQuestions: [],
    cover: "",
    oldCover: "",
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
