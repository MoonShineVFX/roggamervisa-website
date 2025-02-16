export const setUsernameToCookie = (username: string) => {
  // 設定 cookie 的過期時間（此例為一天）
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);

  // 將 username 存入 cookie
  document.cookie = `username=${username}; expires=${expirationDate.toUTCString()}; path=/`;
};
export const getUsernameFromCookie = () => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "username") {
      return value;
    }
  }
  return null;
};

export const setCookie = (name: string, value: string, days: number) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  // 將 cookie 存入瀏覽器
  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
};

/***
 *
 * setCookie('username', 'user123', 1); // 設置名稱為 'username' 的 cookie，過期時間為一天
 * setCookie('custom_cookie', 'value123', 7); // 設置自定義名稱的 cookie，過期時間為七天
 */

export const getCookie = (name: string) => {
  // 從 document.cookie 中獲取所有 cookie
  const cookies = document.cookie.split(";");

  // 遍歷所有 cookie，尋找與指定名稱匹配的 cookie
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName.trim() === name) {
      // 如果找到與指定名稱匹配的 cookie，則返回其值
      return decodeURIComponent(cookieValue);
    }
  }

  // 如果沒有找到與指定名稱匹配的 cookie，則返回 null
  return null;
};

export const updateCookie = (name: string, newValue: any) => {
  const cookieValue = getCookie(name);
  console.log(newValue);
  if (cookieValue) {
    try {
      // 解析現有的 cookie 值
      const data = JSON.parse(cookieValue);

      // 使用展開運算符合併數據，保留原有數據
      const updatedData = {
        ...data, // 保留原有數據
        ...newValue, // 添加新數據
      };

      // 重新設置 cookie
      setCookie(name, JSON.stringify(updatedData), 1);

      // 添加日誌來追蹤
      console.log("Updated cookie data:", updatedData);
      console.log(JSON.stringify(updatedData));
    } catch (error) {
      console.error("Cookie update error:", error);
    }
  } else {
    // 如果 cookie 不存在，直接設置新值
    setCookie(name, JSON.stringify(newValue), 1);
  }
};

export const setLocalStorage = (name: string, value: any) => {
  try {
    // 確保值被正確地轉換為 JSON 字符串
    const jsonValue = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(name, jsonValue);
  } catch (error) {
    console.error("LocalStorage write error:", error);
  }
};

export const getLocalStorage = (name: string) => {
  try {
    const value = localStorage.getItem(name);
    // 確保只解析 JSON 字符串
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("LocalStorage read error:", error);
    return null;
  }
};

export const updateLocalStorage = (name: string, newValue: any) => {
  try {
    const currentValue = getLocalStorage(name);

    if (currentValue) {
      // 合併現有數據和新數據
      const updatedData = {
        ...currentValue, // 保留原有數據
        ...newValue, // 添加新數據
      };

      // 儲存更新後的數據
      localStorage.setItem(name, JSON.stringify(updatedData));

      // 添加日誌來追蹤
      console.log("Updated localStorage data:", updatedData);
      console.log(JSON.stringify(updatedData));
    } else {
      // 如果不存在，直接設置新值
      localStorage.setItem(name, JSON.stringify(newValue));
    }
  } catch (error) {
    console.error("LocalStorage update error:", error);
  }
};

// 可選：添加一個刪除函數
export const removeLocalStorage = (name: string) => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error("LocalStorage remove error:", error);
  }
};

export const getDescriptionByMbti = (mbtiType: string) => {
  // const recommendedItem = recommended_List.find(item => item.mbti === mbtiType);
  // return recommendedItem ? recommendedItem.description : "No description available";
  return recommended_List.find((item) => item.mbti === mbtiType);
};

export const randomTwo = () => {
  let imgs = ["1", "2"]; // 图片数组
  let probabilities = [0.995, 0.005];
  // let probabilities = [0.001, 0.999];
  let sum = 0;
  let r = Math.random(); // 生成一个[0, 1)之间的随机数

  for (let i = 0; i < probabilities.length; i++) {
    sum += probabilities[i]; // 累加概率值
    if (r <= sum) return imgs[i]; // 当随机数小于等于当前概率和时，返回对应的图片
  }

  return imgs[0]; // 默认返回第一张图片，理论上这行代码不应该被触达
};

