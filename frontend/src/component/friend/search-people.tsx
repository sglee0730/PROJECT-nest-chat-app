import React, { useState, FC } from 'react';
import { Button, Modal, Input, Card } from 'antd';
import { TeamOutlined, QuestionCircleOutlined, GithubOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { GlobalUserState } from '../../store/user.store';
import styles from '../../styles/friend.module.scss';

const { Search } = Input;

const ShowList = (props: any) => {
    const { value, user } = props;
    const onAddUser = (target: any) => {
        axios.post('//localhost:5000/connect', {
            email: user.email,
            target: target
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    return (
        <div>
            {
                value.map((item: any) => {
                    return <Card className={styles.show_list} key={item.email}>
                        <div style={{ float: 'left' }}>
                            <p><UserOutlined style={{ marginRight: '10px' }} />{item.username}</p>
                            <p><GithubOutlined style={{ marginRight: '10px' }} />{item.email}</p>
                        </div>
                        <Button style={{ float: 'right' }} onClick={() => onAddUser(item.email)}>친구 추가</Button>
                    </Card>
                })
            }
        </div>
    )
}

export const SearchPeople: FC = () => {
    const user = useRecoilValue(GlobalUserState)
    const [userList, setUserList] = useState([]);
    const [recommendList, setRecommendList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState({
        search: false,
        recommend: false
    });

    const showModal = (modal: string) => {
        setIsModalVisible((prev) => ({ ...prev, [modal]: true }));
    };

    const disableModal = (modal: string) => {
        setIsModalVisible((prev) => ({ ...prev, [modal]: false }));
        setUserList([]);
    };

    const onSearch = (value: string) => {
        axios.post('//localhost:5000/search', {
            username: value
        })
            .then(response => {
                const { data } = response;
                const { success, result } = data;
                if (success) setUserList(result);
            })
    }

    const onRecommend = () => {
        axios.post('//localhost:5000/recommend', {
            email: user.email,
        })
            .then(response => {
                const { data } = response;
                if (data.success) setRecommendList(data.result);
            })

        showModal('recommend')
    }

    return (
        <div className={styles.search}>
            <div className={styles.help}>
                친구를 찾으시나요?
                <Button className={styles.search_button} onClick={() => showModal('search')} type="default" shape="circle" icon={<TeamOutlined />} />
                <Modal title="Search friend" visible={isModalVisible.search} footer={null} onCancel={() => disableModal('search')}>
                    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    <ShowList value={userList} user={user} />
                </Modal>
            </div>
            <div className={styles.help}>
                알수도 있는 사람들
                <Button className={styles.search_button} onClick={() => onRecommend()} type="default" shape="circle" icon={<QuestionCircleOutlined />} />
                <Modal title="You may know" visible={isModalVisible.recommend} footer={null} onCancel={() => disableModal('recommend')}>
                    <ShowList value={recommendList} user={user} />
                </Modal>
            </div>
        </div>
    )
}

