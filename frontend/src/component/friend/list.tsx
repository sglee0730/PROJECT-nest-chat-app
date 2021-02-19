import { CloseOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Card, message } from 'antd';
import styles from '../../styles/friend.module.scss';
import axios from 'axios';
import { FriendsState } from '../../store/friend.store';
import { useSetRecoilState } from 'recoil';

interface friendInterface {
    email: string,
    username: string,
}

export const List = (props: { value: any[], user: friendInterface }) => {
    const { value, user } = props;
    const setFriends = useSetRecoilState<any>(FriendsState);

    const handleRemove = (target: string) => {
        axios.post('//localhost:5000/disconnect', {
            email: user.email,
            target: target
        })
        .then(response => message.success(response.data.message));

        axios.post('//localhost:5000/getfriends', {
            username: user.username,
            email: user.email,
        })
        .then(response => setFriends(response.data.result));
    } 

    return (
        <div className={styles.list}>
            {
                value.map((item: friendInterface) => {
                    return <Card key={item.email} className={styles.card}>
                        <SmileOutlined className={styles.photo} />
                        <div className={styles.profile}>
                            <p>{item.username}</p>
                            <p>{item.email}</p>
                        </div>
                        <Button className={styles.remove} icon={<CloseOutlined />} shape='circle' onClick={() => handleRemove(item.email)} />
                    </Card>
                })
            }
        </div>
    )
}