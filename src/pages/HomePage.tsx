import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Terms from "../Components/Terms";
import TransitionAnimation from "../Components/TransitionAnimation";
import trans1 from "../animationData/trans_01_short.json";
import { setLocalStorage, setUsernameToCookie } from "../Helpers/Helper";
import { IMAGE_URLS } from "../Helpers/constants";

// 定義類型
interface HomeDataItem {
  type: string;
  name: string;
  id: string;
}

const homeData: HomeDataItem[] = [
  { type: "type2", name: "ENTJ", id: "3" },
  { type: "type1", name: "ENTJ", id: "3" },
  { type: "type1", name: "ENFJ", id: "1" },
  { type: "type2", name: "ENFJ", id: "1" },
  { type: "type1", name: "ENFP", id: "2" },
  { type: "type2", name: "ENFP", id: "2" },
  { type: "type1", name: "ENTP", id: "4" },
  { type: "type2", name: "ENTP", id: "4" },
  { type: "type1", name: "ESFJ", id: "5" },
  { type: "type2", name: "ESFJ", id: "5" },
  { type: "type1", name: "ESFP", id: "6" },
  { type: "type2", name: "ESFP", id: "6" },
  { type: "type1", name: "ESTJ", id: "7" },
  { type: "type2", name: "ESTJ", id: "7" },
  { type: "type1", name: "ESTP", id: "8" },
  { type: "type2", name: "ESTP", id: "8" },
  { type: "type1", name: "INFJ", id: "9" },
  { type: "type2", name: "INFJ", id: "9" },
  { type: "type1", name: "INFP", id: "10" },
  { type: "type2", name: "INFP", id: "10" },
  { type: "type1", name: "INTJ", id: "11" },
  { type: "type2", name: "INTJ", id: "11" },
  { type: "type1", name: "INTP", id: "12" },
  { type: "type2", name: "INTP", id: "12" },
  { type: "type1", name: "ISFJ", id: "13" },
  { type: "type2", name: "ISFJ", id: "13" },
  { type: "type1", name: "ISFP", id: "14" },
  { type: "type2", name: "ISFP", id: "14" },
  { type: "type1", name: "ISTJ", id: "15" },
  { type: "type2", name: "ISTJ", id: "15" },
  { type: "type1", name: "ISTP", id: "16" },
  { type: "type2", name: "ISTP", id: "16" },
];

