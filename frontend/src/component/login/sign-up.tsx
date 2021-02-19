import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/sign.module.scss';

export const SignUpPage: React.FC = () => {
    let history = useHistory();
    const [form] = Form.useForm();

    const onFinish = (values: { email: string, password: string, username: string }) => {
        axios.post('//localhost:5000/signup', {
            username: values.username,
            email: values.email,
            password: values.password,
        })
            .then(() => {
                message.success('가입에 성공하였습니다.');
                history.push('/')
            })
            .catch(() => message.error('가입에 실패하였습니다.'))
    };

    return (
        <div className={styles.container}>
            <div className={styles.window}>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <p>Email</p>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: '입력 가능한 이메일 형식이 아닙니다.',
                        },
                        {
                            required: true,
                            message: '이메일을 입력해주세요.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <p>Passwrod</p>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '비밀번호를 입력해주세요',
                        },
                    ]}
                    hasFeedback>
                    <Input.Password />
                </Form.Item>
                <p>Username</p>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '사용자명을 입력해주세요.'
                        }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                        가입
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    );
};