export const recommended_List = [
  {
    mbti: "INTJ",
    description:
      "INTJs tend to value creative ingenuity, straightforward rationality, and self-improvement. They are often driven by an intense desire to master any and every topic that piques their interest.<br/><br/> With a penchant for complex problem-solving, they might find their gaming haven in strategy and simulation games, drawn to the mental challenges presented in them.",
    products: [
      {
        type: "xgm",
        name: "ROG XGM",
        link: "https://rog.asus.com/external-graphic-docks/rog-xg-mobile-2023-model/",
      },
      {
        type: "host",
        name: "ROG STRIX GT35",
        link: "https://rog.asus.com/desktops/full-tower/rog-strix-gt35-series/",
      },
      {
        type: "mtb",
        name: "ROG MAXIMUS Z790 DARK HERO",
        link: "https://rog.asus.com/motherboards/rog-maximus/rog-maximus-z790-dark-hero/",
      },
      {
        type: "nuc",
        name: "ROG NUC 14 Enthusiast ",
        link: "https://rog.asus.com/desktops/mini-pc/rog-nuc/",
      },
    ],
  },
  {
    mbti: "INTP",
    description:
      "INTPs thrive in the boundless realms of curiosity and abstraction. With a mind that dances through possibilities, they find solace in exploration and creativity, making Open-world RPGs their digital playgrounds.<br/><br/>These games resonate with the INTP's desire for limitless exploration and the freedom to construct intricate worlds.",
    products: [
      {
        type: "ltp",
        name: "ROG FLOW X13",
        link: "https://rog.asus.com/laptops/rog-flow/rog-flow-x13-2023-series/",
      },
      {
        type: "clr",
        name: "ROG Strix LC III 360 ARGB",
        link: "https://rog.asus.com/cooling/cpu-liquid-coolers/rog-strix-lc/rog-strix-lc-iii-360-argb/",
      },
    ],
  },
  {
    mbti: "ENTJ",
    description:
      "ENTJs are natural-born leaders driven by ambition and strategic thinking. They excel at orchestrating complex maneuvers and conquering challenges with a calculated approach. That's why MOBA (multiplayer battle arena) games can be their perfect fit, where decisions shape the course of battle.<br/><br/>The actions performed in these virtual battlefields reflect their desire for order and triumph.",
    products: [
      {
        type: "phn",
        name: "ROG PHONE 8",
        link: "https://rog.asus.com/phones/rog-phone-8/",
      },
      {
        type: "mtb",
        name: "ROG MAXIMUS Z790 FORMULA",
        link: "https://rog.asus.com/motherboards/rog-maximus/rog-maximus-z790-formula/",
      },
    ],
  },
  {
    mbti: "ENTP",
    description:
      "ENTPs are fueled by curiosity and wit. With the ability to brainstorm, adapt, and innovate within the fast-paced dynamics, they find their match in Action RPGs.<br/><br/>These games provide a stage where their quick thinking and adaptability shine.",
    products: [
      {
        type: "ltp",
        name: "ROG ZEPHYRUS DUO",
        link: "https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-duo-16-2023-series/",
      },
      {
        type: "mic",
        name: "ROG Carnyx",
        link: "https://rog.asus.com/streaming-kits/rog-carnyx/",
      },
    ],
  },
  {
    mbti: "INFJ",
    description:
      "INFJs navigate the world with empathy and insight, finding solace in narrative-driven and emotionally rich Adventure RPGs.<br/><br/>These games resonate with their profound connection to stories and characters, allowing them to immerse in intricate, emotionally charged worlds.",
    products: [
      {
        type: "rtr",
        name: "ROG Rapture GT-BE98",
        link: "https://rog.asus.com/networking/rog-rapture-gt-be98-model/",
      },
      {
        type: "ctr",
        name: "ROG Raikiri Pro",
        link: "https://rog.asus.com/controllers/rog-raikiri-pro-model/",
      },
    ],
  },
  {
    mbti: "INFP",
    description:
      "INFPs, with a heart full of poetry and imagination, tend to gravitate towards emotionally immersive and artistic experiences.<br/><br/>Open-ended Simulation RPG become their digital sanctuaries, offering profound narratives and breathtaking visuals. These games serve as a poetic refuge, allowing the INFPs to explore the boundless landscapes of their imagination.",
    products: [
      {
        type: "ltp",
        name: "ROG ZEPHYRUS G14",
        link: "https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-g14-2024/",
      },
      {
        type: "psu",
        name: "ROG-LOKI-1200T-SFX-L-GAMING",
        link: "https://rog.asus.com/power-supply-units/rog-loki/rog-loki-1200t-sfx-l-gaming-model/",
      },
    ],
  },
  {
    mbti: "ENFJ",
    description:
      "ENFJs are a magnetic blend of empathy and leadership. They are drawn to cooperative and team-based Hero Shooters where interpersonal dynamics flourish.<br/><br/>These games allow ENFJs to showcase their ability and coordinate with others. For ENFJs, gaming is not just a solo adventure; it's a communal experience, a platform to forge connections and lead their virtual allies to victory.",
    products: [
      {
        type: "wep",
        name: "ROG Cetra True Wireless SpeedNova",
        link: "https://rog.asus.com/headsets-audio/in-ear-headphone/rog-cetra-true-wireless-speednova/",
      },
    ],
  },
  {
    mbti: "ENFP",
    description:
      "ENFPs embrace life with boundless enthusiasm and creativity. That's why they tend to feel right at home with Sandbox Survival games, as the virtual worlds they explore become extensions of their endless curiosity and zest for life.<br/><br/>These games mirror the vast landscapes of their imagination, allowing ENFPs to revel in the freedom to embark on epic quests, encounter diverse characters, and uncover hidden treasures.",
    products: [
      {
        type: "ltp",
        name: "ROG FLOW Z13",
        link: "https://rog.asus.com/laptops/rog-flow/rog-flow-z13-2023-series/",
      },
    ],
  },
  {
    mbti: "ISTJ",
    description:
      "ISTJs are all about precision and order, the same way they interact with games. They excel in strategy and simulation games that demand meticulous planning.<br/><br/>Driving & Business Simulators allow ISTJs to methodically build and manage every detail. They thrive in the structured challenges of resource allocation and strategic decision-making.",
    products: [
      {
        type: "ltp",
        name: "ROG ZEPHYRUS M16",
        link: "https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-m16-2023-series/",
      },
      {
        type: "ssd",
        name: "ROG STRIX ARION",
        link: "https://rog.asus.com/storage/rog-strix-arion-model/",
      },
    ],
  },
  {
    mbti: "ISFJ",
    description:
      "ISFJs are often filled with warmth and steadfast loyalty. Their empathic mind fits right in with story-driven, turn-based RPGs or cooperative games.<br/><br/>These games are their digital havens, offering opportunities to cultivate virtual bonds and serve as a canvas for their caring nature to flourish.",
    products: [
      {
        type: "chr",
        name: "ROG Destrier Ergo Gaming Chair",
        link: "https://rog.asus.com/apparel-bags-gear/gear/rog-destrier-ergo-gaming-chair-model/",
      },
    ],
  },
  {
    mbti: "ESTJ",
    description:
      "ESTJ commands life with unwavering authority and practicality, such great qualities are also why they might enjoy FPS (First-person Shooters).<br/><br/>The fast-paced encounters in these games present structured challenges of decision-making favored by ESTJs, putting their pragmatic minds to the test.",
    products: [
      {
        type: "host",
        name: "ROG G22CH",
        link: "https://rog.asus.com/desktops/small-form-factor/rog-g22ch-series/",
      },
      {
        type: "mse",
        name: "ROG Harpe Ace Aim Lab Edition",
        link: "https://rog.asus.com/mice-mouse-pads/mice/ambidextrous/rog-harpe-ace-aim-lab-edition-model/",
      },
    ],
  },
  {
    mbti: "ESFJ",
    description:
      "ESFJ's empathy and communal spirit make them a perfect fit with cooperative and social simulation games.<br/><br/>These games let them nurture relationships and create harmonious communities. ESFJs revel in the interactive tapestry of friendships, turning gaming into a lively social gathering.",
    products: [
      {
        type: "host",
        name: "ROG Hyperion GR701 BTF Edition",
        link: "https://rog.asus.com/cases/rog-hyperion-gr701-btf-edition/",
      },
    ],
  },
  {
    mbti: "ISTP",
    description:
      "ISTP is a mixture of practicality and adventurous spirit. That's why they love action-packed and skill-based Action Roguelike games.<br/><br/>These games challenge their skills, allowing ISTPs to push their limits. They relish the adrenaline rush of intense gameplay, turning every challenge into an opportunity for skillful display.",
    products: [
      {
        type: "vga",
        name: "ROG Strix GeForce RTX™ 4080 SUPER",
        link: "https://rog.asus.com/graphics-cards/graphics-cards/rog-strix/rog-strix-rtx4080s-o16g-gaming/",
      },
      {
        type: "kb",
        name: "ROG Azoth",
        link: "https://rog.asus.com/keyboards/keyboards/compact/rog-azoth-model/",
      },
    ],
  },
  {
    mbti: "ISFP",
    description:
      "ISFPs are often free-spirited with a creative approach. That's why they find their calling in games that allow creativity to shine.<br/><br/>These games become ISFPs' digital canvases, where they can explore vibrant worlds and express themselves through gameplay. Their artistic expression resonates deeply with their soulful nature.",
    products: [
      {
        type: "ally",
        name: "ROG ALLY X",
        link: "https://rog.asus.com/gaming-handhelds/rog-ally/rog-ally-x-2024/",
      },
      {
        type: "ep",
        name: "ROG Delta S Wireless",
        link: "https://rog.asus.com/headsets-audio/headsets/wireless-headsets/rog-delta-s-wireless-model/",
      },
      {
        type: "mse",
        name: "ROG Keris II Ace",
        link: "https://rog.asus.com/mice-mouse-pads/mice/wireless/rog-keris-ii-ace/",
      },
    ],
  },
  {
    mbti: "ESTP",
    description:
      "ESTPs tackle life with boldness and spontaneity, making competitive games their favorite.<br/><br/>Racing games provide a thrilling adventure for ESTPs to showcase their quick reflexes. For them, it's all about dominating the virtual arena with their dynamic and fearless approach.",
    products: [
      {
        type: "ltp",
        name: "ROG Strix G16",
        link: "https://rog.asus.com/laptops/rog-strix/rog-strix-g16-2024/",
      },
      {
        type: "bag",
        name: "ROG Ranger Gaming Backpack 16",
        link: "https://rog.asus.com/apparel-bags-gear/bags/rog-ranger-gaming-backpack-16/",
      },
    ],
  },
  {
    mbti: "ESFP",
    description:
      "ESFPs light up life's stage with spontaneity and charisma. They shine brightest in vibrant and social party games.<br/><br/>Motion-based dance games let them revel in the joy of shared experiences and friendly competition. For ESFPs, gaming isn't just a pastime; it's a chance to spread laughter and create unforgettable memories.",
    products: [
      {
        type: "ltp",
        name: "ROG Strix SCAR 18",
        link: "https://rog.asus.com/laptops/rog-strix/rog-strix-scar-18-2024/",
      },
      {
        type: "bag",
        name: "ROG SLASH",
        link: "https://rog.asus.com/rog-slash/",
      },
    ],
  },
];

