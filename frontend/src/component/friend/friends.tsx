import { useEffect, FC } from 'react';
import { Layout } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GlobalUserState } from '../../store/user.store';
import axios from 'axios';
import { FriendsState } from '../../store/friend.store';
import styles from '../../styles/friend.module.scss';
import { List } from './list';
import { SearchPeople } from './search-people';

const { Content } = Layout;

export const Friends: FC = () => {
    const [friends, setFriends] = useRecoilState<any>(FriendsState);
    const user = useRecoilValue(GlobalUserState);

    useEffect(() => {
        axios.post('//localhost:5000/getfriends', {
            username: user.username,
            email: user.email,
        })
        .then(response => setFriends(response.data.result));
    }, [setFriends, user])

    return (
        <Layout className={styles.contentLayout}>
            <Content className={styles.content}>
                <div className={styles.container}>
                    <p className={styles.number}>{friends.length}명의 친구</p>
                    <List value={friends} user={user} />
                </div>
                <div className={styles.container}>
                    <SearchPeople />
                </div>
            </Content>
        </Layout>
    )
}
