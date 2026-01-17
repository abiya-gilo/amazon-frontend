import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // required default styles
import styles from "./Carousel.module.css"; // ✅ your CSS Module
import { img } from "./img/data"; // ✅ named export from data.js

function CarouselEffect() {
  return (
    <div className={styles.hero__img}>
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        {img.map((imageItem, index) => (
          <div key={index} className={styles.slide}>
            <img src={imageItem} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
