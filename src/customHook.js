import { VEC_DICT } from "./definition"

export const getWindDir = (VEC) => {
    const vec_int = Math.floor((1 * VEC + 22.5 * 0.5) / 22.5)
    return VEC_DICT[vec_int]
}

export const getWeather = (SKY, PTY) => {
    if (PTY == '0') {
        console.log('강수 없음')
        switch (SKY) {
            case '1':
                return '맑음'
            case '3':
                return "구름 많음"
            case '4':
                return "흐림"
            default:
                return '맑음'
        }
    } else {
        console.log("강수 있음")
        switch (PTY) {
            case '1':
                return "비"
            case '2':
                return '비/눈'
            case '3':
                return "눈"
            case '4':
                return '소나기'
            default:
                return '비'
        }
    }
}

export const getCurrentTime = () => {
    let latestHour = "";
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    if (minute > 45) {
        latestHour = hour
    } else {
        time.setHours(time.getHours() - 1);
        latestHour = time.getHours();
    }
    latestHour = latestHour < 10 ? `0${latestHour}` : latestHour

    return { date: dateFormatter(time), time: `${latestHour}00` }
}


export const dateFormatter = (time) => {
    let year = time.getFullYear();
    let month = ("0" + (1 + time.getMonth())).slice(-2);
    let day = ("0" + time.getDate()).slice(-2);
    return year + month + day;
}

export const filterData = (item) => {
    const PTY = item[0].obsrValue
    const T1H = item[3].obsrValue
    const WSD = item[7].obsrValue
    const VEC = getWindDir(item[5].obsrValue)
    const RN1 = item[2].obsrValue

    // getWeather(SKY, PTY)

    return { PTY, T1H, WSD, VEC, RN1 }
}