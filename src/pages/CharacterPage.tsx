import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { getLocalStorage, updateLocalStorage } from "../Helpers/Helper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Mousewheel, EffectCoverflow } from "swiper/modules";
import TransitionAnimation from "../Components/TransitionAnimation";
import trans1 from "../animationData/trans_01_short.json";
import trans2 from "../animationData/trans_01_short_reverse.json";
import { IMAGE_URLS } from "../Helpers/constants";

interface ButtonData {
  url: string;
  name: string;
  template: string;
  title_ch: string;
  title_en: string;
  id: string;
}

const buttonData1: ButtonData[] = [
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/INTJ",
    name: "INTJ",
    template: "INTJ",
    title_ch: "電馭駭客",
    title_en: "Cyber ​Hacker",
    id: "1",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/INTP",
    name: "INTP",
    template: "INTP",
    title_ch: "太空學家",
    title_en: "Space Scholar",
    id: "2",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ENTJ",
    name: "ENTJ",
    template: "ENTJ",
    title_ch: "數位游牧者",
    title_en: "Digital Nomad",
    id: "3",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ENTP",
    name: "ENTP",
    template: "ENTP",
    title_ch: "仲裁者",
    title_en: "Arbitrator",
    id: "4",
  },

  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/INFJ",
    name: "INFJ",
    template: "INFJ",
    title_ch: "數位領袖",
    title_en: "Digital Leader",
    id: "5",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/INFP",
    name: "INFP",
    template: "INFP",
    title_ch: "機艦指揮官",
    title_en: "Mech Fleet Commander",
    id: "6",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ENFJ",
    name: "ENFJ",
    template: "ENFJ",
    title_ch: "地下格鬥者",
    title_en: "Underground Fighter",
    id: "7",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ENFP",
    name: "ENFP",
    template: "ENFP",
    title_ch: "太空探險家",
    title_en: "Space Explorer",
    id: "8",
  },

  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ISTJ",
    name: "ISTJ",
    template: "ISTJ",
    title_ch: "電馭特務",
    title_en: "Cyber Operative",
    id: "9",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ISFJ",
    name: "ISFJ",
    template: "ISFJ",
    title_ch: "神經導療師",
    title_en: "Neuro Healer",
    id: "10",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ESTJ",
    name: "ESTJ",
    template: "ESTJ",
    title_ch: "電馭領航員",
    title_en: " Cyber Space Overseer",
    id: "11",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ESFJ",
    name: "ESFJ",
    template: "ESFJ",
    title_ch: "虛擬偶像",
    title_en: "Virtual Idol",
    id: "12",
  },

  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ISTP",
    name: "ISTP",
    template: "ISTP",
    title_ch: "重裝機師",
    title_en: "Mecha Pilot",
    id: "13",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ISFP",
    name: "ISFP",
    template: "ISFP",
    title_ch: "街頭藝術家",
    title_en: "Street Artist",
    id: "14",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ESTP",
    name: "ESTP",
    template: "ESTP",
    title_ch: "極限跑酷者",
    title_en: "Extreme Parkour Runner",
    id: "15",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/roggamercard/mbti/ESFP",
    name: "ESFP",
    template: "ESFP",
    title_ch: "搖滾先鋒",
    title_en: "Rock Vanguard",
    id: "16",
  },
];

