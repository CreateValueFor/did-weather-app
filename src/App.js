import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import clear from "./images/icon_weather_1_day.svg"
import clear_night from "./images/icon_weather_1_night.svg"
import cloud_day from "./images/icon_weather_2_day.svg"
import cloud_night from "./images/icon_weather_2_night.svg"
import fog from "./images/icon_weather_3.svg"
import rain from "./images/icon_weather_4.svg"
import rain_snow from "./images/icon_weather_5.svg"
import snow from "./images/icon_weather_6.svg"
import shower from "./images/icon_weather_7.svg"
import { filterData, dateFormatter, getCurrentTime, getWeather } from './customHook';

// const SERVICE_KEY = "sOhJfqSthcEwtpqskBzX%2FkRGGoB9%2F6fdlLalUTx6ot6EACPP0xziXi5EJljSFofskyvxBg0pJ2LxhDhAsFF1Og%3D%3D"
// const AIR_SERVICE_KEY = "sOhJfqSthcEwtpqskBzX%2FkRGGoB9%2F6fdlLalUTx6ot6EACPP0xziXi5EJljSFofskyvxBg0pJ2LxhDhAsFF1Og%3D%3D"
const BASE_URL = "http://13.209.8.121:8000/"


function Clock() {
  const [time, setTime] = useState();
  const [timeSub, setTimeSub] = useState();
  const [number, setNumber] = useState(0);

  function clock() {
    let time = new Date()

    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()

    let clock_time = ' '
    clock_time += hour > 12 ? hour - 12 : hour
    clock_time += (minute < 10 ? ':0' : ':') + minute

    let clock_time_sub = ''
    clock_time_sub = hour >= 12 ? 'PM' : 'AM'
    setTime(clock_time)
    setTimeSub(clock_time_sub)
  }
  useEffect(async () => {
    const loop = setInterval(() => {
      setNumber((prev) => prev + 1);

      clock()
    }, 1000);

  }, [])

  return (
    <span className="clock">
      <span id="clock_time">{time}</span>
      <span className="guide" id="clock_time_sub">{timeSub}</span>
    </span>
  )

}

function WeatherImage() {
  const [weather, setWeather] = useState(clear);

  // const latestPredictTime = () => {
  //   let latestHour = "";

  //   let time = new Date();
  //   let hour = time.getHours();
  //   let minute = time.getMinutes();

  //   if (minute > 50) {
  //     latestHour = hour
  //   } else {
  //     time.setHours(time.getHours() - 1);
  //     latestHour = time.getHours();
  //   }
  //   latestHour = latestHour < 10 ? `0${latestHour}` : latestHour

  //   return { date: dateFormatter(time), time: `${latestHour}00` }
  // }

  useEffect(async () => {
    // const predict = await axios.get('/pre' + `?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=json&base_date=${latestPredictTime().date}&base_time=${latestPredictTime().time}&nx=62&ny=120`)

    const predict = await axios.get(BASE_URL + 'pre')
    if (predict.data.response.body) {
      let time = new Date()
      let hour = time.getHours()

      const SKY = predict.data.response.body.items.item[19].fcstValue
      const PTY = predict.data.response.body.items.item[7].fcstValue

      const weather = getWeather(SKY, PTY);

      switch (weather) {
        case "맑음":
          if (hour >= 19 || hour < 6) {
            setWeather(clear_night)
          } else {
            setWeather(clear)
          }
          break;
        case '구름 많음':
          if (hour >= 19 || hour < 6) {
            setWeather(cloud_night)
          } else {
            setWeather(cloud_day)
          }
          break;
        case '흐림':
          setWeather(fog)
          break;
        case "비":
          setWeather(rain)
          break;
        case '비/눈':
          setWeather(rain_snow)
          break;
        case '눈':
          setWeather(snow)
          break;
        case '소나기':
          setWeather(shower)
          break;
        default:
          console.log('something wrong')
          break;
      }
    }
    const loop = setInterval(async () => {
      // const predict = await axios.get('/pre' + `?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=json&base_date=${latestPredictTime().date}&base_time=${latestPredictTime().time}&nx=62&ny=120`)
      const predict = await axios.get(BASE_URL + 'pre')
      if (predict.data.response.body) {
        let time = new Date()
        let hour = time.getHours()

        const SKY = predict.data.response.body.items.item[19].fcstValue
        const PTY = predict.data.response.body.items.item[7].fcstValue

        const weather = getWeather(SKY, PTY);

        switch (weather) {
          case "맑음":
            if (hour >= 19 || hour < 6) {
              setWeather(clear_night)
            } else {
              setWeather(clear)
            }
            break;
          case '구름 많음':
            if (hour >= 19 || hour < 6) {
              setWeather(cloud_night)
            } else {
              setWeather(cloud_day)
            }
            break;
          case '흐림':
            setWeather(fog)
            break;
          case "비":
            setWeather(rain)
            break;
          case '비/눈':
            setWeather(rain_snow)
            break;
          case '눈':
            setWeather(snow)
            break;
          case '소나기':
            setWeather(shower)
            break;
          default:
            console.log('something wrong')
            break;
        }
      }
      console.log('업데이트 주기 시작 60초단위')
    }, 60000);

  }, [])
  return (
    <span className="image_icon_weather">
      <img src={weather} id="image_icon_weather" />
    </span>
  )
}




