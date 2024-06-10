import useAllPublicData from "../../../../Hooks/useAllPublicData";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [isLoadingProducts, products] = useAllPublicData("/products");
  const [isLoadingReviews, reviews] = useAllPublicData("/reviews");
  const [isLoadingUsers, users] = useAllPublicData("/users");

  if (isLoadingProducts || isLoadingReviews || isLoadingUsers) {
    return <div>Loading...</div>;
  }

  const data = {
    labels:["Products", "Reviews", "Users"],
    datasets:[
      {
        data:[products.length, reviews.length, users.length],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  }


  // to get load products
  console.log(products.length, reviews.length, users.length);

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14 py-10 lg:py-12 flex h-[80vh] justify-center items-center">
      <Pie data={data} />
    </div>
  );
};

export default Statistics;