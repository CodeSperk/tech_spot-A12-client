import { Link } from "react-router-dom";

const Banner = () => {
  return (
   <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 2xl:px-14">
     <div className="bg-cover bg-no-repeat relative min-h-[548px] rounded-md">
     <img
          src="https://i.ibb.co/NTBVwf2/home-Banner.jpg"
          alt="Banner Image"
          className="w-full h-full object-cover absolute top-0 left-0 rounded-md"
        />
        <div className="absolute text-white bg-[#41020255] h-full w-full top-0 rounded-md flex items-center justify-center">
          <div className="p-5 text-center md:max-w-[70%] xl:max-w-[55%]">
            <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold">Discover and Share Amazing <span className="text-[var(--clr-focussed)]">Tech</span> Products</h1>
            <p className="text-base">
              Explore the latest tech innovations, upvote your favorites, and contribute your own products. Join our community of tech enthusiasts today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <a href="#trending">
                <button className="bg-[var(--clr-focussed)] text-[var(--clr-white)] py-3 px-6 rounded hover:scale-95 duration-300">
                  Explore Trending Products
                </button>
              </a>
             
         
            </div>



          </div>
        </div>
  
    </div>
   </div>
  );
};

export default Banner;