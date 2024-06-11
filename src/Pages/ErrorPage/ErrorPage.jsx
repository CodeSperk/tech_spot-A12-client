import { Link } from "react-router-dom";


const ErrorPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <img src="https://i.ibb.co/8r48Bjb/3-Hot-Dot-studio-best-hypnotizing-404-page-removebg-preview.png" alt="" />
        <h3>Page  Not Found</h3>
        <Link to="/">
          <button className="bg-[var(--clr-focussed)] py-2 text-white px-6 rounded hover:scale-x-110 duration-500 mt-6">Back to Home</button>
        </Link>
      </div>
      
    </div>
  );
};

export default ErrorPage;