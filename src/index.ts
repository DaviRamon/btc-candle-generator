import { config } from "dotenv";
import axios from "axios";
config() // variaveis de ambiente


const readMarketPrice = async (): Promise<number> => {
     const result = await axios.get(process.env.BTC_PRICES_API)
     const data = result.data
     const price = data.bitcoin.usd
     return price
}

readMarketPrice()