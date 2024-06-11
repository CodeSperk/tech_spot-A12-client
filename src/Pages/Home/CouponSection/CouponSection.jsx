import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css/bundle";
import "./couponSwiper.css"
import useCoupon from "../../../Hooks/useCoupon";

const CouponSection = () => {
  const [isCouponLoading, coupons] = useCoupon();  

  if (isCouponLoading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      {coupons.length > 0 && (
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          grabCursor={true}
          spaceBetween={10}
          autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {coupons?.map((coupon) => (
            <SwiperSlide key={coupon._id}>
              <div className="shadow w-fit flex bg-[var(--bg-secondary)] rounded-md min-h-48">
                <div className="w-3/10 -rotate-90 flex justify-center items-center">
                  <p className="text-6xl font-bold ">{coupon?.discountAmount}%</p>
                </div>

                <div className="bg-[var(--clr-focussed)] text-white p-6 flex flex-col justify-center items-center text-center space-y-2 rounded-r-md h-48">
                  <p> {coupon?.description}</p>
                  <h3>{coupon?.couponCode}</h3>
                  <p>Valid Until {coupon?.expiryDate}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

    </>
  );
};

export default CouponSection;
