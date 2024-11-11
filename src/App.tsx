// App.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login, logout } from './slice/authSlice'; // 假设定义了 Redux 的登录和登出 action
import Home from './components/Home';
import NavMenu from './components/NavMenu';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 页面加载时检查用户是否已登录
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/current-user", {
          withCredentials: true  // 确保请求包含 cookie
        });

        if (response.data.isLoggedIn) {
          dispatch(login({ isAdmin: response.data.isAdmin, userName: response.data.userName }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("检查登录状态时出错：", error);
        dispatch(logout());
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  return (
    <>
      <NavMenu />
      <Home />
    </>
  );
};

export default App;