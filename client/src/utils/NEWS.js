import axios from 'axios'

export default {
    getNews: function(name){
      return   axios.get(`https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${name}&count=3`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
          "x-rapidapi-key": '9e77053e70msh61e74da369993c6p18ae35jsna4cc780e5449',
          "x-bingapis-sdk": "true",
        }
    })

    } 
}