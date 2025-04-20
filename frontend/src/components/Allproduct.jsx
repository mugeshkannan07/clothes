import React, {  useContext, useEffect } from 'react'
import { ProductDetails } from './ProductDetails'
import { Col, Row, Container } from 'react-bootstrap'
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';

export const Allproduct = () => {
  const {arrivesData, setArrivesData} = useContext(ProductContext)

  useEffect(() => {
    const fetchArrives = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/clothes/category/arrives");
        setArrivesData(response.data);
      } catch (error) {
        console.error("Error fetching arrives data:", error);
      }
    };
    fetchArrives();
  }, []);

 return (
  <div className='new'>
    <h1>NEW ARRIVALS</h1>
    <div className='allproduct'>
      <Container>
        <Row>
          {arrivesData.map((product) => (
            <Col lg={3} md={6} sm={6} xs={6} key={product._id}>
              <ProductDetails pro={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  </div>
)
}



