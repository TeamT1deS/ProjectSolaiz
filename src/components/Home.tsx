import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "../store";
import { login, hideAlert } from "../slice/authSlice";
import { Activity, ArrowRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";
import "@/assets/css/home.css";

const TypingEffect = () => {
  const [displayText, setDisplayText] = useState("Raizist");
  const titleArray = [
    "Raizis",
    "Raizi",
    "Raiz",
    "Rai",
    "Ra",
    "R",
    "Ra",
    "Rai",
    "Raiz",
    "Raizi",
    "Raizis",
    "Raizist",
  ];
  const [index, setIndex] = useState(0);
  const [longWait, setLongWait] = useState(false);
  useEffect(() => {
    if (titleArray[index] === "R" || titleArray[index] === "Raizist") {
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

const LoginDialog: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      // 向本地服务器发送 POST 请求
      const response = await axios.post(
        "/api/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true, // 启用 cookie
        }
      );

      // 检查响应是否成功
      if (response.status === 200) {
        // console.log(response.data);
        const { isAdmin, userName } = response.data; // 假设后端返回的数据格式包含 isAdmin 和 userName
        // 分发登录 action，将登录状态存储在 Redux 中
        dispatch(login({ isAdmin, userName }));
        console.log("登录成功");
      }
    } catch (error) {
      console.error("登录失败", error);
    }
    // dispatch(login({ isAdmin: true, userName: "超级管理员" }));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex border hover:border-white/0 bg-white/0 text-white hover:bg-white hover:text-black hover:shadow-xl">
          <ArrowRight /> 点击进入
        </Button>
        {/*<Button variant="outline">Login</Button>*/}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Next Gen Cybersecurity Platform - Raizist
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/*<Label htmlFor="username" className="text-left">
              Username
            </Label>*/}
            <Input
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {/*<Label htmlFor="password" className="text-left">
              Password
            </Label>*/}
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleLogin} type="submit">
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const LoginAlert: React.FC = () => {
  const dispatch = useDispatch();
  const showAlert = useSelector((state: RootState) => state.auth.showAlert);

  // 使用 useEffect 实现淡出效果
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(hideAlert()); // 一段时间后自动隐藏 Alert
      }, 2000); // Alert 显示 2 秒

      return () => clearTimeout(timer); // 组件卸载时清除定时器
    }
  }, [showAlert, dispatch]);

  return (
    <AnimatePresence>
      {showAlert && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-[65px] mx-[25%] z-50"
      >
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Login Successful</AlertTitle>
          <AlertDescription>
            You have successfully logged in as an admin.
          </AlertDescription>
        </Alert>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

function Home() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen banner-1 flex items-center justify-center px-8">
        {/* 左侧文字 */}
        <div className="noselect noto-sans-sc-regular text-white text-6xl font-bold flex-1 mr-6 max-w-md leading-[1.2]">
          欢迎来到
          <br />
          <TypingEffect></TypingEffect>
          <br />
          <div className="mt-8">
            {isLoggedIn ? (
              <div className="h-[40px]" /> // 这里设置与按钮相同的高度
            ) : (
              <LoginDialog></LoginDialog>
            )}
          </div>
        </div>

        {/* 右侧终端样式 */}
        <div className="noselect flex-1 max-w-lg bg-black bg-opacity-80 text-green-400 p-6 rounded-lg shadow-lg ml-6">
          <div className="font-mono text-sm">
            <div className="mb-2">
              <span className="text-gray-500">$</span> ping raizist.com
            </div>
            <div className="animate-pulse">
              <span className="text-gray-500">64 bytes from </span>
              <span>raizist.com</span>
              <span className="text-gray-500">
                : icmp_seq=1 ttl=56 time=24.4 ms
              </span>
            </div>
            <div>
              <span className="text-gray-500">$</span> cat /flag
            </div>
            <div className="my-4">
              <span className="text-gray-500">
                flag&#123;P1atform_raizist_by_Team_T1deS&#125;
              </span>
            </div>
            <div className="my-4">&nbsp;</div>
            <div className="my-4">&nbsp;</div>
            <div className="my-4">&nbsp;</div>
          </div>
        </div>
      </div>
      <LoginAlert></LoginAlert>
      <div className="noselect w-full h-[15%] fixed bottom-0 left-0 flex items-center justify-center">
        <p className="flex items-center roboto-regular text-white/50 text-center text-md">
          &copy; Team T1deS 2024 All rights reserved
          <Activity strokeWidth={1.5} size={22} />
          <Button
            variant="link"
            className="pl-0 pr-1 bg-white/0 text-white/50"
            onClick={() => window.open("https://react.dev/", "_blank")}
          >
            React
          </Button>
          <Button
            variant="link"
            className="px-1 bg-white/0 text-white/50"
            onClick={() => window.open("https://ui.shadcn.com/", "_blank")}
          >
            shadcn-ui
          </Button>
        </p>
      </div>
    </>
  );
}

export default Home;
