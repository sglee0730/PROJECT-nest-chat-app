import React, { FC, useEffect, useState } from 'react';
import { Layout, message, Button, Tooltip, Card, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { TaskList } from './task-list';
import styles from '../../styles/style.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { taskState } from '../../store/task.store';
import { GlobalUserState } from '../../store/user.store';

const { Content } = Layout;

export const TaskMangement: FC = () => {
    const user = useRecoilValue(GlobalUserState);
    const [task, setTask] = useRecoilState<any>(taskState);
    const [inputText, setInputText] = useState(null);

    useEffect(() => {
        axios.post('//localhost:5000/task/scan', {
            email: user.email,
        })
        .then(response => setTask(response.data))
        .catch(() => message.error('불러오기 실패'))
    }, [setTask, user])

    const handleOnValueChange = (e: any) => {
        setInputText(e.target.value)
    }

    const buttonOnClick = async () => {
        await axios.post('//localhost:5000/task/create', {
            username: user.username,
            email: user.email,
            description: inputText        
        })

        window.location.reload();
    }

    return(
        <Layout className={styles.layout}>
            <Content className={styles.contentLayout}>
                <TaskList value={task} />
                <Card className={styles.card}>
                    <Input.TextArea rows={6} onChange={handleOnValueChange} />
                    <Tooltip title="추가">
                        <Button 
                            className={styles.button_add} 
                            type="primary" 
                            onClick={buttonOnClick} 
                            shape="circle" 
                            icon={<PlusOutlined />} 
                        />
                    </Tooltip>
                </Card>
            </Content>      
        </Layout>
    )
}