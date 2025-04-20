import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../css/footer.css'
import cloths from '../assets/elitewear.png'
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row> 
          <Col lg={3} md={6} sm={6} xs={6}>
            <div className='part1'>
                 
              <ul>
                <li><div className="image">
      <Link to='/'><img src={cloths} width={100}  alt="CLOTHINGS"/></Link>
      </div></li>
                <li><a href="/">Help & Support</a></li>
                <li><a href="/">Partner with us</a></li>
                <li><a href="/">Ride with us</a></li>
              </ul>    
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className='part2'>
              
              <ul>
                <li><h4>About</h4></li>
                <li><a href="/">About Us</a></li>
                <li><a href="/">Home</a></li>
                <li><a href="/">FAQ</a></li>
              </ul>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className="part3">
              
              <ul>
                <li><h4>Brand</h4></li>
                <li><a href="/">Max</a></li>
                <li><a href="/">Allen Solly</a></li>
                <li><a href="/">Zudio</a></li>
                <li><a href="/">Trends</a></li>
              </ul>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className="part4">
              
              <ul>
                <li><h4>Legal</h4></li>
                <li><a href="/">Terms & Conditions</a></li>
                <li><a href="/">Cookie Policy</a></li>
                <li><a href="/">Privacy Policy</a></li>
                <li><a href="/">Investor Relations</a></li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
