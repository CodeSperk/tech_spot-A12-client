// import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BiUpvote } from "react-icons/bi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import useUpvote from "../../Hooks/useUpvote";
import useAuth from "../../Hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css/bundle";

import "./swiperCustomStyle.css";
import ReviewCard from "./ReviewCard";
import SectionTitle from "../../SharedComponents/SectionTitle/SectionTitle";
import { Input, Textarea } from "@material-tailwind/react";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const [rate, setRate] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { handleUpvote } = useUpvote();
 

  // to get single product data
  const {
    isLoading: productLoading,
    data: product = {},
    error: reviewError,
  } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/details/${id}`);
      return res.data;
    },
  });

  // to get product reviews
  const {
    isLoading: reviewLoading,
    data: reviews = [],
    error: productError,
    refetch
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });
  if (productLoading || reviewLoading) {
    return <div> Loading ...</div>;
  }
  if (productError || reviewError) {
    return <div> Error Loading Data</div>;
  }
  const {
    _id, ownerName,
    ownerEmail,
    productName,
    externalLinks,
    productImage,
    tags,
    description,
    upvote,
  } = product;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = rate;
    const productId = _id;
    const reviewerName = user?.displayName;
    const reviewerImage = user?.photoURL;
    const reviewDescription = feedback; 
    const newReview = {
      productId, reviewerName, reviewerImage, reviewDescription, rating
    }
    
   axiosSecure.post("/review", newReview)
   .then(res => {
    if(res.data.insertedId){
      Swal.fire({
        icon: "success",
        title: "Posted Your review",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      refetch();
    }
   })
   .catch(error => {
    console.log(error.code);
   })
  }

  // to report product
  const handleReportProduct = (reportedId) => {
    axiosSecure.patch(`/report/${reportedId}`)
    .then((res) => {
      if(res.data.modifiedCount > 0){
        Swal.fire({
          icon: "success",
          iconColor: "#448ADE",
          confirmButtonColor: "#448ADE",
          title: "Reported! Moderator will review the product soon",
          timer: 2500
        });
      refetch();
      }
    });
  }


  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">
      {/* Product Details Section */}
      <section className="px-6 md:px-10 lg:px-16 rounded-xl bg-[var(--bg-secondary)] py-16 md:py-20">
        <div className="flex flex-col justify-between md:flex-row items-start gap-2 md:gap-10">
          <div className="flex-1 max-w-[520px]">
            {/* product Image & Name */}
            <div className="flex gap-4">
              <div className="w-32 rounded-md">
                <img
                  src={productImage}
                  alt={productName}
                  className="rounded-md"
                />
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
            {tags &&
              tags.map((item, idx) => (
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
            <a href={externalLinks} target="_blank">
              Visit
            </a>
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-[var(--clr-focussed)] text-[var(--clr-white)]  px-2 py-1 rounded hover:scale-105 duration-300 w-32"
            onClick={() => handleUpvote(product)}
            disabled={ownerEmail === user?.email}
          >
            {" "}
            <BiUpvote /> upvote {upvote}
          </button>
          <button className="flex items-center justify-center gap-2 bg-[var(--clr-focussed)] text-[var(--clr-white)]  px-2 py-1 rounded hover:scale-105 duration-300 w-32"
          onClick={() => handleReportProduct(_id)}>
            {" "}
            <MdOutlineReportGmailerrorred /> Report
          </button>
        </div>
      </section>

      {/* Review section 
      ----------------------*/}
      {
        reviews.length > 0 && <section className="mt-16 md:mt-20">
        <SectionTitle title={`User Experiences with ${productName}`} />
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          grabCursor={true}
          spaceBetween={20}
          autoplay={{ delay: 10000, pauseOnMouseEnter: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 2,
            },
          }}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {reviews?.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      }

      {/* Review input section 
      ----------------------------*/}
      <section className="mt-16 md:mt-20 lg:mt-28 rounded-xl">
        <SectionTitle title="post your review" />
        <div className="grid md:grid-cols-5 lg:grid-cols-3 gap-8 lg:gap-16 mt-8 md:mt-10">
          {/* Review form */}
          <div className="md:col-span-3 lg:col-span-2 bg-[var(--clr-white)] p-6 md:p-8 lg:p-10 rounded-md">
            <form onSubmit={handleSubmitReview}>
              <div className="space-y-4">
                {/* Name field */}
                <div className="">
                  <Input label="Username" defaultValue={user?.displayName}  readOnly />
                </div>

                {/* Photo field */}
                <div className="">
                  <Input label="User Photo" defaultValue={user?.photoURL} readOnly/>
                </div>

                {/* Ratings Section */}
                <div className="py-2 border border-blue-gray-200 rounded-md px-4 text-sm text-blue-gray-500">
                  {" "}
                  Rating{" "}
                  <StarRatings
                    rating={rate}
                    starDimension="24px"
                    starSpacing="4px"
                    starRatedColor="#F7D800"
                    starHoverColor="#F7D800"
                    changeRating={(newRating) => setRate(newRating)}
                  />
                </div>

                {/* Review Description */}
                <div>
                  <Textarea label="Feedback" onChange={(e) => setFeedback(e.target.value)}/>
                </div>
              </div>

              <input
                type="submit"
                value="submit"
                className="py-2 border border-blue-gray-200 rounded-md bg-[var(--clr-focussed)] text-[var(--clr-white)] w-full cursor-pointer mt-4 text-lg"
              />
            </form>
          </div>

          {/* aside */}
          <div className="md:col-span-2 lg:col-span-1 relative hidden md:flex flex-col justify-between  bg-[var(--clr-white)] rounded-lg p-4 md:p-8 lg:p-10">
            <div>
              <h3>Tell Us What You Think</h3>
              <p className="mt-4">
                Read and share your thoughts on the product. Your feedback helps
                us improve and serves the community better.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
