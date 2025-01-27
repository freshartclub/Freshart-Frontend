import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import P from "../../ui/P";
import { useTranslation } from "react-i18next";

const ArtBreadcrumbs = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      label: "Dashboard",
      link: "../artdashboard",
      isLast: false,
    },
    {
      label: "Artwork List",
      link: "../artwork",
      isLast: false,
    },
    {
      label: "Add Artwork",
      link: "",
      isLast: true,
    },
  ];

  return (
    <div className="flex flex-wrap items-center">
      {breadcrumbs.map((breadcrumb, index) => (
        <div className="flex items-center" key={index}>
          {!breadcrumb.isLast ? (
            <>
              <P variant={{ size: "base", theme: "dark", weight: "semiBold" }}>
                <NavLink
                  to={breadcrumb.link}
                  className="text-[#102030] text-sm md:text-md font-semibold"
                >
                  {t(breadcrumb.label)}
                </NavLink>
              </P>
              <span className="mx-1">
                <IoIosArrowBack />
              </span>
            </>
          ) : (
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="text-sm"
            >
              {t(breadcrumb.label)}
            </P>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArtBreadcrumbs;
