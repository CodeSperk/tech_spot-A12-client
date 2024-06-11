import { Link } from "react-router-dom";
import SectionTitle from "../../SharedComponents/SectionTitle/SectionTitle";
import Featured from "./FeaturedSection/Featured";
import Trending from "./Trending Section/Trending";
import CouponSection from "./CouponSection/CouponSection";

const Home = () => {
  return (
    <div>
      
      <main>
        {/* Featured Section */}
        <section className="bg-[var(--clr-white)] py-10 md:py-12 lg:py-16 mt-16 md:mt-20 lg:mt-28">
          <SectionTitle title="Featured Products" />
          <Featured />
        </section>

        {/* Trending Product Sections */}
        <section className="mt-16 md:mt-20 lg:mt-28 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 2xl:px-14">
          <SectionTitle title="Trending Products" />
          <Trending />
          <Link to="/products">
            <button className="flex lg:hidden mx-auto bg-[var(--clr-focussed)] text-[var(--clr-white)] py-3 px-6 mt-12 rounded hover:scale-95 duration-300">
              Show All Products
            </button>
          </Link>
        </section>

        {/* coupon code section */}
        <section className="mt-12 md:mt-16 lg:mt-20 bg-red-50 py-10">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 2xl:px-14 flex flex-col md:flex-row items-center gap-4">
            <div className="space-y-2 text-center md:text-start">
              <h3>Get upto 70% discount</h3>
              <p>
              Subscribe now unlimited upload with exclusive discounts and early access to limited-time promotions. Save big with our coupons!
              </p>
              <Link to="/dashboard">
                <button className="bg-[var(--clr-focussed)] text-[var(--clr-white)] py-3 px-6 mt-6 rounded hover:scale-95 duration-300">
                  Subscribe Now
                </button>
              </Link>
            </div>
              <CouponSection />
            
          </div>
        </section>

       
      </main>
    </div>
  );
};

export default Home;
