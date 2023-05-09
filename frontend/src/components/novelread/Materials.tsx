import style from "./Materials.module.css";

type MatInfo = {
  imageName: string;
  caption: string;
};

interface MatProps {
  mat: MatInfo[];
}

export default function Materials({ mat }: MatProps) {
  return (
    <div className={style.wrapper}>
      <div className={style.what}>
        {mat.map((item) => {
          return (
            <>
              <div className={style.pic}>
                <div className={style.inpic}>
                  <img
                    src={process.env.REACT_APP_IMAGE_API + item.imageName}
                    alt="matimage"
                  />
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
