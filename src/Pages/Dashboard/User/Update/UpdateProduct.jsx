import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import "../AddProduct/tagsStyle.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const UpdateProduct = () => {
  const {user} = useAuth();
  const {id }= useParams();
  const [tags, setTags] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  // to fetch current product info
  const {data: product = {}, isLoading, refetch} = useQuery({
    queryKey:["updatebleProduct", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/details/${id}`);
      return res.data;
    }
  })

  // to desplay previous  tags
  useEffect(() => {
    if(product?.tags){
      setTags(product.tags)
    }
  }, [product])


  if (isLoading) {
    return <div>Loading .....</div>;
  }


  // React Tags related functions
    // Product tags suggession
    const productTagSuggession = [
      "Web App",
      "Collaboration",
      "Code",
      "AI Tool",
      "Productivity",
      "Automation",
      "Video Games",
      "Game Discovery",
      "Gaming",
      "Mobile Optimization",
      "Performance",
      "Mobile App",
      "Business Management",
      "Software Suite",
      "Professional",
      "Web Design",
      "Website Creation",
      "User-Friendly",
      "Tech Reviews",
      "Review Platform",
      "Tech Products",
      "Digital Art",
      "AI Art",
      "Creativity",
      "Game News",
      "Game Updates",
      "Reviews",
      "App Creation",
      "No Coding",
      "Mobile Development"
    ]
    const suggestions = productTagSuggession.map((tag) => {
      return {
        id: tag,
        text: tag,
        className: "",
      };
    });
  
   // Handler functions
   const handleDelete = (i) => {
    setTags(tags.filter((_, index) => index !== i));
  };
  
  const handleAddition = (tag) => {
    setTags([...tags, tag.text]);
  };
  
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const updatedProductData = {
      productName: formData.get('productName'),
      productImage: formData.get('productPhoto'),
      description: formData.get('description'),
      tags: tags,
      externalLink: formData.get('externalLink'),
    };

    axiosSecure.put(`/product/${product._id}`, updatedProductData)
    .then(res => {
      if(res.data.modifiedCount > 0){
        Swal.fire({
          icon: "success",
          iconColor: "#448ADE",
          confirmButtonColor: "#448ADE",
          title: "Product Updated Successfully",
          timer: 2500
        });
        refetch();
        navigate("/dashboard/myProducts");
      }
    })
  }


  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14 mt-6 md:mt-8">
    <form action="" className="bg-[var(--clr-white)] rounded-md p-6 md:p-8 lg:p-10 space-y-8" onSubmit={handleUpdateProduct}>

    <fieldset className="border-2 p-4 md:p-6 space-y-6">
    <legend className="font-bold ml-10 rounded-lg">Product Info</legend>

      {/* Product Name & Photo url */}
      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Product Name field */}
        <div className=" flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="productName"
            defaultValue={product?.productName}
            className="py-2 px-4 outline-none rounded-sm bg-[var(--bg-secondary)]"
          />
        </div>

        {/* Product Image field */}
        <div className="flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="productPhoto">Product Photo URL</label>
          <input
            type="text"
            name="productPhoto"
            defaultValue={product?.productImage}
            className="py-2 px-4 outline-none rounded-sm bg-[var(--bg-secondary)]"
          />
        </div>
      </div>

  
        {/* Product Tags field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="tags">Tags </label>

          <ReactTags
            tags={tags.map((tag, index) => ({id: index.toString(), text: tag}))}
            suggestions={suggestions}
        separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="bottom"
            maxTags={7}
            allowAdditionFromPaste
          />
         
        </div>

        {/* Product External Link  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="externalLink">Product External Link</label>
          <input
            type="text"
            name="externalLink"
            defaultValue={product?.externalLink}
            className="py-2 px-4 outline-none rounded-sm bg-[var(--bg-secondary)]"
          />
        </div>
    

      {/* Product Description field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Product Description</label>
        <textarea
          name="description" rows={5}
          defaultValue={product?.description}
          className="p-4 outline-none rounded-sm bg-[var(--bg-secondary)]"
        ></textarea>
      </div>
      </fieldset>

    <fieldset className="border-2 p-4 md:p-6 space-y-8">
      <legend className="font-bold ml-10 rounded-lg">Owner Info</legend>
              {/* Owner Name and Image field */}
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Owner Name field */}
        <div className=" flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="ownerName">Owner Name</label>
          <input
            type="text"
            name="ownerName"
            disabled="disabled"
            defaultValue={user?.displayName}
            className="py-2 px-4 outline-none rounded-sm bg-[var(--bg-secondary)] text-[var(--clr-secondary)]"
          />
        </div>
        {/* Owner Email field */}
        <div className=" flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="ownerEmail">Owner Email</label>
          <input
            type="email"
            name="ownerEmail"
            defaultValue={user?.email}
            disabled="disabled"
            className="py-2 px-4 outline-none rounded-sm bg-[var(--bg-secondary)] text-[var(--clr-secondary)]"
          />
        </div>
      </div>

      {/* Owner Image field */}
      <div className=" flex flex-col gap-2">
        <label htmlFor="ownerPhoto">Owner Photo URL</label>
        <input
          type="text"
          name="ownerPhoto"
          defaultValue={user?.photoURL}
          disabled="disabled"
          className="py-2 px-4 outline-none rounded-sm bg-[var(--bg-secondary)] text-[var(--clr-secondary)]"
        />
      </div>
    </fieldset>

      {/* submit button */}
      <div className="pt-6">
        <input type="submit" value="Update" className="bg-[var(--clr-focussed)] py-2 px-6 w-fit mx-auto text-white rounded-sm hover:scale-105 duration-700" />
        
      </div>
    </form>
  </div>
  );
};

export default UpdateProduct;