import ArtCardPagination from "../Artwork/ArtCardPagination";
import FilterProductItem from "./FilterProductItem";
import LineChart from "./LineChart";
import Progress from "./Progress";
import RecentOrders from "./RecentOrders";

const Dashboard = () => {
  return (
    <div className="w-full p-2">
      <FilterProductItem />
      <RecentOrders />
      <ArtCardPagination />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-10">
        <div className="bg-white ">
          <Progress />
        </div>
        <div className="col-span-2 bg-white overflow-hidden ">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
