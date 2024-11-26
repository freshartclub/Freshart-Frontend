import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import P from "../ui/P";

const ArtBreadcrumbs = () => {
  const breadcrumbs = [
    {
      label: "Home",
      link: "/",
      isLast: false,
    },
    {
      label: "Shopping Card",
      link: "",
      isLast: false,
    },
    {
      label: "Checkout ",
      link: "",
      isLast: true,
    },
  ];

  return (
    <div className="flex gap-2 items-start">
      {breadcrumbs.map((breadcrumb, index) => (
        <div className="flex items-center" key={index}>
          {/* Link for non-last breadcrumb items */}
          {!breadcrumb.isLast ? (
            <>
              <P variant={{ size: "base", theme: "dark", weight: "semiBold" }}>
                <NavLink
                  to={breadcrumb.link}
                  className="text-[#FF536B] text-sm md:text-md font-semibold"
                >
                  {breadcrumb.label}
                </NavLink>
              </P>
              <span className="mx-2">
                <IoIosArrowBack />
              </span>
            </>
          ) : (
            <P
              variant={{ size: "base", theme: "dark", weight: "semiBold" }}
              className="md:text-[18px]  text-sm hover:cursor-pointer"
            >
              {breadcrumb.label}
            </P>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArtBreadcrumbs;
