import Slider from "react-slick";

import { topVolunteer } from "../data/Data";
import Avatar, { genConfig } from "react-nice-avatar";

const VolunteerOftheMonth = () => {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="w-full h-[600px]  max-md:h-auto bg-gray-200 py-10 overflow-auto px-10">
      <p className="mb-8 text-center text-black font-extrabold text-5xl max-sm:text-xl md:mb-16">
        Volunteer Of the Month
      </p>
      <Slider {...settings}>
        {topVolunteer.map((volunteer) => {
          const { id, name, location, image } = volunteer;
          return (
            <div
              key={id}
              className="w-auto pb-10 mx-6 my-1 flex flex-col items-center rounded-t-full"
            >
              <Avatar
                className="w-50 h-50 mb-4"
                {...genConfig({
                  seed: image,
                  style: "circle",
                  bgColor: "#f0f0f0",
                  borderColor: "#ccc",
                })}
              />
              <p className="text-3xl font-bold">{name}</p>
              <p className="italic font-medium">{location}</p>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};
export default VolunteerOftheMonth;
