import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import arrow from "../../assets/arrow.png";

interface CenteredSectionProps {
  title?: string;
  text?: string;
  imageSrc?: string | string[];
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
  imageSize?: string;
  className?: string;
  containerClassName?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

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
}: CenteredSectionProps) => {
  const navigate = useNavigate();

  const handleButtonClick = useCallback(() => {
    if (buttonLink) navigate(buttonLink);
  }, [buttonLink, navigate]);

  const renderImage = () => {
    if (!imageSrc) return null;

    if (Array.isArray(imageSrc)) {
      return (
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center lg:gap-32 md:gap-10 sm:gap-14 gap-0 mb-10"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {imageSrc.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`icon-${index + 1}`}
              className="md:mb-0 mb-4"
              width={imageSize}
              height={imageSize}
              loading="lazy"
            />
          ))}
        </motion.div>
      );
    }

    return (
      <motion.div
        className="flex justify-center items-center mb-10"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <img
          src={imageSrc}
          alt="section"
          width={imageSize}
          height={imageSize}
          loading="lazy"
        />
      </motion.div>
    );
  };

  return (
    <section
      className={`py-20 ${className}`}
      style={{ backgroundColor }}
    >
      <motion.div
        className={`container mx-auto px-3 md:px-6 text-center ${containerClassName}`}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {},
        }}
      >
        {title && (
          <motion.h1
            className="md:text-[36px] text-[30px] font-semibold pb-10"
            style={{ color: titleColor }}
            variants={fadeInUp}
            custom={0}
          >
            {title}
          </motion.h1>
        )}

        {text && (
          <motion.p
            className="md:text-[18px] text-[16px] mb-10"
            style={{ color: textColor }}
            variants={fadeInUp}
            custom={1}
          >
            {text}
          </motion.p>
        )}

        {renderImage()}

        {buttonText && (
          <motion.div
            className="flex justify-center items-center"
            variants={fadeInUp}
            custom={3}
          >
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
              {buttonLink && (
                <img src={arrow} alt="arrow" className="ml-2" loading="lazy" />
              )}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default CenteredSection;
