import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {
  const {createUser} = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
    .then(result => {
      console.log(result.user);
    })
    .then(error => {
      console.log(error);
    })
  };

  return (
    <main className=" p-4 flex h-screen justify-center items-center">
      <div className="w-[340px]">
        <h2 className="font-bold text-center mb-8">
          <span className="text-[var(--clr-focussed)]">Tech</span>Spot
        </h2>

        <form
          className="px-4 md:px-6 py-8 border border-[var(--clr-light-gray)] rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h5 className="font-semibold">Create Account</h5>

          {/* Name Field */}
          <div className="flex flex-col my-4">
            <label htmlFor="name" className="text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="name"
              placeholder="Enter your name here"
              {...register("name", { required: true })}
              className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
            />
            {errors.name?.type === "required" && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email here"
              {...register("email", { required: true })}
              className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col my-4">
            <label htmlFor="photo" className="text-sm font-semibold mb-2">
              Photo
            </label>
            <input
              type="text"
              placeholder="Enter your photo url here"
              {...register("photo")}
              className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col mb-8">
            <label htmlFor="password" className="text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password here"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 10,
                pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])/,
              })}
              className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500 text-sm">Min Length is 6 characters</span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500 text-sm">Max Length is 10 characters</span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500 text-sm">
                At Least one Uppercase, one LowerCase, one Number & one Special
                Character is required
              </span>
            )}
          </div>

          <button className="text-center w-full bg-[var(--clr-focussed)] text-[var(--clr-white)] py-1.5 px-4 rounded-md hover:scale-95 duration-500">
            Register
          </button>
        </form>

        {/* divider */}
        <div className="flex w-full items-center gap-4 my-6">
          <div className="h-[2px] bg-[var(--bg-secondary)] flex-1"></div>
          <div className="divider text-[var(--clr-secondary)] font-medium text-sm">
            Already have an account?
          </div>
          <div className="h-[2px] bg-[var(--bg-secondary)] flex-1"></div>
        </div>

        {/*  */}
        <Link to="/login">
          <button className="text-center w-full border border-[var(--clr-light-gray)] py-2 px-4 rounded-md text-sm font-bold hover:text-[var(--clr-focussed)] hover:underline hover:scale-95 duration-300">
            Login Now
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Register;
