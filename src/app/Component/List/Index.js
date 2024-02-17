'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Row, Col, Input } from 'antd';
import PubSub from 'pubsub-js'
import axios from 'axios'
const List = () => {
    // Your component logic here
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    useEffect(() => {
        // 在这里编写您希望在组件首次渲染后执行的代码
        console.log('组件已挂载');
        var mySubscriber = async function (msg, data) {
            console.log(msg, data);
            var searchTerm = data;
            setIsFirstLoad(false);
            setIsLoading(true);
            setError(null);
            setUsers(null);
            //取得user
            console.log("正在搜尋");
            try {
                const response = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);
                setUsers(response.data.items); // 假设您想要的数据在 items 属性中
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError(error);
            }
            setIsLoading(false);
        };
        // 订阅消息
        var token = PubSub.subscribe('Search', mySubscriber);

        // 如果需要，可以在这里返回一个清理函数
        // 它会在组件卸载时执行
        return () => {
            console.log('组件将卸载');
            // unsubscribe this subscriber from this topic
            PubSub.unsubscribe(token);
        };
    }, []); // 空依赖数组确保效果仅在首次渲染后运行

    return (
        <Row gutter={[16, 16]}>
            {isFirstLoad ? (
                <h1>尚未進行搜尋</h1>
            ) : isLoading ? (
                <h1>正在搜尋</h1>
            ) : error != null ? (
                <h1>{error}</h1>
            ) : (!users || users.length === 0) ? (
                <h1>未搜尋到任何使用者</h1>
            ) : (
                users.map((user) => (
                    <Col key={user.id} xs={12} sm={12} md={6} lg={6} xl={4}>
                        <Card>
                            <a href={user.html_url} style={{ textDecoration: 'none' }}>
                                <img loading="lazy" src={user.avatar_url} alt="用戶圖片" style={{ width: '100%', display: 'block' }} />
                                <h1 style={{ textAlign: 'center', textDecoration: 'underline' }}>{user.login}</h1>
                            </a>
                        </Card>

                    </Col>
                ))
            )}
        </Row>
    );
};

export default List;
