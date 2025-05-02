import { useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import Button from "../ui/Button";
import { imageUrl } from "../utils/baseUrls";

interface BannerSectionProps {
  data: any[];
}

const stripHtmlTags = (text: string) => {
  return text
    ?.split(/<\/?p>/gi)
    .map(p => p.trim())
    .filter(Boolean);
};

const BannerSection = ({ data }: BannerSectionProps) => {
  const navigate = useNavigate();

  const getContent = useMemo(
    () => data?.find(item => item?.type === "Main-Banner"),
    [data]
  );

  const paragraphs = useMemo(
    () => stripHtmlTags(getContent?.content || ""),
    [getContent]
  );

  const handleProceed = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const handleGuestAccess = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  // Framer Motion Animation Control
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div
      className="h-screen bg-black bg-cover bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url("${imageUrl}/users/${getContent?.carouselImg}")`,
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto sm:px-6 px-3">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          className="text-white text-center xl:w-[60%] lg:w-[70%] mx-auto"
        >
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="md:text-[80px] text-[50px] font-semibold capitalize"
          >
            {getContent?.title}
          </motion.h1>

          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className="md:text-[80px] text-[50px] font-semibold capitalize"
          >
            {getContent?.subtitle}
          </motion.h1>

          {paragraphs.map((text: string, index: number) => (
            <motion.p
              key={index}
              variants={fadeUp}
              custom={0.2 + index * 0.1}
              className="text-[18px] sm:mx-10 sm:mb-6 mb-2"
            >
              {text}
            </motion.p>
          ))}

          <motion.div
            variants={fadeUp}
            custom={0.3 + paragraphs.length * 0.1}
            className="bg-white flex justify-between sm:mx-24 px-2 py-1 rounded-full mt-6"
          >
            <input
              type="text"
              placeholder="Email, phone or invite code"
              className="ml-2 text-black w-full outline-none"
            />
            <Button
              onClick={handleProceed}
              className="px-6 py-2 rounded-full bg-[#FF536B] text-white"
            >
              Proceed
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.5 + paragraphs.length * 0.1}>
            <Button
              variant={{
                theme: "dark",
                rounded: "full",
                fontWeight: "500",
                thickness: "moderate",
                fontSize: "base",
              }}
              onClick={handleGuestAccess}
              className="mt-10"
            >
              {getContent?.link?.text}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BannerSection;
