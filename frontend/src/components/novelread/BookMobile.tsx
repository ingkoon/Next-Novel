import style from "./BookMobile.module.css";
import Materials from "./Materials";
import Qna from "./Qna";
import LoginModal from "../common/LoginModal";

import { useCallback, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
//api
import { novelall } from "../../api/novelread";
import useCommentWrite from "../../hooks/useCommentWrite";

type Params = {
  id: string;
};

type MatInfo= {
  imageName: string;
  caption: string;
}

type NMat = MatInfo[];

type Ninfo = {
  coverImg: string;
  id: number;
  introduction: string;
  originCoverImg: string;
  title: string;
}

type Ndtl = {
  novelId: number;
  content: string;
  query: string;
  image: string;
  caption: string;
}

type Ncontent = Ndtl[];

interface ExtendedHTMLElement extends HTMLElement {
  pageNum: number;
};

type InputProps = {
  comm ?: string;
};

export default function Book() {
  const { id } = useParams<Params>();
  const Nid = id? parseInt(id) : 0;
  const [novelid, setNovelid] = useState(Nid);
  const [novelinfo, setNovelinfo] = useState<Ninfo>();
  const [novelMat, setNovelMat] = useState<NMat>([]);
  const [novelContent, setNovelContent] = useState<Ncontent>();
  const [lastPage, setLastPage] = useState("");
  const [rerender, setRerender] = useState("");
  const page_ref = useRef<HTMLDivElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); //login
  //로컬 닉네임
  const localNickname: string = localStorage.getItem('nickName') ?? '';

  const [input, setInput] = useState<InputProps>({});
  const { submitComment } = useCommentWrite();
  const [flag, setFlag] = useState(false);
  async function nvinfo() {
    console.log("노벨아이디" + novelid);
    try {
      const data = await novelall(novelid, localNickname);
      console.log(data);
      setNovelinfo({
        coverImg: data.data.coverImg,
        id: data.data.id,
        introduction: data.data.introduction,
        originCoverImg: data.data.originCoverImg,
        title: data.data.title,
      });
      setNovelMat(data.data.startImages);
      setNovelContent(
        data.data.contents
      );
      setLastPage(
        data.data.endContent
      );

      setFlag(true);
    } catch (e) {
      console.log(e);
    }
  }

  // const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    console.log("mount useEffect");
    setNovelid(Nid);
    nvinfo();
  }, [novelid]);

  useEffect(() => {
    console.log("zIndex useEffect");
    console.log();
    const pages = document.querySelectorAll(`.${style.page}`);
    console.log(pages.length);
    setRerender("hi");
  }, [flag]);

  const navigate = useNavigate();

  const navigateToIntro = (id:number) => {
    navigate(`/library/${id}/intro`, { state: { id: id } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  // const [loginIsOpen, setLoginIsOpen] = useState(false);

  const submit = () => {
    // 일단 로그인 주석처리
    if (!localStorage.getItem("access_token")) {
      setModalIsOpen(true);
      return;
    }
    if (!input.comm) {
      return;
    }

    submitComment.mutate({
    content: input.comm.trim(),
    nickName: localNickname,
    novelId: novelid
  }, {
      onSuccess: (res) => {
        console.log(res);
        navigate(`/library/${novelid}/intro`, { state: { id: novelid } });
      },
    });
  };

  const closemodal = () => {
    setModalIsOpen(false);
  };

  // ///////////////////////////////////////////////////
  // tsx code starts here
  // ///////////////////////////////////////////////////

  return (
    <div className={style.back}>
      <LoginModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      {novelinfo && (
        <div className={style.book}>
          <div className={style.pages}>
            <div className={style.page}>
              <div className={style.cover}>
                <div className={style.coverimg}>
                  <img
                    src={
                      novelinfo &&
                      process.env.REACT_APP_IMAGE_API +
                        novelinfo.coverImg
                    }
                    alt="coverimg"
                  />
                </div>
                <div className={style.gap}></div>
                <div className={style.bookfooter}>
                  <span className={style.ex}>"&nbsp;</span>
                  <span>{novelinfo.introduction}</span>
                  <span className={style.ex}>&nbsp;"</span>
                </div>
                <div className={style.fbar} />
              </div>
            </div>
            {novelContent?.map((item, index) => {
              return (
                <>
                  <div className={style.page} ref={page_ref}>
                    {index === 0 && <Materials mat={novelMat} />}
                    {index > 0 && <Qna qna={item} index={index} />}
                  </div>
                  <div className={style.page} ref={page_ref}>
                    <span className={style.text}>{item.content}</span>
                  </div>
                </>
              );
            })}

            <div className={style.page}>
              <span className={style.text}>{lastPage}</span>
            </div>
            <div className={style.page}>
              <div className={style.ogcover}>
                <img
                  src={
                    novelinfo &&
                    process.env.REACT_APP_IMAGE_API +
                      novelinfo.originCoverImg
                  }
                  alt="ogcover"
                />
                <div className={style.tmi}>
                  P.S. 책 표지는 위 그림으로 만들어졌습니다.
                </div>
              </div>
            </div>
            <div className={style.page}>
              <div className={style.lastpg}>
                <div className={style.eng}>THE END.</div>
                {/* <div className={style.theend}>끝</div> */}
                <div className={style.ebar} />
              </div>
            </div>
            <div className={style.fin}>
              <div className={style.block}>
                <img
                  src={process.env.PUBLIC_URL + "/icon/glasses_black.svg"}
                  className={style.icon}
                  alt="glasses_black"
                />
                <div
                  className={style.link}
                  onClick={() => navigateToIntro(novelinfo.id)}
                >
                  <h2>돌아가기</h2>
                </div>
              </div>
              <div className={style.blank} />
              <div className={style.block}>
                <img
                  src={process.env.PUBLIC_URL + "/icon/comments2.svg"}
                  className={style.icon}
                  alt="comment_black"
                />
                <div>
                  <input
                    className={style.comment}
                    type="text"
                    name="comm"
                    value={input.comm?.trim() ?? ""}
                    placeholder="         어떠셨나요?"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className={style.sbar} />
                <div className={style.link} onClick={submit}>
                  <h2>소감평작성</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