const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [key, setKey] = useState<number>(0);
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [showData, setShowData] = useState<HomeDataItem>(homeData[index]);
  const [isUsername, setIsUsername] = useState<boolean>(true);
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isAgreeCookie, setIsAgreeCookie] = useState<boolean>(false);
  const [showFormModal, setShowFormModal] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // const openFormModal = (): void => setShowFormModal(true);

  const closeFormModal = (item: string, agreeCookie: boolean): void => {
    setIsAgreeCookie(agreeCookie);
    console.log(item, agreeCookie);
    if (item === "accept") {
      // let objectDate = new Date();
      // let day = String(objectDate.getDate()).padStart(2, "0");
      // let month = String(objectDate.getMonth() + 1).padStart(2, "0");
      // let year = objectDate.getFullYear();
      // let hours = String(objectDate.getHours()).padStart(2, "0");
      // let minutes = String(objectDate.getMinutes()).padStart(2, "0");
      // let checkTime =
      //   year + "-" + month + "-" + day + " " + hours + ":" + minutes;
      setShowFormModal(false);

      setIsAccept(true);
    } else {
      setIsAccept(false);
      setShowFormModal(false);
    }
  };

  const r2url = "https://r2.web.moonshine.tw/opt/xl/msweb/roggamercard/";
  const r2imagesurl = "https://r2.web.moonshine.tw/opt/md/msweb/roggamercard";
  const r2gifurl = "https://r2.web.moonshine.tw/msweb/roggamercard";

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = event.target.value;
    const regex = /^[a-zA-Z0-9 .]+$/;

    if (!regex.test(inputValue)) {
      inputValue = inputValue.replace(/[^a-zA-Z0-9 .]/g, "");
      event.target.value = inputValue;
    }
    if (isUsername === false) {
      setIsUsername(true);
    }

    setUsername(inputValue);
  };

  // const sendHomeCheck = async (
  //   fetchurl: string,
  //   username: string,
  //   check_at: string
  // ): Promise<string | undefined> => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("username", username);
  //     formData.append("check_at", check_at);
  //     const myHeaders = new Headers();
  //     myHeaders.append("Authorization", "");
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: formData,
  //       redirect: "follow" as RequestRedirect,
  //     };
  //     const response = await fetch(fetchurl, requestOptions);
  //     if (!response.ok) {
  //       return;
  //     }
  //     const responseData = await response.json();
  //     return responseData.status;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const sendHomeCheckJson = async (
  //   fetchurl: string,
  //   username: string,
  //   check_at: string
  // ): Promise<string | undefined> => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("username", username);
  //     formData.append("check_at", check_at);
  //     const myHeaders = new Headers();
  //     myHeaders.append("Authorization", "");
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: formData,
  //       redirect: "follow" as RequestRedirect,
  //     };
  //     const response = await fetch(fetchurl, requestOptions);
  //     if (!response.ok) {
  //       return;
  //     }
  //     const responseData = await response.json();
  //     return responseData.status;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = async (): Promise<void> => {
    if (username.trim() !== "") {
      setIsSending(true);
      // setCookie("currentValue", JSON.stringify({ beforestep: "home" }), 7);
      setLocalStorage("currentValue", JSON.stringify({ beforestep: "home" }));
      if (isAgreeCookie) {
        setUsernameToCookie(username);
        setIsSending(false);
        setTimeout(() => {
          setShowAnimation(true);
        }, 1000);

        navigate("/team");
      } else {
        setIsSending(false);
        setTimeout(() => {
          setShowAnimation(true);
        }, 1000);

        navigate("/team");
      }
    } else {
      console.log("");
      setIsUsername(false);
      console.error("Please enter your name!");
    }
  };

  const handleResize = (): void => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % homeData.length);
      setKey((prevKey) => prevKey + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setShowData(homeData[index]);
  }, [index]);

  useEffect(() => {
    const waitForCssLoad = setTimeout(() => {
      setIsMobile(window.innerWidth < 768);
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(waitForCssLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const trans1_container = useRef<HTMLDivElement>(null);

  return (
    <div className=" relative h-[100dvh] text-white">
      {showFormModal && <Terms closeModal={closeFormModal} />}
      {!isMobile && showAnimation && (
        <TransitionAnimation
          isMobile={isMobile}
          showAnimation={showAnimation}
          jsonData={trans1}
        />
      )}
      {isMobile ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 1,
            }}
            className="h-screen bg-cover bg-center bg-no-repeat z-0 w-full fixed"
            style={{
              backgroundImage: `url('${
                r2imagesurl + "/images/mb/home_bg_mb.png"
              }')`,
            }}
          ></motion.div>
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0,
            }}
            src={r2imagesurl + "/images/home_rog_logo2.png"}
            alt="logo"
            className="max-w-full w-[15%] fixed top-8 right-8 z-50"
          />
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            className="max-w-full w-[47%] fixed top-[5%] left-8 z-50"
          >
            <img
              src={r2imagesurl + "/images/mb/home_title_mb.png"}
              alt="title"
            />
          </motion.div>
          <div className="max-w-full h-[95dvh] aspect-[2/16] bg-yellow-300/0 fixed top-[3%] left-2  z-50">
            <img
              src={r2imagesurl + "/images/mb/home_left_fui_mb2x.png"}
              alt="title"
              className="h-full"
            />
          </div>
          <div className="max-w-full w-[22%] fixed top-4 right-2 bg-slate-400/0 z-50">
            <img
              src={r2imagesurl + "/images/mb/home_right_fui_mb.png"}
              alt="title"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            className="max-w-full w-[100%] fixed top-[15%] left-0 bg-slate-400/0 z-0"
          >
            <img
              src={r2imagesurl + "/images/mb/home_top_slash_mb.png"}
              alt="title"
              className="w-full"
            />
          </motion.div>
          <div className="max-w-full w-[100%] fixed bottom-0 left-0 bg-slate-400/0 z-20 mix-blend-multiply">
            <img
              src={r2imagesurl + "/images/mb/home_chmask_mb.png"}
              alt="title"
              className="w-full"
            />
          </div>
          <AnimatePresence initial={true} mode="wait">
            <motion.div
              key={
                r2url +
                "templates/character/" +
                showData.type +
                "/" +
                showData.name +
                key
              }
              initial={{ opacity: 0, y: "18%", x: 0, scale: 1.6 }}
              animate={{
                opacity: 1,
                y: "18%",
                x: 0,
                scale: 1.4,
                transition: {
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 50,
                },
              }}
              exit={{
                opacity: 0,
                y: "18%",
                x: 0,
                scale: 1.4,
                transition: { delay: 0, type: "spring" },
              }}
              className="max-w-full w-[100%] fixed top-[20%] left-0 bg-slate-400/0 z-10"
            >
              <img
                src={
                  r2url +
                  "templates/character/" +
                  showData.type +
                  "/" +
                  showData.name +
                  ".png"
                }
                alt="avatar"
                className="w-full"
              />
            </motion.div>
          </AnimatePresence>

          <div className="max-w-full w-[100%] fixed bottom-0 left-0 bg-slate-400/0 -z-10 animate-pulse animate-infinite animate-alternate">
            <img
              src={r2imagesurl + "/images/mb/home_redglow_mb.png"}
              alt="title"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.9,
            }}
            className="max-w-full w-[100%] fixed -bottom-[10%] left-0 bg-slate-400/0 z-20"
          >
            <img
              src={r2imagesurl + "/images/mb/home_bottom_slash_mb.png"}
              alt="title"
              className="w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: "50%" }}
            animate={{ opacity: 1, x: "-50%", y: "0%" }}
            exit={{ opacity: 0, x: "-50%", y: "50%" }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 1,
            }}
            className=" fixed bottom-0 left-1/2 border-[#B1B1B1]  bg-slate-600/0 w-[75%] max-w-[500px] z-50  "
          >
            <div className=" pl-3 mb-1 relative font-cachetpro leading-normal pt-[1%] text-[6vw] w-[80%] overflow-hidden whitespace-nowrap">
              <div className="w-[6px] h-[20px] ] border border-red-700 bg-red-950/80 absolute top-1/2 -translate-y-1/2 left-0 text-white"></div>
              Name Your Gamer
            </div>
            <div className=" flex items-center flex-col   ">
              <div className="flex flex-col items-center gap-4  w-full  bg-slate-500/0  ">
                <div
                  className={`flex w-full aspect-[410/40] justify-center items-center  bg-slate-500/0 ${
                    isUsername ? " " : " png-container"
                  }`}
                >
                  <div
                    className="w-[16px] bg-contain h-full  bg-no-repeat bg-right-top  bg-yellow-400/0"
                    style={{
                      backgroundImage: `url('${
                        r2imagesurl + "/images/home_input_left.png"
                      }')`,
                    }}
                  ></div>
                  <div
                    className="bg-contain w-full h-full bg-repeat bg-top bg-slate-400/0 flex items-center relative"
                    style={{
                      backgroundImage: `url('${
                        r2imagesurl + "/images/home_input_center.png"
                      }')`,
                    }}
                  >
                    <input
                      type="text"
                      name="username"
                      className="block  w-[100%] font-robotocon  bg-transparent focus:outline-none sm:text-sm relative z-10 placeholder-gray-500"
                      placeholder={
                        !isAccept ? " * Please agree to our terms." : ""
                      }
                      autoComplete="off"
                      maxLength={20}
                      onChange={onChange}
                      onKeyDown={handleKeyDown}
                      disabled={!isAccept}
                    />
                    {isSending && (
                      <div className=" absolute right-1 inline-block  w-[8%] aspect-square animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                    )}
                  </div>
                  <div
                    className="w-[9px] bg-contain h-full bg-no-repeat bg-left-top"
                    style={{
                      backgroundImage: `url('${
                        r2imagesurl + "/images/home_input_right.png"
                      }')`,
                    }}
                  ></div>
                </div>
                <div className="text-red-700 text-[3vw] mt-[1%] font-robotocon">
                  * Input is limited to 20 characters.
                  <br />* Only English letters, numbers, and symbols are
                  permitted.
                  {!isUsername && <div>* Please name your gamer</div>}
                  {!isAccept && <div>* Please agree to our terms.</div>}
                </div>
              </div>
              <div className="flex flex-col items-center gap-9  w-full  bg-slate-500/0  ">
                <button
                  onClick={handleClick}
                  aria-label="start"
                  disabled={isSending || !isAccept ? true : false}
                  className={`${
                    isSending || !isAccept ? " grayscale " : "  grayscale-0"
                  } z-0 w-[24%] mt-[10%] aspect-[90/40]  bg-contain bg-top bg-no-repeat flex items-center justify-center   hover:scale-95 font-cachet font-bold`}
                  style={{
                    backgroundImage: `url('${
                      r2imagesurl + "/images/redbutton_bg.png"
                    }')`,
                  }}
                >
                  START
                </button>
              </div>
              <div className="h-[3vh] w-[1px] bg-white/70  mt-[5%]"></div>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <div className="w-full h-full  absolute top-0 right-0 z-0  mix-blend-screen ">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={r2imagesurl + "/images/home_right_side_glow.png"}
              alt=""
              className="max-w-full h-full absolute right-0 animate-pulse animate-infinite animate-alternate"
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 1,
            }}
            className="h-screen bg-cover bg-center bg-no-repeat z-0 w-full"
            style={{
              backgroundImage: `url('${r2imagesurl + "/images/home_bg3.png"}')`,
            }}
          ></motion.div>
          <img
            src={IMAGE_URLS.ROG_GAMER_VISA + "imgs/2logo.svg"}
            alt="logo"
            className="max-w-full w-[14vw] absolute top-2 right-8"
          />

          <motion.div className=" absolute top-0 w-full h-screen overflow-hidden ">
            {/* <div className='absolute top-0 left-1/2 w-[65vh] z-10 bg-slate-400/0 origin-top '>
            <HomeCarousel data={homeData}/>
          </div> */}
            <AnimatePresence initial={true}>
              <motion.div
                key={
                  r2url +
                  "templates/character/" +
                  showData.type +
                  "/" +
                  showData.name +
                  key
                }
                initial={{ opacity: 0, x: "-60%", scale: 1.5, y: "5%" }}
                animate={{
                  opacity: 1,
                  x: "-60%",
                  scale: 1.5,
                  y: "5%",
                  transition: {
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 50,
                  },
                }}
                exit={{
                  opacity: 0,
                  x: "-60%",
                  scale: 1.5,
                  y: "5%",
                  transition: { delay: 0, type: "spring" },
                }}
                // whileHover={{x:'65%', transition:{type: 'spring', stiffness: 600, damping: 150} }}
                className="absolute top-0 left-1/2 w-[65vh] z-10 bg-slate-400/0 origin-top "
              >
                <img
                  src={
                    "https://r2.web.moonshine.tw/opt/lg/msweb/roggamercard/" +
                    "templates/character/big" +
                    showData.type +
                    "/" +
                    showData.name +
                    ".png"
                  }
                  alt="mbti avatar"
                  className="w-full origin-bottom"
                />
              </motion.div>
              {/* <motion.div
              key={r2imagesurl+ '/images/home_avatar/bigtype1/'+showData.name+'.png'} 
              initial={{ opacity: 0,x:'-60%' , scale:1,y:'5%' }} 
              animate={{ opacity: 1,x:'-60%', scale:1,y:'5%', transition:{delay:'0.3',type: 'spring', stiffness: 200, damping: 50} }}
              // exit={{   opacity: 0,x:'-60%', scale:1.5,y:'5%', transition:{delay:0,type: 'spring'} }} 
              // whileHover={{x:'65%', transition:{type: 'spring', stiffness: 600, damping: 150} }}
              className='absolute top-0 left-1/2 w-[80vh] aspect-[1000/1045] z-10 bg-slate-400/0 origin-top bg-sky-400 '
            >
              <img 
                src={r2imagesurl+ '/images/home_avatar/bigtype1/'+showData.name+'.png'} 
                alt="mbti avatar" 
                className='w-full origin-bottom object-contain '
              />
            </motion.div> */}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, x: "-55%", y: "-45%" }}
              animate={{ opacity: 1, x: "-56%", y: "-50%" }}
              exit={{ opacity: 0, x: "-55%", y: "-45%" }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.5,
              }}
              className=" absolute top-1/2 max-w-full   z-30 left-1/2 w-[40%] pointer-events-none "
            >
              <img
                src={r2imagesurl + "/images/home_ui_decoration_front.png"}
                alt="home ui"
                className="w-full"
              />
            </motion.div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: "-50%", x: "-10%" }}
                animate={{ opacity: 1, y: "-50%", x: 0 }}
                exit={{ opacity: 0, y: "-50%", x: "-25%" }}
                transition={{
                  type: "spring",
                  stiffness: 130,
                  damping: 20,
                  delay: 1.5,
                }}
                className=" absolute top-1/2 left-0 z-50 w-[90vw]  mix-blend-screen pointer-events-none"
              >
                <img
                  src={r2gifurl + "/images/home_title.gif"}
                  alt=""
                  className="w-[100%] "
                />
              </motion.div>
            </AnimatePresence>
            <motion.img
              initial={{ opacity: 0, x: "-50%", y: -20 }}
              animate={{ opacity: 1, x: "-50%", y: 0 }}
              exit={{ opacity: 0, x: "-50%", y: -20 }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 1,
              }}
              className=" absolute bottom-10 max-w-full w-4/5   z-40 left-1/2"
              src={r2gifurl + "/images/home_for_those_who_dare.png"}
              alt=""
            />
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: "-23%" }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.5,
              }}
              className=" absolute  max-w-full h-full z-20  bg-slate-300/0  pointer-events-none  "
            >
              <img
                src={r2imagesurl + "/images/home_frontshapeleft_red.png"}
                alt=""
                className="h-full aspect-square"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "-15%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.5,
              }}
              className=" absolute top-0 max-w-full h-full right-0 z-0 "
            >
              <img
                src={r2imagesurl + "/images/home_frontshaperight_red.png"}
                alt="right red slash"
                className="h-full aspect-square"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, y: "-50%" }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: 100, y: "-50%" }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 1,
            }}
            className=" absolute top-1/2 right-0 border-[#B1B1B1] pl-2 bg-slate-600/0 lg:w-[25vw] 2xl:w-[30vw] max-w-[900px] z-30  "
          >
            <div className=" pl-[3%] mb-1 relative  font-cachetpro leading-normal pt-[1%] text-lg w-[80%] overflow-hidden whitespace-nowrap">
              <div className="w-[2%] h-[60%]  border border-red-700 bg-red-950/80 absolute top-1/2 -translate-y-1/2 left-0 text-white"></div>
              <span className="text-[1.2vw] font-robotocon text-white">
                Name Your Gamer
              </span>
            </div>
            <div className=" flex items-center  ">
              <div className="flex items-center gap-1  w-full  bg-slate-500/0   ">
                <div
                  className={` flex w-full aspect-[350/40] justify-center items-center  bg-slate-500/0 ${
                    isUsername ? " " : " png-container"
                  }    `}
                >
                  {/* <div 
                  className='w-[5%] bg-contain h-full  bg-no-repeat bg-right-top  bg-yellow-400/0'
                  style={{
                    backgroundImage: `url('${r2imagesurl+'/images/home_input_left.png'}')`,
                  }}
                ></div> */}
                  <img
                    src={r2imagesurl + "/images/home_input_left.png"}
                    alt=""
                    className="h-full"
                  />
                  <div
                    className="bg-contain w-full h-full bg-repeat bg-top bg-slate-400/0 flex items-center relative"
                    style={{
                      backgroundImage: `url('${
                        r2imagesurl + "/images/home_input_center.png"
                      }')`,
                    }}
                  >
                    <input
                      type="text"
                      name="username"
                      className="block  w-[100%] text-[1vw] font-robotocon  bg-transparent focus:outline-none  relative z-10  placeholder-gray-500 text-white"
                      placeholder={
                        !isAccept ? " * Please agree to our terms." : ""
                      }
                      autoComplete="off"
                      maxLength={20}
                      onChange={onChange}
                      onKeyDown={handleKeyDown}
                      disabled={!isAccept}
                    />
                    {isSending && (
                      <div className=" absolute right-1 inline-block  w-[8%] aspect-square animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                    )}
                  </div>
                  <div
                    className="w-[8%] bg-contain h-full bg-no-repeat bg-left-top"
                    style={{
                      backgroundImage: `url('${
                        r2imagesurl + "/images/home_input_right.png"
                      }')`,
                    }}
                  ></div>
                </div>
                <button
                  onClick={handleClick}
                  aria-label="start"
                  disabled={isSending || !isAccept ? true : false}
                  className={`z-0 w-[24%] text-[1vw] aspect-[90/40]  text-white ${
                    isSending || !isAccept ? " grayscale " : "  grayscale-0"
                  }  bg-contain bg-top bg-no-repeat flex items-center justify-center   hover:scale-95 font-robotocon font-bold `}
                  style={{
                    backgroundImage: `url('${
                      r2imagesurl + "/images/redbutton_bg.png"
                    }')`,
                  }}
                >
                  START
                </button>
              </div>

              <div className="h-[1px] w-[6vw] bg-white/70 ml-2"></div>
            </div>
            <div className="text-red-700 text-[.7vw] mt-[2%] font-robotocon">
              * Input is limited to 20 characters.
              <br />* Only English letters, numbers, and symbols are permitted.
              {!isUsername && <div>* Please name your gamer</div>}
              {!isAccept && <div>* Please agree to our terms.</div>}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Home;
