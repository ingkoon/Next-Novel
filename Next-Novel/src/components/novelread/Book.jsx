import style from './Book.module.css';
import Materials from './Materials.jsx';
import Qna from './Qna.jsx';
import Modal from "react-modal";
import Login from "../login/Login";

import { useCallback, useEffect, useState, useRef } from 'react'
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
//api
import { novelall } from '../../api/novelread'
import useCommentWrite from "../../hooks/useCommentWrite";



export default function Book(){

    const location = useLocation();
    const id = location.state.id;
    const [novelid, setNovelid] = useState(id);
    const [novelinfo, setNovelinfo] = useState("");
    const [novelContent, setNovelContent] = useState("");
    const [lastPage, setLastPage] = useState();
    const [rerender, setRerender] = useState("");
    const page_ref = useRef();

    const [create, setCreate] = useState("");
    const [input, setInput] = useState({});
    const { submitComment } = useCommentWrite();
    const [flag,setFlag] = useState(false);
    async function nvinfo() {
      console.log("노벨아이디"+novelid)
      try {
        const data = await novelall(novelid)
        console.log(data)
        setNovelinfo(data.data)
        setNovelContent(data.data.novel_detail.slice(0, data.data.novel_detail.length-1));
        setLastPage(data.data.novel_detail.slice(data.data.novel_detail.length-1, data.data.novel_detail.length));

        const year = data.data.novel.created_at.substring(0, 4)
        const month = data.data.novel.created_at.substring(5, 7)
        const date = data.data.novel.created_at.substring(8, 10)
        setCreate(year+"."+month+"."+date)
        setFlag(true)
      } catch (e) {
        console.log(e)
      }
    };

    // const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        console.log('mount useEffect');
        setNovelid(id)
        nvinfo()
      }, [novelid]);

    useEffect(() => {
        console.log('zIndex useEffect');
        const pages = document.querySelectorAll(`.${style.page}`);
        console.log(pages.length);
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          
            console.log(i);
          if (i % 2 === 0) {
            page.style.zIndex = pages.length - i;
          }
          page.pageNum = i + 1;
          page.addEventListener('click', function() {
            if (this.pageNum % 2 === 0) {
              this.classList.remove(style.flipped);
              this.previousElementSibling.classList.remove(style.flipped);
            } else {
              this.classList.add(style.flipped);
              this.nextElementSibling.classList.add(style.flipped);
            }
          });
        };
        setRerender("hi")
      }, [flag]);


      const navigate = useNavigate();

      const navigateToIntro = (id) => {
        navigate(`/library/${id}/intro`, { state : {id : id}})
      }

      const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((input) => ({ ...input, [name]: value }));
      };

      // const submit = () => {
      //   if (!input.comm) {
      //     return;
      //   }
      //   const formData = new FormData();
        
      //   formData.append("novel_id", novelid);
      //   console.log("novelId불러오기:" + novelid)
      //   formData.append("comm", input.comm);
      //   submitComment.mutate(formData, {
      //     onSuccess: (res) => {
      //       console.log(res);
      //       navigate(`/library/${id}/intro`, { state: { id: novelid } });
      //     },
      //   });
      // };

      // const submit = () => {
      //   if (!input.comm) {
      //     return;
      //   }
      //   const requestData = {
      //     novel_id: novelid,
      //     comm : input.comm,
      //   }
        
      //   console.log("requestData 불러오기:" + requestData)
      //   submitComment.mutate(requestData, {
      //     onSuccess: (res) => { 
      //       console.log(res);
      //       navigate(`/library/${id}/intro`, { state: { id: novelid } });
      //     },
      //     headers : {
      //       "Content-Type" : "application/json",
      //     }
      //   });
      // };

      const [loginIsOpen, setLoginIsOpen] = useState(false);
      const submit = async() => {
        if (!localStorage.getItem("access_token")) {
          setLoginIsOpen(true);
          return;
        }
        if (!input.comm) {
          return;
        }
        const requestData = {
          novel_id: novelid,
          comm : input.comm,
        }
        
        console.log("requestData 불러오기:" + requestData)
        await submitComment.mutate(requestData, {
          onSuccess: (res) => { 
            console.log(res,1111111111111111111111111111);
            navigate(`/library/${id}/intro`, { state: { id: novelid } });
          },
          staleTime: Infinity,
          headers : {
            "Content-Type" : "application/json",
          }
        })
      };
      const closemodal = () => {
        setLoginIsOpen(false);
      };
    

    return (
        <div className={style.back}>
          <Modal
            closeTimeoutMS={200}
            isOpen={loginIsOpen}
            onRequestClose={() => setLoginIsOpen(false)}
            style={{
              overlay: {
                zIndex: "100",
              },
              content: {
                width: "400px",
                height: "500px",
                margin: "auto",
                padding: "0",
                borderRadius: "20px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <Login closemodal={closemodal} />
          </Modal>
            {novelinfo && <div className={style.book}>
                {novelinfo && <div className={style.pages}>
                    <div className={style.page}>
                        <div className={style.cover}>
                            <div className={style.coverimg}>
                                <img
                                    src={novelinfo && process.env.REACT_APP_IMAGE_API + novelinfo.novel.cover_img}
                                    alt="coverimg"
                                ></img>
                            </div>
                            <div className={style.bookfooter}>
                                <span className={style.ex}>
                                 "&nbsp; 
                                </span>
                                <span>
                                    {novelinfo && novelinfo.novel.introduction}
                                </span>
                                <span className={style.ex}>
                                    &nbsp;"
                                </span>
                            </div>
                            <div className={style.fbar}></div>
                        </div>
                    </div>
                    {novelContent.map((item, index) => {

                        return <>
                        
                            <div className={style.page} ref={page_ref}>
                                {index === 0 && <Materials mat={item} />}
                                {index > 0 && <Qna qna={item} index={index} />}
                            </div>
                            <div className={style.page} ref={page_ref}>
                                <span className={style.text}>{item.content}</span>
                            </div>
                        
                        </>
                    })}
                    

                    <div className={style.page}>
                        <span className={style.text}>{lastPage[0].content}</span>
                    </div>
                    <div className={style.page}>
                        <div className={style.ogcover}>
                            <img
                                src={novelinfo && process.env.REACT_APP_IMAGE_API + novelinfo.novel.original_cover_img}
                                alt="ogcover"
                            ></img>
                            <div className={style.tmi}>
                                P.S. 책 표지는 위 그림으로 만들어졌습니다.
                            </div>
                        </div>
                    </div>
                    <div className={style.page}>
                        <div className={style.lastpg}>
                            <div className={style.eng}>
                                THE &nbsp;&nbsp;END.
                            </div>
                            <div className={style.theend}>
                                끝
                            </div>
                            <div className={style.ebar}></div>
                        </div>
                    </div>
                    <div className={style.fin}>
                        <div className={style.block}>
                            <img src={process.env.PUBLIC_URL+'/icon/glasses_black.svg'} className={style.icon} alt='glasses_black'></img>
                            <div className={style.link} onClick={()=>navigateToIntro(novelid)}>
                                <h2>돌아가기</h2>
                            </div>
                        </div>
                        <div className={style.blank}></div>
                        <div className={style.block}>
                            <img src={process.env.PUBLIC_URL+'/icon/comments2.svg'} className={style.icon} alt='comment_black'></img>
                            <div>
                                <input
                                    className={style.comment}
                                    type="text"
                                    name="comm"
                                    value={input.comm ?? ""}
                                    placeholder="          어떠셨나요?"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={style.sbar}></div>
                            <div className={style.link} onClick={submit}>
                                <h2>소감평작성</h2>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>}
        </div>
    )
  }