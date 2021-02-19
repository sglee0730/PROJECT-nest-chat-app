import { FC } from 'react';
import { Layout } from 'antd';
import { Friends } from './component/friend/friends';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage } from './component/login/sign-in';
import { Chats } from './component/chat/chat';
import { SignUpPage } from './component/login/sign-up';
import { TaskMangement } from './component/task/task-management';
import styles from './styles/style.module.scss'
import { Carousel } from './component/carousel.tsx/carousel';

const { Header } = Layout;

export const Main: FC = () => {
    return (
        <Layout className={styles.layout}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <LoginPage />
                    </Route>
                    <Route path='/signup'>
                        <SignUpPage/>
                    </Route>
                    <Route path='/services'>
                        <Layout>
                            <Header className={styles.header}>
                                <Carousel />
                            </Header>
                            <Route path='/services/chat'>
                                <Chats />
                            </Route>
                            <Route path='/services/task'>
                                <TaskMangement />
                            </Route>
                            <Route path='/services/friend'>
                                <Friends />
                            </Route>
                        </Layout>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Layout>
    );
};