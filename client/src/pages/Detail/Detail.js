import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import COIN from "../../utils/COIN";
import './Detail.css';
import { Col, Row, Container } from "../../components/Grid";
import { Card, Card2 } from "../../components/Card";
import NEWS from "../../utils/NEWS";
function Detail(props) {
  // When this component mounts, grab the coin from params
  const { coin } = useParams();
  

  const [state, setState] = useState({ news: [], prices: {} });

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    const remoteNewsPromise = NEWS.getNews(coin.toLowerCase());
    remoteNewsPromise.then((items) => {
      console.log(items);
      const transformedNews = items.data.value; // Whatever logic to put in the correct format
      console.log(transformedNews);
      setState((prevState) => ({
        ...prevState,
        news: transformedNews,
      }));
    });
  }, [coin]);

  useEffect(() => {
    const remoteDataPromise = COIN.getPrice(coin.toLowerCase());
    remoteDataPromise.then((res) => {
      const prices = res.data.prices.map((price) => price[1]);
      const dates = res.data.prices.map((date) =>
        new Date(date[0]).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })
      );

      setState((prevState) => ({
        ...prevState,
        prices: {
          labels: dates,
          datasets: [
            {
              label: "Price",
              data: prices,
              backgroundColor: "rgb(57, 177, 174)",
              borderColor: "rgb(57, 177, 174)",
            },
          ],
        },
      }));
    });
  }, [coin]);

  return (
    <Container fluid>
      <Row>
        <Col size="md-2">
          <div className="mt-3">
            <Link to="/">←</Link> Back to Home
          </div>
        </Col>
      </Row>
      <Row>
        <Container>
      
          <Col size="9">
            <Card style={{backgroundColor: "lightblue"}} title={`${coin} 7 day Price Chart`}>
              <div>
                <Line data={state.prices} options={options} />
              </div>
            </Card>
           
          </Col>
        </Container>
      </Row>
      <Row>
        <h1 className='text-white'>Recent News</h1>
        <Container fluid>
          <div className="card-deck">
            {state.news.map((item) => (
              <Card2 coin={coin} title={item.name} text={item.description} url={item.url} />
            ))}
          </div>
        </Container>
      </Row>
    </Container>
  );
}

export default Detail;
