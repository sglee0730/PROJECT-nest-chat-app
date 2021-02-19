import { FC } from 'react';
import { Typography, Card } from 'antd';
import { useRecoilValue } from 'recoil';
import { messageState, roomState } from '../../store/chat.store';
import { GlobalUserState } from '../../store/user.store';
import styles from '../../styles/chat.module.scss';
import broken from '../../styles/broken.png';

const { Text } = Typography;

export const Message: FC = () => {
    const messages = useRecoilValue<any>(messageState);
    const room = useRecoilValue<string>(roomState);
    const user = useRecoilValue(GlobalUserState);

    return (
        <Text>
            {messages[room].map((value: any, index: number) => {
                if (typeof value !== 'string') {
                    return <Card 
                        hoverable
                        key={index} 
                        style={{ width: 240 }}
                        cover={<img src={value.data.previewImage? `data:image/png;base64, ${value.data.previewImage}` : value.data.ogImage.url } alt={broken} />}
                        >
                            <Card.Meta title={value.data.ogTitle} description="" />
                        </Card>
                }
                return <div className={styles.speech} key={index}>{user.username}: {value}</div>
            })}
        </Text>
    )
}