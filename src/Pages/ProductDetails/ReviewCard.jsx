import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";

const ReviewCard = ({ review }) => {
  const { reviewerImage, reviewerName, reviewDescription, rating } = review;

  return (
    <div className="shadow-sm p-4 md:p-8 flex flex-col md:flex-row gap-6 items-center my-10 bg-[var(--clr-white)] rounded-md text-start">
      <div className="w-28 h-28 rounded-full border-4 border-[var(--bg-secondary)] mx-auto">
        <img src={reviewerImage} alt="" className="rounded-full" />
      </div>
      <div className="md:w-3/4">
        <h5>{reviewerName}</h5>
        <p className="py-4">{reviewDescription}</p>
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
