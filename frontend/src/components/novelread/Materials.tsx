import style from "./Materials.module.css";

type imginfo = {
  caption: string;
  // created_at: string;
  // id: number;
  image: string;
  // novel_content: number;
};

type matinfo = {
  chosen_query: string;
  // content: string;
  // id: number;
  images: imginfo[];
  // novel: number;
  // query1: string;
  // query2: string;
  // query3: string;
  // step: number;
};

interface MatProps {
  mat: matinfo;
}

export default function Materials({ mat }: MatProps) {
  return (
    <div className={style.wrapper}>
      <div className={style.what}>
        {mat.images.map((item) => {
          return (
            <>
              <div className={style.pic}>
                <div className={style.inpic}>
                  <img src={item.image} alt="" />
                </div>
                <div className={style.caption}>{item.caption}</div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
