import { useState } from "react";
import { CiWarning } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { loginUser, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  // to display success message
  const successMessage = () => {
    Swal.fire({
      icon: "success",
      title: "Login Success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // To login User  with email and password
  const handleLoginUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then( () => {
        successMessage();
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setError("Invalid email / password");
        }
      });
  };

  //Login with google
  const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        // To save user info to the database
        const userInfo = {
          name: result.user?.displayName,
          image: result.user?.photoURL,
          email: result.user?.email,
          role: "user"
        };
        axiosPublic.post("/users", userInfo)
        .then()
        successMessage();
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  return (
    <main className=" p-4 md:p-16 lg:p-24 flex min-h-[100vh] justify-center items-center">
      <div className="w-[320px] md:w-[360px]">
        <h2 className="font-bold text-center mb-8">
          <span className="text-[var(--clr-focussed)]">Tech</span>Spot
        </h2>

        {/* to display error message */}
        {error && (
          <div className="w-full border border-[var(--clr-focussed)] p-4 rounded-md mb-4 text-[var(--clr-error)] flex  items-center gap-2">
            <CiWarning className="text-3xl" />
            <p>{error}</p>
          </div>
        )}

        <form
          className="px-4 py-8 border border-[var(--clr-light-gray)] rounded-md"
          onSubmit={handleLoginUser}
        >
          <div className="flex justify-between items-center">
            <h5 className="font-semibold">Sign In</h5>
            <div
              className="text-2xl py-1 px-1 bg-white rounded-md hover:scale-90 cursor-pointer border-2 duration-300"
              onClick={handleGoogleLogin}
            >
              <FcGoogle />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col my-4">
            <label htmlFor="email" className="text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email here"
              className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col mb-8">
            <label htmlFor="password" className="text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter your Password here"
                className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm w-full"
              />
              <div
                className="absolute top-1/2 right-4 -translate-y-1/2 text-xl"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <IoEyeOffOutline></IoEyeOffOutline>
                ) : (
                  <IoEyeOutline></IoEyeOutline>
                )}
              </div>
            </div>
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
