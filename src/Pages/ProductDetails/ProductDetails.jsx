// import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BiUpvote } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineReportGmailerrorred } from "react-icons/md";
import useUpvote from "../../Hooks/useUpvote";
import useAuth from "../../Hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css/bundle';

import './swiperCustomStyle.css';
import ReviewCard from "./ReviewCard";
import SectionTitle from "../../SharedComponents/SectionTitle/SectionTitle";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const {handleUpvote} = useUpvote();

  // to get single product data
  const { isLoading : productLoading, data: product = {}, error: reviewError } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/details/${id}`);
      return res.data;
    },
  });

  // to get product reviews
  const {isLoading: reviewLoading, data: reviews = [], error: productError} = useQuery({
    queryKey:["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    }
  });
  console.log(reviews);

  if(productLoading || reviewLoading ){
    return <div> Loading ...</div>;
  }
  if(productError || reviewError ){
    return <div> Error Loading Data</div>;
  }

  const {
    ownerName,
    ownerEmail,
    productName,
    externalLinks,
    productImage,
    tags,
    description,
    upvote,
  } = product;

  console.log(product);
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">
      {/* Product Details Section */}
      <section className="px-4 md:px-8 lg:px-10 rounded-xl bg-[var(--bg-secondary)] py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start gap-2 md:gap-10">
          <div className="flex-1">
            {/* product Image & Name */}
            <div className="flex gap-4">
              <div className="w-32 rounded-md">
                <img src={productImage} alt={productName} className="rounded-md" />
              </div>
              <div>
                <h2>{productName}</h2>
                <span>by {ownerName}</span>
              </div>
            </div>

            {/* description */}
            <p className="mt-2">{description}</p>
          </div>

          {/* tags */}
          <div
            className="md:w-36 flex flex-wrap justify-end gap-2 
              "
          >
            {tags && tags.map((item, idx) => (
              <div
                key={idx}
                className="border border-[var(--clr-light-gray)] text-[var(--clr-secondary)] px-2 rounded-md text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="border-2 border-[var(--clr-focussed)] text-[var(--clr-focussed)] font-medium rounded hover:scale-105 duration-300 w-32">
            <a href={externalLinks} target="_blank" >Visit</a>
          </button>
          <button className="flex items-center justify-center gap-2 bg-[var(--clr-focussed)] text-[var(--clr-white)]  px-2 py-1 rounded hover:scale-105 duration-300 w-32"
          onClick={() => handleUpvote(product)} 
          disabled={ownerEmail === user?.email}
          >
            {" "}
            <BiUpvote /> upvote {upvote}
          </button>
          <button className="flex items-center justify-center gap-2 bg-[var(--clr-focussed)] text-[var(--clr-white)]  px-2 py-1 rounded hover:scale-105 duration-300 w-32">
            {" "}
            <MdOutlineReportGmailerrorred /> Report
          </button>
          <button className="flex items-center justify-center gap-2 bg-[var(--clr-focussed)] text-[var(--clr-white)]  px-2 py-1 rounded hover:scale-105 duration-300 w-32">
            {" "}
            <MdDeleteOutline /> Delete
          </button>
        </div>
      </section>

      {/* Review section */}
      <section className="mt-16 md:mt-20">
      <SectionTitle title={`User Experiences with ${productName}`}/>
            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={1}
              autoplay={{delay: 10000, pauseOnMouseEnter: true}}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              {
                reviews?.map(review => <SwiperSlide key="review._id">
                  <ReviewCard review={review}/>
                </SwiperSlide>)
              }
            </Swiper>
      </section>
    </div>
  );
};

export default ProductDetails;
