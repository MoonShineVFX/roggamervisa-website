import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { updateLocalStorage, getLocalStorage } from "../Helpers/Helper";
// Import Swiper React components

// import required modules
import TransitionAnimation from "../Components/TransitionAnimation";
import trans1 from "../animationData/trans_01_short.json";
import trans2 from "../animationData/trans_01_short_reverse.json";
import { IMAGE_URLS } from "../Helpers/constants";

interface ButtonData {
  url: string;
  name: string;
  template: string;
  title: string;
  subtitle: string;
  id: string;
  logo: string;
}

const buttonData1: ButtonData[] = [
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/INTJ",
    name: "AKIRA",
    template: "INTJ",
    title: "MODULE 11",
    subtitle: "Introduction to module 10",
    id: "1",
    logo: "AkiraLOGO",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/INTP",
    name: "HORSEM4N",
    template: "INTP",
    title: "MODULE 12",
    subtitle: "Introduction to module 10",
    id: "2",
    logo: "Horsem4nLOGO",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ENTJ",
    name: "ACHT",
    template: "ENTJ",
    title: "MODULE 3",
    subtitle: "Introduction to module three",
    id: "3",
    logo: "AliceLOGO",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ENTP",
    name: "SE7EN",
    template: "ENTP",
    title: "MODULE 4",
    subtitle: "Introduction to module four",
    id: "4",
    logo: "Se7enLOGO2",
  },
];

