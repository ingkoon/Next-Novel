import style from "./Delete.module.css";
import { deletenovel, deletecomment } from "../../../api/novel";

type DeleteProps = {
  type: string;
  novelId: number;
  commentId: number;
  closemodal: () => void;
  refreshList: () => void;
};
export default function Delete({
  type,
  novelId,
  commentId,
  closemodal,
  refreshList,
}: DeleteProps) {
  async function delnovel() {
    try {
      const data = await deletenovel(novelId);
      console.log(data);
      console.log("삭제되었음");
      refreshList();
      closemodal();
    } catch (e) {
      console.log(e);
    }
  }

  async function delcomment() {
    try {
      const data = await deletecomment(commentId);
      console.log(data);
      closemodal();
    } catch (e) {
      console.log(e);
    }
  }

  const deletething = () => {
    if (type === "novel") {
      delnovel();
      refreshList();
    } else if (type === "comment") {
      delcomment();
    }
  };

  return (
    <div className={style.deletemodal}>
      <div className={style.close} onClick={() => closemodal()}>
        x
      </div>
      <div className={style.title}>
        &gt;_DELETE MY {type === "novel" ? "NOVEL" : "COMMENT"}
      </div>

      <div className={style.subtitle}>
        {" "}
        작성한 {type === "novel" ? "소설" : "댓글"}을 삭제하시겠습니까?
      </div>

      <div className={style.button}>
        <button onClick={() => closemodal()}>취소</button>
        <button onClick={() => deletething()}>확인</button>
      </div>

      <img
        src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
        className={style.circle_left}
        alt="circles_left"
      />
      <img
        src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
        className={style.circle_right}
        alt="circles_right"
      />
    </div>
  );
}
