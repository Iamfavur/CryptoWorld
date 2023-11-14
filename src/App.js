import React from 'react'
import { Route, Routes, Link} from 'react-router-dom'
import "./App.css"
import {Typography, Space, Layout} from "antd";
// import "antd/dist/antd.css";

import {Navigate, Homepages,Exchanges,CryptoDetails,News,Currency} from "./Components"


function App() {
  return (
    <div className="App">
      
      <div className='navbar'>
        <Navigate/> 
      </div>
      <div className='main'>
        <Layout> 
          <div className='routes'>
            <Routes>
              <Route path='/' element={<Homepages/>}/>
              <Route path='/exchanges' element={<Exchanges/>}/>
              <Route path='/cryptocurrencies' element={<Currency/>}/>
              <Route path='/crypto/:coinUuid' element={<CryptoDetails/>}/>
              <Route path='/news' element={<News/>}/>
              <Route path='*' element="404 Route Does not Exist."/>
            </Routes>
          </div>
        </Layout>
      
        <div className='footer' level={5} >
          <Typography.Title style={{color:'white', textAlign:"center" }}>
              CryptoWorld <br/> 
              All rights reserved 
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