const Team: React.FC = () => {
  const navigate = useNavigate();
  // const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string>("1");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentType, setCurrentType] = useState<string>(
    "type" + (Math.floor(Math.random() * 2) + 1).toString()
  );
  // const [currentMbti] = useState<string>("INTJ");
  const [currentLogo, setCurrentLogo] = useState<string>("AkiraLOGO");
  // const [isActive, setIsActive] = useState<boolean>(false);
  // const [bigiconUrl, setBigiconUrl] = useState<string>("");
  const [showAnimationPrev, setShowAnimationPrev] = useState<boolean>(false);
  const [showAnimationNext, setShowAnimationNext] = useState<boolean>(false);
  const [isShowHint, setIsShowHint] = useState<boolean>(false);
  const [isShowMbHint, setIsShowMbHint] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  // const [currentImage, setCurrentImage] = useState<string>(
  //   "character_hand_1.svg"
  // );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // const r2url = "https://r2.web.moonshine.tw/msweb/roggamercard/";
  const r2imagesurl = "https://r2.web.moonshine.tw/opt/md/msweb/roggamercard";
  const r2gifurl = "https://r2.web.moonshine.tw/msweb/roggamercard";

  const controls = useAnimation();

  const variants = {
    start: () => ({
      x: [0, 10, 0],
      transition: {
        repeat: 1,
        duration: 0.2,
      },
    }),
    reset: {
      x: 0,
    },
  };

  useEffect(() => {
    // const cookieData = getCookie("currentValue");
    const localData = getLocalStorage("currentValue");
    console.log(localData);
    if (localData) {
      // const userDataFromCookie = JSON.parse(localData);
      if (localData.beforestep === "camera") {
        // console.log(userDataFromCookie.beforestep);
        // console.log(userDataFromCookie.type);
        // console.log(userDataFromCookie.mbti);
        // console.log(userDataFromCookie.currentIndex);
        setCurrentType(localData.type);
        // setCurrentType(userDataFromCookie.type)
        // setCurrentMbti(userDataFromCookie.mbti)
      }
    }
  }, []);

  // const handleSwitchBtnClick = () => {
  //   setIsActive((prev) => !prev);
  // };

  const handlePrev = (): void => {
    setTimeout(() => {
      setShowAnimationPrev(true);
    }, 500);
    // updateCookie("currentValue", { beforestep: "team" });
    updateLocalStorage("currentValue", { beforestep: "team" });
    navigate("/");
  };

  // function randomTwo(): string {
  //   const imgs = ["1", "2"];
  //   const probabilities = [1.0, 0.0];
  //   let sum = 0;
  //   const r = Math.random();

  //   for (let i = 0; i < probabilities.length; i++) {
  //     sum += probabilities[i];
  //     if (r <= sum) return imgs[i];
  //   }

  //   return imgs[0];
  // }
  // function calculateDistance(current: string, target: string) {
  //   // 计算当前数字到目标数字的距离
  //   let distance = parseInt(target) - parseInt(current);

  //   // 如果距离为负数，表示目标数字在当前数字的左侧，需要调整距离
  //   if (distance < 0) {
  //     distance += 16;
  //   }

  //   // 如果距离大于总数的一半，表示目标数字在当前数字的右侧，需要调整距离
  //   if (distance > 16 / 2) {
  //     distance = 16 - distance;
  //   }

  //   return distance;
  // }
  const handleClickOutside = (): void => {
    setIsShowHint(false);
  };

  const handleClickMbHint = (): void => {
    setIsShowMbHint((prev) => !prev);
  };

  const handleImageClick = (index: number): void => {
    setCurrentIndex(index);
    setCurrentId(buttonData1[index].id);
    setCurrentLogo(buttonData1[index].logo);
  };

  const handleNext = (): void => {
    // const randomSelect = randomTwo();
    // const type = "type" + currentType;
    const teamname = buttonData1[currentIndex].name;

    // setCookie(
    //   "currentValue",
    //   JSON.stringify({
    //     beforestep: "team",
    //     currentIndex: currentIndex,
    //     currentLogo: currentLogo,
    //     currentTeamName: teamname,
    //   }),
    //   1
    // );
    updateLocalStorage("currentValue", {
      beforestep: "team",
      currentIndex: currentIndex,
      currentLogo: currentLogo,
      currentTeamName: teamname,
    });
    setTimeout(() => {
      setShowAnimationNext(true);
    }, 500);
    navigate("/character");
  };

  const handleResize = (): void => {
    setIsMobile(window.innerWidth < 768);
  };

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

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timer1);
    };
  }, [isVisible]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentImage((prev) =>
  //       prev === "character_hand_1.svg"
  //         ? "character_hand_2.svg"
  //         : "character_hand_1.svg"
  //     );
  //   }, 300);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <div
      className=" relative h-[100dvh] bg-cov bg-left bg-no-repeat text-white"
      style={{
        backgroundImage: `url('${r2gifurl + "/images/character_bg.png"}')`,
      }}
    >
      {!isMobile && showAnimationPrev && (
        <TransitionAnimation
          isMobile={isMobile}
          showAnimation={showAnimationPrev}
          jsonData={trans2}
        />
      )}
      {!isMobile && showAnimationNext && (
        <TransitionAnimation
          isMobile={isMobile}
          showAnimation={showAnimationNext}
          jsonData={trans1}
        />
      )}

      {isMobile ? (
        <>
          <div
            className=" fixed top-0 w-full bg-red-400/0 z-50 h-[100dvh] bg-cover bg-center bg-no-repeat  "
            style={{
              backgroundImage: `url('${
                r2imagesurl + "/images/mb/character_bg.png"
              }')`,
            }}
          >
            <div className="w-full h-[58dvh] bg-red-400/0  overflow-hidden relative ">
              <div className="max-w-full w-[10%] absolute top-14 right-5 bg-slate-400/0 z-10">
                <img
                  src={r2imagesurl + "/images/mb/character_fui.png"}
                  alt="title"
                />
              </div>
              <AnimatePresence initial={true}>
                <motion.div
                  key={currentLogo}
                  initial={{ opacity: 0, x: "-20%", scale: 1.5, y: "-30%" }}
                  animate={{
                    opacity: 1,
                    x: "-20%",
                    scale: 1.5,
                    y: "0%",
                    transition: {
                      delay: 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 50,
                    },
                  }}
                  exit={{ opacity: 0, x: "-20%", scale: 1.5, y: "90%" }}
                  className="  absolute z-10 top-[30%] w-[60vh] left-1/4 h-1/2 flex items-center justify-center rounded-full  bg-gradient-to-t from-[#44308F60] via-[#44308F] to-[#44308F30]  blur-2xl  "
                ></motion.div>
                {/* <motion.div
                  key={r2imagesurl + "/mbti/bigicon/" + currentMbti + ".png"}
                  initial={{ opacity: 0, rotate: -40, x: "-55%", y: "-10%" }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    x: "-55%",
                    y: "-10%",
                    transition: {
                      delay: 0.7,
                      type: "spring",
                      stiffness: 200,
                      damping: 50,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 0,
                    x: "-55%",
                    y: "-10%",
                    transition: { delay: 0, type: "spring" },
                  }}
                  className=" absolute top-0 left-1/2 z-0 w-[130%]"
                >
                  <motion.img
                    src={r2imagesurl + "/mbti/bigicon/" + "INTJ" + ".png"}
                    alt="bigicon"
                    className="w-full"
                  />
                </motion.div> */}
                <div className=" absolute mix-blend-multiply z-20 w-full top-0 left-0 h-[100dvh] ">
                  <img
                    src={r2imagesurl + "/images/mb/character_mask.png"}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <motion.div
                  key={
                    IMAGE_URLS.ROG_GAMER_VISA +
                    "team/logo/" +
                    currentLogo +
                    ".svg"
                  }
                  initial={
                    currentType === "type2"
                      ? { opacity: 0, x: "10%", scale: 1.4, y: "22%" }
                      : { opacity: 0, x: "-60%", scale: 1.4, y: "22%" }
                  }
                  animate={{
                    opacity: 1,
                    x: "-50%",
                    scale: 1.4,
                    y: "22%",
                    transition: {
                      delay: 0.5,
                      type: "spring",
                      stiffness: 200,
                      damping: 50,
                    },
                  }}
                  exit={
                    currentType === "type2"
                      ? { opacity: 0, x: "10%", scale: 1.4, y: "22%" }
                      : { opacity: 0, x: "-60%", scale: 1.4, y: "22%" }
                  }
                  className="  absolute z-10 top-0 left-1/2 w-[29dvh] h-2/3 flex items-center justify-center   "
                >
                  <motion.img
                    variants={variants}
                    animate={controls}
                    src={
                      IMAGE_URLS.ROG_GAMER_VISA +
                      "team/logo/" +
                      currentLogo +
                      ".svg"
                    }
                    alt=""
                    className="w-full"
                  />
                </motion.div>
                <motion.div
                  key={
                    IMAGE_URLS.ROG_GAMER_VISA +
                    "team/logo_word/" +
                    currentId +
                    "_b.png"
                  }
                  initial={{ opacity: 0, y: -100 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 50,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -100,
                    transition: { delay: 0, type: "spring" },
                  }}
                  className=" absolute top-[6%] left-[9%] z-0 w-[17%]"
                >
                  <motion.img
                    src={
                      IMAGE_URLS.ROG_GAMER_VISA +
                      "team/logo_word/" +
                      currentId +
                      "_b.png"
                    }
                    alt="righticon"
                    className="w-full"
                  />
                </motion.div>
              </AnimatePresence>
              <div className=" fixed top-0 w-full h-[100dvh] z-0 bg-gradient-to-l from-black/80 via-black/10 to-black/80 hidden"></div>
            </div>
            <div className="w-full h-[25dvh] relative ">
              {isShowMbHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.3,
                  }}
                  className=" bg-black w-full h-[180px] py-[2%]  border-y border-white/50 absolute top-0 left-0 z-10  "
                >
                  <div className="text-[3.6vw] relative font-robotocon text-white/60  bg-no-repeat  w-[50%] aspect-[210/154] bg-fuchsia-400/0 mx-auto bg-contain flex justify-center     text-balance  ">
                    <div className="w-full">
                      <img
                        src={r2imagesurl + "/images/mb/character_hint_bg.png"}
                        alt=""
                      />
                    </div>
                    <div className=" absolute top-0 px-4 py-2">
                      請選擇先前意識比對的結果啟動潛行
                    </div>
                    <div className=" flex gap-4 absolute -bottom-2 w-11/12 left-1/2 -translate-x-1/2 justify-center mx-auto  ">
                      <div onClick={handleClickMbHint}>
                        <img
                          src={
                            r2imagesurl +
                            "/images/mb/character_hint_close_btn.png"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className=" flex flex-col items-center relative">
                <div className=" flex items-center my-[4%] relative">
                  <img
                    src={IMAGE_URLS.ROG_GAMER_VISA + "imgs/select_team_mb.svg"}
                    alt=""
                  />
                  <div className=" absolute -top-[7px] -right-12 ">
                    <img
                      src={r2gifurl + "/images/mb/character_hint.svg"}
                      alt=""
                      onClick={handleClickMbHint}
                    />
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.5,
                  }}
                  className=" bg-green-700/0 w-full h-full  flex items-center mt-[5%]"
                >
                  <div className=" grid grid-cols-2 gap-4 mx-[8%]">
                    {buttonData1?.map((item, index) => {
                      return (
                        <div
                          key={"tf" + index}
                          className={`group relative cursor-pointer   `}
                          onClick={() => {
                            handleImageClick(index);
                          }}
                        >
                          <img
                            src={IMAGE_URLS.ROG_GAMER_VISA + "team/btnbg.png"}
                            alt=""
                            className={`w-full  ${
                              currentId === item.id
                                ? "opacity-100"
                                : "opacity-40"
                            }`}
                          />
                          <div
                            className={`${
                              currentId === item.id
                                ? "[text-shadow:_0px_0px_10px_rgba(255,0,0,0.96)] text-red-500"
                                : "text-white/40 group-hover:text-white "
                            }  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/40 font-rog text-[3.7vw] transition-all duration-300 tracking-widest   `}
                          >
                            {item.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="max-w-full w-[100%] fixed bottom-0 left-0 bg-slate-400/0 -z-[10]  pointer-events-none animate-pulse animate-infinite animate-alternate ">
              <img
                src={r2imagesurl + "/images/mb/home_redglow_mb.png"}
                alt="title"
              />
            </div>
            <div className="w-full  pt-[7%] h-[13dvh] fixed bottom-0 ">
              <div className=" flex justify-between w-[60%] mx-auto h-full bg-violet-600/0 relative">
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0, y: "0%" }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="   top-1/2  left-0 z-40 h-10 flex items-center "
                >
                  <button
                    onClick={handlePrev}
                    className="h-full  w-[100%]  aspect-[90/40] bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold"
                    style={{
                      backgroundImage: `url('${
                        r2imagesurl + "/images/redbutton_bg2.png"
                      }')`,
                    }}
                  >
                    Back
                  </button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0, y: "0%" }}
                  exit={{ opacity: 0, x: -100, y: "0%" }}
                  className=" top-1/2 right-0 z-40 h-10 flex items-center"
                >
                  <button
                    onClick={handleNext}
                    className="h-full  w-[100%] aspect-[90/40]  bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold"
                    style={{
                      backgroundImage: `url('${
                        r2imagesurl + "/images/redbutton_bg2.png"
                      }')`,
                    }}
                  >
                    Next
                  </button>
                </motion.div>
                <div className="h-[5vh] w-[1px] bg-white/70 absolute bottom-0 left-1/2 -translate-x-1/2 "></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: "-54%" }}
            animate={{ opacity: 1, y: "-54%" }}
            exit={{ opacity: 0, y: "-54%" }}
            className="w-1/2 h-full  absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-slate-500/0   "
          >
            <img
              src={r2imagesurl + "/images/home_right_side_glow.png"}
              alt=""
              className="max-w-full h-screen absolute right-0 animate-pulse animate-infinite animate-alternate"
            />
          </motion.div>

          <div className="w-[45%]  mx-auto  absolute top-0 right-0  z-10   flex items-center justify-center  bg-red-500/0 h-full ">
            {isShowHint && (
              <div
                onClick={handleClickOutside}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.4)", // 透明背景层
                  zIndex: 10, // 设置为最高层级
                }}
              ></div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" absolute top-1/2 -translate-y-1/2 left-0 z-10 w-1/3  "
            >
              <div className="w-full  bg-slate-200/0 top-1/2 -translate-y-1/2 absolute">
                <img
                  className=" w-full  py-12"
                  src={IMAGE_URLS.ROG_GAMER_VISA + "imgs/select_team3.svg"}
                  alt=""
                />
                <motion.div className="w-[33%] absolute bottom-10 left-0">
                  <motion.img
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.5,
                    }}
                    className=" cursor-pointer w-[100%]   "
                    onClick={() => {
                      setIsShowHint(true);
                    }}
                    // onMouseLeave={()=>{setIsShowHint(false)}}
                    src={r2gifurl + "/images/hint_btn.svg"}
                    alt=""
                  />
                  {isShowHint && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          delay: 0.1,
                        }}
                        className="absolute w-[200%]"
                      >
                        <img
                          src={r2imagesurl + "/images/hint_content_2x.png"}
                          alt=""
                          className="antialiased"
                        />
                        <div className="py-[5%] px-[6%] text-[0.9vw] absolute top-[18%]  bg-emerald-500/0 font-robotocon text-white/50 font-thin">
                          請選擇先前意識比對的結果啟動潛行
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </div>

              <img
                className=" absolute left-0  -translate-x-[100%] top-12 "
                src={r2imagesurl + "/images/character_deco_line.svg"}
                alt=""
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: "10%" }}
              animate={{ opacity: 1, x: "0" }}
              exit={{ opacity: 0, x: "0" }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.5,
              }}
              className="w-[34%] z-0 relative   ml-[12%] "
            >
              <div className="w-full h-full  flex flex-col justify-center items-center  space-y-8  ">
                {buttonData1?.map((item, index) => {
                  return (
                    <div
                      key={"tf" + index}
                      className={`group relative cursor-pointer   `}
                      onClick={() => {
                        handleImageClick(index);
                      }}
                    >
                      <img
                        src={IMAGE_URLS.ROG_GAMER_VISA + "team/btnbg.png"}
                        alt=""
                        className={`w-full  ${
                          currentId === item.id ? "opacity-100" : "opacity-40"
                        }`}
                      />
                      <div
                        className={`${
                          currentId === item.id
                            ? "[text-shadow:_0px_0px_10px_rgba(255,0,0,0.96)] text-red-500"
                            : "text-white/40 group-hover:text-white "
                        }  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/40 font-rog text-[1.5vw] transition-all duration-300 tracking-widest   `}
                      >
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-screen bg-cover bg-center bg-no-repeat z-0 w-full relative overflow-hidden pl-10 bg-slate-300/0 "
          >
            <div className="  absolute z-50 top-0 left-0 h-screen opacity- w-full">
              <img
                src={r2imagesurl + "/images/character_mask.png"}
                alt=""
                className="w-full h-screen"
              />
            </div>
            <motion.div
              key={currentLogo}
              initial={{ opacity: 0, x: "-20%", scale: 1.5, y: "-30%" }}
              animate={{
                opacity: 1,
                x: "-20%",
                scale: 1.5,
                y: "0%",
                transition: {
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 50,
                },
              }}
              exit={{ opacity: 0, x: "-20%", scale: 1.5, y: "90%" }}
              className="  absolute z-10 top-[30%] w-[50vh] left-1/4 h-1/2 flex items-center justify-center  bg-gradient-to-t from-[#44308F60] via-[#44308F] to-[#44308F30]  blur-2xl  "
            ></motion.div>
            <AnimatePresence initial={true}>
              <motion.div
                key={IMAGE_URLS.ROG_GAMER_VISA + "team/logo/" + currentLogo}
                initial={{ opacity: 0, x: "-20%", scale: 1.5, y: "-30%" }}
                animate={{
                  opacity: 1,
                  x: "-20%",
                  scale: 1.5,
                  y: "0%",
                  transition: {
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 50,
                  },
                }}
                exit={{ opacity: 0, x: "-20%", scale: 1.5, y: "90%" }}
                className="  absolute z-20 top-0 w-[40vh] left-1/4 h-full flex items-center justify-center   "
              >
                <motion.img
                  variants={variants}
                  animate={controls}
                  src={
                    IMAGE_URLS.ROG_GAMER_VISA +
                    "team/logo/" +
                    currentLogo +
                    ".svg"
                  }
                  alt=""
                  className="w-full max-w-full"
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence initial={true}>
              {/* <motion.div
                key={r2imagesurl + "/mbti/bigicon/" + currentMbti + ".png"}
                initial={{ opacity: 0, rotate: -40, x: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  x: 0,
                  y: 20,
                  transition: {
                    delay: 0.3,
                    type: "spring",
                    stiffness: 100,
                    damping: 50,
                  },
                }}
                exit={{
                  opacity: 0,
                  rotate: 0,
                  x: 0,
                  y: 20,
                  transition: { delay: 0, type: "spring" },
                }}
                className=" absolute top-0 left-0 z-0 w-[60%]"
              >
                <motion.img
                  src={r2imagesurl + "/mbti/bigicon/" + "INTJ" + ".png"}
                  alt="bigicon"
                  className="w-full"
                />
              </motion.div> */}

              <motion.div
                key={
                  IMAGE_URLS.ROG_GAMER_VISA +
                  "team/logo_word/" +
                  currentId +
                  "_b.png"
                }
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.3,
                    type: "spring",
                    stiffness: 100,
                    damping: 50,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 100,
                  transition: { delay: 0, type: "spring" },
                }}
                className=" absolute top-[8%] left-[12%] z-0 w-[8%]"
              >
                <img
                  src={
                    IMAGE_URLS.ROG_GAMER_VISA +
                    "team/logo_word/" +
                    currentId +
                    "_b.png"
                  }
                  alt="lefticon"
                  className="w-full"
                />
              </motion.div>
              <motion.div
                key={
                  IMAGE_URLS.ROG_GAMER_VISA +
                  "team/logo_word/" +
                  currentId +
                  "_w.png"
                }
                initial={{ opacity: 0, y: -100 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.3,
                    type: "spring",
                    stiffness: 100,
                    damping: 50,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -100,
                  transition: { delay: 0, type: "spring" },
                }}
                className=" absolute top-[5%] left-[39%] z-0 w-[7%]"
              >
                <motion.img
                  src={
                    IMAGE_URLS.ROG_GAMER_VISA +
                    "team/logo_word/" +
                    currentId +
                    "_w.png"
                  }
                  alt="righticon"
                  className="w-full"
                />
              </motion.div>
            </AnimatePresence>

            <motion.img
              src={r2gifurl + "/images/character_grid.png"}
              alt=""
              className=" fixed top-0 left-0 -z-0 w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className=" absolute    top-1/2  left-0 z-40 w-[10%] flex items-center "
          >
            <div className="h-[1px] w-[6vw] bg-white/70 mr-2"></div>
            <button
              onClick={handlePrev}
              className="w-[50%] text-[1vw]  aspect-[90/40] bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold"
              style={{
                backgroundImage: `url('${
                  r2imagesurl + "/images/redbutton_bg2.png"
                }')`,
              }}
            >
              Back
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: 100, y: "50%" }}
            className="absolute top-1/2 right-0 z-40 w-[10%] flex items-center"
          >
            <button
              onClick={handleNext}
              className="  w-[50%] text-[1vw] aspect-[90/40]   bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold"
              style={{
                backgroundImage: `url('${
                  r2imagesurl + "/images/redbutton_bg2.png"
                }')`,
              }}
            >
              Next
            </button>
            <div className="h-[1px] w-[6vw] bg-white/70 ml-2"></div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Team;
