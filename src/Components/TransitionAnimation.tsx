import { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface TransitionAnimationProps {
  isMobile: boolean;
  showAnimation: boolean;
  jsonData: any; // 或使用更具體的 Lottie 動畫數據類型
}

const TransitionAnimation = ({
  isMobile,
  showAnimation,
  jsonData,
}: TransitionAnimationProps) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile && showAnimation && animationContainer.current) {
      lottie.loadAnimation({
        container: animationContainer.current,
        animationData: jsonData,
        renderer: "svg",
        autoplay: true,
        loop: false,
        rendererSettings: {
          preserveAspectRatio: "none",
        },
      });
    }
  }, [isMobile, showAnimation, jsonData]);

  return (
    <div className="fixed top-0 left-0 z-[999] w-full pointer-events-none">
      <div className="w-full h-screen" ref={animationContainer}></div>
    </div>
  );
};

export default TransitionAnimation;
