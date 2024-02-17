'use client'
import React from 'react';
import { Card, Row, Col, Input } from 'antd';
import Search from 'antd/es/transfer/search';
import PubSub from 'pubsub-js'
const JumbotronStyle = {
    backgroundColor: '#f7f7f7', // 自定义背景色
    padding: '20px', // 内边距
    textAlign: 'center', // 文本居中
    // 添加更多自定义样式
};

const Jumbotron = () => {
    const onSearch = value => {
        console.log('Input', value)
        if (value === '') return;
        // publish a topic asynchronously
        PubSub.publish('Search', value);
    };
    return (
        <Row>
            <Col span={24}>
                <Card style={JumbotronStyle} >
                    <h1>github用戶名搜索</h1>
                    <Input.Search
                        spellCheck="false"
                        placeholder="輸入搜索內容"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: 200 }}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default Jumbotron;