//處理成為卡片 可以自訂編筐位置 跟寫入文字與位置
// 处理图片，并返回处理后的图片数据
export const processImage = async (
  imageUrl: string,
  imageBorderUrl: string,
  customWidth: number,
  customHeight: number,
  text: string, //number:new
  font: string,
  fontSize: string,
  textColor: string,
  textRotation: number,
  textPosition: { x: number; y: number },
  mbti_text: string, //gamername:new
  mbti_font: string,
  mbti_fontSize: string,
  mbti_textColor: string,
  mbti_textRotation: number,
  mbti_textPosition: { x: number; y: number },
  number_text: string,
  number_fontSize: string,
  number_textColor: string,
  number_textRotation: number,
  number_textPosition: { x: number; y: number }
) => {
  return new Promise((resolve, reject) => {
    // 创建一个 Image 元素
    console.log(font, mbti_font);
    const image = new Image();
    image.crossOrigin = "anonymous"; // 允许跨域请求图片

    // 图片加载完成后的处理逻辑
    image.onload = () => {
      try {
        // 创建一个 Canvas 元素
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        // 计算裁剪区域的尺寸和位置
        const sourceWidth = image.width;
        const sourceHeight = image.height;
        const targetWidth = customWidth; // 目标宽度
        const targetHeight = customHeight; // 目标高度
        const targetAspectRatio = targetWidth / targetHeight;
        let clipWidth, clipHeight, clipX, clipY;

        if (sourceWidth / sourceHeight > targetAspectRatio) {
          // 图片宽高比较宽，根据高度裁剪
          clipHeight = sourceHeight;
          clipWidth = targetAspectRatio * clipHeight;
          clipX = (sourceWidth - clipWidth) / 2; // 使裁剪区域位于图片中心
          clipY = 0;
        } else {
          // 图片宽高比较窄，根据宽度裁剪
          clipWidth = sourceWidth;
          clipHeight = clipWidth / targetAspectRatio;
          clipX = 0;
          clipY = (sourceHeight - clipHeight) / 2; // 使裁剪区域位于图片中心
        }

        // 设置 Canvas 的尺寸为目标尺寸
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 清空 Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 在 Canvas 上绘制裁剪后的图片
        ctx.drawImage(
          image,
          clipX,
          clipY,
          clipWidth,
          clipHeight,
          0,
          0,
          targetWidth,
          targetHeight
        );

        // 加载边框图片
        const imageBorder = new Image();
        imageBorder.crossOrigin = "anonymous";
        imageBorder.onload = () => {
          ctx.drawImage(imageBorder, 0, 0); // 绘制边框图片，位置在 (0, 0)

          if (text) {
            ctx.font = `${fontSize}px ROGFonts`; // 设置字体样式
            ctx.fillStyle = textColor; // 设置文字颜色
            ctx.translate(textPosition.x, textPosition.y); // 设置文字位置
            ctx.rotate((textRotation * Math.PI) / 180); // 设置文字旋转角度
            var atext = text.split("").join(String.fromCharCode(8202));
            ctx.fillText(atext, 0, 0); // 绘制文字
            ctx.rotate((-textRotation * Math.PI) / 180); // 恢复画布角度
            ctx.translate(-textPosition.x, -textPosition.y); // 恢复画布位置
          }

          if (mbti_text) {
            ctx.font = `${mbti_fontSize}px ROGFonts`; // 设置字体样式
            ctx.fillStyle = mbti_textColor; // 设置文字颜色
            ctx.translate(mbti_textPosition.x, mbti_textPosition.y); // 设置文字位置
            ctx.rotate((mbti_textRotation * Math.PI) / 180); // 设置文字旋转角度
            var ctext = mbti_text.split("").join(String.fromCharCode(8202));
            ctx.fillText(ctext, 0, 0); // 绘制文字
            ctx.rotate((-mbti_textRotation * Math.PI) / 180); // 恢复画布角度
            ctx.translate(-mbti_textPosition.x, -mbti_textPosition.y); // 恢复画布位置
          }

          if (number_text) {
            ctx.font = `${number_fontSize}px ROGFonts`; // 设置字体样式
            ctx.fillStyle = number_textColor; // 设置文字颜色
            ctx.translate(number_textPosition.x, number_textPosition.y); // 设置文字位置
            ctx.rotate((number_textRotation * Math.PI) / 180); // 设置文字旋转角度
            var ntext = number_text.split("").join(String.fromCharCode(8202));
            ctx.fillText(ntext, 0, 0); // 绘制文字
            ctx.rotate((-number_textRotation * Math.PI) / 180); // 恢复画布角度
            ctx.translate(-number_textPosition.x, -number_textPosition.y); // 恢复画布位置
          }

          // 将 Canvas 中的内容转换为 base64 编码的数据
          const processedImage = canvas.toDataURL("image/jpeg");

          // 返回处理后的图片数据
          resolve(processedImage);
        };

        imageBorder.onerror = reject;
        imageBorder.src = imageBorderUrl;
      } catch (error) {
        reject(error);
      }
    };

    // 图片加载失败后的处理逻辑
    image.onerror = reject;

    // 设置图片的 URL
    image.src = imageUrl;
  });
};

