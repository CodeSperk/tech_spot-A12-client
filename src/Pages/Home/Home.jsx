import { Link } from "react-router-dom";
import SectionTitle from "../../SharedComponents/SectionTitle/SectionTitle";
import Featured from "./FeaturedSection/Featured";
import Trending from "./Trending Section/Trending";


const Home = () => {

  
  return (
    <div>
      <div className="h-96">{/* bannner */}</div>
      <main>
        {/* Featured Section */}
        <section className="bg-[var(--clr-white)] py-10 md:py-12 lg:py-16 ">
          <SectionTitle title="Featured Products" />
          <Featured />
        </section>

        {/* Trending Product Sections */}
        <section className="mt-12 md:mt-16 lg:mt-20 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 2xl:px-14">
          <SectionTitle title="Trending Products" />
          <Trending />
          <Link to="/products">
            <button className="flex lg:hidden mx-auto bg-[var(--clr-focussed)] text-[var(--clr-white)] py-3 px-6 mt-12 rounded hover:scale-95 duration-300">
              Show All Products
            </button>
          </Link>
        </section>

        <section className="h-96 bg-white mt-20"></section>
      </main>
    </div>
  );
};

export default Home;
