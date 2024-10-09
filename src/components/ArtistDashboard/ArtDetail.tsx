import Header from "../ui/Header";
import P from "../ui/P";

const detail = [
  {
    header: "New Orders",
    number: "1",
  },
  {
    header: "Leased Artwork",
    number: "5",
  },
  {
    header: "Earnings",
    number: "$1200",
  },
];

const ArtDetail = () => {
  return (
    <div className="container mx-auto sm:px-6 px-3">
      <div className="grid sm:grid-cols-3 grid-cols-1 md:gap-20 gap-10 my-5">
        {detail.map((item, index) => (
          <div
            key={index}
            className="shadow-xl md:py-10 py-6 rounded-xl text-center"
          >
            <P variant={{ size: "md", theme: "dark", weight: "semiBold" }}>
              {item.header}
            </P>
            <Header
              variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
              className="mt-2"
            >
              {item.number}
            </Header>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtDetail;
