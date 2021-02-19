import { FC, useEffect, useState } from 'react';
import { Layout, Typography, Input, Button, Tag } from 'antd';
import socketIoClient from 'socket.io-client';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { messageState, roomState } from '../../store/chat.store';
import validUrl from 'valid-url';
import axios from 'axios';
import styles from '../../styles/chat.module.scss';
import { Message } from './message';

const { Header, Content, Footer } = Layout;
const socket = socketIoClient('//localhost:8000');

export const Chats: FC = () => {
    const [inputText, setInputText] = useState("");
    const [room, setRoom] = useRecoilState<string>(roomState);
    const setMessages = useSetRecoilState<any>(messageState);
    
    useEffect(() => {   
        socket.on('msgToClient', (newMsg: { message: any, destination: string }) => {
            setMessages((msg: any) => ({...msg, [newMsg.destination]: msg[newMsg.destination].concat(newMsg.message)}));
        });
    }, [setMessages])

    const handleKeyPress = (e: any): void => {
        if (e.key === 'Enter') {
            socket.emit('msgToServer', { message: e.target.value, destination: room });

            if (validUrl.isUri(e.target.value)) {
                axios.post('//localhost:5000/scraper', {
                    url: e.target.value
                })
                .then(response => {
                    socket.emit('msgToServer', { message: response, destination: room })
                })

            }
            setInputText("")
        };
    };

    const handleValueChage = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputText(e.target.value);
    };

    const handleButtonClick = (roomname: string) => {
        setRoom(roomname);
    };   

    return (
        <Layout className={styles.contentLayout}>
            <Header className={styles.header}>
                <Typography>
                    <Button onClick={() => handleButtonClick('ReactJS')}>ReactJS</Button>
                    <Button onClick={() => handleButtonClick('NestJS')}>NestJS</Button>
                    <Button onClick={() => handleButtonClick('Typescript')}>Typescript</Button>
                    <Button onClick={() => handleButtonClick('NodeJS')}>NodeJS</Button>
                    <Button onClick={() => handleButtonClick('MySQL')}>MySQL</Button>
                    <Button onClick={() => handleButtonClick('AWS')}>AWS</Button>
                    <Button onClick={() => handleButtonClick('Docker')}>Docker</Button>
                    <Button onClick={() => handleButtonClick('Redis')}>Redis</Button>
                    <Button onClick={() => handleButtonClick('ElasticSearch')}>ElasticSearch</Button>
                    <Button onClick={() => handleButtonClick('Kubernetes')}>Kubernetes</Button>
                </Typography>
            </Header>
            <Content className={styles.content}>
                <Typography>
                    <Tag color="#f50">{room}</Tag>
                    <Message />
                </Typography>
            </Content>
            <Footer className={styles.footer}>
                <Input
                    className={styles.input}
                    placeholder="Aa"
                    value={inputText}
                    onChange={handleValueChage}
                    onKeyPress={handleKeyPress} />
            </Footer>
        </Layout>
    )
}