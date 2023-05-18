import React, { ChangeEvent, useState } from "react";
import Guide from "./Guide";
import style from "./WriteStep5b.module.css";
import { useNovelContext } from "../../context/NovelContext";
import LoadingModal from "../common/LoadingModal";
import useNovelWrite from "../../hooks/useNovelWrite";
import { useNavigate } from "react-router-dom";
import useCheckReady from "../../hooks/useCheckReady";
import useDataurlToFile from "../../hooks/useDataurlToFile";
import usePayment from "../../hooks/usePayment";
import { UpdatePoint } from "../../types/payment";

type Input = {
  title: string;
  desc: string;
};

export default function WriteStep5b() {
  const { novel } = useNovelContext();
  const [input, setInput] = useState<Input>({ title: "", desc: "" });
  const { finNovel } = useNovelWrite();
  const navigate = useNavigate();
  const { isShaking, checkReady } = useCheckReady();
  const { dataurlToFile } = useDataurlToFile();
  const { updatePoint } = usePayment();

  const buttons = [
    {
      icon: "",
      click1: "제목",
    },
    {
      icon: "/icon/message.svg",
      click1: "한줄 소개글",
    },
    {
      icon: "/icon/tag.svg",
      click1: "장르",
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  const button = () => {
    if (!checkReady({ order: "input", input: input })) return;
    const formData = appendFormData();

    finNovel.mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        updatePointAsync();
        //원래는 포인트 차감 성공시 finNovel을 하고, 실패 시 포인트 되돌려받기를 하고 싶으나...
        const novelId = res.data.novelId;
        navigate(`/library/${novelId}/intro`, { state: { novelId: novelId } });
      },
    });
  };
  async function updatePointAsync() {
    try {
      const jsonData: UpdatePoint = {
        memberId: localStorage.getItem("memberId")!,
        point: -10,
      };
      const res = await updatePoint(jsonData);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  const appendFormData = () => {
    const formData = new FormData();
    const contentsVal = novel.newMaterials.map((_, index) => ({
      content: novel.continueStory[index],
      query: novel.totalQuestions[index],
      caption: novel.newMaterials[index].caption,
    }));
    const startImagesVal = novel.materials.map((material) => ({
      imageName: "",
      caption: material.caption,
    }));
    const novelJson = {
      title: input.title,
      introduction: input.desc,
      engGenre: novel.engGenreName,
      korGenre: novel.korGenreName,
      memberId: localStorage.getItem("memberId")!,
      contents: contentsVal,
      startImages: startImagesVal,
      startContent: novel.startStory,
      endContent: novel.endStory,
    };
    console.log(novelJson);

    formData.append(
      "novel",
      new Blob([JSON.stringify(novelJson)], { type: "application/json" })
    );
    //파일로 변환 필요, 아니면 그냥 dataurl 형식 말고 파일로 저장시킬까.

    const start_images_files = dataurlToFile(
      novel.materials.map((material) => material.image),
      "start"
    );
    //이어하기가 없으면?
    const content_images_files = dataurlToFile(
      novel.newMaterials.map((newMaterial) => newMaterial.image),
      "continue"
    );
    const cover_images_files = dataurlToFile(
      [novel.cover, novel.oldCover],
      "end"
    );
    start_images_files.forEach((file) => formData.append("start_images", file));
    content_images_files.forEach((file) =>
      formData.append("content_images", file)
    );
    cover_images_files.forEach((file) => formData.append("cover_images", file));

    return formData;
  };

  return (
    <div className={style.container}>
      <LoadingModal state={finNovel.isLoading} />
      <div className={style.component}>
        <div className={style.left}>
          <div className={style.book}>
            <div className={style.cover}>
              <img src={novel.cover!} alt="cover" />
            </div>
            <div className={style.back1} />
            <div className={style.back2} />
            <div className={style.back3} />
            <div className={style.back4} />
          </div>
        </div>
        <div className={style.right}>
          <img
            src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
            className={style.circle_left}
            alt="circle_left"
          />
          <img
            src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
            className={style.circle_right}
            alt="circle_right"
          />
          <div className={style.input}>
            {buttons.map((button, index) => {
              return (
                <div className={style.elementBox} key={index}>
                  <div className={style.element1} />
                  <div className={style.element2} />
                  <div className={style.element3} />
                  <div className={style.content1}>
                    <div className={style.icon}>
                      {index !== 0 && (
                        <img
                          src={process.env.PUBLIC_URL + button.icon}
                          alt="icon"
                        />
                      )}
                      {index === 0 && <div>Tt</div>}
                    </div>
                    <div className={style.click1}>{button.click1}</div>
                  </div>
                  <div className={style.content2}>
                    <div className={style.click2} />
                    <div className={style.click3}>
                      {index === 0 && (
                        <input
                          type="text"
                          name="title"
                          value={input.title}
                          placeholder="제목"
                          required
                          onChange={handleChange}
                        />
                      )}
                      {index === 1 && (
                        <input
                          type="text"
                          name="desc"
                          value={input.desc}
                          placeholder="한줄 소개글"
                          required
                          onChange={handleChange}
                        />
                      )}
                      {index === 2 && <span>{novel.korGenreName}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style.guide}>
            <Guide isShaking={isShaking} />
          </div>
          <div className={style.end}>
            <div>
              <div className={style.slide} />
              <div className={style.end1}>
                <img
                  src={process.env.PUBLIC_URL + `/img/path.png`}
                  alt="path"
                />
              </div>
              <div className={style.fin} onClick={button}>
                <div className={style.end2} />
                <div className={style.end3}>Fin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
