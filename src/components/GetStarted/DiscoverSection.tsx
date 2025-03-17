import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import arrow from "../../assets/arrow.png";

const CenteredSection = ({
  title,
  text,
  imageSrc,
  buttonText,
  buttonLink,

  backgroundColor = "#F5F2EB",
  titleColor = "#102030",
  textColor = "#102030",
  imageSize = "150px",

  className = "",
  containerClassName = "",
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (buttonLink) {
      navigate(buttonLink);
    }
  };

  return (
    <div
      className={`py-20 ${className}`}
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        className={`container mx-auto md:px-6 px-3 text-center ${containerClassName}`}
      >
        {title && (
          <h1
            className="md:text-[36px] text-[30px] font-semibold pb-10"
            style={{ color: titleColor }}
          >
            {title}
          </h1>
        )}

        {text && (
          <p
            className="md:text-[18px] text-[16px] mb-10"
            style={{ color: textColor }}
          >
            {text}
          </p>
        )}

        {imageSrc && (
          <div className="flex justify-center items-center mb-10">
            {Array.isArray(imageSrc) ? (
              <div className="flex flex-col sm:flex-row justify-center items-center lg:gap-32 md:gap-10 sm:gap-14 gap-0">
                {imageSrc.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`icon${index + 1}`}
                    className="md:mb-0 mb-4"
                    style={{
                      width: imageSize,
                      height: imageSize,
                    }}
                  />
                ))}
              </div>
            ) : (
              <img
                src={imageSrc}
                alt="section image"
                className="md:mb-0 mb-4"
                style={{
                  width: imageSize,
                  height: imageSize,
                }}
              />
            )}
          </div>
        )}

        {buttonText && (
          <div className="flex justify-center items-center">
            <Button
              variant={{
                theme: "dark",
                rounded: "full",
                fontWeight: "500",
                thickness: "thick",
                fontSize: "base",
              }}
              className="flex justify-center items-center"
              onClick={handleButtonClick}
            >
              {buttonText}
              {buttonLink && <img src={arrow} alt="arrow" className="ml-2" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

CenteredSection.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  imageSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  backgroundColor: PropTypes.string,
  titleColor: PropTypes.string,
  textColor: PropTypes.string,
  imageSize: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default CenteredSection;
