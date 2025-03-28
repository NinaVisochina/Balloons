import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import React from 'react';
import { LoginButtonProps } from './types';
import { GoogleOutlined } from '@ant-design/icons/lib/icons';

const GoogleLoginButton: React.FC<LoginButtonProps> = ({ onLogin, title }) => {
    const login = useGoogleLogin({
        onSuccess: async (authCodeResponse) => {
            console.log("Google Response:", authCodeResponse);
            onLogin(authCodeResponse.access_token); // Передаємо id_token
        },
        onError: (error) => {
            console.error('Login Failed:', error);
            alert('Помилка авторизації через Google: ' + error.error_description);
        },
        flow: 'implicit', // Використовуємо implicit flow для id_token
    });

    return (
        <Button
            className="w-full bg-gradient-to-r from-accent to-pink-500 text-white font-sans px-8 py-3 sm:px-6 sm:py-2 xs:px-4 xs:py-2 rounded-lg shadow-lg hover:from-accentDark hover:to-pink-600 hover:shadow-xl transition duration-300 animate-fadeIn animation-delay-400 text-lg sm:text-base xs:text-sm"
            icon={<GoogleOutlined className="text-white text-lg" />}
            onClick={() => login()}
        >
            {title || "Увійти через Google"}
        </Button>
    );
};

export default GoogleLoginButton;