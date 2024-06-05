import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TrendingCard from "../Home/Trending Section/TrendingCard";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css"

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const [itemOffset, setItemOffset] = useState(0);

  const { isLoading, data: products = [] } = useQuery({
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
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">

      {/* products  */}
      <div>
        {isLoading ? (
          <div>Loading </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
