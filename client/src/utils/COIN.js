import axios from 'axios'

export default {
    getPrice: function(name){
      return  axios.get(`https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=7&interval=daily
      `)
    }
 
}