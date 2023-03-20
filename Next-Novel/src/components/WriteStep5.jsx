import React from "react";
import { useState } from "react";

export default function WriteStep5({ genre }) {
  const [novel, setNovel] = useState({});
  const [file, setFile] = useState();
  const genreName = ["", "로맨스", "판타지", "추리", "SF", "자유"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setNovel((novel) => ({ ...novel, [name]: value }));
  };

  return (
    <div>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={novel.title ?? ""}
          placeholder="제목"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="desc"
          value={novel.desc ?? ""}
          placeholder="한줄 소개글"
          required
          onChange={handleChange}
        />
        <span>{genreName[genre]}</span>
        <button>끝</button>
      </form>
    </div>
  );
}
