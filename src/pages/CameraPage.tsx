import React, { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useImage } from "../Helpers/ImageContext";
import Resizer from "react-image-file-resizer";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { Player } from "@lottiefiles/react-lottie-player";
import lottie from "lottie-web";
import trans2 from "../animationData/trans_01_short_reverse.json";
import cameraC from "../animationData/PC-camera-UI-front.json";
import ScreenProgress from "../Components/ScreenProgress";
import TransitionAnimation from "../Components/TransitionAnimation";
import TypewriterTerminal from "../Components/TypewriterTerminal";
import {
  getCookie,
  getUsernameFromCookie,
  updateCookie,
} from "../Helpers/Helper";
import { IMAGE_URLS } from "../Helpers/constants";

interface ResultData {
  type: string;
  mbti: string;
  title_ch: string;
  title_en: string;
  currentLogo: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

const Camera: React.FC = () => {
  const { setBeforeImage } = useImage();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const cameraC_Container = useRef<HTMLDivElement>(null);

  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isRender, setIsRender] = useState<boolean>(false);
  // const [msg, setMsg] = useState<string>("");
  // const [sourceImage, setSourceImage] = useState<File | null>(null);
  // const [renderedData, setRenderedData] = useState<Record<string, any>>({});
  const [currentId] = useState<string>("1");
  // const [renderedResult, setRenderedResult] = useState<Record<string, any>>({});
  // const [showRender, setShowRender] = useState<boolean>(false);
  const [resultData, setResultData] = useState<ResultData>({
    type: "",
    mbti: "",
    title_ch: "",
    title_en: "",
    currentLogo: "",
  });
  // const [mbtiData, setMbtiData] = useState<MbtiData>({});
  const [image, setImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<"camera" | "upload">("camera");
  const [showAnimationPrev, setShowAnimationPrev] = useState<boolean>(false);
  // const [showAnimationNext, setShowAnimationNext] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const allowedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/bmp",
  ];

  const r2imagesurl = "https://r2.web.moonshine.tw/opt/md/msweb/roggamercard";
  const r2gifurl = "https://r2.web.moonshine.tw/msweb/roggamercard";
  const apiurl = "https://roggamervisa-api.moonshine-studio.net/";
  const face_swap_url = apiurl + "face_swap";
  const getimages_url = apiurl + "images/";
  const videoConstraints = {
    aspectRatio: 0.8888887,
    facingMode: "user",
    width: { min: 300 },
    height: { min: 320 },
  };

