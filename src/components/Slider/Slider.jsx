import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Slider/Slider.css";
import Slide from "../Slide/Slide";
import { Profileimg } from "../../AssetsFolder/Images";

const Slider = () => {
  const comments = [
    {
      id: 1,
      comment: "Great post! Really insightful.",
      imgSource: Profileimg,
    },
    {
      id: 2,
      comment: "I love this perspective, thanks for sharing!",
      imgSource: Profileimg,
    },
    {
      id: 3,
      comment: "Interesting take, but I have a different opinion.",
      imgSource: Profileimg,
    },
    {
      id: 4,
      comment: "Could you elaborate more on this point?",
      imgSource: Profileimg,
    },
    {
      id: 5,
      comment: "This is exactly what I was looking for!",
      imgSource: Profileimg,
    },
    {
      id: 6,
      comment: "I learned something new today, thanks!",
      imgSource: Profileimg,
    },
    {
      id: 7,
      comment: "Do you have any sources to back this up?",
      imgSource: Profileimg,
    },
    {
      id: 8,
      comment: "I completely agree with this!",
      imgSource: Profileimg,
    },
    {
      id: 9,
      comment: "This was very helpful, appreciate it.",
      imgSource: Profileimg,
    },
    {
      id: 10,
      comment: "Looking forward to more content like this!",
      imgSource: Profileimg,
    },
  ];

  return (
    <div className="slider-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={true}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {comments.map((item) => {
          return (
            <SwiperSlide>
              <Slide {...item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
