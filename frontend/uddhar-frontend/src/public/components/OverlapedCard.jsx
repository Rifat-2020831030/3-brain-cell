// Desc: Card component that contains an image and a title that overlaps the image
import PropTypes from "prop-types";

const OverlapedCard = ({ data }) => {
  console.log(data);
  return (
    <div
      className="group cursor-pointer relative h-70 w-70 rounded-2xl text-center bg-gray-300 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${data.image})`,
      }}
    >
      <span className="bg-amber-400 px-3 py-1 rounded absolute left-3 top-2">
        {data.type}
      </span>
      <p className="absolute text-xl text-black font-bold bottom-0 left-0 w-full p-10 bg-gray-50/25 transform translate-y-full transition-transform duration-400 group-hover:translate-y-0">
        {data.title}
        <span className="bg-gray-700 text-white p-1 text-sm absolute top-3 right-3">{data.location.slice(0,6)}...</span>
      </p>
    </div>
  );
};
export default OverlapedCard;

OverlapedCard.propTypes = {
  data: PropTypes.shape({
    disaster_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    startDate: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
  }),
};