function App() {

  const [PTY, setPTY] = useState();
  const [T1H, setT1H] = useState();
  const [WSD, setWSD] = useState();
  const [VEC, setVEC] = useState();
  const [RN1, setRN1] = useState();
  const [PM10, setPM10] = useState();


  useEffect(async () => {
    // const air = await axios.get(`/air?serviceKey=${AIR_SERVICE_KEY}&returnType=json&numOfRows=100&pageNo=1&sidoName=%EA%B2%BD%EA%B8%B0&searchCondition=DAILY`)
    const air = await axios.get(BASE_URL + 'air')
    if (air.data.response.body) {
      const data = air.data.response.body.items[51]
      setPM10(data.pm10Value)
    }

    const loop = setInterval(async () => {
      console.log('1초 단위 루프 실행됨')
      // const air = await axios.get(`/air?serviceKey=${AIR_SERVICE_KEY}&returnType=json&numOfRows=100&pageNo=1&sidoName=%EA%B2%BD%EA%B8%B0&searchCondition=DAILY`)
      const air = await axios.get(BASE_URL + 'air')
      if (air.data.response.body) {
        const data = air.data.response.body.items[51]
        setPM10(data.pm10Value)
      }
    }, 3600000);
  }, [])
  useEffect(async () => {
    // const current = await axios.get('/cur' + `?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=json&base_date=${getCurrentTime().date}&base_time=${getCurrentTime().time}&nx=62&ny=120`)
    const current = await axios.get(BASE_URL + 'cur')
    if (current.data.response.body) {
      const item = current.data.response.body.items.item
      const { PTY, T1H, WSD, VEC, RN1 } = filterData(item)
      setPTY(PTY)
      setT1H(T1H)
      setWSD(WSD)
      setRN1(RN1)
      setVEC(VEC)
    }
    const loop = setInterval(async () => {
      // const current = await axios.get('/cur' + `?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=json&base_date=${getCurrentTime().date}&base_time=${getCurrentTime().time}&nx=62&ny=120`)
      const current = await axios.get(BASE_URL + 'cur')
      if (current.data.response.body) {
        const item = current.data.response.body.items.item
        const { PTY, T1H, WSD, VEC, RN1 } = filterData(item)
        setPTY(PTY)
        setT1H(T1H)
        setWSD(WSD)
        setRN1(RN1)
        setVEC(VEC)
      }
    }, 60000);
  }, [])

  return (
    <div className="App">
      <div className="page-content">
        <div id="header">

          <WeatherImage />
          <div id="header_temp">
            <span className="temperature" id="temp">{T1H}
              <span className='temperature-index'>℃</span>
            </span>

          </div>
          <div id="header_explain">
            <Clock />
            <span className="address">경기도 용인시기흥구 신갈동 </span>
          </div>
        </div>
        <div className="subinfo">
          <div className="head_underline"></div>
          <div className="info_box">
            <span className="text1">풍속</span>
            <span className="text2">WIND SPEED</span>
            <span className="text3"
            ><span id="ws">{WSD}</span><span className="guide">m/s</span></span>
          </div>
          <div className="info_box">
            <span className="text1">풍향</span>
            <span className="text2">WIND DIRECTION</span>
            <span className="text3">{VEC}<span id="wdKor"></span></span>
          </div>
          <div className="subinfo_sub">
            <div className="info_box">
              <span className="text1">강수량</span>
              <span className="text2">PRECIPITATION</span>
              <span className="text3"
              ><span id="r06">{RN1}</span><span className="guide">mm</span>
              </span>
            </div>
            <div className="info_box nounderline">
              <span className="text1">미세먼지</span>
              <span className="text2">FINE DUST</span>
              <span className="text3"
              ><span id="pm10Value" className="">{PM10}</span><span className="guide">㎍/㎥</span></span>
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
