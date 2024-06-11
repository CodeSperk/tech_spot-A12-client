import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import useCoupon from "../../../../Hooks/useCoupon";

// ToDo add  publishable key
const stripePromise = loadStripe("pk_test_51PQVM4P1Zy2c3ahm8B9HmGIWCR7uTCLqlpp1NAuJWDe99CPshcFgJMYaxUls1OQQqPzTTv9dJuScP6CHUg6bvKni00XAHdd76k");

const MyProfile = () => {
  const [open, setOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(50);
  const [isCouponLoading, coupons] = useCoupon();
  const [couponError, setCouponError] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();



  const handleOpen = () => setOpen((cur) => !cur);

  // to load users
  const { data: userInfo = [], isLoading, refetch } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading || isCouponLoading) {
    return <div>Loading ....</div>;
  }


  const initialSubscriptionFee = 50;

  const handleCouponChange = (e) => {
    const code = e.target.value;
    setCouponCode(code);
  };

  const handleApplyCoupon = () => {
    const coupon = coupons.find(coupon => coupon.couponCode === couponCode);
    if(coupon){
      setCouponError("")
      const discountAmount = (initialSubscriptionFee * coupon.discountAmount) / 100;
      setDiscount(discountAmount);
      setTotalPrice(initialSubscriptionFee - discountAmount);
    }else{
      setCouponError("Invalid Coupon")
      setDiscount(0);
      setTotalPrice(initialSubscriptionFee);
    }
  }


  
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14 mt-6 md:mt-8">
      {/*  */}
      <div className="bg-[var(--clr-white)]">
        {/* banner and profile pic */}
        <div className="relative bg-[var(--bg-secondary)] rounded-xl h-40">
          {/* user Image */}
          <div className="absolute w-28 h-28 rounded-full border-2 -bottom-12 bg-red-50 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0">
            <img
              src={userInfo?.photo}
              alt=""
              className="rounded-full w-full h-full"
            />
          </div>
        </div>

        <div className="p-6 pt-16 md:pt-6 md:pl-36 flex justify-between flex-col md:flex-row gap-4">
              <div>
                <h3>{userInfo?.name}</h3>
                <p className="text-[var(--clr-secondary)]">{userInfo?.email}</p>
              </div>

              <div>
                {
                  userInfo?.subscriptionStatus === "varified" ? <button className="bg-[var(--clr-focussed)] text-white py-2 px-4 rounded-md">Status : Verified</button>  :
                  <button className="bg-[var(--clr-focussed)] text-white py-2 px-4 rounded-md" onClick={handleOpen}>Subscribe : $ 50</button>
                }
              </div>
        </div>
      </div>

      {/* Modal for Payment */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
       <div className="bg-[var(--clr-white)] p-4 md:p-6 lg:p-8 rounded-md">

        {/* To apply coupon */}
        <h3 className="text-center mb-6">Payment Form</h3>

        {/* to calculate payment amount */}
        <div className="border p-4 shadow-sm rounded-md">
          {/* to display error message */}
          <small className="text-[#F7B217]">{couponError}</small>
          <div className="flex gap-6 justify-between">
            <p>Subscription fee : </p>
            <p>$ {initialSubscriptionFee}</p>
          </div>
          {/* to apply coupon */}
            {
              discount === 0 && (<form className="relative my-4">
              <input 
              type="text" 
              className="bg-blue-50 w-full py-1 px-4 rounded border outline-none" 
              value={couponCode}
              placeholder="Apply Coupon Code"
              onChange={handleCouponChange}
              />
              <button 
              type="button"
              className="absolute right-0 top-0 bg-[var(--clr-focussed)] text-white rounded px-4 h-full"
              onClick={handleApplyCoupon}
              >Apply</button>
            </form>
          )}
          {
            discount > 0 && <div className="flex gap-6 justify-between py-4">
            <p>Discount: </p>
            <p>$ {discount}</p>
          </div>
          }
          <div className="flex gap-12 border-t pt-2 justify-between">
            <p>Total Payment :</p>
            <p>$ {totalPrice}</p>
          </div>
          
        </div>

          {/* Payment Card */}

        <Elements stripe={stripePromise}>
        <CheckOutForm refetch={refetch} totalPrice={totalPrice} setOpen={setOpen}/>
       </Elements>
      
       </div>
      </Dialog>
    </div>
  );
};

export default MyProfile;
