import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row,Typography,Select } from 'antd';
import { MoneyCollectOutlined,DollarCircleOutlined,ExclamationCircleOutlined,StopOutlined,TrophyOutlined, NumberOutlined,ThunderboltOutlined, FundOutlined, CheckOutlined} from '@ant-design/icons';
import { useGetCryptoDetailsQuery,useGetCryptoHistoryQuery } from '../Services/cryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';

const {Title, Text} = Typography;
const {Option} = Select;

const CrypoDetails = () => {
  const {coinUuid} = useParams();

  const [timePeriod, setTimePeriod] = useState("7d");
  const {data, isFetching } = useGetCryptoDetailsQuery(coinUuid);
  const {data: coinHistory } = useGetCryptoHistoryQuery({coinUuid,timePeriod});
  // console.log(coinHistory);
  const cryptoDetails= data?.data?.coin;

  if(isFetching) return <Loader/>

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <>
    <Col className='coin-detail-cointainer'>
      <Col className='coin-heading-cointainer'>
        <Title level={2} className='coin-name'>
          {cryptoDetails?.name}-{cryptoDetails?.symbol} Price
        </Title>
        <p>
          {cryptoDetails?.name} live price is US dollars.
          View value statictics, market cap and supply.
        </p>
      </Col>
      <Select defaultValue={timePeriod} className='select-timeperiod' placeholder="Select time period" onChange={(value) => (setTimePeriod(value))}>
        {time.map((date) => <Option key={date}> {date} </Option>)}
      </Select>
    </Col>

     { /* line chart */}
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name}/>
     { /* line chart */}

     <Col className='stats-container'>
       <Col className='coin-value-statistics'>
         <Col className='coin-value=statistics-heading'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails?.name} Value Statistics
          </Title>
          <p>
            An overview showing the stats of {cryptoDetails?.name}
          </p>
         </Col>
         {stats.map(({icon, title, value})=>(
          <Col className='coin-stats'>
            <Col className='coin-stats-name'>
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className='stats'>{value}</Text>
          </Col>
         ))}
       </Col>

          {/* ................ */}
        <Col className='other-stats-info'>
         <Col className='coin-value=statistics-heading'>
          <Title level={3} className='coin-details-heading'>
            Other Statistics
          </Title>
          <p>
            An overview showing the stats of all cryptocurrencies
          </p>
         </Col>
         {genericStats.map(({icon, title, value})=>(
          <Col className='coin-stats'>
            <Col className='coin-stats-name'>
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className='stats'>{value}</Text>
          </Col>
         ))}
        </Col>
          {/* ................... */}
     </Col>
     <Col className='coin-desc-link'>
          <Row className='coin-desc'>
            <Title level={3} className='coin-details-heading' >
              What is {cryptoDetails?.name}? <br></br>
              {cryptoDetails?.description}
            </Title>
          </Row>
          <Col className='coin-links'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails?.name} Links
            </Title>
            {cryptoDetails?.links?.map((link)=>(
              <Row className='coin-link' key={link?.name}>
                <Title level={5} className='link-name'>{link?.type}</Title>
                <a href={link?.url} target='_blank' rel="noreferrer">
                  {link?.name}
                </a>
              </Row>
            ))}
          </Col>
     </Col>
    </>
  )
}

export default CrypoDetails