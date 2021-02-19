import React from 'react';
import { Layout } from 'antd';
import {} from '@ant-design/icons';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

const { Header, Content } = Layout;

export const Market: React.FC = () => {
    

    return (
        <Router>
            <Layout>
                <Header>
                    <Link style={{ padding: '0 10px' }} to='/services/market'>Market</Link>
                    <Link style={{ padding: '0 10px' }} to='/services/history'>History</Link>
                </Header>
                <Content>
                    <Switch>
                        <Route exact path='/services/market'>
                            <h1>This is market</h1>
                        </Route>
                        <Route path='/services/history'>
                            <h1>This is history</h1>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Router>
    )
}