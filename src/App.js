import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import clear from "./images/icon_weather_1_day.svg"
// import { clock } from "./custom"

function App() {
  const [time, setTime] = useState();
  const [timeSub, setTimeSub] = useState();
  const [number, setNumber] = useState(0);

  function clock() {
    var time = new Date()

    var hour = time.getHours()
    var minute = time.getMinutes()
    var second = time.getSeconds()

    var clock_time = ' '
    clock_time += hour > 12 ? hour - 12 : hour
    clock_time += (minute < 10 ? ':0' : ':') + minute

    var clock_time_sub = ''
    clock_time_sub = hour >= 12 ? 'PM' : 'AM'

    setTime(clock_time)
    setTimeSub(clock_time_sub)



  }

  const getWeather = async () => {
    const res = await axios.get('/api' + '?serviceKey=sOhJfqSthcEwtpqskBzX%2FkRGGoB9%2F6fdlLalUTx6ot6EACPP0xziXi5EJljSFofskyvxBg0pJ2LxhDhAsFF1Og%3D%3D&pageNo=1&numOfRows=1000&dataType=json&base_date=20220126&base_time=0600&nx=62&ny=120')
    return res.data.response.body.items
  }
  useEffect(async () => {
    const loop = setInterval(() => {
      setNumber((prev) => prev + 1);

      clock()
    }, 1000);
    // const data = await getWeather()
    const res = await axios.get('/api' + '?serviceKey=sOhJfqSthcEwtpqskBzX%2FkRGGoB9%2F6fdlLalUTx6ot6EACPP0xziXi5EJljSFofskyvxBg0pJ2LxhDhAsFF1Og%3D%3D&pageNo=1&numOfRows=1000&dataType=json&base_date=20220126&base_time=0600&nx=62&ny=120')
    console.log(res)
  }, [])

  return (
    <div className="App">
      <div className="page-content">
        <div id="header">
          <span className="image_icon_weather">


            <img src={clear} id="image_icon_weather"
            /></span>
          <div id="header_temp">
            <span className="temperature" id="temp">0</span>
            <span className="temperature_guide">℃</span>
          </div>
          <div id="header_explain">
            <span className="clock">
              <span id="clock_time">{time}</span>
              <span className="guide" id="clock_time_sub">{timeSub}</span>
            </span>
            <span className="address">경기도 용인시기흥구 신갈동 </span>
          </div>
        </div>
        <div className="subinfo">
          <div className="head_underline"></div>
          <div className="info_box">
            <span className="text1">풍속</span>
            <span className="text2">WIND SPEED</span>
            <span className="text3"
            ><span id="ws">0</span><span className="guide">m/s</span></span>
          </div>
          <div className="info_box">
            <span className="text1">풍향</span>
            <span className="text2">WIND DIRECTION</span>
            <span className="text3">북<span id="wdKor">동</span></span>
          </div>
          <div className="subinfo_sub">
            <div className="info_box">
              <span className="text1">강수량</span>
              <span className="text2">PRECIPITATION</span>
              <span className="text3"
              ><span id="r06">0.0</span><span className="guide">mm</span>
              </span>
            </div>
            <div className="info_box nounderline">
              <span className="text1">미세먼지</span>
              <span className="text2">FINE DUST</span>
              <span className="text3"
              ><span id="pm10Value" className="">0</span><span className="guide">㎍/㎥</span></span>
            </div>
            <div className="fine_dust_guide">
              <span className="status1">좋음 0 ~ 30</span>
              <span className="status2">보통 31 ~ 80</span>
              <span className="status3">나쁨 81 ~ 150</span>
              <span className="status4">매우나쁨 151 ~</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
