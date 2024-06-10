import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../../SharedComponents/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { Dialog } from "@material-tailwind/react";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const handleOpen = (coupon) => {
    setSelectedCoupon(coupon);
    setOpen((cur) => !cur);
  }

  // to load existing coupons
  const {
    isLoading,
    data: coupons = [],
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  // To Create and submit  new coupons
  const handleCouponSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const couponInfo = {
      couponCode: form.code.value,
      expiryDate: form.expire.value,
      description: form.description.value,
      discountAmount: form.discount.value,
    };
    axiosSecure.post("/coupon", couponInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Successfully added",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  // to update coupon
  const handleUpdateCoupon = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCouponInfo = {
      couponCode: form.code.value,
      expiryDate: form.expire.value,
      description: form.description.value,
      discountAmount: form.discount.value,
    };
    console.log(updatedCouponInfo);
    axiosSecure.put(`/coupon/${selectedCoupon._id}`, updatedCouponInfo)
    .then(res => {
      if(res.data.modifiedCount > 0) {
        setOpen(false);
        Swal.fire({
          icon: "success",
          confirmButtonColor: "#59B259",
          title: "Coupon Updated Successfully",
          timer: 2500
        });
      refetch();
      }
    })
  };

  // to delete coupon
  const handleDeleteCoupon = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF1749",
      cancelButtonColor: "#555555",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/coupon/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              iconColor: "#FF1749",
              showConfirmButton: false,
              title: "Product Deleted Successful",
              timer: 2500,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14 py-12 md:py-16 lg:py-20">
      <SectionTitle title="Manage Coupons" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-4 xl:gap-8 flex-start mt-8 md:mt-10">
        {/* Added coupons display section */}
        <section className="lg:col-span-3">
          <div className="relative max-h-[60vh] lg:max-h-[100%] flex flex-col w-full overflow-scroll text-[var(--clr-secondary)] text-sm bg-[var(--clr-white)] shadow-md bg-clip-border border border-[var(--clr-light-gray)] p-3 xl:p-6 md:py-8 rounded-lg">
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr className="font-normal border-b border-[var(--clr-light-gray)] bg-[var(--bg-secondary)] text-[var(--clr-primary)]">
                  <th className="p-4">Coupon code</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Edit</th>
                  <th className="p-4">Delete</th>
                </tr>
              </thead>

              <tbody>
                {coupons.length > 0 &&
                  coupons?.map((coupon) => (
                    <tr key={coupon._id} className="even:bg-blue-gray-50/50">
                      <td className="p-4">{coupon?.couponCode}</td>
                      <td className="p-4">{coupon?.expiryDate}</td>
                      <td className="p-4">{coupon?.discountAmount}%</td>
                      <td className="p-4">{coupon?.description}</td>
                      {/* Action Buttons (accept and reject) */}
                      <td className="px-4 py-2">
                        <button
                          className="bg-[var(--clr-focussed)] text-[12px] text-white hover:scale-110 px-2 py-[2px] rounded duration-500 font-semibold text-xl"
                          onClick={() => handleOpen(coupon)}
                        >
                          <CiEdit />
                        </button>
                      </td>
                      <td className=" px-4 py-2">
                        <button
                          className="bg-[var(--clr-focussed)] text-xl text-white py-0.5 hover:scale-110
                  px-2 rounded  duration-500 font-semibold"
                          onClick={() => handleDeleteCoupon(coupon?._id)}
                        >
                          <MdOutlineDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Coupon Add form section */}
        <section>
          <form
            className="p-3 xl:p-6 md:py-8 rounded-lg mx-auto space-y-4 border border-[var(--clr-light-gray)]"
            onSubmit={handleCouponSubmit}
          >
            {/* Coupon */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold mb-2">
                Coupon Code
              </label>
              <input
                type="text"
                name="code"
                className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
              />
            </div>
            {/* Expiry Date */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                name="expire"
                className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
              />
            </div>
            {/* Discount Amount */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold mb-2">
                Discount Amount (%)
              </label>
              <input
                type="number"
                name="discount"
                className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
              />
            </div>
            {/* Coupon Code Description */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                id=""
                rows="3"
                className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
              ></textarea>
            </div>

            {/* submit  button */}
            <div className="text-center">
              <input
                type="submit"
                value="Add Coupon"
                className="bg-[var(--clr-focussed)] text-white px-4 py-2 rounded w-full cursor-pointer mt-2    "
              />
            </div>
          </form>
        </section>
      </div>

      {/* Modal to update coupon */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <div className="bg-[var(--clr-white)] p-6 lg:p-10 rounded-xl">
        <form
            className="p-4 xl:p-6 md:py-8 rounded-lg mx-auto space-y-4 border border-[var(--clr-light-gray)]"
            onSubmit={handleUpdateCoupon}
          >
            {/* Coupon */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold mb-2">
                Coupon Code
              </label>
              <input
                type="text"
                name="code"
                defaultValue={selectedCoupon?.couponCode}
                className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
              />
            </div>
            {/* Expiry Date */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                name="expire"
                defaultValue={selectedCoupon?.expiryDate}
                className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
              />
            </div>
            {/* Discount Amount */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold mb-2">
                Discount Amount (%)
              </label>
              <input
                type="number"
                name="discount"
                defaultValue={selectedCoupon?.discountAmount}
                className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
              />
            </div>
            {/* Coupon Code Description */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                id=""
                rows="3"
                defaultValue={selectedCoupon?.description}
                className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
              ></textarea>
            </div>

            {/* submit  button */}
            <div className="text-center">
              <input
                type="submit"
                value="Update Coupon"
                className="bg-[var(--clr-focussed)] text-white px-4 py-2 rounded w-full cursor-pointer mt-2    "
              />
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageCoupons;
