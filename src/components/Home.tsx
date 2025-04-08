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
  const fullText = "Solaiz";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 200; // 删除比输入稍快
    const pauseDuration = 2000; // 完成时的停顿

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < fullText.length) {
        // 输入阶段
        setDisplayText(fullText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        // 删除阶段
        setDisplayText(fullText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (charIndex === fullText.length) {
        // 输入完成，暂停后开始删除
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (charIndex === 0) {
        // 删除完成，开始新一轮输入
        setIsDeleting(false);
        setCharIndex(0);
      }
    }, charIndex === fullText.length || charIndex === 0 ? pauseDuration : typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting]);

  return (
    <>
      <span className="roboto-regular">{displayText}</span>
      <span className="roboto-regular animate-blink">_</span>
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
            Next Gen Cybersecurity Platform - Solaiz
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

const LoginAlert = () => {
  const dispatch = useDispatch();
  const showAlert = useSelector((state: RootState) => state.auth.showAlert);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 3000); // 显示3秒后自动隐藏
      return () => clearTimeout(timer);
    }
  }, [showAlert, dispatch]);

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
        >
          <Alert className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-none shadow-lg rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Login Successful</AlertTitle>
            <AlertDescription>
              You have successfully logged in as an admin. Welcome aboard!
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
              <span className="text-gray-500">$</span> ping projectsolaiz.com
            </div>
            <div className="animate-pulse">
              <span className="text-gray-500">64 bytes from </span>
              <span>projectsolaiz.com</span>
              <span className="text-gray-500">
                : <br/>icmp_seq=1 ttl=56 time=21.6 ms
              </span>
              <span className="text-gray-500">
                <br/>icmp_seq=2 ttl=56 time=25.4 ms
              </span>
            </div>
            <br/>
            <div>
              <span className="text-gray-500">$</span> cat /flag
            </div>
            <div className="my-4">
              <span className="text-gray-500">
                flag&#123;P1atform_SolaiZ_by_Team_T1deS&#125;
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
          &copy; Team T1deS 2024-{new Date().getFullYear()} All rights reserved
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
