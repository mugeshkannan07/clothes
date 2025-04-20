import React from 'react'
import '../css/home.css'
import Carousel from 'react-bootstrap/Carousel';
import { Allproduct } from './Allproduct';
import hero1 from '../assets/collection.png'
import hero2 from '../assets/style.png'
import hero3 from '../assets/clothing_retro.jpg'
import Brand from './Brand';
import About from './About';


export const Home = () => {
  return (
    <div className="carouse">
    <Carousel>
      <Carousel.Item>
        <img src={hero1}  alt="" />
        <Carousel.Caption>
          <div className="car1">
            
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       <img src={hero2} alt="" />
        <Carousel.Caption>
        <div className="car2">
            
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={hero3} alt="" />
        <Carousel.Caption>
        <div className="car3">
            
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <Allproduct />
    <Brand/>
    <About/>
    </div>
  );

}