  const videoConstraints2 = {
    aspectRatio: 1,
    facingMode: "user",
    width: { min: 300 },
    height: { min: 340 },
  };
  useEffect(() => {
    const cameraC_Instance = lottie.loadAnimation({
      container: cameraC_Container.current!,
      animationData: cameraC,
      autoplay: true,
      loop: true,
    });

    return () => {
      cameraC_Instance.destroy();
    };
  }, []);
  useEffect(() => {
    const cookieData = getCookie("currentValue");
    if (!cookieData) return;
    const userDataFromCookie = JSON.parse(cookieData);
    setResultData(userDataFromCookie);
  }, []);

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImageType("camera");
      handleClick(imageSrc);
    }
  }, [webcamRef]);

  const handleClick = async (photo: string) => {
    await processCameraImage(photo);
  };

  //處理圖片壓縮與顯示
  const processCameraImage = async (photo: string) => {
    const files = await base64toFileList(photo);
    const compressFiles = await resizeFile(files[0]);
    const formData = new FormData();
    formData.append("image", compressFiles);
    console.log(compressFiles);
    // setSelectedImage(compressFiles);
    //顯示預覽圖
    if (compressFiles) {
      const reader = new FileReader();
      reader.onload = () => {
        // 读取文件并更新选定的图像
        setImage(reader.result as string);
        setBeforeImage(reader.result as string);
      };
      reader.readAsDataURL(compressFiles);
      // setMsg('Proceed to the next step..')
      // setTimeout(()=>{
      //   navigate("/templates");
      // },1200)
    }
  };

  const onUploadBtnClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
      setImage(null);
      inputFileRef.current.click();
    }
  };

  const onFilechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedImageTypes.includes(file.type)) {
      toast.error("Only BMP, JPEG, JPG, and PNG image files are allowed.");
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      toast.error("File size should be less than 12MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const tempImage = new Image();
      if (typeof reader.result === "string") {
        tempImage.src = reader.result;
        tempImage.onload = () => {
          setImageType("upload");
          setImage(reader.result as string);
          setBeforeImage(reader.result as string);
        };
      }
    };
    reader.readAsDataURL(file);
  };

  const base64toFileList = async (base64: string): Promise<File[]> => {
    const res = await fetch(base64);
    const blob = await res.blob();
    const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
    return [file];
  };

  const resizeFile = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1080,
        1080,
        "JPEG",
        100,
        0,
        (uri) => {
          if (uri instanceof File) {
            resolve(uri);
          }
        },
        "file"
      );
    });
  };

  const handlePrev = () => {
    setTimeout(() => {
      setShowAnimationPrev(true);
    }, 500);
    navigate("/character");
  };

  const handleNext = () => {
    // if (!image) {
    //   toast.error("Please take a photo or upload an image first.");
    //   return;
    // }
    // const storedData = localStorage.getItem("currentValue");
    // if (!storedData) return;

    // const userData = JSON.parse(storedData);
    // const newData = {
    //   ...userData,
    //   beforestep: "camera",
    //   image: image,
    //   imageType: imageType,
    // };
    // localStorage.setItem("currentValue", JSON.stringify(newData));
    // navigate("/result");
    onBtnClick();
  };
  //按鈕後開始ai運算 console.log(resultData);
  console.log(resultData);
  const onBtnClick = async () => {
    let randomSelect = "1";
    let currentType = resultData.type;
    let mbtiname = resultData.mbti;
    let template =
      "https://r2.web.moonshine.tw/msweb/roggamercard/templates/4k/" +
      currentType +
      "/" +
      mbtiname +
      "_" +
      randomSelect +
      ".jpg";
    updateCookie("currentValue", {
      template: template,
      randomSelect: randomSelect,
    });
    if (!image) {
      toast.error("Error: Image must be taken or uploaded first.");
      return;
    }
    if (!currentId) {
      // console.log('no')
      toast.error("Error: A mod must be selected.");
      return;
    }
    // toast('Picture uploading…..')
    setIsRender(true);

    var file = dataURLtoFile(image, "image.jpg");
    const { width, height } = await getImageDimensions(file);
    console.log(width, height);

    //容量 尺寸
    let compressFiles;
    if (await needsCompression(file, 1 * 1024 * 1024, 1200)) {
      // console.log('需要壓縮')
      // setMsg("Compressing image.");
      compressFiles = await resizeFile(file);
      // await setSourceImage(compressFiles);
    } else {
      compressFiles = file;
      // await setSourceImage(compressFiles);
    }
    try {
      // 上传图像的逻辑
      const formData = new FormData();
      formData.append("source_image", compressFiles);
      formData.append("swap_image_url", template);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", import.meta.env.VITE_APITOKEN);
      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow" as RequestRedirect,
      };
      const response = await fetch(face_swap_url, requestOptions);
      if (!response.ok) {
        toast.error("Error:please upload the image again.");
        return;
      }

      const responseData = await response.json();
      // console.log(responseData);
      if (responseData.message) {
        toast.error("Error:please upload the image again.");
        return;
      }
      if (responseData.id) {
        // toast(`Flow task uploaded`)
        setTimeout(async () => {
          // toast('Please wait for the result')
          await getResulImage(responseData.id);
        }, 500);
      }

      // 上传成功，等待结果
    } catch (error) {
      toast.error("Error: Image upload failed.");
    }
  };
  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[arr.length - 1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    let i = n;
    while (i--) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const getImageDimensions = (file: File): Promise<ImageDimensions> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        if (typeof e.target?.result === "string") {
          img.src = e.target.result;
        }
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height,
          });
        };
        if (typeof e.target?.result === "string") {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const needsCompression = async (
    file: File,
    maxSize: number,
    maxDimension: number
  ) => {
    const { width, height } = await getImageDimensions(file);
    return file.size > maxSize || width > maxDimension || height > maxDimension;
  };
  //取得結果
  // let source;
  const getResulImage = async (id: string) => {
    try {
      const response = await fetch(getimages_url + id, {
        method: "GET",
        headers: {
          Authorization: import.meta.env.VITE_APITOKEN,
        },
      });

      // 检查响应状态
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);

      // 使用setTimeout进行延时操作
      setTimeout(async () => {
        if (responseData.restarted >= 2) {
          // setMsg("Timeout error, please upload the image again.");
          return;
        }

        if (responseData.finished === 0) {
          getResulImage(id);
          return;
        }

        if (responseData.finished === 1) {
          // setRenderedResult(responseData);
          updateCookie("currentValue", {
            result: responseData.generations[0].img,
          });
          // setShowRender(true);
          // setIsRender(false);
          setTimeout(() => {
            // setShowAnimationNext(true);
          }, 500);
          navigate("/final");
          // await updatedData(id, responseData.generations[0].img, source);
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Error: Please try uploading the image again.");
    }
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
    const storedData = localStorage.getItem("currentValue");
    if (!storedData) {
      navigate("/");
      return;
    }

    const userData = JSON.parse(storedData);
    if (userData.beforestep === "result") {
      setImage(userData.image);
      setImageType(userData.imageType);
    }
  }, [navigate]);

  return (
    <div className=" relative h-[100dvh] text-white  ">
      {isRender && <ScreenProgress immediateComplete={isRender} />}
      {!isMobile && showAnimationPrev && (
        <TransitionAnimation
          isMobile={isMobile}
          showAnimation={showAnimationPrev}
          jsonData={trans2}
        />
      )}
      {isMobile ? (
        <div className=" flex flex-col relative  ">
          <div className="max-w-full w-[100%] fixed bottom-0 left-0 bg-lime-400/0 -z-0 pointer-events-none animate-pulse animate-infinite animate-alternate">
            <img
              src={r2imagesurl + "/images/mb/home_redglow_mb.png"}
              alt="title"
            />
          </div>

          <div className="w-full h-[85dvh]  fixed top-0 mt-[3%]  ">
            {imageType === "upload" && image && (
              <div className=" bg-green-400/0 w-full h-full absolute z-40 flex items-center bg-sky-600">
                <img
                  src={r2imagesurl + "/images/camera_mask.png"}
                  alt="camera_mask"
                  className=" relative z-10 h-full w-full "
                />
                <motion.div
                  initial={{ opacity: 0, y: "-50%", x: "-50%" }}
                  animate={{ opacity: 1, y: "-50%", x: "-50%" }}
                  exit={{ opacity: 0, y: "-50%", x: "-50%" }}
                  className="  absolute  top-1/2 left-1/2  w-full h-full flex items-center  bg-red-400/0"
                >
                  <img
                    src={image}
                    alt="Selected"
                    className=" object-cover contrast-125  hue-rotate-15 rounded-md border-0 border-white/0  w-full h-full    "
                  />
                </motion.div>
              </div>
            )}
            <div className=" relative bg-red-500/0 w-[100%] h-[100dvh] mx-auto  z-20 ">
              {/* TODO Frame Svg Animation */}
              <Player
                src={r2gifurl + "/animationData/mb_camera_frame.json"}
                className="  absolute -top-[5%] left-1/2 -translate-x-1/2 w-[100%] h-auto"
                loop
                autoplay
              />
              <Player
                src={r2gifurl + "/animationData/mb_camera_center.json"}
                className="  absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-auto"
                loop
                autoplay
              />
            </div>
            <div className=" absolute z-10 top-[40%] -translate-y-1/2  bg-cyan-700/0 w-full  aspect-[9/13]    ">
              <div className="w-[100%] mx-auto absolute top-0  left-0  h-full z-10 bg-teal-500/0    ">
                <div className="z-10  absolute  left-0 w-full ">
                  <img
                    src={r2imagesurl + "/images/mb/camera_mask.png"}
                    alt="camera_mask"
                    className="w-full  "
                  />
                </div>

                {imageType === "camera" && image && (
                  <motion.div
                    initial={{ opacity: 0, y: "-50%", x: "-50%" }}
                    animate={{ opacity: 1, y: "-50%", x: "-50%" }}
                    exit={{ opacity: 0, y: "-50%", x: "-50%" }}
                    className="  absolute z-0 top-1/2 left-1/2 w-full h-full flex items-center  bg-red-400/50"
                  >
                    <img
                      src={image}
                      alt="Selected"
                      className=" object-cover contrast-125  hue-rotate-15 rounded-md border-0 border-white/0  w-full h-full    "
                    />
                  </motion.div>
                )}
              </div>
              <div className=" bg-red-800/0 w-full h-full absolute top-0 z-0 ">
                <Webcam
                  className="contrast-125  hue-rotate-15 w-full aspect-[9/12] mx-auto z-10 object-cover "
                  ref={webcamRef}
                  mirrored={true}
                  width={"auto"}
                  videoConstraints={videoConstraints2}
                />
              </div>
            </div>
            <div className=" absolute bottom-0 z-50 w-full bg-slate-600/0 flex flex-col items-center ">
              {image ? (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, y: "-40%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "-40%" }}
                  whileHover={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="hover:scale-95 cursor-pointer w-[16%] mx-auto"
                  onClick={() => setImage(null)}
                >
                  <img src={r2imagesurl + "/images/reset_btn.png"} alt="" />
                </motion.div>
              ) : (
                <motion.div
                  key="shot"
                  initial={{ opacity: 0, y: "-40%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "-40%" }}
                  whileHover={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="hover:scale-95 cursor-pointer w-[16%] mx-auto"
                  onClick={capture}
                >
                  <img
                    src={r2imagesurl + "/images/camera_icon.png"}
                    alt="shot"
                    className="w-full"
                  />
                </motion.div>
              )}
              <motion.div className="bg-purple-600/0 w-full flex justify-center mt-[3%]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: "-8%" }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-[45%] mx-auto "
                >
                  <img
                    src={r2imagesurl + "/images/upload_button.png"}
                    alt=""
                    className=" hover:scale-95 cursor-pointer max-w-full w-full"
                    onClick={onUploadBtnClick}
                  />
                </motion.div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFilechange}
                  style={{ display: "none" }}
                  ref={inputFileRef}
                />
              </motion.div>
            </div>
          </div>

          <div className="w-full bg-blue-400/0 pt-[10%] h-[15dvh] mt-auto fixed bottom-0 z-40  ">
            <div className=" flex justify-between w-[60%] mx-auto h-full bg-violet-600/0 relative">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, y: "0%" }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="   top-1/2  left-0 h-10 flex items-center "
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
                exit={{ opacity: 0, x: -100, y: "50%" }}
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
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: "-54%" }}
            animate={{ opacity: 1, y: "-54%", x: "" }}
            exit={{ opacity: 0, y: "-54%" }}
            className="w-full h-full  absolute top-1/2 right-0 z-10   bg-slate-400/0"
          >
            <img
              src={r2imagesurl + "/images/home_right_side_glow.png"}
              alt=""
              className="max-w-full h-screen absolute right-0 animate-pulse animate-infinite animate-alternate"
            />
            <img
              src={r2imagesurl + "/images/home_left_side_glow.png"}
              alt=""
              className="max-w-full h-screen absolute left-0 animate-pulse animate-infinite animate-alternate"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-screen bg-cover bg-center bg-no-repeat z-0 absolute w-full top-0 left-0 "
            style={{
              backgroundImage: `url('${r2gifurl + "/images/camera_bg.png"}')`,
            }}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, x: "-50%", y: "-50%" }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 20,
              delay: 0.5,
            }}
            className="  absolute left-1/2  pointer-events-none z-50 flex w-[100%] top-1/2   px-[%] mix-blend-screen h-screen overflow- "
          >
            <div className="  w-full h-full  z-0 flex justify-center items-center  box-border relative bg-white/0">
              <div className="bg-fuchsia-600/0 flex w-[77%]  aspect-[17/9.5]">
                <div className="  relative  bg-yellow-500/0 w-[23%] mr-[3%] pt-[5%] pl-6 ">
                  <img
                    src={r2gifurl + "/images/L1.gif"}
                    alt=""
                    className="  absolute top-0 left-0 mix-blend-screen  max-w-full h-full "
                  />
                  <img
                    src={r2gifurl + "/images/L2.gif"}
                    alt=""
                    className=" absolute top-0 right-0 mix-blend-screen max-w-full h-full "
                  />
                  <div className=" w-full h-full flex flex-col justify-between pl-4  ">
                    <div className=" opacity-80 pt-[28%] ">
                      <div className=" font-cachetpro text-[1.4vw] font-semibold pt-[4%] leading-3 ">
                        Gamer name:
                      </div>
                      <div className="mt-[7%] font-light text-[1.2vw] font-robotocon ">
                        {getUsernameFromCookie()}
                      </div>
                    </div>
                    <div className="w-full h-[76%] mt-[12%] mb-[5vh]  flex flex-col justify-end  relative bg-slate-600/0  ">
                      <div className="flex items-center justify-start gap-3 opacity-80 mb-[3vh] max-h-[40px] bg-slate-500/0 ">
                        <div className="w-[14%] bg-sky-600/0">
                          <img
                            src={
                              r2imagesurl +
                              "/mbti/sm_icon/" +
                              resultData.mbti +
                              ".png"
                            }
                            className=""
                            alt=""
                          />
                        </div>

                        <div className="font-cachetpro text-[1.4vw] align-middle bg-slate-500/0 pt-[3%] leading-tight flex flex-col   ">
                          <span className="text-white/80">
                            {resultData.title_ch}
                          </span>
                          <span className="text-white/40">
                            {resultData.title_en}
                          </span>
                        </div>
                      </div>
                      <div className=" text-[0.85vw] pr-[20%] text-white/80 font-light font-robotocon  overflow-hidden bg-slate-500/0  relative">
                        <img
                          src={
                            IMAGE_URLS.ROG_GAMER_VISA +
                            "team/logo/" +
                            resultData.currentLogo +
                            "_word.svg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" relative bg-red-500/0  ">
                  {imageType === "upload" && image && (
                    <div className=" bg-green-400/0 w-full h-full absolute z-30 flex items-center">
                      <img
                        src={r2imagesurl + "/images/camera_mask.png"}
                        alt="camera_mask"
                        className=" relative z-10 h-full "
                      />
                      <motion.div
                        initial={{ opacity: 0, y: "-50%", x: "-50%" }}
                        animate={{ opacity: 1, y: "-50%", x: "-50%" }}
                        exit={{ opacity: 0, y: "-50%", x: "-50%" }}
                        className="  absolute z-0 top-1/2 left-1/2  w-full h-full flex items-center  bg-red-400/0"
                      >
                        <img
                          src={image}
                          alt="Selected"
                          className=" object-cover contrast-125  hue-rotate-15 rounded-md border-0 border-white/0  w-full h-full    "
                        />
                      </motion.div>
                    </div>
                  )}

                  <div
                    className=" z-10 relative max-w-full h-full"
                    ref={cameraC_Container}
                  ></div>

                  <div className=" absolute z-0 top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 bg-emerald-300/0 w-full   ">
                    <div className="w-[100%] mx-auto absolute top-0 left-0  z-10 h-full    ">
                      <img
                        src={r2imagesurl + "/images/camera_mask.png"}
                        alt="camera_mask"
                        className="z-10  absolute top-0 left-0 w-full "
                      />
                      {imageType === "camera" && image && (
                        <motion.div
                          initial={{ opacity: 0, y: "-50%", x: "-50%" }}
                          animate={{ opacity: 1, y: "-50%", x: "-50%" }}
                          exit={{ opacity: 0, y: "-50%", x: "-50%" }}
                          className="  absolute z-0 top-1/2 left-1/2  w-full h-full flex items-center  bg-red-400/0"
                        >
                          <img
                            src={image}
                            alt="Selected"
                            className=" object-cover contrast-125  hue-rotate-15 rounded-md border-0 border-white/0  w-full h-full    "
                          />
                        </motion.div>
                      )}
                    </div>

                    <Webcam
                      className="contrast-125  hue-rotate-15 w-[94%] mx-auto  "
                      ref={webcamRef}
                      mirrored={true}
                      width={"auto"}
                      videoConstraints={videoConstraints}
                    />
                  </div>
                </div>
                <div className="w-[20%] ml-auto bg-slate-400/0">
                  <TypewriterTerminal
                    lines={[
                      "AI SYSTEM ONLINE",
                      "ANALYZING BIO-METRICS...",
                      'Console.WriteLine("LEDGER UPDATED");',
                      "DATA SYNCHRONIZATION IN PROGRESS...",
                      "ALGORITHM OPTIMIZATION UNDERWAY...",
                      "VIRTUAL REALITY IMMERSION INITIATED",
                      'System.out.println("Σ(n^2) FROM n=1 TO ∞...");',
                      "BLOCKCHAIN VERIFIED",
                      "CRYPTOGRAPHIC ENCRYPTION ENABLED",
                      "BIOMETRIC AUTHENTICATION SECURE",
                      'console.log("ReLU Activation Function (threshold = 0.5)...");',
                      "AUGMENTED REALITY LOADING...",
                    ]}
                    interval={40}
                  />
                </div>

                <div className="  relative  bg-yellow-500/0 ml-auto">
                  <img
                    src={r2gifurl + "/images/R.gif"}
                    alt=""
                    className=" mix-blend-screen max-w-full h-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: "-50%" }}
            animate={{ opacity: 1, y: "-24%", x: "-30%" }}
            exit={{ opacity: 0, y: "-50%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="  z-30  mx-auto  absolute top-1/2 right-[10%] w-[14%] aspect-[3/6] bg-zinc-500/0 "
          >
            <div className=" relative bg-pink-600/0 h-[55%] ">
              <img
                src={r2imagesurl + "/images/camera_btn_line2.png"}
                alt="camera_btn_line"
                className="h-full aspect-square  absolute top-0 right-0"
              />
              {image ? (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, x: "-40%", y: "-40%" }}
                  animate={{ opacity: 1, x: "-50%", y: "-40%" }}
                  exit={{ opacity: 0, x: "-40%", y: "-40%" }}
                  whileHover={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="left-0 absolute top-1/2 hover:scale-95 cursor-pointer w-[35%]"
                  onClick={() => setImage(null)}
                >
                  <img src={r2imagesurl + "/images/reset_btn.png"} alt="" />
                </motion.div>
              ) : (
                <motion.div
                  key="shot"
                  initial={{ opacity: 0, x: "-40%", y: "-40%" }}
                  animate={{ opacity: 1, x: "-50%", y: "-40%" }}
                  exit={{ opacity: 0, x: "-40%", y: "-40%" }}
                  whileHover={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="left-0 absolute top-1/2 hover:scale-95 cursor-pointer w-[35%]"
                  onClick={capture}
                >
                  <img
                    src={r2imagesurl + "/images/camera_icon.png"}
                    alt="shot"
                    className="w-full"
                  />
                </motion.div>
              )}
            </div>

            <motion.div className="left-0  absolute bottom-0 flex flex-col bg-purple-600/0 w-full h-[45%]">
              <div className="w-[1px] h-[250px] bg-white/50 "></div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: "-8%" }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-[80%] "
              >
                <img
                  src={r2imagesurl + "/images/upload_button.png"}
                  alt=""
                  className=" hover:scale-95 cursor-pointer w-full"
                  onClick={onUploadBtnClick}
                />
              </motion.div>
              <input
                type="file"
                accept="image/*"
                onChange={onFilechange}
                style={{ display: "none" }}
                ref={inputFileRef}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className=" absolute    top-1/2  left-0 z-40 w-[10%] flex items-center"
          >
            <div className="h-[1px] w-[6vw] bg-white/70 mr-2"></div>
            <button
              onClick={handlePrev}
              className="w-[50%] text-[1vw] aspect-[90/40]  bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold"
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
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 right-0 z-40 w-[10%] flex items-center"
          >
            <button
              onClick={handleNext}
              className={` w-[50%] text-[1vw] aspect-[90/40]  bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold transition-all duration-700 ${
                image ? " opacity-100" : " opacity-20 "
              }`}
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

export default Camera;
