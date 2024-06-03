import PropTypes from "prop-types";
import { BiUpvote } from "react-icons/bi";
import useUpvote from "../../../Hooks/useUpvote";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";

const TrendingCard = ({ product }) => {
  const { handleUpvote } = useUpvote();
  const { user } = useAuth();
  const {_id, ownerName, ownerEmail, upvote, tags, productImage, productName } =
    product;

  return (
    <div className=" p-4 border-2 bg-[var(--clr-white)] rounded-lg">
      <div className="flex gap-2">
        <div>
          <img src={productImage} alt="" className="w-24 rounded-sm" />
        </div>

        <div className="flex-1 flex gap-4 flex-col justify-between">
          <div>
            <Link to={`/details/${_id}`}>
              <h5 className="cursor-pointer hover:underline hover:text-[var(--clr-focussed)]">
                {productName}
              </h5>
            </Link>
            <small>by {ownerName}</small>
          </div>
        </div>

        <button
          className="flex flex-col gap-1 justify-center items-center cursor-pointer p-1.5 rounded-md  font-bold border border-transparent hover:border-[var(--clr-light-gray)] h-fit ml-2 leading-3"
          onClick={() => handleUpvote(product)}
          disabled={ownerEmail === user?.email}
        >
          <BiUpvote className="text-xl" />
          <span className="text-sm">{upvote}</span>
        </button>
      </div>
      <div className="flex mt-3 flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[12px] bg-[var(--bg-primary)] rounded-md px-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

TrendingCard.propTypes = {
  product: PropTypes.object,
};

export default TrendingCard;
