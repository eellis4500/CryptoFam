import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Line }from 'react-chartjs-2'
import COIN from '../../utils/COIN'

import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";


function Detail(props) {


  // When this component mounts, grab the coin from params
  const { coin } = useParams();

  const [price, setPrice] = useState({})
  

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

  
  useEffect(()=>{
    COIN.getPrice(coin.toLowerCase())
      .then(res=>{
       const prices = res.data.prices.map(price =>price[1])
       const dates = res.data.prices.map(date =>{
        return new Date(date[0]).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
       })
    
        setPrice(prevPrices => ({
          ...prevPrices,
          labels: dates,
          datasets:[{
            label: 'Price',
            data: prices,
            backgroundColor: 'rgb(39, 177, 77)',
            borderColor: 'rgb(39, 177, 77)',
          }]
          
        }))
      })
  },[coin])
  

  return (
      <Container fluid>
        <Row>
          <Col size="md-2">
            <div className="mt-3"><Link to="/">←</Link> Back to Home</div>
          </Col>
        </Row>
        <Row>
          <Container>
          <Col size="md-12">
            <Card title={`${coin} 7 day Price Chart`}>
              <div>
              <Line
                    data={price}
                    options={options}
                  />
              </div>
            </Card>
          </Col>
          </Container>

        </Row>
        <Row>
          <Container fluid>
            <h1>Market Analysis</h1>
          </Container>
        </Row>
      </Container>
    );
  }


export default Detail;