//處理桌布 加入logo圖片
// 处理图片，并返回处理后的图片数据
export const processImageToWallpaper = async (
  imageUrl: string,
  logoUrl: string,
  leftopimg: string | null
) => {
  return new Promise((resolve, reject) => {
    // 创建一个 Image 元素
    const image = new Image();
    image.crossOrigin = "anonymous"; // 允许跨域请求图片

    // 图片加载完成后的处理逻辑
    image.onload = () => {
      try {
        // 创建一个 Canvas 元素
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        canvas.width = image.width;
        canvas.height = image.height;

        // 清空 Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 在 Canvas 上绘制图片
        ctx.drawImage(image, 0, 0);

        // 加载 Logo 图片
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.onload = () => {
          // 绘制 Logo 图片，位置在右上角
          const logoWidth = canvas.width * 0.25; // 设置 Logo 宽度为画布宽度的 20%
          const logoHeight = (logoWidth / logo.width) * logo.height; // 根据 Logo 宽度计算高度，保持比例
          const logoX = 2680; // 使 Logo 与画布右边和顶部保持 20px 的距离
          const logoY = 1480; // 使 Logo 与画布顶部保持 20px 的距离
          ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);

          if (leftopimg) {
            // 加载左上角图片
            const leftop = new Image();
            leftop.crossOrigin = "anonymous";
            leftop.onload = () => {
              // 绘制左上角图片，位置在左上角
              const leftopWidth = canvas.width * 0.1; // 设置左上角图片宽度为画布宽度的 10%
              const leftopHeight = (leftopWidth / leftop.width) * leftop.height; // 根据左上角图片宽度计算高度，保持比例
              const leftopX = 100; // 使左上角图片与画布左边和顶部保持 20px 的距离
              const leftopY = 100; // 使左上角图片与画布顶部保持 20px 的距离
              ctx.drawImage(
                leftop,
                leftopX,
                leftopY,
                leftopWidth,
                leftopHeight
              );

              // 将 Canvas 中的内容转换为 base64 编码的数据
              const processedImage = canvas.toDataURL("image/jpeg");

              // 返回处理后的图片数据
              resolve(processedImage);
            };

            leftop.onerror = reject;
            leftop.src = leftopimg;
          } else {
            // 将 Canvas 中的内容转换为 base64 编码的数据
            const processedImage = canvas.toDataURL("image/jpeg");

            // 返回处理后的图片数据
            resolve(processedImage);
          }
        };

        logo.onerror = reject;
        logo.src = logoUrl;
      } catch (error) {
        reject(error);
      }
    };

    // 图片加载失败后的处理逻辑
    image.onerror = reject;

    // 设置图片的 URL
    image.src = imageUrl;
  });
};

