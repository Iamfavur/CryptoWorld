import React, { useState } from 'react';
import { Select,Typography, Row,Col,Avatar,Card } from 'antd';
import moment from "moment";
import { useGetCryptoNewsQuery } from '../Services/cryptoNewsApi';
import { useGetCryptosQuery } from '../Services/cryptoApi';
import Loader from './Loader';

const {Text,Title} = Typography;
const {Option} = Select;

const demoImage ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0iDDUESpvVzkLPsqk_-xkJ2XFRf6eVpsRlw&usqp=CAU"

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const {data:cryptoNews, isError} = useGetCryptoNewsQuery({
    newsCategory, 
    count: simplified ? 6 : 20,
  });

  // console.log(cryptoNews?.value)

  const {data} = useGetCryptosQuery(100);
  if(!cryptoNews?.value) return <Loader/>;
  if(isError) return <Loader/>;
  return (
    <Row gutter={[24,24]}>
      {
        <Col span={24}>
          <Select 
            showSearch
            className='select-news'
            placeholder="Select a crypto"
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option value={coin.name}>

            </Option>)}
          </Select>
        </Col>
      }
      {cryptoNews?.value?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel="noreferrer">
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.name}</Title>
                <img style={{maxWidth:200, maxHeight:200, borderRadius:23}} src={news?.image?.thumbnail.contentUrl || demoImage} alt='img'/>
              </div>
              <p>
                {news.description > 100 ? `${news.description.substring(0,100)}.....` : news.description}
              </p>
              <div className='provider-container' >
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news'/>
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News