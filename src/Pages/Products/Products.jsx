import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TrendingCard from "../Home/Trending Section/TrendingCard";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import { IoSearchOutline } from "react-icons/io5";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const [itemOffset, setItemOffset] = useState(0);

  const { isLoading, data: products = [], refetch } = useQuery({
    queryKey: ["acceptedProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
    refetch();
  };


  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">

      {/* search bar */}
      <div className="border bg-[var(--bg-secondary)] py-16 px-4 md:px-10 lg:px-12 flex flex-col gap-6 justify-center items-center text-center">
          <h1>Discover What You Need</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="border-2 py-3 px-6 rounded-full outline-none min-w-72 md:min-w-96"
          />
          <IoSearchOutline className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl" />
        </div>
      </div>

      {/* products  */}
      <div className="mt-4 md:mt-10 lg:mt-12">
        {isLoading ? (
          <div>Loading </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {currentItems.map((product) => (
              <TrendingCard key={product?._id} product={product}></TrendingCard>
            ))}
          </div>
        )}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        pageClassName="pagination-list"
        pageLinkClassName="pagination-anchor"
        previousLinkClassName="previous-anchor"
        nextLinkClassName="next-anchor"
      />
    </div>
  );
};

export default Products;
