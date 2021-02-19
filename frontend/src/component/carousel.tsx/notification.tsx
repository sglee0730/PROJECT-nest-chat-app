import { FC, useState } from 'react';
import { Button, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { GlobalUserState } from '../../store/user.store';
import styles from '../../styles/style.module.scss'

interface notiInterface {
    date: string;
    email: string;
    message: string;
    message_id: string;
    isChecked: Boolean;
    producer: string
}

export const Notification: FC = () => {
    const user = useRecoilValue(GlobalUserState);
    const [noti, setNoti] = useState<Array<notiInterface>>([]);

    const handleMouseOver = () => {
        axios.post('//localhost:5000/notification/get', {
            email: user.email
        })
        .then(response => setNoti(response.data.Items))
    }

    const handleCardClick = (item: notiInterface) => {
        axios.post('//localhost:5000/notification/update', {
            email: item.email,
            message_id: item.message_id
        })
    }

    const content = (
        <div>
            {
                noti.map(item => <div className={styles.notification_card} key={item.message_id} onClick={() => handleCardClick(item)} >
                    <p>{item.message}</p>
                    <p>{item.date}</p>
                    <hr style={{ color: 'lightgray' }}/>
                </div>
                )
            }
        </div>
    )

    return (
        <Popover content={content} title='알림'>
            <Button icon={<BellOutlined />} shape='circle' onMouseOver={() => handleMouseOver()} />
        </Popover>
    )
}