import PropTypes from "prop-types";
import { BiUpvote } from "react-icons/bi";

const TrendingProductCard = ({ product }) => {
  const {ownerName, upvote, tags, productImage, productName } = product;

  return (
    <div className=" p-4 border-2 bg-[var(--clr-white)]">
     <div className="flex gap-2">

     <div>
        <img src={productImage} alt="" className="w-24 rounded-sm" />
      </div>

      <div className="flex-1 flex gap-4 flex-col justify-between">
        <div>
          <h5 className="cursor-pointer hover:underline hover:text-[var(--clr-focussed)]">{productName}</h5>
          <small>by {ownerName}</small>
        </div>
      </div>

      <div className="flex flex-col gap-1 justify-center items-center cursor-pointer p-1.5 rounded-md  font-bold border border-transparent hover:border-[var(--clr-light-gray)] h-fit ml-2 leading-3">
      <BiUpvote className="text-xl"/>
      <span className="text-sm">{upvote}</span>
      </div>
     </div>
        <div className="flex mt-3 flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-[12px] bg-[var(--bg-primary)] rounded-md px-2">{tag}</span>
          ))}
        </div>
    </div>
  );
};

TrendingProductCard.propTypes = {
  product: PropTypes.product,
};

export default TrendingProductCard;
