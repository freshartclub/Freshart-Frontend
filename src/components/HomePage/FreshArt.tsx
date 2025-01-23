import { useNavigate } from "react-router-dom";
import arrow_yellow from "../../assets/Arrow_yellow.png";
import comment from "../../assets/ChatCentered 1.png";
import img1 from "../../assets/fresh1.png";
import img2 from "../../assets/fresh2.png";
import img3 from "../../assets/fresh3.png";
import img4 from "../../assets/fresh4.png";
import img5 from "../../assets/fresh5.png";
import img6 from "../../assets/fresh6.png";
import arrow from "../../assets/PinkArrow.png";
import tag from "../../assets/tag 1.png";
import user from "../../assets/user_3 1.png";
import ViewButton from "../ui/ViewButton";

const FreshArt = () => {
  const freshData = [
    {
      image: img1,
      heading:
        "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
      btn: "Read More",
      arrow: arrow,
      art: "Art",
      artlogo: tag,
      admin: "By Admin",
      adminlogo: user,
      comment: "65 Comments",
      commentlogo: comment,
      arrow_yellow: arrow_yellow,
    },
    {
      image: img2,
      arrow: arrow,
      heading:
        "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
      btn: "Read More",
      art: "Art",
      artlogo: tag,
      admin: "By Admin",
      adminlogo: user,
      comment: "65 Comments",
      commentlogo: comment,
      arrow_yellow: arrow_yellow,
    },
    {
      image: img3,
      arrow: arrow,
      heading:
        "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
      btn: "Read More",
      art: "Art",
      artlogo: tag,
      admin: "By Admin",
      adminlogo: user,
      comment: "65 Comments",
      commentlogo: comment,
      arrow_yellow: arrow_yellow,
    },
    {
      image: img4,
      arrow: arrow,
      heading:
        "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
      btn: "Read More",
      art: "Art",
      artlogo: tag,
      admin: "By Admin",
      adminlogo: user,
      comment: "65 Comments",
      commentlogo: comment,
      arrow_yellow: arrow_yellow,
    },
    {
      image: img5,
      arrow: arrow,
      heading:
        "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
      btn: "Read More",
      art: "Art",
      artlogo: tag,
      admin: "By Admin",
      adminlogo: user,
      comment: "65 Comments",
      commentlogo: comment,
      arrow_yellow: arrow_yellow,
    },
    {
      image: img6,
      arrow: arrow,
      heading:
        "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
      btn: "Read More",
      art: "Art",
      artlogo: tag,
      admin: "By Admin",
      adminlogo: user,
      comment: "65 Comments",
      commentlogo: comment,
      arrow_yellow: arrow_yellow,
    },
  ];
  const navigate = useNavigate();

  const redirectToCirclePage = () => {
    navigate("/circleblog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const redirectToBlog = () => {
    navigate("/blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="my-16">
      <div className="container mx-auto md:px-6 px-3">
        <div className="flex sm:flex-row flex-col justify-between">
          <h1 className="text-[30px] font-semibold">Fresh Art Club Circle</h1>

          <ViewButton onClick={redirectToCirclePage} />
        </div>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-10">
          {freshData.map((item, index) => (
            <div
              key={index}
              className="shadow-lg rounded-b-lg"
              onClick={redirectToBlog}
            >
              <img src={item.image} alt="image" className="w-full" />
              <div className="border-2 border-[#FF536B] hover:border-transparent md:p-4 p-2 rounded-b-lg">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center xl:space-x-2 lg:space-x-1">
                    <img src={item.artlogo} alt="tag" />
                    <p className="text-[#4D4D4D] md:text-base text-sm">
                      {item.art}
                    </p>
                  </div>

                  <div className="flex items-center xl:space-x-2 lg:space-x-1">
                    <img src={item.adminlogo} alt="tag" />
                    <p className="text-[#4D4D4D] md:text-base text-sm">
                      {item.admin}
                    </p>
                  </div>

                  <div className="flex items-center xl:space-x-2 lg:space-x-1">
                    <img src={item.commentlogo} alt="tag" />
                    <p className="text-[#4D4D4D] md:text-base text-sm">
                      {item.comment}
                    </p>
                  </div>
                </div>

                <h1 className="text-[23px] font-bold mb-2">{item.heading}</h1>
                <button className="hover:text-[#E19D00] flex items-center space-x-2  text-pink font-bold text-[20px]">
                  <p>{item.btn}</p>

                  <div className="relative inline-block">
                    <img
                      src={item.arrow}
                      alt=""
                      className="mt-1 transition-opacity duration-300 hover:opacity-0"
                    />
                    <img
                      src={item.arrow_yellow}
                      alt=""
                      className="mt-1 absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100"
                    />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreshArt;