const Character: React.FC = () => {
  const navigate = useNavigate();
  // const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [swiper, setSwiper] = useState<any>(null);
  const [currentId, setCurrentId] = useState<string>("1");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentType, setCurrentType] = useState<string>(
    "type" + (Math.floor(Math.random() * 2) + 1).toString()
  );
  const [currentMbti, setCurrentMbti] = useState<string>("INTJ");
  // const [isActive, setIsActive] = useState<boolean>(false);
  // const [bigiconUrl, setBigiconUrl] = useState<string>("");
  const [showAnimationPrev, setShowAnimationPrev] = useState<boolean>(false);
  const [showAnimationNext, setShowAnimationNext] = useState<boolean>(false);
  const [isShowHint, setIsShowHint] = useState<boolean>(false);
  const [isShowMbHint, setIsShowMbHint] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [currentImage, setCurrentImage] = useState<string>(
    "character_hand_1.svg"
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const r2url = "https://r2.web.moonshine.tw/msweb/roggamercard/";
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
    const localData = getLocalStorage("currentValue");
    if (localData) {
      // const userDataFromCookie = JSON.parse(cookieData);
      if (localData.beforestep === "camera" && swiper) {
        // console.log(userDataFromCookie.beforestep);
        // console.log(userDataFromCookie.type);
        // console.log(userDataFromCookie.mbti);
        // console.log(userDataFromCookie.currentIndex);
        swiper.slideToLoop(localData.currentIndex);
        setCurrentType(localData.type);
        // setCurrentType(userDataFromCookie.type)
        // setCurrentMbti(userDataFromCookie.mbti)
      }
    }
  }, [swiper]);

  // const handleSwitchBtnClick = () => {
  //   setIsActive((prev) => !prev);
  // };

  const handleSwitchType = (type: string): void => {
    if (type === currentType) {
      controls.start("start");
      return;
    }
    setCurrentType(type);
  };

  const handlePrev = (): void => {
    setTimeout(() => {
      setShowAnimationPrev(true);
    }, 500);
    // updateCookie("currentValue", { beforestep: "character" });
    updateLocalStorage("currentValue", { beforestep: "character" });
    navigate("/team");
  };

  function calculateDistance(current: string, target: string) {
    // 计算当前数字到目标数字的距离
    let distance = parseInt(target) - parseInt(current);

    // 如果距离为负数，表示目标数字在当前数字的左侧，需要调整距离
    if (distance < 0) {
      distance += 16;
    }

    // 如果距离大于总数的一半，表示目标数字在当前数字的右侧，需要调整距离
    if (distance > 16 / 2) {
      distance = 16 - distance;
    }

    return distance;
  }
  const handleClickOutside = (): void => {
    setIsShowHint(false);
  };

  const handleClickMbHint = (): void => {
    setIsShowMbHint((prev) => !prev);
  };

  const handleImageClick = (index: number): void => {
    if (swiper) {
      swiper.slideToLoop(index);
    }
  };

  const handleNext = (): void => {
    // const randomSelect = randomTwo();
    // const type = "type" + currentType;
    const mbtiname = buttonData1[currentIndex].name;
    const title_ch = buttonData1[currentIndex].title_ch;
    const title_en = buttonData1[currentIndex].title_en;
    // updateCookie("currentValue", {
    //   beforestep: "character",
    //   mbti: "INTJ",
    //   title_ch: title_ch,
    //   title_en: title_en,
    // });
    updateLocalStorage("currentValue", {
      type: currentType,
      beforestep: "character",
      mbti: mbtiname,
      title_ch: title_ch,
      title_en: title_en,
    });

    setTimeout(() => {
      setShowAnimationNext(true);
    }, 500);
    navigate("/camera");
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) =>
        prev === "character_hand_1.svg"
          ? "character_hand_2.svg"
          : "character_hand_1.svg"
      );
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
            <div className="w-full h-[62dvh] bg-red-400/0  overflow-hidden relative ">
              <div className="max-w-full w-[10%] absolute top-14 right-5 bg-slate-400/0 z-10">
                <img
                  src={r2imagesurl + "/images/mb/character_fui.png"}
                  alt="title"
                />
              </div>
              <AnimatePresence initial={true}>
                <motion.div
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
                </motion.div>
                <div className=" absolute mix-blend-multiply z-20 w-full top-0 left-0 h-[100dvh] ">
                  <img
                    src={r2imagesurl + "/images/mb/character_mask.png"}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <motion.div
                  key={
                    r2url +
                    "templates/character/" +
                    currentType +
                    "/" +
                    currentMbti +
                    ".png"
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
                  className="  absolute z-10 top-0 left-1/2 w-[55dvh]   "
                >
                  <motion.img
                    variants={variants}
                    animate={controls}
                    src={
                      r2url +
                      "templates/character/" +
                      currentType +
                      "/" +
                      currentMbti +
                      ".png"
                    }
                    alt=""
                    className="w-full"
                  />
                </motion.div>
                <motion.div
                  key={
                    IMAGE_URLS.ROG_GAMER_VISA +
                    "character/title_en/" +
                    currentId +
                    ".png"
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
                      "character/title_en/" +
                      currentId +
                      ".png"
                    }
                    alt="righticon"
                    className="w-full"
                  />
                </motion.div>
              </AnimatePresence>
              <div className=" fixed top-0 w-full h-[100dvh] z-0 bg-gradient-to-l from-black/80 via-black/10 to-black/80 hidden"></div>
              <motion.div
                initial={{ opacity: 0, x: "-50%" }}
                animate={{ opacity: 1, x: "-50%" }}
                // exit={{ opacity: 0, y: 0 , x:'-50%'}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.5,
                }}
                className="absolute bottom-[15%] left-1/2   w-full flex flex-col justify-center items-center z-[999]"
              >
                <div className="font-robotocon text-sm opacity-0">
                  Selected: {currentType}_{currentMbti}
                </div>
                <div className=" flex justify-center items-center w-full space-x-[4%] ">
                  <div
                    className={`w-[16%] relative bg-fuchsia-600/0 transition-all duration-500 ${
                      currentType === "type2"
                        ? " grayscale "
                        : "animate-pulse cursor-pointer"
                    } `}
                    onClick={() => {
                      if (currentType === "type1") {
                        handleSwitchType("type2");
                      }
                    }}
                  >
                    <img
                      src={r2imagesurl + "/images/character_left_btn2x.png"}
                      alt=""
                    />
                    <img
                      src={r2imagesurl + "/images/character_left_btn2x.png"}
                      alt=""
                      className={`${
                        currentType === "type2" && " hidden"
                      } absolute top-0 left-0 blur-lg`}
                    />
                  </div>
                  <div className="  font-cachetpro text-[5vw] leading-[5vw] text-center -mb-2">
                    {" "}
                    <p>SWITCH</p> <p>GENDER</p>
                  </div>
                  <div
                    className={`w-[16%] relative bg-fuchsia-600/0 transition-all duration-500 ${
                      currentType === "type1"
                        ? " grayscale "
                        : "animate-pulse cursor-pointer"
                    }`}
                    onClick={() => {
                      if (currentType === "type2") {
                        handleSwitchType("type1");
                      }
                    }}
                  >
                    <img
                      src={r2imagesurl + "/images/character_right_btn2x.png"}
                      alt=""
                    />
                    <img
                      src={r2imagesurl + "/images/character_left_btn2x.png"}
                      alt=""
                      className={` ${
                        currentType === "type1" && " hidden"
                      } absolute top-0 left-0 blur-lg`}
                    />
                  </div>
                </div>
              </motion.div>
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
                      Please go to the{" "}
                      <a
                        href="https://www.16personalities.com"
                        target="_blank"
                        className="  underline"
                      >
                        MBTI test website{" "}
                      </a>{" "}
                      to determine your MBTI personality type before
                      experiencing our website.
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
                      <a href="https://www.16personalities.com" target="_blank">
                        <img
                          src={
                            r2imagesurl + "/images/mb/character_hint_go_btn.png"
                          }
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className=" flex flex-col items-center relative">
                <AnimatePresence>
                  {false && (
                    <motion.div
                      key="hand"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          delay: 1.5,
                        },
                      }}
                      exit={{ opacity: 0, transition: { delay: 0 } }}
                      className="bg-black/90 w-full h-full absolute z-10 flex flex-col  justify-center items-center py-[5%] top-0"
                    >
                      <div className=" relative h-full bg-fuchsia-400/0 ">
                        <div className="text-center font-robotocon text-[4vw] text-white/60 ">
                          Swipe left or right to select your MBTI type
                        </div>
                        <div className="relative h-full mt-[1%]">
                          <img
                            src={r2imagesurl + "/images/mb/" + currentImage}
                            alt="Character Hand"
                            className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          />
                          <img
                            src={r2gifurl + "/images/mb/character_arrow.svg"}
                            alt="Character "
                            className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className=" flex items-center my-[4%] relative">
                  <img
                    src={
                      IMAGE_URLS.ROG_GAMER_VISA + "imgs/select_character_mb.svg"
                    }
                    alt=""
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
                    delay: 0.5,
                  }}
                  className=" bg-green-700/0 w-full h-full  flex items-center mt-[5%]"
                >
                  <Swiper
                    effect={"coverflow"}
                    modules={[EffectCoverflow]}
                    // resistance={true} TODO 中間問題
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 5,
                      depth: 500,
                      modifier: 1,
                      slideShadows: false,
                      scale: 1,
                    }}
                    // slideToClickedSlide={true}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    spaceBetween={30}
                    className="mySwiper2 "
                    onSwiper={setSwiper}
                    onSlideChange={(e) => {
                      setCurrentId(String(e.realIndex + 1));
                      setCurrentIndex(e.realIndex);
                      setCurrentMbti(buttonData1[e.realIndex].name);
                      // setBigiconUrl(
                      //   r2imagesurl + "/mbti/bigicon/" + "INTJ" + ".png"
                      // );
                      console.log(e.realIndex);
                    }}
                    loop={true}
                    loopAdditionalSlides={2}
                  >
                    {buttonData1?.map((item, index) => {
                      // const nextItemId =
                      //   index < buttonData1.length - 1
                      //     ? buttonData1[index + 1].id
                      //     : null;
                      // const prevItemId =
                      //   index > 0 ? buttonData1[index - 1].id : null;
                      return (
                        <SwiperSlide
                          key={"tf" + index}
                          className={`group relative  ${
                            currentId === item.id ? "current" : " "
                          } ${
                            calculateDistance(currentId, item.id) === 1
                              ? "current1"
                              : ""
                          }  ${
                            calculateDistance(currentId, item.id) === 2
                              ? "current2"
                              : ""
                          }  ${
                            calculateDistance(currentId, item.id) === 3
                              ? "current3"
                              : ""
                          } `}
                        >
                          <div
                            className={` relative transition-all duration-700 ${
                              currentId === item.id
                                ? "  brightness-100 "
                                : " brightness-50 "
                            } `}
                          >
                            <div
                              className="w-[100%] mx-auto relative"
                              onClick={() => {
                                handleImageClick(index);
                              }}
                            >
                              <img
                                src={
                                  IMAGE_URLS.ROG_GAMER_VISA +
                                  "character/label/" +
                                  item.id +
                                  ".svg"
                                }
                                alt={"slide" + item.id}
                                className="w-[100%] px-2 -ml-[2px] mx-auto"
                              />
                            </div>
                          </div>
                          {currentId === item.id && (
                            <motion.span
                              key={`span_${currentId}`}
                              initial={{
                                opacity: 0,
                                scale: 1.3,
                                y: "-50%",
                                x: "-50%",
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                y: "-50%",
                                x: "-50%",
                                transition: {
                                  delay: 0.3,
                                  type: "spring",
                                  stiffness: 1200,
                                  damping: 50,
                                },
                              }}
                              exit={{
                                opacity: 0,
                                scale: 1.3,
                                y: "-50%",
                                x: "-50%",
                              }}
                              className={`z-20 top-1/2 left-1/2  absolute transition-all  bg-zinc-800/0 w-full `}
                            >
                              <img
                                src={
                                  r2gifurl +
                                  "/images/mb/character_select_fui.svg"
                                }
                                alt=""
                                className="w-full"
                              />
                            </motion.span>
                          )}
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </motion.div>
              </div>
            </div>
            <div className="max-w-full w-[100%] fixed bottom-0 left-0 bg-slate-400/0 -z-[10]  pointer-events-none animate-pulse animate-infinite animate-alternate ">
              <img
                src={r2imagesurl + "/images/mb/home_redglow_mb.png"}
                alt="title"
              />
            </div>
            <div className="w-full  pt-[7%] h-[15dvh] fixed bottom-0 ">
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

          <div className="w-[45%]  mx-auto  absolute top-0 right-0  z-10   flex items-center justify-end  bg-red-500/0 ">
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
                  className=" w-full  "
                  src={IMAGE_URLS.ROG_GAMER_VISA + "imgs/select_character3.svg"}
                  alt=""
                />
                <motion.div className="w-[33%] absolute bottom-0 left-0">
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
                        className="absolute w-[260%]"
                      >
                        <img
                          src={r2imagesurl + "/images/hint_content_2x.png"}
                          alt=""
                          className="antialiased"
                        />
                        <div className="py-[5%] px-[6%] text-[0.9vw] absolute top-[18%]  bg-emerald-500/0 font-robotocon text-white/50 font-thin">
                          Please go to the{" "}
                          <a
                            href="https://www.16personalities.com"
                            target="_blank"
                            className=" underline"
                          >
                            MBTI test website{" "}
                          </a>{" "}
                          to determine your MBTI personality type before
                          experiencing our website.
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
              className="w-[70%] z-0 relative "
            >
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={4.4}
                coverflowEffect={{
                  rotate: 10,
                  stretch: 10,
                  depth: 200,
                  modifier: 1,
                  slideShadows: false,
                  scale: 0.9,
                }}
                direction={"vertical"}
                // effect={"cards"}
                // grabCursor={true}
                mousewheel={{
                  enabled: true,
                  // thresholdTime:800
                }}
                modules={[EffectCoverflow, Mousewheel]}
                className="mySwiper  "
                cardsEffect={{
                  perSlideOffset: 80,
                  perSlideRotate: 1,
                }}
                onSwiper={setSwiper}
                loopAdditionalSlides={2}
                onSlideChange={(e) => {
                  setCurrentId(String(e.realIndex + 1));
                  setCurrentIndex(e.realIndex);
                  setCurrentMbti(buttonData1[e.realIndex].name);
                  // setBigiconUrl(
                  //   r2imagesurl + "/mbti/bigicon/" + "INTJ" + ".png"
                  // );
                  console.log(e.realIndex);
                }}
                // slideToClickedSlide={true}
                // onClick={(e)=>{
                //   console.log(e.realIndex)
                // }}
                loop={true}
              >
                {buttonData1?.map((item, index) => {
                  // const nextItemId =
                  //   index < buttonData1.length - 1
                  //     ? buttonData1[index + 1].id
                  //     : null;
                  // const prevItemId =
                  //   index > 0 ? buttonData1[index - 1].id : null;
                  return (
                    <SwiperSlide
                      key={"tf" + index}
                      className={`group relative ${
                        currentId === item.id ? "current" : " "
                      } ${
                        calculateDistance(currentId, item.id) === 1
                          ? "current1"
                          : ""
                      }  ${
                        calculateDistance(currentId, item.id) === 2
                          ? "current2"
                          : ""
                      }  ${
                        calculateDistance(currentId, item.id) === 3
                          ? "current3"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-1/2 relative transition-all duration-700 ${
                          currentId === item.id
                            ? "  brightness-200 hue-rotate-60 "
                            : "brightness-50 "
                        } `}
                      >
                        <div
                          className="w-[90%] mx-auto "
                          onClick={() => {
                            handleImageClick(index);
                          }}
                        >
                          <img
                            src={
                              IMAGE_URLS.ROG_GAMER_VISA +
                              "character/label/" +
                              item.id +
                              ".svg"
                            }
                            alt="slide"
                            className="w-full"
                          />
                        </div>
                        {currentId === item.id && (
                          <motion.span
                            key={`span_${currentId}`}
                            initial={{
                              opacity: 0,
                              scale: 1.3,
                              y: "-50%",
                              x: "-40%",
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1.1,
                              y: "-50%",
                              x: "-40%",
                              transition: {
                                delay: 0.3,
                                type: "spring",
                                stiffness: 1200,
                                damping: 50,
                              },
                            }}
                            exit={{
                              opacity: 0,
                              scale: 1.3,
                              y: "-50%",
                              x: "-40%",
                            }}
                            whileHover={{ scale: 1.2 }}
                            className={`z-20 top-1/2 left-1/2  absolute transition-all  bg-slate-50/0 w-full `}
                          >
                            <img
                              src={
                                r2imagesurl +
                                "/images/character_select_right.svg"
                              }
                              alt=""
                              className="w-full"
                            />
                          </motion.span>
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-screen bg-cover bg-center bg-no-repeat z-0 w-full relative overflow-hidden pl-10 bg-slate-300/0 "
          >
            <motion.div
              initial={{ opacity: 0, y: -20, x: "10%" }}
              animate={{ opacity: 1, y: 0, x: "10%" }}
              exit={{ opacity: 0, y: 30, x: "10%" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.5,
              }}
              className="absolute bottom-[35%] left-0  w-[50%] bg-fuchsia-700/0 flex flex-col justify-center items-center z-[999]"
            >
              <div className="font-robotocon text-sm opacity-0">
                Selected: {currentType}_{currentMbti}
              </div>
              <div className=" flex  justify-center items-center space-x-[4%]  mx-auto bg-slate-600/0">
                <div
                  className={`w-[10vmin] relative  transition-all duration-500 ${
                    currentType === "type2"
                      ? " grayscale "
                      : "animate-pulse cursor-pointer"
                  } `}
                  onClick={() => {
                    if (currentType === "type1") {
                      handleSwitchType("type2");
                    }
                  }}
                >
                  <img
                    src={r2imagesurl + "/images/character_left_btn2x.png"}
                    alt=""
                  />
                  <img
                    src={r2imagesurl + "/images/character_left_btn2x.png"}
                    alt=""
                    className={`${
                      currentType === "type2" && " hidden"
                    } absolute top-0 left-0 blur-xl`}
                  />
                </div>
                <div className="  font-cachetpro text-[2vw] leading-[2vw] text-center -mb-2">
                  {" "}
                  <p>SWITCH</p> <p>GENDER</p>
                </div>
                <div
                  className={`w-[10vmin] relative  bg-fuchsia-600/0 transition-all duration-500 ${
                    currentType === "type1"
                      ? " grayscale "
                      : "animate-pulse cursor-pointer"
                  }`}
                  onClick={() => {
                    if (currentType === "type2") {
                      handleSwitchType("type1");
                    }
                  }}
                >
                  <img
                    src={r2imagesurl + "/images/character_right_btn2x.png"}
                    alt=""
                  />
                  <img
                    src={r2imagesurl + "/images/character_left_btn2x.png"}
                    alt=""
                    className={` ${
                      currentType === "type1" && " hidden"
                    } absolute top-0 left-0 blur-xl`}
                  />
                </div>
              </div>
              {/* <button
                className="relative w-full "
                onClick={handleSwitchBtnClick}

              >
                <div className={`absolute top-[0px] py-[2%] left-0 w-full h-full   transition-all ${isActive ? 'translate-x-[45%]' : 'translate-x-[14%]'} `}>
                  <img src={r2imagesurl+'/images/switch_btn_click.png'} alt="" className=' mix-blend-screen h-full  opacity-85' />
                </div>
                <img src={r2imagesurl+'/images/switch_btn_bg.png'}  alt="" className='w-full' />
              </button> */}
            </motion.div>
            <div className="  absolute z-50 top-0 left-0 h-screen opacity- w-full">
              <img
                src={r2imagesurl + "/images/character_mask.png"}
                alt=""
                className="w-full h-screen"
              />
            </div>

            <AnimatePresence initial={true}>
              <motion.div
                key={
                  r2url +
                  "templates/character/" +
                  currentType +
                  "/" +
                  currentMbti +
                  ".png"
                }
                initial={
                  currentType === "type2"
                    ? { opacity: 0, x: "10%", scale: 1.5, y: "30%" }
                    : { opacity: 0, x: "-60%", scale: 1.5, y: "30%" }
                }
                animate={{
                  opacity: 1,
                  x: "-40%",
                  scale: 1.5,
                  y: "30%",
                  transition: {
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 50,
                  },
                }}
                exit={
                  currentType === "type2"
                    ? { opacity: 0, x: "10%", scale: 1.5, y: "30%" }
                    : { opacity: 0, x: "-60%", scale: 1.5, y: "30%" }
                }
                className="  absolute z-20 top-0 w-[65vh] left-1/4  "
              >
                <motion.img
                  variants={variants}
                  animate={controls}
                  src={
                    "https://r2.web.moonshine.tw/opt/lg/msweb/roggamercard/" +
                    "templates/character/big" +
                    currentType +
                    "/" +
                    currentMbti +
                    ".png"
                  }
                  alt=""
                  className="w-full"
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence initial={true}>
              <motion.div
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
              </motion.div>

              <motion.div
                key={
                  IMAGE_URLS.ROG_GAMER_VISA +
                  "character/title_ch2/" +
                  currentId +
                  ".png"
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
                className=" absolute top-[8%] left-[10%] z-0 w-[8%]"
              >
                <img
                  src={
                    IMAGE_URLS.ROG_GAMER_VISA +
                    "character/title_ch2/" +
                    currentId +
                    ".png"
                  }
                  alt="lefticon"
                  className="w-full"
                />
              </motion.div>
              <motion.div
                key={
                  IMAGE_URLS.ROG_GAMER_VISA +
                  "character/title_en/" +
                  currentId +
                  ".png"
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
                className=" absolute top-[5%] left-[39%] z-0 w-[5%]"
              >
                <motion.img
                  src={
                    IMAGE_URLS.ROG_GAMER_VISA +
                    "character/title_en/" +
                    currentId +
                    ".png"
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

export default Character;
