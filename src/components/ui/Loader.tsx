const Loader = ({ theme = false }) => {
  // Define color classes based on theme
  const colors = theme
    ? ["bg-[#4c86f9]", "bg-[#49a84c]", "bg-[#f6bb02]", "bg-[#f6bb02]", "bg-[#2196f3]"]
    : ["bg-[#8ab4f8]", "bg-[#81c784]", "bg-[#ffd54f]", "bg-[#ffd54f]", "bg-[#64b5f6]"];

  return (
    <div className={`flex justify-center items-center w-full h-screen gap-1.5 ${theme ? "bg-black" : ""}`}>
      {colors.map((color, index) => (
        <span
          key={index}
          className={`w-1 h-12 ${color} animate-scale`}
          style={{
            animationDelay: `${-0.8 + index * 0.1}s`,
            animationDuration: "0.9s",
          }}
        />
      ))}
    </div>
  );
};

export default Loader;
