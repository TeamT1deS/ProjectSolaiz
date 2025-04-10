"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout } from "../slice/authSlice";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, UserRoundCheck } from "lucide-react";

export function NavMenu() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const userName = useSelector((state: RootState) => state.auth.userName);
  const handleLogout = () => {
    dispatch(logout());
    axios
      .post("/api/logout", {}, { withCredentials: true })
      .then((_response) => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

  return (
    <div className="noselect fixed top-0 left-0 w-full h-[60px] backdrop-blur-md bg-white/30 flex items-center z-10">
      <div className="poppins-regular flex-shrink-0 pl-7 pr-7">Solaiz</div>
      <Separator className="h-1/2 bg-black/30" orientation="vertical" />
      <div className="flex-1 pl-4 flex items-center justify-start">
        <NavigationMenu className="w-full flex items-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <Button
                  className="poppins-regular pl-4 pr-4 bg-transparent text-black hover:text-[#0088ee] hover:bg-white/75 transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-[calc(100%-2rem)] after:h-[2px] after:bg-[#0088ee] after:scale-x-0 after:origin-center hover:after:scale-x-100 after:transition-transform after:-translate-x-1/2"
                  variant="ghost"
                  size="sm"
                >
                  Home
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <Button
                  className="poppins-regular pl-4 pr-4 bg-transparent text-black cursor-not-allowed"
                  variant="ghost"
                  size="sm"
                  disabled
                >
                  Skillbox
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <Button
                  className="poppins-regular pl-4 pr-4 bg-transparent text-black hover:text-[#0088ee] hover:bg-white/75 transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-[calc(100%-2rem)] after:h-[2px] after:bg-[#0088ee] after:scale-x-0 after:origin-center hover:after:scale-x-100 after:transition-transform after:duration-300 after:-translate-x-1/2"
                  variant="ghost"
                  size="sm"
                >
                  Competition
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <Button
                  className="poppins-regular pl-4 pr-4 bg-transparent text-black hover:text-[#0088ee] hover:bg-white/75 transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-[calc(100%-2rem)] after:h-[2px] after:bg-[#0088ee] after:scale-x-0 after:origin-center hover:after:scale-x-100 after:transition-transform after:-translate-x-1/2"
                  variant="ghost"
                  size="sm"
                >
                  Practise
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <Button
                  className="poppins-regular pl-4 pr-4 bg-transparent text-black hover:text-[#0088ee] hover:bg-white/75 transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-[calc(100%-2rem)] after:h-[2px] after:bg-[#0088ee] after:scale-x-0 after:origin-center hover:after:scale-x-100 after:transition-transform after:-translate-x-1/2"
                  variant="ghost"
                  size="sm"
                >
                  Scoreboard
                </Button>
              </Link>
            </NavigationMenuItem>
            {isAdmin && (
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <Button
                    className="poppins-regular pl-4 pr-4 bg-transparent text-black hover:text-[#0088ee] hover:bg-white/75 transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-[calc(100%-2rem)] after:h-[2px] after:bg-[#0088ee] after:scale-x-0 after:origin-center hover:after:scale-x-100 after:transition-transform after:-translate-x-1/2"
                    variant="ghost"
                    size="sm"
                  >
                    Manage
                  </Button>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn && (
        <div className="absolute right-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="dropdown-trigger flex items-center poppins-regular text-sm pl-7 pr-7 min-h-[60px] bg-white/0">
              {isAdmin && (
                <UserRoundCheck className="mr-1" strokeWidth={1.2} size={18} />
              )}
              {userName}
              <ChevronDown className="ml-1" strokeWidth={1} size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="backdrop-blur-md bg-white/60 min-w-0"
              align="center"
            >
              <DropdownMenuItem className="justify-end">个人信息</DropdownMenuItem>
              <DropdownMenuItem className="justify-end">修改密码</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-end" onClick={handleLogout}>
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

export default NavMenu;