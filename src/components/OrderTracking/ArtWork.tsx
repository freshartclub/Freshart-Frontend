import Header from "../ui/Header";
import P from "../ui/P";
import image from "./assets/artwok.png";

const ArtWork = () => {
  return (
    <div>
      <Header
        variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
        className="mb-4"
      >
        Artwork (01)
      </Header>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="border border-[#E4E7E9] text-xs text-gray-700 uppercase bg-[#F2F4F5] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Sub-Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="flex md:flex-row flex-col items-center md:gap-4 gap-1 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img src={image} alt="image" />
                <div>
                  <Header
                    variant={{ size: "base", theme: "dark", weight: "normal" }}
                    className="uppercase text-[#2DA5F3]"
                  >
                    Illustrator
                  </Header>
                  <P
                    variant={{ size: "small", theme: "dark", weight: "normal" }}
                  >
                    Apple MacBook Pro 17
                  </P>
                </div>
              </th>
              <td className="px-6 py-4">
                <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
                  $899
                </P>
              </td>
              <td className="px-6 py-4">
                <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
                  x1
                </P>
              </td>
              <td className="px-6 py-4">
                <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
                  $899
                </P>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtWork;
