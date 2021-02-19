import { FC, useEffect } from 'react';
import styles from '../../styles/style.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { Notification } from './notification';
import { useRecoilState } from 'recoil';
import { GlobalUserState } from '../../store/user.store';

const { sessionStorage } = window;

export const Carousel: FC = () => {
    const [user, setUser] = useRecoilState(GlobalUserState)
    const history = useHistory();

    useEffect(() => {
        if (user.email === 'none') {
            const username = sessionStorage.getItem('username');
            const email = sessionStorage.getItem('email');

            if (!username || !email) history.push('/');
            else setUser({ username: username, email: email })
        }
    }, [user, setUser, history])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <Link className={styles.link} to='/services/chat'>채팅</Link>
                        </th>
                        <th>
                            <Link className={styles.link} to='/services/friend'>친구</Link>
                        </th>
                        <th>
                            <Link className={styles.link} to='/services/task'>업무</Link>
                        </th>
                        <th>
                            <Link className={styles.link} to='/services/market'>마켓</Link>
                        </th>
                        <th style={{ width: '70%' }}></th>
                        <th><Notification /></th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}
