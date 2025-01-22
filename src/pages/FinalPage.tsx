import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// import { useImage } from "../Helpers/ImageContext";
import {
  getUsernameFromCookie,
  getDescriptionByMbti,
  processImage,
  getLocalStorage,
} from "../Helpers/Helper";
import { QRCodeSVG } from "qrcode.react";
import { IMAGE_URLS } from "../Helpers/constants";
import { toast } from "react-toastify";
interface ResultData {
  type: string;
  mbti: string;
  result: string;
  randomSelect: string;
  template: string;
  title_ch: string;
  title_en: string;
  currentLogo: string;
  currentTeamName: string;
}

const Final: React.FC = () => {
  let scrollbarStyle = "style-1";
  let r2url = "https://r2.web.moonshine.tw/msweb/roggamercard/";
  // let r2urlformat = "https://r2.web.moonshine.tw/opt/lg/msweb/roggamercard/";
  let r2imagesurl = "https://r2.web.moonshine.tw/opt/md/msweb/roggamercard";
  let r2gifurl = "https://r2.web.moonshine.tw/msweb/roggamercard";

  // const { username, setUsername } = useImage();
  // const [showAnimationPrev, setShowAnimationPrev] = useState<boolean>(false);
  const [resultData, setResultData] = useState<ResultData>({
    type: "",
    mbti: "",
    result: "",
    randomSelect: "",
    template: "",
    title_ch: "",
    title_en: "",
    currentLogo: "",
    currentTeamName: "",
  });
  // const [homeCheckData, setHomeCheckData] = useState<Record<string, any>>({});

  const [mbtiData, setMbtiData] = useState<Record<string, any>>({});
  // const [showBanner, setShowBanner] = useState<boolean>(false);

  // const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [currentMenu, setCurrentMenu] = useState<string>("image");
  // const [isCompressing, setIsCompressing] = useState<boolean>(false);
  // const [isProcessed, setIsProcessed] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  // const [wallpaperdUrl, setWallpaperdUrl] = useState<string>("");
  // const [card1Url, setCard1Url] = useState<string>("");
  // const [card2Url, setCard2Url] = useState<string>("");
  const [card3Url, setCard3Url] = useState<string>("");
  // const [printCardUrl,setPrintCardUrl]=useState('')
  // const openFormModal = (): void => setShowFormModal(true);
  // const closeFormModal = (): void => setShowFormModal(false);
  // const onChange = ({ target }: { target: HTMLInputElement }): void =>
  //   setUsername(target.value);
  const navigate = useNavigate();

  const divRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (divRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = divRef.current;
        console.log(scrollTop, scrollHeight, clientHeight);
        if (scrollTop + clientHeight >= scrollHeight) {
          console.log("Scrolled to bottom");
          setIsAtBottom(true);
        } else {
          console.log("Not yet at bottom");
          setIsAtBottom(false);
        }
      }
    };

    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
      console.log("Event listener added");

      // 手动调用一次 handleScroll 以在页面加载时进行检测
      handleScroll();
    } else {
      console.log("divElement is not defined on initial render");
    }

    // Clean up event listener on component unmount
    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
        console.log("Event listener removed");
      }
    };
  }, [divRef.current]);
  const mb_menu = [
    { title: "image" },
    { title: "download" },
    { title: "share" },
    { title: "star" },
    { title: "home" },
  ];
  const getTitleCardType = (title: string) => {
    console.log(title);
    // 四個陣營 名字 下載編號 顏色 白 黃 彩 黑
    const card_info = [
      { title: "ACHT", cardtype: "black", fontcolor: "#fff" },
      { title: "AKIRA", cardtype: "white", fontcolor: "#000" },
      { title: "HORSEM4N", cardtype: "gradient", fontcolor: "#fff" },
      { title: "SE7EN", cardtype: "gold", fontcolor: "#000" },
    ];

    // 使用 find 方法查找与给定 title 相对应的 cardtype
    const card = card_info.find((card) => card.title === title);
    // 如果找到了匹配的 title，则返回对应的 cardtype，否则返回 undefined
    return card;
  };

  const handleBackHome = () => {
    navigate("/");
  };
  const handlePrev = () => {
    navigate("/camera");
  };

  //處理圖片下載
  // const handleDownload = async () => {
  //   try {
  //     let gamerNeme = getUsernameFromCookie();
  //     let imageData;
  //     const processedWallpaper = await processImageToWallpaper(
  //       resultData.result,
  //       "https://r2.web.moonshine.tw/msweb/roggamercard/templates/logos/wallpaperlogo1000_2.png",
  //       null
  //     );
  //     // 获取原始图片的 Blob 数据
  //     const response = await fetch(processedWallpaper as string);
  //     imageData = await response.blob();

  //     // 创建一个 URL 对象
  //     const imageUrl = URL.createObjectURL(imageData);

  //     // 创建一个可下载的链接
  //     const a = document.createElement("a");
  //     a.href = imageUrl;
  //     a.download = gamerNeme + "_" + resultData.mbti + "_Wallpaper.jpg"; // 设置下载文件的名称

  //     // 模拟点击下载链接
  //     a.click();

  //     // 释放 URL 对象
  //     URL.revokeObjectURL(imageUrl);
  //   } catch (error) {
  //     console.error("Error while handling download:", error);
  //   }
  // };
  const getNextCardNumber = async () => {
    try {
      const response = await fetch(
        "https://roggamervisa-api.moonshine-studio.net/next-card-number",
        {
          method: "GET",
          headers: {
            Authorization: `${import.meta.env.VITE_APITOKEN}`,
          },
        }
      );
      const { cardNumber } = await response.json();
      return cardNumber;
    } catch (error) {
      console.error("Error getting card number:", error);
      return "00000";
    }
  };
  //下載裁切好的卡片
  interface CardData {
    title: string;
    cardtype: string;
    fontcolor: string;
  }
  const handleDownloadCard = async () => {
    console.log("DL CARD");
    const cardNumber = await getNextCardNumber();
    let card = (await getTitleCardType(resultData.currentTeamName)) as CardData;
    try {
      // 处理图片
      let gamerNeme = getUsernameFromCookie();
      let imageData;
      setIsProcessing(true);
      const processedImage = await processImage(
        resultData.result,
        IMAGE_URLS.ROG_GAMER_VISA +
          "team/card2/" +
          resultData.currentTeamName +
          ".png",
        661,
        1029,
        resultData.title_en,
        "ROGFonts",
        "20",
        card.fontcolor,
        0,
        { x: 46, y: 1004 },
        getUsernameFromCookie() as string,
        "ROGFonts",
        "20",
        card.fontcolor,
        90,
        { x: 35, y: 170 },
        " NO." + cardNumber,
        "20",
        card.fontcolor,
        90,
        { x: 35, y: 536 }
      );

      const response = await fetch(processedImage as string);
      imageData = await response.blob();

      // 创建一个 URL 对象
      const imageUrl = URL.createObjectURL(imageData);

      // 上傳到R2 然後 產生QRCODE
      const cardfile = await base64toFileList(processedImage as string);
      const cardImageUrl = await uploadImageToR2(
        cardfile[0],
        "NO_" +
          cardNumber +
          "_" +
          gamerNeme +
          "_" +
          resultData.currentTeamName +
          "_card"
      );
      setCard3Url(cardImageUrl);
      setIsProcessing(false);

      // 生成包含处理后的图片数据的URL
      const generatedURL = `${window.location.origin}/qr?a=${cardImageUrl}`;
      setQrUrl(generatedURL);
      console.log("Generated URL:", generatedURL);

      // 创建一个可下载的链接
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download =
        "NO_" +
        cardNumber +
        "_" +
        gamerNeme +
        "_" +
        resultData.currentTeamName +
        "_card.jpg"; // 设置下载文件的名称

      // 模拟点击下载链接
      a.click();

      // 释放 URL 对象
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error("Error while handling download:", error);
    }
  };
  // handleDownloadCardforMb
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const handleDownloadCardforMb = async () => {
    console.log("DL CARD");

    const cardNumber = await getNextCardNumber();
    let card = (await getTitleCardType(resultData.currentTeamName)) as CardData;
    try {
      // 处理图片
      let gamerNeme = getUsernameFromCookie();
      setIsProcessing(true);
      const processedImage = await processImage(
        resultData.result,
        IMAGE_URLS.ROG_GAMER_VISA +
          "team/card2/" +
          resultData.currentTeamName +
          ".png",
        661,
        1029,
        resultData.title_en,
        "ROGFonts",
        "20",
        card.fontcolor,
        0,
        { x: 46, y: 1004 },
        getUsernameFromCookie() as string,
        "ROGFonts",
        "20",
        card.fontcolor,
        90,
        { x: 35, y: 170 },
        " NO." + cardNumber,
        "20",
        card.fontcolor,
        90,
        { x: 35, y: 536 }
      );

      // 上傳到R2 然後 產生QRCODE
      const cardfile = await base64toFileList(processedImage as string);
      const cardImageUrl = await uploadImageToR2(
        cardfile[0],
        "NO_" +
          cardNumber +
          "_" +
          gamerNeme +
          "_" +
          resultData.currentTeamName +
          "_card"
      );
      setCard3Url(cardImageUrl);
      setIsProcessing(false);

      //open cardImageUrl image modal
      setIsModalOpen(true);
      setModalImageUrl(cardImageUrl);
    } catch (error) {
      console.error("Error while handling download:", error);
    }
  };

  const ImageModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white/50 p-2 rounded-lg max-w-[90vw] max-h-[90vh]">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-white-500  text-2xl"
          >
            ✕
          </button>
          <img
            src={modalImageUrl}
            alt="Downloaded Card"
            className="w-full h-auto"
          />
        </div>
      </div>
    );
  };

  //處理圖片並產生網址給qrcode
  // const processAndGenerateURL = async (
  //   imageUrl: string,
  //   currentTeamName: string
  // ) => {
  //   try {
  //     //wallpapaer
  //     // const processedWallpaper = await processImageToWallpaper(
  //     //   imageUrl,
  //     //   "https://r2.web.moonshine.tw/msweb/roggamercard/templates/logos/wallpaperlogo1000_2.png",
  //     //   randomSelect === "2"
  //     //     ? r2imagesurl + "/images/final_sm_win_icon.png"
  //     //     : null
  //     // );
  //     // const wallpaperfile = await base64toFileList(
  //     //   processedWallpaper as string
  //     // );
  //     // const wallpaperImageUrl = await uploadImageToR2(
  //     //   wallpaperfile[0],
  //     //   "wallpaper_"
  //     // );
  //     // setWallpaperdUrl(wallpaperImageUrl);

  //     let card = (await getTitleCardType(currentTeamName)) as CardData;

  //     //card1
  //     // const processedCard1 = await processImage(
  //     //   imageUrl,
  //     //   r2url + "templates/border/card1/" + card.cardtype + ".png",
  //     //   1200,
  //     //   1500,
  //     //   getUsernameFromCookie() as string,
  //     //   "RobotoCon",
  //     //   "30",
  //     //   card.fontcolor,
  //     //   90,
  //     //   { x: 120, y: 610 },
  //     //   mbtiName,
  //     //   "ROGFonts",
  //     //   "75",
  //     //   card.fontcolor,
  //     //   90,
  //     //   { x: 95, y: 412 }
  //     // );
  //     // const card1file = await base64toFileList(processedCard1 as string);
  //     // const card1ImageUrl = await uploadImageToR2(card1file[0], "card_");
  //     // setCard1Url(card1ImageUrl);
  //     //card2
  //     // const processedCard2 = await processImage(
  //     //   imageUrl,
  //     //   randomSelect === "2"
  //     //     ? r2url + "templates/border/card2/gold.png"
  //     //     : r2url + "templates/border/card2/" + card.cardtype + ".png",
  //     //   1200,
  //     //   1200,
  //     //   getUsernameFromCookie() as string,
  //     //   "RobotoCon",
  //     //   "30",
  //     //   card.fontcolor,
  //     //   90,
  //     //   { x: 120, y: 500 },
  //     //   mbtiName,
  //     //   "ROGFonts",
  //     //   "55",
  //     //   card.fontcolor,
  //     //   90,
  //     //   { x: 100, y: 333 }
  //     // );
  //     // const card2file = await base64toFileList(processedCard2 as string);
  //     // const card2ImageUrl = await uploadImageToR2(card2file[0], "card2_");
  //     // setCard2Url(card2ImageUrl);

  //     //card3
  //     const processedCard3 = await processImage(
  //       imageUrl,
  //       IMAGE_URLS.ROG_GAMER_VISA +
  //         "team/card/" +
  //         resultData.currentTeamName +
  //         ".png",
  //       661,
  //       1047,
  //       resultData.title_en,
  //       "ROGFonts",
  //       "20",
  //       card.fontcolor,
  //       0,
  //       { x: 46, y: 1033 },
  //       (getUsernameFromCookie() as string) + " NO." + "00999",
  //       "ROGFonts",
  //       "20",
  //       card.fontcolor,
  //       90,
  //       { x: 35, y: 270 }
  //     );
  //     const card3file = await base64toFileList(processedCard3 as string);
  //     const card3ImageUrl = await uploadImageToR2(card3file[0], "card3_");
  //     // setPrintCardUrl(card3ImageUrl)
  //     setCard3Url(card3ImageUrl);

  //     setIsProcessed(true);
  //     // 生成包含处理后的图片数据的URL
  //     const generatedURL = `${window.location.origin}/qr?a=${card3ImageUrl}`;
  //     setQrUrl(generatedURL);
  //     console.log("Generated URL:", generatedURL);

  //     return generatedURL;
  //   } catch (error) {
  //     console.error("Error processing image and generating URL:", error);
  //     return null;
  //   }
  // };
  //base64轉jpg
  function base64toFileList(base64String: string) {
    const byteCharacters = atob(base64String.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const file = new File(byteArrays, "image.jpeg", { type: "image/jpeg" });

    return [file];
  }

  //上傳圖片到ROGR2
  const uploadImageToR2 = async (imgfile: File, prefix: string) => {
    const apiUrl = "https://roggamervisa-api.moonshine-studio.net/upload";
    const formData = new FormData();
    formData.append("source_image", imgfile);
    formData.append("prefix", prefix);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `${import.meta.env.VITE_APITOKEN}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        return data.uri; // 返回图像的实体网址
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // const handleImageUpload = async (base64string: string) => {
  //   const base64Image = base64string; // 替换为你的base64图像
  //   // const imageUrl = await uploadImageToR2(base64Image);
  //   // console.log('Uploaded image URL:', imageUrl);
  // };

  const handleShare = async () => {
    try {
      if (!card3Url) {
        throw new Error("Image URL is missing");
      }

      // 获取图片数据
      const response = await fetch(card3Url);
      if (!response.ok) {
        toast.error("Failed to fetch image");
      }

      const blob = await response.blob();

      // 檢查圖片大小 (10MB 限制)
      if (blob.size > 10 * 1024 * 1024) {
        // 10MB
        toast.error("Image size exceeds 10MB limit");
      }

      // 创建分享数据
      const shareData = {
        files: [
          new File([blob], "image.jpg", {
            type: blob.type,
          }),
        ],
        title: "Share Image",
        text: "Check out this image!",
      };

      // 檢查是否為 Android 裝置

      // 執行分享
      if (navigator.share) {
        await navigator.share(shareData);
        toast("Image shared successfully");
      } else {
        toast.error("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
      // 這裡可以觸發錯誤處理的 UI 更新
    }
  };

  //暫時無用
  const handleShareIg = async () => {
    try {
      // 获取图片数据
      const response = await fetch(card3Url);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob(); // 将响应数据转换为 Blob

      // 创建分享数据
      const shareData = {
        files: [
          new File([blob], "image.jpg", {
            type: blob.type,
          }),
        ],
        title: "Share Image",
        text: "Check out this image!",
      };

      // 执行分享
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Image shared successfully");
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };
  const handleShareFb = () => {
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      resultData.result
    )}`;
    window.open(facebookShareURL, "_blank");
  };
  const handleShareX = async () => {
    try {
      // 获取图片数据
      const response = await fetch(card3Url);
      if (!response.ok) {
        toast.error("Failed to fetch image");
      }
      const blob = await response.blob(); // 将响应数据转换为 Blob

      // 创建分享数据
      const shareData = {
        files: [
          new File([blob], "image.jpg", {
            type: blob.type,
          }),
        ],
        title: "Share Image",
        text: "Check out this image!",
      };

      // 执行分享
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Image shared successfully");
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    const waitForCssLoad = setTimeout(() => {
      setIsMobile(window.innerWidth < 768);
    }, 100); // 100ms 等待时间

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(waitForCssLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const localData = getLocalStorage("currentValue");
    // const userDataFromCookie = JSON.parse(localData as string);
    setResultData(localData);

    // const homeCheckData = getCookie("homeCheck");

    // const homeCheckDataFromCookie = JSON.parse(homeCheckData as string);
    // setHomeCheckData(homeCheckDataFromCookie);
    setMbtiData(getDescriptionByMbti(localData.mbti) as Record<string, any>);
    // console.log(getDescriptionByMbti(userDataFromCookie.mbti))
    // if (!isProcessed) {
    // processAndGenerateURL(localData.result, localData.currentTeamName);
    // }
  }, [resultData.currentTeamName]);

  // const areAllUrlsFilled = () => {
  //   return (
  //     card3Url.length > 0
  //   );
  // };
  // const post_swapdata = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("username", getUsernameFromCookie() as string);
  //     formData.append("result_image_url", resultData.result);
  //     formData.append("swap_image_url", resultData.template);
  //     formData.append("wallpaper_image_url", wallpaperdUrl);
  //     formData.append("card1_image_url", card1Url);
  //     formData.append("card2_image_url", card2Url);
  //     formData.append("card3_image_url", card3Url);
  //     var myHeaders = new Headers();
  //     myHeaders.append("Authorization", import.meta.env.VITE_APITOKEN);
  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: formData,
  //       redirect: "follow",
  //     };
  //     const response = await fetch(
  //       "https://roggamervisa-api.moonshine-studio.net/swap_data",
  //       requestOptions as RequestInit
  //     );
  //     if (!response.ok) {
  //       console.log("Send Fail, Please Try again.");
  //       return;
  //     }
  //     // const responseData = await response.json();
  //     // console.log(response.status)
  //     return response.status;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect 监听三个 URL 状态的变化
  useEffect(() => {
    // 检查是否所有的 URL 都已经有值
    // if (homeCheckData.agreeCookie && areAllUrlsFilled()) {
    //   // 执行上传操作
    //   // post_swapdata();
    // } else {
    //   // console.log(homeCheckData.agreeCookie);
    //   // console.log("no set Cookie");
    // }
  }, [card3Url]); // 在这里定义 useEffect 的依赖项

  if (!resultData) {
    navigate("/");
  }
  return (
    <div className=" relative h-[100dvh] text-white ">
      {isMobile ? (
        <div className="w-full h-[100dvh] ">
          <ImageModal />
          {resultData && resultData.randomSelect === "2" && (
            <motion.div
              initial={{ opacity: 0, scale: 1.2, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2, y: -30 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 1.3,
              }}
              className="h-[100dvh] bg-cover bg-bottom bg-no-repeat z-10 fixed  top-0 left-0 w-full animate-pulse animate-infinite animate-alternate pointer-events-none"
              style={{
                backgroundImage: `url('${
                  r2imagesurl + "/images/mb/final_win_topmask.png"
                }')`,
                overscrollBehavior: "none",
              }}
            >
              <div className=" fixed bottom-0 w-full transition-all ">
                <img
                  src={r2imagesurl + "/images/mb/final_win_bottommask.png"}
                  alt=""
                />
              </div>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: "0%", scale: 1.15 }}
            animate={{ opacity: 1, y: "0%", scale: 1.15 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-[100dvh] transition-all w-full bg-cover bg-center bg-no-repeat z-0 fixed top-0 left-0 pointer-events-none"
            style={{
              backgroundImage: `${
                resultData
                  ? `url('${resultData.result}')`
                  : `url('${r2imagesurl + "/images/final_character.png"}')`
              }`,
              touchAction: "none",
            }}
          ></motion.div>
          <div
            className=" fixed top-0 left-0 w-full h-[100dvh] bg-bottom bg-cover bg-no-repeat pointer-events-none  bg-gradient-to-t from-black via-black/75 to-black/0  "
            // style={{
            //   backgroundImage: `url('${r2imagesurl+'/images/mb/final_mask2.png'}')`,
            // }}
          ></div>
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
            className=" fixed bottom-0 left-0 w-full h-1/2  bg-bottom bg-cover bg-no-repeat opacity-90 pointer-events-none"
            style={{
              backgroundImage: `url('${
                r2imagesurl + "/images/mb/final_mask_red.png"
              }')`,
            }}
          ></motion.div>

          <div className="w-full h-[100dvh] fixed bottom-0 left-0 flex flex-col overflow-hidden   ">
            <div className="h-[45dvh] w-full bg-fuchsia-500/0 mt-auto flex flex-col  ">
              <div
                className={`flex justify-between items-center w-[80%] mx-auto ${
                  resultData.randomSelect === "2"
                    ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                    : "opacity-80 brightness-100"
                }`}
              >
                {mb_menu.map((item, index) => {
                  if (
                    !(resultData.randomSelect !== "2" && item.title === "star")
                  ) {
                    return (
                      <div
                        key={"mb_menu_" + index}
                        onClick={() => setCurrentMenu(item.title)}
                        className=" bg-purple-400/0 relative"
                      >
                        <img
                          src={
                            r2gifurl + "/images/mb/final_" + item.title + ".svg"
                          }
                          alt=""
                        />
                        {item.title === currentMenu && (
                          <motion.div
                            initial={{ opacity: 0, x: "-50%", y: 10 }}
                            animate={{ opacity: 1, x: "-50%", y: 0 }}
                            exit={{ opacity: 0, x: "-50%", y: 10 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 20,
                            }}
                            className=" absolute w-[100%] left-1/2 bg-amber-400/0 flex items-center justify-center"
                          >
                            <img
                              src={r2gifurl + "/images/mb/final_selected.svg"}
                              alt=""
                            />
                          </motion.div>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
              <AnimatePresence initial={true} mode="wait">
                {currentMenu === "image" && (
                  <motion.div
                    key="p_inmage"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 pl-[10%] pr-[4%] mt-[5%] "
                  >
                    <div
                      className={`w-[4vw] fixed right-[6%] bottom-[2%]   z-[99999] pointer-events-none transition-all ${
                        isAtBottom ? "opacity-0" : " opacity-100"
                      } `}
                    >
                      <img
                        src={r2gifurl + "/images/mb/scroll_icon.svg"}
                        alt=""
                        className=" animate-pulse"
                      />
                    </div>
                    <div
                      ref={divRef}
                      className={`${scrollbarStyle} relative overflow-y-auto bg-slate-500/0 pr-[5%] max-h-[50dvh] pb-[10%]  ${
                        resultData.randomSelect === "2"
                          ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                          : "opacity-80 brightness-100"
                      }`}
                      style={{
                        overscrollBehaviorY: "contain",
                      }}
                    >
                      <div
                        className={`flex items-center justify-start gap-3 mt-[10%] mb-[5%]  `}
                      >
                        <div className="w-[10%]">
                          <img
                            src={
                              r2imagesurl + "/mbti/sm_icon/" + "INTJ" + ".png"
                            }
                            className=""
                            alt=""
                          />
                        </div>

                        <div className="font-cachetpro text-[5vw] align-middle bg-slate-500/0 pt-[3%] leading-tight flex flex-col   ">
                          <span className="text-white">
                            {resultData.title_ch}
                          </span>
                          <span className="text-white">
                            {resultData.title_en}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className=" font-cachetpro text-[5vw] font-semibold  ">
                          Gamer name:
                        </div>
                        <div className=" font-robotocon font-semibold  text-[5vw] leading-relaxed ">
                          {getUsernameFromCookie()}
                        </div>
                      </div>
                      <div className=" text-[4vw] mt-[5%]  text-white/80 font-light  overflow-hidden overflow-y-auto font-robotocon ">
                        <img
                          src={
                            IMAGE_URLS.ROG_GAMER_VISA +
                            "team/logo/" +
                            resultData.currentLogo +
                            "_word.svg"
                          }
                          alt=""
                          className="h-[23dvh]  mx-auto"
                        />
                      </div>
                      <div className="mt-[10%]">
                        <div className="font-cachetpro text-[5vw] leading-[1.8vw]  ">
                          Recommended Product:
                        </div>
                      </div>
                      <div className="mt-[10%] font-light flex flex-col gap-8 pb-[25%]">
                        {mbtiData &&
                          mbtiData.products &&
                          mbtiData.products.map((items: any, index: any) => {
                            return (
                              <div
                                key={"products_" + index}
                                className="flex items-center justify-start gap-4"
                              >
                                <div className="w-[40px] bg-sky-400/0  aspect-[1/1] ">
                                  <img
                                    src={
                                      r2url +
                                      "templates/product_icon/" +
                                      items.type +
                                      ".svg"
                                    }
                                    alt="icon"
                                    className="w-full aspect-[1/1]  object-contain "
                                  />
                                </div>

                                <a
                                  href={items.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className=" font-cachetpro text-[4vw] underline whitespace-nowrap"
                                  onClick={() => {}}
                                >
                                  {items.name}
                                </a>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "download" && (
                  <motion.div
                    key="p_download"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 px-[10%]  flex items-center h-full"
                  >
                    <div
                      className={` flex flex-col justify-center items-center gap-10 bg-orange-400/0 w-full `}
                    >
                      <button
                        className={
                          "hover:scale-95 cursor-pointer flex items-center justify-start gap-2  "
                        }
                        onClick={() => {
                          handleDownloadCardforMb();
                        }}
                      >
                        <div className="w-auto ">
                          {isProcessing ? (
                            <div className="w-full aspect-square flex justify-center items-center">
                              <div className="inline-block w-[8vw] aspect-square animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                            </div>
                          ) : (
                            <div className="   ">
                              <img
                                className="  -top-1 left-0"
                                src={r2imagesurl + "/images/final_dl_icon.png"}
                                alt=""
                              />
                            </div>
                          )}
                        </div>

                        <div
                          className={`  font-cachetpro bg-sky-400/0 text-[5vw] flex flex-col justify-start items-start  `}
                        >
                          <div className="underline">
                            Download Qiddiya City VISA
                          </div>
                          {isProcessing && (
                            <div className="text-sm text-white/30">
                              Waiting for download..
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "share" && (
                  <motion.div
                    key="p_share"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 px-[10%]  flex items-center h-full"
                  >
                    <div
                      className={` flex flex-col justify-center items-center   w-full ${
                        resultData.randomSelect === "2"
                          ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100 "
                          : "opacity-80 brightness-100 "
                      } `}
                    >
                      <div className="flex gap-[16%] mt-[4%] w-full justify-center ">
                        {/* <div className=' flex items-center w-[12%] aspect-square' onClick={handleShare}><img src={r2imagesurl+'/images/ig.svg'} alt="" className='w-full ' /></div> */}
                        {!card3Url && card3Url.length === 0 && (
                          <div className=" flex items-center font-cachetpro">
                            The Share function will be available after you
                            download your Gamer Card.
                          </div>
                        )}
                        {card3Url && card3Url.length > 0 && (
                          <div
                            className=" flex items-center w-[10%] aspect-square"
                            onClick={handleShareX}
                          >
                            <img
                              src={r2gifurl + "/images/twitter.svg"}
                              alt=""
                              className="w-full"
                            />
                          </div>
                        )}
                        {card3Url && card3Url.length > 0 && (
                          <div
                            className=" flex items-center w-[6%] aspect-square"
                            onClick={handleShare}
                          >
                            <img
                              src={r2gifurl + "/images/fb.svg"}
                              alt=""
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "star" && (
                  <motion.div
                    key="p_star"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0,y:10}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 px-[0%]   flex items-end h-auto mt-auto "
                  >
                    <div className="   bg-orange-400/0 w-full relative   ">
                      {resultData.randomSelect === "2" ? (
                        <div className=" absolute z-20  top-0 scale-[120%] pointer-events-none">
                          <img
                            src={
                              r2imagesurl +
                              "/images/mb/final_redeem_banner2x.png"
                            }
                            alt=""
                            className="z-0 w-full mx-auto "
                          />
                        </div>
                      ) : (
                        <div className=" absolute z-20  top-0 scale-[120%] pointer-events-none">
                          <img
                            src={
                              r2imagesurl +
                              "/images/mb/final_raffle_banner2x.png"
                            }
                            alt=""
                            className="z-0 w-full mx-auto "
                          />
                        </div>
                      )}

                      <img
                        src={r2imagesurl + "/images/mb/star_fire.png"}
                        alt=""
                        className="z-0 w-10/12 mx-auto brightness-[.6] "
                      />

                      <div className="w-full bg-blue-400/0 pt-[7%] h-[15dvh] fixed bottom-0 z-20  ">
                        <div className=" flex justify-center h-full bg-violet-600/0 relative">
                          <motion.div
                            initial={{ opacity: 0, x: 0, y: "50%" }}
                            animate={{ opacity: 1, x: "0%", y: "0%" }}
                            // exit={{ opacity: 0, x: 0,y:'50%' }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 20,
                              delay: 0.3,
                            }}
                            className=" top-1/2 left-0 z-40 h-10 flex items-center bg-slate-700/0"
                          >
                            <button
                              // onClick={openFormModal}
                              className="h-full  w-[100%] aspect-[90/40]  bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold"
                              style={{
                                backgroundImage: `url('${
                                  r2imagesurl + "/images/redbutton_bg.png"
                                }')`,
                              }}
                            >
                              Go
                            </button>
                          </motion.div>
                          <div className="h-[4vh] w-[1px] bg-white/70 absolute bottom-0 left-1/2 -translate-x-1/2 "></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "home" && (
                  <motion.div
                    key="p_home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.3,
                    }}
                    className="w-full  px-[10%]  flex items-center h-full bg-gradient-to-t from-red-800 via-red-800/30"
                  >
                    <div
                      className={`flex flex-col justify-center items-center gap-10 bg-orange-400/0 w-full`}
                    >
                      <div className=" font-cachetpro bg-sky-400/0 text-[5vw] text-center ">
                        ARE YOU SURE YOU WANT TO LEAVE? <br />
                        You will lose all your progress.
                      </div>

                      <div
                        onClick={handleBackHome}
                        className="hover:scale-95 cursor-pointer flex items-end justify-between bg-fuchsia-100/0 pl-[12%] relative"
                      >
                        <img
                          className=" absolute top-1 left-0 w-[15%]"
                          src={r2gifurl + "/images/roglogo_red.svg"}
                          alt=""
                        />
                        <div className=" font-cachetpro bg-sky-400/0 text-[5vw] underline">
                          Back to Home Page
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className=" absolute w-full h-screen  z-50 flex justify-center items-center  ">
            <div className=" relative bg-slate-400/0 w-[80vw] h-[80vh] flex items-center justify-between gap-2  ">
              <div className=" absolute top-1/2 -translate-y-1/2 left-0 h-full w-[1px] bg-white/20"></div>
              <div className=" absolute top-1/2 -translate-y-1/2 right-0 h-full w-[1px] bg-white/20"></div>
              <motion.div
                className={` h-full  w-[70%] bg-purple-500/0 relative pl-10 flex flex-col  ${"pt-[3%] "}`}
              >
                <div className=" absolute top-1/2 -translate-y-1/2 left-0 h-full w-[1px] bg-white/20 hidden"></div>

                <motion.div
                  initial={{ opacity: 0, y: "10%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "10%" }}
                  transition={{
                    type: "spring",
                    stiffness: 130,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="pr-[73%] mb-[%]  "
                >
                  <div
                    className={
                      resultData.randomSelect === "2"
                        ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100 "
                        : "opacity-80 brightness-100 "
                    }
                  >
                    {resultData.randomSelect === "2" && (
                      <div className="w-[64%] mb-4">
                        <img
                          src={r2imagesurl + "/images/final_sm_win_icon.png"}
                          className="w-full"
                          alt=""
                        />
                      </div>
                    )}
                    <div className="w-[]">
                      <div className=" font-cachetpro text-[2.8vmin] font-semibold pt-[4%] leading-3 ">
                        Gamer name:
                      </div>
                    </div>

                    <div className="mt-[8%] font-robotocon font-semibold text-[2.2vmin]">
                      {getUsernameFromCookie()}
                    </div>
                  </div>
                  <div
                    className={`w-full h-auto  mt-[10%] overflow-hidden relative flex flex-col justify-start  bg-slate-400/0    ${
                      resultData.randomSelect === "2"
                        ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                        : "opacity-80 brightness-100 "
                    }`}
                  >
                    <div
                      className={`flex items-center justify-start gap-3 mt-[10%] opacity-90 `}
                    >
                      <div className="w-[15%]">
                        <img
                          src={r2imagesurl + "/mbti/sm_icon/" + "INTJ" + ".png"}
                          className=""
                          alt=""
                        />
                      </div>

                      <div className="font-cachetpro text-[1.4vw] align-middle bg-slate-500/0 pt-[3%] leading-tight flex flex-col   ">
                        <span className="text-white">
                          {resultData.title_ch}
                        </span>
                        <span className="text-white">
                          {resultData.title_en}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`  overflow-y-auto pr-4  text-[1.5vmin] mt-[6%] leading-4 xl:leading-normal  text-white/80 font-light  overflow-hidden  font-robotocon `}
                    >
                      <img
                        src={
                          IMAGE_URLS.ROG_GAMER_VISA +
                          "team/logo/" +
                          resultData.currentLogo +
                          "_word.svg"
                        }
                        alt=""
                        className="w-[70%]"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: "10%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "10%" }}
                  transition={{
                    type: "spring",
                    stiffness: 130,
                    damping: 20,
                    delay: 1,
                  }}
                  className={`mt-auto ${
                    resultData.randomSelect === "2"
                      ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                      : "opacity-80 brightness-100"
                  }`}
                >
                  <div className="w-[20%]">
                    <div className="font-cachetpro text-[2.8vmin] leading-[2.8vmin]  ">
                      Recommended Product:
                    </div>
                  </div>

                  <div className="mt-[2%] font-light flex  gap-3 w-full  ">
                    {mbtiData &&
                      mbtiData.products &&
                      mbtiData.products.map((items: any, index: any) => {
                        return (
                          <div
                            key={"products_" + index}
                            className={`flex items-center justify-start relative  ${
                              mbtiData.products.length >= 4
                                ? " flex-1  gap-2"
                                : "flex-auto  gap-4 "
                            }  `}
                          >
                            <div className="w-[0.5vw]">
                              <img
                                src={
                                  r2gifurl + "/images/final_recom_prod_red.svg"
                                }
                                alt=""
                                className="w-full"
                              />
                            </div>

                            <div
                              className={` ${
                                mbtiData.products.length >= 4
                                  ? " w-[3vw] h-[3vh]"
                                  : "w-[4vw] h-[4vh] "
                              }  min-w-[30px]`}
                            >
                              <img
                                src={
                                  r2url +
                                  "templates/product_icon/" +
                                  items.type +
                                  ".svg"
                                }
                                alt="icon"
                                className="w-full object-contain h-full"
                              />
                            </div>

                            <a
                              href={items.link}
                              target="_blank"
                              rel="noreferrer"
                              className=" font-cachetpro text-[1vw] underline whitespace-nowrap"
                              onClick={() => {}}
                            >
                              {items.name}
                            </a>
                          </div>
                        );
                      })}
                    {mbtiData &&
                      mbtiData.products &&
                      mbtiData.products.length === 2 && (
                        <>
                          <div className="flex-1"></div>
                          <div className="flex-1"></div>
                        </>
                      )}
                    {mbtiData &&
                      mbtiData.products &&
                      mbtiData.products.length === 3 && (
                        <>
                          <div className="flex-1"></div>
                        </>
                      )}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 130,
                  damping: 20,
                  delay: 0.5,
                }}
                className="bg-blue-500/0 w-[30%]  flex flex-col items-end justify-between h-full pt-[5%] pr-[2%]"
              >
                <motion.div
                  className={`w-full space-y-[8%] flex flex-col  justify-end items-end ${
                    resultData.randomSelect === "2"
                      ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                      : "opacity-80 brightness-100 "
                  }`}
                >
                  {resultData.randomSelect === "2" && (
                    <div
                      className="hover:scale-95 cursor-pointer flex items-end  w-[76%] bg-fuchsia-100/0 pl-[12%] relative "
                      // onClick={openFormModal}
                    >
                      <div className=" absolute -top-1 -left-[1px] w-[12%]">
                        <img
                          className="w-full"
                          src={
                            resultData.randomSelect === "2"
                              ? r2gifurl + "/images/final_raffle_gold_icon.svg"
                              : r2gifurl + "/images/final_raffle_icon.svg"
                          }
                          alt=""
                        />
                      </div>

                      <div
                        className=" font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]"
                        style={{
                          backgroundImage: `url('${
                            r2imagesurl + "/images/final_text_ui.png"
                          }')`,
                        }}
                      >
                        {resultData.randomSelect === "2"
                          ? "Redeem the Prize"
                          : "Enter the Raffle"}
                      </div>
                    </div>
                  )}

                  <div
                    className={` flex items-end justify-between w-[90%] pl-[12%] relative transition-all duration-500  ${"hover:scale-95 cursor-pointer  "}`}
                  >
                    <div className=" absolute -top-1 left-0 w-[11%]  ">
                      <img
                        className=" w-full"
                        src={
                          resultData.randomSelect === "2"
                            ? r2gifurl + "/images/final_dl_gold_icon.svg"
                            : r2gifurl + "/images/final_dl_icon.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div
                      className={` font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]`}
                      style={{
                        backgroundImage: `url('${
                          r2imagesurl + "/images/final_text_ui.png"
                        }')`,
                      }}
                      onClick={() => {
                        handleDownloadCard();
                      }}
                    >
                      Download Qiddiya City VISA
                    </div>
                  </div>

                  <div
                    onClick={handleBackHome}
                    className="hover:scale-95 cursor-pointer flex items-end justify-between w-[90%] bg-fuchsia-100/0 pl-[12%] relative"
                  >
                    <div className=" absolute top-1 left-0 w-[11%]">
                      <img
                        className=" w-full "
                        src={
                          resultData.randomSelect === "2"
                            ? r2gifurl + "/images/roglogo_gold.svg"
                            : r2gifurl + "/images/roglogo_red.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div
                      className=" font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]"
                      style={{
                        backgroundImage: `url('${
                          r2imagesurl + "/images/final_text_ui.png"
                        }')`,
                      }}
                    >
                      Back to Homepage
                    </div>
                  </div>
                </motion.div>

                <div className="mt-[2%] text-right  ml-auto relative pr-[8%] border-r border-white/50 w-[50%]  ">
                  <div className=" relative  p-4 bg-[#D9D9D950] rounded-md ">
                    <div className="  ">
                      {/* if qrUrl.length< 0 顯示 "waiting for processing" , if isProcessing 顯示 spinner if qrUrl.length > 0 顯示QRCODE */}
                      {isProcessing ? (
                        <div className="w-full aspect-square flex justify-center items-center">
                          <div className="inline-block w-[1.4vw] aspect-square animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                        </div>
                      ) : qrUrl && qrUrl.length > 0 ? (
                        <div className="w-full aspect-square flex justify-center items-center">
                          <QRCodeSVG
                            value={qrUrl}
                            size={100}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={true}
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-square flex justify-center items-end font-cachetpro">
                          <div className="text-[1vw] text-white/50 mx-auto">
                            Generate QR code after downloading.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`mt-[2%] w-1/2 hidden ${
                    resultData.randomSelect === "2"
                      ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                      : "opacity-80 brightness-100 "
                  } `}
                >
                  <div className="w-full">
                    <div className="font-cachetpro text-[1.6vw] leading-[1.8vw]">
                      Share:
                    </div>
                  </div>

                  <div className="flex gap-[16%] mt-[7%] w-full ">
                    <div
                      className=" flex items-center w-[18%] aspect-square"
                      onClick={handleShareIg}
                    >
                      <img
                        src={r2gifurl + "/images/ig.svg"}
                        alt=""
                        className="w-full "
                      />
                    </div>
                    <div
                      className=" flex items-center w-[16%] aspect-square"
                      onClick={handleShareX}
                    >
                      <img
                        src={r2gifurl + "/images/twitter.svg"}
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div
                      className=" flex items-center w-[9%] aspect-square"
                      onClick={handleShareFb}
                    >
                      <img
                        src={r2gifurl + "/images/fb.svg"}
                        alt=""
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          {resultData && resultData.randomSelect === "2" && (
            <motion.div
              initial={{ opacity: 0, scale: 1.2, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2, y: -30 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 1.3,
              }}
              className="h-screen bg-cover bg-bottom bg-no-repeat z-20 mix-blend- absolute top-0 left-0 w-full animate-pulse animate-infinite animate-alternate"
              style={{
                backgroundImage: `url('${
                  r2imagesurl + "/images/final_mask_win.png"
                }')`,
              }}
            ></motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-screen bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `${
                resultData
                  ? `url('${resultData.result}')`
                  : `url('${r2imagesurl + "/images/final_character.png"}')`
              }`,
            }}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-screen bg-cover bg-center bg-no-repeat z-10 mix-blend-multiply absolute top-0 left-0 w-full"
            style={{
              backgroundImage: `url('${
                r2imagesurl + "/images/final_mask.png"
              }')`,
            }}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className=" absolute    top-1/2 -translate-y-1/2 left-0 z-50 h-8 flex items-center hidden"
          >
            <div className="h-[1px] w-[120px] bg-white/70 mr-2"></div>
            <button
              onClick={handlePrev}
              className="px-2 h-full bg-contain bg-left-top bg-no-repeat flex items-center justify-center w-[70px] hover:scale-95 font-cachet font-bold"
              style={{
                backgroundImage: `url('${
                  r2imagesurl + "/images/redbutton_bg.png"
                }')`,
              }}
            >
              Back
            </button>
          </motion.div>
        </>
      )}

      <span style={{ fontFamily: "ROGFonts" }} className=" fixed">
        &nbsp;
      </span>
      <span style={{ fontFamily: "RobotoConBold" }} className=" fixed">
        &nbsp;
      </span>
    </div>
  );
};

export default Final;
