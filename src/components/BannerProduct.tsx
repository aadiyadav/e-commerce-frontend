import { useEffect, useState } from "react"

import img1 from "../assets/banner/img1.webp";
import img2 from "../assets/banner/img2.webp";
import img3 from "../assets/banner/img3.jpg";
import img4 from "../assets/banner/img4.jpg";
import img5 from "../assets/banner/img5.webp";

import mobileImg2 from "../assets/banner/img2_mobile.webp";
import mobileImg3 from "../assets/banner/img3_mobile.jpg";
import mobileImg4 from "../assets/banner/img4_mobile.jpg";

const images = [img1, img2, img3, img4, img5];
const mobileImages = [mobileImg2, mobileImg3, mobileImg4];

const BannerProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMobileIndex((prevIndex) => (prevIndex + 1) % mobileImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="lg:w-[1000px] xl:w-[1180px] md:py-2 mx-auto flex justify-center">
    <div className="lg:h-84 xl:h-96 overflow-hidden">
      <div
        className="inset-0 md:flex hidden transition-transform duration-1000 h-full w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className="w-full min-h-full object-cover"
          />
        ))}
      </div>

      <div
        className="inset-0 flex items-center md:hidden transition-transform duration-1000 w-full"
        style={{ transform: `translateX(-${currentMobileIndex * 100}%)` }}
      >
        {mobileImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className="min-w-full h-full object-cover"
          />
        ))}
      </div>
    </div>
    </div>
  );
}

export default BannerProduct