export const TermContent = () => {
  return (
    <>
      This Event will collect following information:
      <br />
      - Gamer name, MBTI type and picture to generate AI pictures.
      <br />
      - Email address for contact purpose when joining an event of this website.
      <br />
      <br />
      Also, full name, physical address and phone number for prize delivery
      purpose if I am an event winner.
      <br />
      <br />
      Terms of Use Notice:
      <br />
      <div className="span9-line" id="member-page-content">
        <span id="ctl00_ContentPlaceHolder1_ctl00_ContentPageContent1_span_product_content_area">
          <div className="privacy_policy us">
            <p>
              ASUSTeK COMPUTER INC. and its affiliated entities companies
              (hereinafter referred to as “<strong>ASUS</strong>”, “
              <strong>we/our/us</strong>”) are committed to protecting and
              respecting your privacy. We endeavor to comply with all applicable
              laws on privacy protection and personal data security. ASUS
              Privacy Policy, together with any privacy-related notices or
              statements that contain supplementary information in connection
              with particular ASUS products and services you are using
              (hereinafter referred to as “Privacy Policy”), outline our privacy
              practices regarding the collection, use and safeguard of your
              personal data through ASUS products and services, both online and
              offline we provide. In Privacy Policy, we also outline whom we may
              share or disclose the collected personal data.
              <br />
              <br />
              If you are a child, you shall access or use ASUS products and
              services only after your parents (or your guardian) read and agree
              our Privacy Policy and agree to provide your personal data to
              ASUS.
            </p>
            <br />
            <h3>1. Data ASUS collect and how ASUS use such data</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces what your data may be collected by ASUS
              and how ASUS may use such data through ASUS products and services.
            </p>
            <p>
              When you use ASUS products and services (for example, ASUS
              computers, software, official websites and customer support
              services), we may need to collect certain personal data from you
              when you use or interact with ASUS products and service.
              <br />
              The following is an overview of the personal data ASUS may collect
              and how ASUS may use such collected personal data. Please be noted
              that we will only collect certain items of your personal data for
              particular purposes based on the ASUS products and services you
              actually use. Please also be noted that what items of the personal
              data will be collected is varied from the nature of the products
              and services. Moreover, in some countries, in order to avoid
              wrongfully collecting and using children’s personal data, you may
              need to additionally provide your age or the contact data of your
              parents (or guardian) so that we could obtain the consent from
              your parents (or guardian). Furthermore, when you use ASUS
              products and services, we may collect the following anonymous data
              which could not directly or indirectly identify you.
              <br />
              When you use ASUS products and services, you do not have to
              provide your personal data based on our request. However, if you
              choose not to provide your personal data to ASUS, we may not be
              able to provide the corresponding ASUS products and services or
              respond to your inquires.
            </p>
            <h4>1.1 The personal data ASUS collect</h4>
            <p>
              Personal data means any data which could directly or indirectly
              identify you, such as your name, email address and IP address.
              ASUS may collect your following personal data based on your prior
              consent:
            </p>
            <ol>
              <li>
                Your true, accurate, current and complete registration data,
                including your e-mail address, country/region and age (now only
                requested in some countries) when you sign up for ASUS Member
                account. If you use your social media account (for example, your
                Facebook or Google account) to sign up for ASUS Member account,
                such social media provider (for example, Facebook Inc. or Google
                Inc.) may share your personal data under your social media
                account (for example, email address, name, nickname and date of
                birth) based on your consent. Moreover, when you log in your
                ASUS Member account (Route: Visit ASUS official website
                <a href="http://www.asus.com">http://www.asus.com </a>
                →find “LOGIN” on the upper-right side of the website→insert the
                E-mail address and password you registered for ASUS Member
                accountfind your data under “ASUS Account”), you can provide
                your additional personal data to edit your profile of ASUS
                Member account (for example, your picture, gender, address and
                profession), and to enjoy ASUS products and services associated
                with your ASUS Member account (for example, your product serial
                number for ASUS product registration, articles and pictures
                posted and uploaded on ASUS’ forums which may contain your
                personal data).
              </li>
              <li>
                Your name, mailing/shipping/billing address (including zip
                code), contact data, e-mail address, credit card number or other
                payment service data when you make a purchase of our products
                (for example, purchasing ASUS products through ASUS Store) and
                paid services. Moreover, in addition to the above personal data,
                your product data (for example, product serial number, IMEI
                number) may also be collected when you request for certain
                customer services (for example, product repair services).
              </li>
              <li>
                Your name, contact data, e-mail, gender, date of birth, product
                data (for example, product serial number, IMEI number), and a
                copy of your invoice (in some countries, your name, address and
                other personal data may be included in your invoice), when you
                enter our events or campaigns. The actual collected items of
                your personal data will vary from respective event or campaign.
                Moreover, if you are a winner of our event or campaign, or if
                you will receive giveaways from ASUS, you may need to
                additionally provide your mailing/shipping address (including
                zip code) and personal data for tax declaration (for example,
                your residential address, ID or passport number and its copy).
                <br />
                Furthermore, in addition to the above personal data, you may
                need to provide your bank account data when you join our
                cashback event.
              </li>
              <li>
                Your age, gender, height, weight, body temperature, heart rate,
                blood pressure, movement of belly as well as certain data about
                your daily activities, for example, your step taken, calories
                burned, sleep patterns and diary records when you use our
                healthcare products and services.
              </li>
              <li>
                Your product data, such as your product serial number, IP
                Address, MAC Address, IMEI number, Android ID number and other
                unique product identifiers may be collected when you use ASUS
                products.
              </li>
              <li>
                Your location data associated with ASUS products and services,
                such as your GPS signal, data identifying nearby Wi-Fi access
                points and cell towers, the country, city, time zone, latitude,
                longitude, altitude and precision of coordinates where your
                product is located, movement speed of your product, your country
                and language settings on your product.
              </li>
              <li>
                Your voice, video, communication records when you contact ASUS
                (for example, by calling to ASUS call center, using ASUS online
                customer service portal to have a chat with ASUS, filling out
                online application form on ASUS official website and sending
                emails to ASUS). Moreover, we may record your image through
                security cameras when you visit ASUS Royal Club repair stations
                and ASUS offices. Furthermore, we may collect your voice
                instruction as well as your video record which may contain the
                image of your home environment when you use our robot-related
                products and services. The above voice, video and communication
                records may contain your personal data.
              </li>
            </ol>
            <br />
            <h4>1.2 How ASUS use your personal data</h4>
            <p>We may use your personal data for the purposes below:</p>
            <ol>
              <li>To assess and improve ASUS products and services.</li>
              <li>
                To obtain customer feedback and to analyze user experience for
                the purpose of development and evaluation of new products and
                services.
              </li>
              <li>
                To fulfill the sign-up process of ASUS Member account and to
                experience ASUS products and services associated with ASUS
                Member account (for example, product registration and services
                of ASUS’ forums).
              </li>
              <li>
                To provide delivery services (for example, delivering proof of
                purchase or invoice), software updates and technical notices for
                ASUS products and services you purchase.
              </li>
              <li>
                To process and fulfill any subscriptions you have signed up for,
                including ASUS eDMs or newsletters to keep you up to date with
                the latest ASUS news, promotions and upcoming events. You may
                unsubscribe it at any time with no charge.
              </li>
              <li>
                To send you important notifications, such as communications
                about changes to our terms, conditions and policies. Because of
                the importance of such communications, you may not opt out of
                receiving these communications.
              </li>
              <li>
                To verify your identity, deliver event or campaign entries and
                rewards, contact you for event or campaign-related ma tters,
                provide cashback allowance, declare tax and provide shuttle
                services and cover you with insurance if it is a necessity when
                you enter our events or contests.
              </li>
              <li>
                To assist you on recording, analyzing, modifying and storing
                data including your body data, your daily activities and the
                activity results calculated from the data above. Moreover, we
                will support you on editing and accessing the data and activity
                results, when you share this data with your family, caregivers,
                and health care professionals.
              </li>
              <li>
                To provide you with customer support services (for example, to
                fulfill your product repair requests and respond to your
                questions), our customer care and customer satisfaction survey
                for user experience analysis, and to protect your rights and
                interests and adopt access control, we may collect your voice,
                video and communication records when you contact ASUS or visit
                ASUS Royal Club repair stations and ASUS offices. Moreover, we
                may collect your voice and video records to assist ASUS
                robot-related products and services arriving at the specific
                destination upon your request.
              </li>
              <li>
                To provide you with personalized marketing services, for
                example, using third party advertising cookies to offer
                marketing communications and advertising that we believe may be
                of interest of you, or recommendation about services you may be
                interest in based on your use of ASUS products and services.
              </li>
              <li>Any other purposes with your prior consent.</li>
            </ol>
            <br />
            <h4>
              1.3 The anonymous data ASUS collect and how ASUS use such
              anonymous data
            </h4>
            <p>
              Anonymous data means any data which could not directly or
              indirectly identify you, such as your product model, software
              version and date of invoice. When you use ASUS products and
              services, we may collect the following anonymous data from you,
              and use such collected anonymous data for any purposes. Moreover,
              when the following anonymous data is connected with your personal
              data listed above, under such circumstances, we will also treat
              such anonymous data as personal data and protect such anonymous
              data at the same level of protection for personal data.
            </p>
            <ol>
              <li>
                Your log data associated with ASUS products and services, such
                as your product model name, product name, brand name,
                manufacturer name, part number, type and version of hardware
                (for example, CPU and motherboard) and operation system,
                factory-default settings, activation time, firmware update data
                (for example, the execution method for firmware update, update
                date and result of update), size of memory and storage,
                Read-Only Memory (ROM) related data (for example, type, version,
                build fingerprint and build description of ROM), camera
                resolution, product color, the telecom and network you use to
                connect to our products and services, the status of the network,
                telephony log data, standby status, crash history, preferred
                interface, type, version and language settings of browser,
                diagnose and usage data, your usage behavior, version of GPS and
                Wi-Fi, system status (for example, usage status of battery, CPU
                and RAM), and local time.
              </li>
              <li>
                Your application data associated with your usage and interaction
                with ASUS applications and software, such as the name and
                version of applications and software, the install and uninstall
                time, login and logout time, frequency and numbers of your
                usage, open and close time of applications and software, the
                category of your preferred applications and software, usage
                behavior settings, update version and update result.
              </li>
              <li>
                Your purchase data of ASUS products and services (for example,
                the purchase date and reseller’s name) when you request for
                certain customer support services (for example, product repair
                services) or join our events.
              </li>
            </ol>
            <br />
            <br />
            <h3>2. Retention of your personal data</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces how long ASUS retain your personal data.
            </p>
            <p>
              We will retain your personal data for the period necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is permitted by law or required to fulfill
              other necessary purposes. For example, for customer relationship
              management purpose, we may retain your personal data within
              adequate and reasonable period; to comply with tax law or other
              laws and regulations, we may retain your personal data within the
              period requested by such laws and regulations; to follow requests
              from governments or judiciary for purposes such as investigation
              or lawsuit, we may retain your personal data for longer retention
              period. Moreover, if you wish to withdraw your previous consent to
              collect your personal data from ASUS, we will stop collecting your
              personal data by your request and will only retain your personal
              data collected before such request for withdrawal.
            </p>
            <br />
            <h3>3. To whom ASUS disclose your personal data</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces ASUS may share your personal data to
              third parties under limited circumstances and purposes.
            </p>
            <p>
              Your personal data will not be disclosed to any third parties
              without one of the following exceptions:
            </p>
            <h4>3.1 Your Consent</h4>
            <ul>
              <li>
                We will only disclose or share your personal data to other third
                parties with your prior consent.
              </li>
            </ul>
            <h4>3.2 Business Partners</h4>
            <ul>
              <li>
                We may disclose hashed and anonymized data to our business
                partners, for example, business partners who provide data
                analytics services or advertisings and marketing communications
                based on the hashed and anonymized data through third party
                advertising cookies.
              </li>
            </ul>
            <h4>3.3 Service Providers</h4>
            <ul>
              <li>
                We may disclose and share necessary items of your personal data
                to our service providers that provide services for or on behalf
                of us, for instance, marketing agencies assisting us with
                sending marketing communications and holding marketing
                events/campaigns, forwarder companies delivering repaired and
                purchased products to you, payment service providers processing
                your billing, and customer service providers offering customer
                support services (for example, product repair services, services
                through ASUS call center and ASUS online customer service
                portal) to you. These service providers shall only use your
                personal data in compliance with our instruction and with the
                scope of the purposes hereof; ASUS ensures that all of our
                service providers strictly comply with the Privacy Policy.
              </li>
            </ul>
            <h4>3.4 For legal, protection, security purposes</h4>
            <p>
              We may disclose or share necessary items of your personal data
              with third parties for one of the following legal or security
              purposes:
            </p>
            <ul>
              <li>
                To the extent it is required by applicable laws or regulations
                or competent governmental or judicial authorities, necessary to
                establish or preserve a legal claim or defense, or necessary to
                prevent fraud or other illegal activities.
              </li>
              <li>
                To protect the rights, property or safety of ASUS, our service
                providers, customers or the public, as required or permitted by
                law.
              </li>
            </ul>
            <br />
            <br />
            <h3>4. Cross-border processing of your personal data</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces ASUS may transfer your personal data to
              different countries under the premises that ASUS should comply
              with privacy-related laws and regulation in such countries.
            </p>
            <p>
              You understand and consent that when you agree to provide your
              personal data to ASUS, your personal data may transfer, storage,
              use or process to ASUS and any of its affiliated entities, service
              providers who may be located in a different country to you. All
              said transfer, storage, or process of your personal data, shall be
              subject to the Privacy Policy and applicable laws on privacy
              protection and personal data security.
            </p>
            <br />
            <h3>5. Cookies and similar technologies</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces how ASUS and third parties use cookies
              and similar technologies on ASUS products and services, and how
              you can manage cookies settings.
            </p>
            <p>
              ASUS and our third party partners use cookies (cookies are small
              text files placed on your products to personalize your user
              experience on ASUS products and services) and similar technologies
              such as web beacons to provide our products and services to you.
              When you visit one of our websites under ASUS’ website domain
              (including microsites and versions of particular country/region),
              such ASUS website may use some or all of the following cookies and
              similar technologies.
              <br />
              Almost all of the data collected through cookies will only be
              stored in your products, rather than being transmitted to ASUS.
              Only under a very few and limited circumstances, your data
              collected through cookies may be shared to ASUS. For example, when
              you purchase our products on ASUS Store, we may use cookies to
              collect your IP addresses at both times when you log in and place
              an order on ASUS Store, to verify the user who places the order is
              the same one who logs in ASUS Store for the security of online
              purchase.
            </p>
            <br />
            <h4>5.1 How we use Cookies</h4>
            <p>
              1. In order to enrich and perfect your online experiences, we use
              the following cookies which are essential to ASUS products and
              services:
            </p>
            <table className="privacyTableContent" border={1}>
              <tbody>
                <tr className="privacyTableTr">
                  <td>Function</td>
                  <td>Example</td>
                </tr>
                <tr>
                  <td>Sign-up and authentication</td>
                  <td>
                    We use cookies to store your unique sign-up ID number and
                    authentication data on your products. Cookies allow you to
                    visit and move from page to page within ASUS products and
                    services without having to log in again on subsequent
                    visits, such as aticket cookies provided by ASUS.
                  </td>
                </tr>
                <tr>
                  <td>Storing your preferences and settings</td>
                  <td>
                    We use cookies to maintain your settings and preferences on
                    your products, such as your preferred language, location or
                    fonts; by storing the settings in cookies, it is not a
                    necessity to reapply your preferences and settings each time
                    you visit our products and services, such as current_site
                    cookies and EntryPage cookies provided by ASUS.
                  </td>
                </tr>
                <tr>
                  <td>User-input function</td>
                  <td>
                    We use cookies to temporarily store the data you insert on
                    ASUS products and services, such as count cookies provided
                    by ASUS. For example, when you enjoy your shopping
                    experiences through ASUS Store, such cookies will help you
                    to remember the product and the quantity you click and the
                    data you insert.
                  </td>
                </tr>
                <tr>
                  <td>Security</td>
                  <td>
                    We use cookies to protect the security of your online
                    purchase activities, such as ip_address cookies provided by
                    ASUS. For the above purpose, when you purchase our products
                    through ASUS Store, we may store your IP addresses in ASUS
                    in order to help us verify the user who places the order on
                    ASUS Store is same as the one who logging in ASUS Store.
                  </td>
                </tr>
                <tr>
                  <td>Load balancing function</td>
                  <td>
                    We use cookies for load balancing function to provide you
                    with the stable browsing experiences on our websites, such
                    as BIGipServerNew cookie provided by ASUS.
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <p>
              2. For analytics purpose and to provide you with personalized
              advertising services and other functions, we use the following
              cookies to optimize your experiences in using ASUS products and
              services:
            </p>
            <table className="privacyTableContent" border={1}>
              <tbody>
                <tr className="privacyTableTr">
                  <td>Function</td>
                  <td>Example</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>
                    We use cookies to count the number and length of your visit
                    in ASUS products and services as well as which part or
                    features you visit the most as well. This data helps us
                    analyze the performance and operation of ASUS products and
                    services to improve performance and develop new features,
                    functions and services, such as MIGO cookies provided by
                    MIGO Corp., Google Tag Manager cookies and Google Analytics
                    cookies provided by Google Inc. For the above purposes, when
                    you browse our websites, we may store your personal data
                    such as IP address and your ASUS Member ID in ASUS through
                    the above MIGO cookies.
                  </td>
                </tr>
                <tr>
                  <td>Targeting and advertising</td>
                  <td>
                    We use cookies to collect data about your use in ASUS
                    products and services and identify your interests, such as
                    the advertisings you have viewed.
                    <br />
                    Such cookies are also used to limit the number of times you
                    see an advertisement as well as help measure the
                    effectiveness of the advertising campaigns. ASUS place
                    cookies by using advertising campaign services, such as
                    Hubrus DSP provided by Hubrus, Google AdWords cookies and
                    Google Double Click cookies provided by Google Inc. The data
                    cookies collect is only used between ASUS and advertising
                    campaign service providers.
                  </td>
                </tr>
                <tr>
                  <td>Watching YouTube videos embedded in our websites</td>
                  <td>
                    We use cookies to help us insert YouTube videos into our
                    websites. You can watch YouTube videos through our websites
                    with such cookies provided by Google Inc.
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />
            <h4>5.2 How to manage cookies settings</h4>
            <ol>
              <li>
                Please note that you can configure cookies settings by accessing
                the browser you install to accept, block or delete some or all
                of cookies (for example, third party cookies).
              </li>
              <li>
                In some countries, for the first time you browse ASUS websites,
                we may put a brief introduction on how we use cookies in a
                banner placed on the top side of such ASUS websites. You may
                freely choose to accept or block the above third party cookies
                through such banner.
              </li>
              <li>
                If you choose to block cookies, you may not be able to use all
                of the features of ASUS products and services.
              </li>

              <li>
                The functions of cookies settings may vary depending on the type
                and version of browser you install. We try to list common and
                widely-used types of browsers as following. You may refer to the
                following linkage to understand how to control your cookies
                settings through such browsers (The content in the following
                linkage is English. For your easier reading, please find the
                language option in the following linkage to select your
                preferred language). Also, if you do not use anyone of the
                following browsers, or the content in the following linkage is
                removed or not accessible, please visit those browsers’
                privacy-related statements or support pages for further
                information. You may also refer to
                <a href="https://www.aboutcookies.org/">
                  https://www.aboutcookies.org/{" "}
                </a>
                (the content in this linkage is English) which introduces how to
                manage your cookies settings through various browsers.
              </li>
            </ol>
            <br />
            <ul>
              <li>
                How to control your cookies settings through Google Chrome
                browser:
                <br />
                <a href="https://support.google.com/chrome/answer/95647?hl=en">
                  https://support.google.com/chrome/answer/95647?hl=en{" "}
                </a>
              </li>
              <li>
                How to control your cookies settings through Microsoft Internet
                Explorer browser:
                <br />
                <a href="https://support.microsoft.com/en-us/help/278835/how-to-delete-cookie-files-in-internet-explorer">
                  https://support.microsoft.com/en-us/help/278835/how-to-delete-cookie-files-in-internet-explorer
                </a>
              </li>
              <li>
                How to control your cookies settings through Mozilla Firefox
                browser:
                <br />
                <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored">
                  https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
                </a>
              </li>
              <li>
                How to control your cookies settings through Apple Safari
                browser:
                <br />
                <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac">
                  https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
                </a>
              </li>
            </ul>
            <br />
            <br />
            <h4>5.3 Web Beacons</h4>
            <p>
              A web beacon is an often-transparent graphic 1x1 (pixel) GIF or
              PNG image that is implemented on websites or in an email to
              measure the effectiveness of campaigns. ASUS or our service
              providers may use web beacons to know if you visit certain pages
              or click links in ASUS products and services. We may implement web
              beacons in our marketing communications such as eDMs or ASUS
              newsletters to know which communication contents you have clicked
              or read. We will use the data from web beacons to improve our
              websites and ASUS products and services.
            </p>
            <br />
            <br />
            <h3>6. Third-party links in ASUS products and services</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces when you visit any links or use any
              services provided by third parties, please always refer to
              privacy-related statements issued by third parties.
            </p>
            <p>
              ASUS products and services may contain links to third-party
              websites. Please be aware that ASUS is not responsible for the
              security, the privacy practices and the materials of those
              third-party websites. We encourage you to be aware of when you
              leave our websites, and to read the privacy statements of those
              third-party websites carefully. This Privacy Policy applies to
              ASUS products and services only.
            </p>
            <br />
            <h3>7. Security</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces how ASUS protects your personal data and
              provide some suggestions on how to protect your personal data at
              your end.
            </p>
            <p>
              We take precautions to protect your personal data against
              unauthorized access, alteration, disclosure or destruction. We
              conduct internal reviews of our data collection, storage and
              processing practices and technical and organizational security
              measures, as well as physical security measures to guard against
              unauthorized access to systems where we store your personal data.
              Transmission of personal data between different locations of ASUS
              and its affiliated entities is performed through our secured wide
              area network. When you submit your personal data to us, your
              personal data is protected both online and offline. However, ASUS
              cannot guarantee perfect security on the internet. To protect your
              personal data from unauthorized access, we recommend that you:
            </p>
            <br />
            <h4>
              7.1 To appropriately protect your ASUS Member account, for
              example:
            </h4>
            <ol>
              <li>
                To use alphanumerical passwords when signing up ASUS Member
                account.
              </li>
              <li>
                To use your own account name and password to log in ASUS Member
                account. Also, you are solely and entirely responsible for
                securing the confidentiality of your account name and password
                and for any and all activities that occur under your ASUS Member
                account.
              </li>
              <li>
                To change your passwords of ASUS Member account on a regular
                basis.
              </li>
              <li>
                To immediately contact us when you find that the account
                name/password of your ASUS Member account had been
                misappropriated. ASUS may suspend or terminate the permission to
                login your ASUS Member account with such account name/password
                (or any part thereof), and remove your personal data related to
                your ASUS Member account.
              </li>
            </ol>
            <h4>
              7.2 To keep your products up to date by applying the latest
              available security updates for your software and use such tools as
              virus/spyware scanners.
            </h4>
            <h4>
              7.3 If you become aware of a technical vulnerability affecting
              ASUS products and services, please do not hesitate to contact us
              through
              <a href="mailto:privacy@asus.com">privacy@asus.com</a>
            </h4>
            <br />
            <br />

            <h3>8. How to manage your personal data</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces that if you may have any inquiries or
              requests on your personal data collected by ASUS, you may log in
              your “ASUS Account” or manage privacy-related settings on
              particular ASUS products and services you use. Also, you may
              contact us through “Customer’s request on personal data” interface
              on ASUS official website or email to
              <a href="mailto:privacy@asus.com">privacy@asus.com.</a>
            </p>
            <h4>8.1 ASUS Member account</h4>
            <ol>
              <li>
                Please provide your true, accurate, current and complete
                personal data to ASUS under your ASUS Member account so that
                ASUS can provide you with the corresponding ASUS products and
                services.
              </li>
              <li>
                You may view and change your account data by logging in your
                ASUS Member account and editing your account data.
              </li>
              <li>
                If you would like to subscribe or unsubscribe ASUS eDM and
                notice with ASUS news, latest products and services, you may
                change the setting by logging in your ASUS Member account find
                “Subscribe” on the left column choose “YES” or “NO”. If you
                choose “NO” for unsubscription, please be noted that it may take
                around 2 business days to complete the unsubscription process.
              </li>
            </ol>
            <br />
            <h4>8.2 ASUS products and services</h4>
            <p>
              You are free to choose to enable or disable sharing your personal
              data with ASUS through privacy-related settings in particular ASUS
              products and services at all times when you use such ASUS products
              and services.
            </p>
            <br />
            <h4>
              8.3 Cookies settings (Please refer to “How to manage cookies
              settings”“Cookies and similar technologies” in this Privacy
              Policy.)
            </h4>
            <ol>
              <li>
                You can manage cookies settings through the browser you install
                to accept, block or delete some or all of cookies (for example,
                third party cookies) or adopt other settings at all times.
              </li>
              <li>
                If you do not wish ASUS to provide you with personalized
                marketing services and advertisement through third party
                cookies, you may block or delete third party cookies through
                your browser at all times.
              </li>
            </ol>
            <br />
            <h4>8.4 Contact ASUS to manage your personal data</h4>
            <p>
              Your may contact us through “Customer’s request on personal data”
              interface on ASUS official website or email to
              <a href="mailto:privacy@asus.com">privacy@asus.com</a>
              if you have any requests and inquiries about your personal data
              under your ASUS Member account or other personal data collected by
              ASUS, such as request for access, correction, download, block,
              deletion, objecting ASUS from using some or all of your personal
              data (for example, you may contact us if you consider ASUS may
              wrongfully collect and use your personal data) and restricting
              ASUS from using your personal data under some certain
              circumstances (for example, you may contact us if you do not wish
              your personal data to be analyzed) at all times.
              <br />
              <br />
              Also, if you have consented ASUS to collect your personal data
              through ASUS products and services, you are free to withdraw your
              consent by changing privacy-related settings in particular ASUS
              products and services (please refer to 8.2 in this Privacy Policy)
              or by submitting your request for withdrawal of consent to us. We
              will stop collecting your personal data and will only retain your
              personal data collected before such request for withdrawal.
            </p>
            <br />
            <h4>
              8.5 Whenever you use ASUS products and services, we strive to
              maintain the accuracy of your personal data and protect your
              personal data against any accidental or malicious destruction. We
              will accommodate your requests regarding your personal data;
              however, we may not be able to fulfill your above requests in one
              of the following circumstances:
            </h4>

            <ol>
              <li>As required or permitted under application laws;</li>
              <li>For legitimate business purposes;</li>
              <li>
                Unreasonably repetitive requests that require disproportionate
                technical efforts and resources, for example, developing a new
                system or fundamentally changing the current practices;
              </li>
              <li>Potentially risks on the privacy of others;</li>
            </ol>
            <br />
            <br />
            <h3>9. Children’s Privacy</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces that in order to protect children’s
              privacy, if you are a child, please seek your parents (or
              guardian)’s consent before you provide your personal data to ASUS.
              Also, if your parents (or guardian) would like to manage your
              personal data, he/ she may contact us through “Customer’s request
              on personal data” interface on ASUS official website or email to
              <a href="mailto:privacy@asus.com">privacy@asus.com</a>
            </p>
            <p>
              We do not knowingly collect personal data from a child below the
              age of sixteen (16), or equivalent minimum age in the relevant
              jurisdiction, without parental consent. We encourage parents (or
              guardian) to take an active role in a child’s online activities
              and interests while using ASUS products and services.
              <br />
              If you are a child, please seek parental consent before your use
              of ASUS products and services. You may submit your personal data
              with parental (or guardian’s) consent to us only. Your parents (or
              guardian) can contact us through “Customer’s request on personal
              data” interface on ASUS official website or email to
              <a href="mailto:privacy@asus.com">privacy@asus.com</a>
              to revoke or withdraw any consent previously given, request for
              access, correction, download, block, deletion, objecting ASUS from
              using some or all of your personal data (for example, your parents
              (or guardian) may contact us if he/she considers ASUS may
              wrongfully collect and use your personal data) and restricting
              ASUS from using your personal data under some certain
              circumstances (for example, your parents (or guardian) may contact
              us if he/she does not wish your personal data to be analyzed) at
              all times.
            </p>
            <br />
            <h3>10. Sensitive Personal Data</h3>
            <p>
              ASUS will never ask you to provide sensitive personal data such as
              data about your medical or health records, political, religious or
              philosophical beliefs, criminal offences (alleged, or committed),
              criminal conviction background, racial or ethnic origin, trade
              union membership, sexual orientation, sexual history, behavior or
              genetic data. Please refrain from providing us with such sensitive
              personal data.
            </p>
            <br />
            <h3>11. Changes to ASUS Privacy Policy</h3>
            <p>
              We may change the Privacy Policy from time to time, we highly
              recommend you periodically review the Privacy Policy posted on our
              websites. By accessing or using our products and services after
              the Privacy Policy has been updated, ASUS will deem that you
              consent to the Privacy Policy, including any updates. The most
              current version of the Privacy Policy will always be available on
              this page; a prominent notice such as email notification will be
              delivered to you about any significant changes. You can always
              check the “updated time” at the bottom for the most current
              version of Privacy Policy.
            </p>
            <br />
            <h3>12. Contacting Us</h3>
            <p>
              If you have any inquiries, questions, comments or complaints about
              the Privacy Policy, or if you believe that ASUS did not comply
              with the Privacy Policy, please feel free to contact us. If you
              consider we may not appropriately deal with any issues related to
              your personal data collected by ASUS, please be noted that it is
              your right to lodge a complaint with government authorities
              handling personal data protection in your country.
            </p>
            <br />
          </div>
        </span>
      </div>
    </>
  );
};

