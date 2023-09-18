import { useEffect, useState } from "react";

interface ScreenSizeHook {
  isDesktopView: boolean;
}

const useScreenSize = (): ScreenSizeHook => {
  const [isDesktopView, setDesktopView] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (screenWidth >= 1024) {
      setDesktopView(true);
    } else {
      setDesktopView(false);
    }
  }, [screenWidth]);

  // Return the value
  return {
    isDesktopView,
  };
};

export default useScreenSize;
