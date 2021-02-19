import { FC, useEffect } from 'react';
import { Form, Input, Button, message, Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { GlobalUserState } from '../../store/user.store';
import styles from '../../styles/sign.module.scss';
import { useCookies } from 'react-cookie';

const { sessionStorage } = window;

export const LoginPage: FC = () => {
    let history = useHistory();
    const setUser = useSetRecoilState(GlobalUserState);
    const [cookie,,] = useCookies(['auth_token'])

    useEffect(() => {
        const signSession = { 
            username: sessionStorage.getItem('username'), 
            email: sessionStorage.getItem('email') 
        };

        if (signSession.email && signSession.username) history.push('/services/chat');
        
        if (cookie.auth_token) {
            axios.get('//localhost:5000/account/auth', { withCredentials: true })
            .then(response => {
                setUser({ username: response.data.username, email: response.data.email });
                history.push('/services/chat');
            })
        }
    }, [])

    const onFinish = (values: { username: string, password: string, remember: boolean }) => {
        axios.post('//localhost:5000/account/signin', {
            email: values.username,
            password: values.password,
        }, { withCredentials: true })
        .then(response => {
            const { data } = response;
            setUser({ username: data.username, email: data.email });
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('email', data.email);
            
            history.push('/services/chat');
        })
        .catch(() => message.error('로그인에 실패했습니다. 다시 시도해주세요'))
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error('로그인 실패');
        console.error(errorInfo);
    };

    return (
        <Layout className={styles.container}>
            <div className={styles.window}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                        <p>Email</p>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '아이디를 입력해주세요!' }]}>
                        <Input />
                    </Form.Item>
                    <p>Password</p>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' style={{ width: '100%' }} htmlType="submit">
                            로그인
                    </Button>
                    </Form.Item>
                </Form>
            <p style={{ textAlign: 'center' }}>계정이 없으시다면 <a href="_blank" onClick={() => history.push('/signup')}>회원가입</a></p>
            </div>
        </Layout>
    )
}