export const TermContent2 = () => {
  return (
    <>
      <p>Please read the following 3 notices before joining the Event:</p>
      <br />
      <h3 className=" font-robotoconbold font-extrabold">1.Cookie Notice</h3>
      <br />
      <p>
        ASUSTeK COMPUTER INC. and its affiliated entities companies use a
        cookies and similar technologies to perform essential online functions,
        such as authentication and security. You may disable these by changing
        your cookies setting through browser, but this may affect how this
        website functions.
      </p>
      <br />
      <p>
        Also, ASUS uses some analytics, targeting, adverting and video-embedded
        cookies provided by ASUS or third parties. If you agree to use these
        cookies in this website, please tick the 1st checkbox below. Please note
        that you can configure cookies settings by accessing the browser you
        install at any time. For detailed information, please visit ASUS Privacy
        Policy-“
        <a
          href="https://www.asus.com/Terms_of_Use_Notice_Privacy_Policy/Privacy_Policy"
          className=" underline"
          target="_blank"
          rel="noreferrer"
        >
          Cookies and similar technologies
        </a>{" "}
        ”.
      </p>
      <br />
      <h3 className=" font-robotoconbold font-extrabold">
        2.Data Collection Notice
      </h3>
      <br />
      <p> ASUS will collect following information in this Event:</p>
      <p> - Gamer name, MBTI type and picture to generate AI pictures.</p>
      <p>
        {" "}
        - Email address for contact purpose when joining an event of this
        website.
      </p>
      <p>
        {" "}
        Also, full name, physical address and phone number for prize delivery
        purpose if you are anevent winner.
      </p>
      <br />
      <h3 className=" font-robotoconbold font-extrabold">
        3.Terms and Conditions{" "}
      </h3>
      <p>
        When joining this Event, you confirm that you have read and understood
        the{" "}
        <a
          href="https://rog.asus.com/event/MBTIgamercard.pdf"
          className=" underline"
          target="_blank"
          rel="noreferrer"
        >
          Terms and Conditions{" "}
        </a>
        .{" "}
      </p>
    </>
  );
};
