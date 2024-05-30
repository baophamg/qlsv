import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function LoginRouter({ children }) {
    const isLogin = useSelector(state => state.isLogin);
    if (isLogin) {
        //nếu đã login rồi thì vào trang chủ
        return <Navigate to='/' />
    }
    // chưa login thì vào trang login
    return children;
}
