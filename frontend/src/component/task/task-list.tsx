import { Card, Input, Button, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from '../../styles/style.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const TaskList = (props: { value: Array<any> }) => {
    const [text, setText] = useState<string | null>(null)
    const tasks = props.value;

    useEffect(() => {})

    const deleteTask = (item: any) => {
        axios.post('//localhost:5000/task/delete', {
            _id: item._id
        })
        .then(() => message.success('Task를 성공적으로 삭제했습니다!'))
        .catch(() => message.error('삭제에 실패했습니다...'));

        window.location.reload();
    }

    const updateTask = async (item: any) => {
        axios.post('//localhost:5000/task/update', {
            _id: item._id,
            description: text
        })
        .then((response) => console.log(response.data))
        .catch(() => message.error('변경에 실패했습니다...'));

        window.location.reload();
    }

    return (
        <div>
            {
                tasks.map((item, index) => {
                    const date = moment(new Date(item.date)).format('YYYY-MM-DD HH:mm');

                    return <Card className={styles.card} title={date} key={index}>
                        <Input.TextArea 
                            rows={4} 
                            defaultValue={item.description} 
                            onChange={(e) => setText(e.target.value)} 
                        />
                        <div className={styles.task_controller}>
                            <Button onClick={() => updateTask(item)} shape='circle' icon={<CheckCircleOutlined />} />
                            <Button onClick={() => deleteTask(item)} shape='circle' icon={<CloseCircleOutlined />} />
                        </div>
                    </Card>
                })
            }
        </div>
    )
}