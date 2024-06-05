import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";

const ReviewCard = ({ review }) => {
  const { reviewerImage, reviewerName, reviewDescription, rating } = review;

  return (
    <div className="px-4 md:px-8 flex flex-col gap-6 items-center my-10 rounded-md text-center ">
      {/* Reviewer Image */}
      <div className="w-16 h-16 rounded-full border-4 border-[var(--bg-secondary)] mx-auto">
        <img src={reviewerImage} alt="" className="rounded-full" />
      </div>
      <div className="md:w-3/4 flex flex-col">
        <h5>{reviewerName}</h5>
        <p className="py-4 flex-grow">{reviewDescription}</p>
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="2px"
        />
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object,
};

export default ReviewCard;
