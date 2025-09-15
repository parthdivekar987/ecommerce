import React from 'react'
import { MainCaroselData } from './MainCaroselData';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const MainCarosel = () => {
const items= MainCaroselData.map((item) => <img className='cursor-pointer'  role='presentation' src={item.image} alt={item.title} />)
 

return (
    <AliceCarousel
        mouseTracking
        items={items}
        autoPlay
        autoPlayInterval={2000}
        disableButtonsControls
        infinite
        />
  )
}

export default MainCarosel