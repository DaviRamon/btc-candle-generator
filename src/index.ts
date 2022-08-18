import { config } from "dotenv";
import axios from "axios";
import Period from "./enums/Period";
import Candle from "./models/Candle";
config() // variaveis de ambiente


const readMarketPrice = async (): Promise<number> => {
     const result = await axios.get(process.env.BTC_PRICES_API)
     const data = result.data
     const price = data.bitcoin.usd
     return price
}


const generateCandles = async () => {

     while (true) {

          const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS
          const candle = new Candle('BTC', new Date());

          console.log('Generating candle');
          for (let i = 0; i < loopTimes; i++) {
               const price = await readMarketPrice()
               candle.addValue(price)
               console.log(`Market price #${i + 1} of ${loopTimes}`)
               await new Promise(r => setTimeout(r, Period.TEN_SECONDS)).catch(() =>{})
           }


           candle.closeCandle()
           console.log('Candle close')
           const candleObj = candle.toSimpleObject()
           console.log(candleObj)
           console.log('Candle sent to queue')

     }
}

generateCandles();