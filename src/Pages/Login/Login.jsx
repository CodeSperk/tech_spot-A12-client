import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className=" p-4 flex h-screen justify-center items-center">
      <div className="w-[320px]">
        <h2 className="font-bold text-center mb-8">
          <span className="text-[var(--clr-focussed)]">Tech</span>Spot
        </h2>
        <form className="px-4 py-8 border border-[var(--clr-light-gray)] rounded-md">
          <div className="flex justify-between items-center">
            <h5 className="font-semibold">Sign In</h5>
            <div className="text-2xl py-1 px-1 bg-white rounded-md hover:scale-90 cursor-pointer border-2 duration-300">
              <FcGoogle/>
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col my-4">
            <label htmlFor="email" className="text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email here"
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
              placeholder="Enter your Password here"
              className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
            />
          </div>

          <button className="text-center w-full bg-[var(--clr-focussed)] text-[var(--clr-white)] py-1.5 px-4 rounded-md hover:scale-95 duration-500">
            Login
          </button>
        </form>

        {/* divider */}
        <div className="flex w-full items-center gap-4 my-6">
          <div className="h-[2px] bg-[var(--bg-secondary)] flex-1"></div>
          <div className="divider text-[var(--clr-secondary)] font-medium text-sm">
            New to TechSpot
          </div>
          <div className="h-[2px] bg-[var(--bg-secondary)] flex-1"></div>
        </div>

        {/*  */}
        <Link to="/register">
          <button className="text-center w-full border border-[var(--clr-light-gray)] py-2 px-4 rounded-md text-sm font-bold hover:text-[var(--clr-focussed)] hover:underline hover:scale-95 duration-300">
            Create Account Now
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Login;
