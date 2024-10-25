import { useEffect, useState } from "react";
import { Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/assets/css/Home.css";

const TypingEffect = () => {
  const [displayText, setDisplayText] = useState("SentinelX");
  const titleArray = [
    "Sentinel",
    "Sentine",
    "Sentin",
    "Senti",
    "SentiX",
    "Senti",
    "Sentin",
    "Sentine",
    "Sentinel",
    "SentinelX",
  ];
  const [index, setIndex] = useState(0);
  const [longWait, setLongWait] = useState(false);
  useEffect(() => {
    if (titleArray[index] === "SentinelX" || titleArray[index] === "SentiX") {
      setLongWait(true);
    } else {
      setLongWait(false);
    }
    const timeout = setTimeout(
      () => {
        if (index < titleArray.length) {
          setDisplayText(titleArray[index]);
          setIndex(index + 1);
        } else {
          setIndex(0);
        }
      },
      longWait ? 6000 : 200
    );

    return () => clearTimeout(timeout);
  }, [index, displayText]);

  return (
    <>
      <span className="roboto-regular">{displayText}</span>
      <span className="roboto-regular">_</span>
    </>
  );
};

function Home() {
  const [isLoggedIn] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen banner-1 flex items-center justify-center px-8">
        {/* 左侧文字 */}
        <div className="noto-sans-sc-regular text-white text-6xl font-bold flex-1 mr-6 max-w-md leading-[1.2]">
          欢迎来到
          <br />
          <TypingEffect></TypingEffect>
          <br />
          <div className="mt-8">
            {isLoggedIn ? (
              <div className="h-[40px]" /> // 这里设置与按钮相同的高度
            ) : (
              <Button className="flex border hover:border-white/0 bg-white/0 text-white hover:bg-white hover:text-black hover:shadow-xl">
                <ArrowRight /> 点击进入
              </Button>
            )}
          </div>
        </div>

        {/* 右侧终端样式 */}
        <div className="flex-1 max-w-lg bg-black bg-opacity-80 text-green-400 p-6 rounded-lg shadow-lg ml-6">
          <div className="font-mono text-sm">
            <div className="mb-2">
              <span className="text-gray-500">$</span> ping sentix.com
            </div>
            <div className="animate-pulse">
              <span className="text-gray-500">64 bytes from </span>
              <span>sentix.com</span>
              <span className="text-gray-500">
                : icmp_seq=1 ttl=56 time=24.4 ms
              </span>
            </div>
            <div>
              <span className="text-gray-500">$</span> cat /flag
            </div>
            <div className="my-4">
              <span className="text-gray-500">
                flag&#123;P1atform_SentiX_by_Team_T1deS&#125;
              </span>
            </div>
            <div className="my-4">&nbsp;</div>
            <div className="my-4">&nbsp;</div>
            <div className="my-4">&nbsp;</div>
          </div>
        </div>
      </div>
      <div className="w-full h-[15%] fixed bottom-0 left-0 flex items-center justify-center">
        <p className="flex items-center roboto-regular text-white/50 text-center text-md">
          &copy; Team T1deS 2024 All rights reserved
          <Activity strokeWidth={1.5} size={22} />
          <Button variant="link" className="pl-0 pr-1 bg-white/0 text-white/50" onClick={() => window.open("https://react.dev/", "_blank")}>
            React
          </Button>
          <Button variant="link" className="px-1 bg-white/0 text-white/50" onClick={() => window.open("https://ui.shadcn.com/", "_blank")}>
            shadcn-ui
          </Button>
        </p>
      </div>
    </>
  );
}

export default Home;
