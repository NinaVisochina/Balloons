import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import React from 'react';
import { LoginButtonProps } from './types';

const GoogleLoginButton: React.FC<LoginButtonProps> = ({ onLogin, title, icon }) => {
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
        <Button className={"google-login-button"} icon={icon} onClick={() => login()}>
            {title}
        </Button>
    );
};

export default GoogleLoginButton;