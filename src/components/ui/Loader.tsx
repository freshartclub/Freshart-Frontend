const Loader = ({ theme }) => {
  // Define color classes based on theme
  const colors = theme 
    ? [
        "bg-[#4c86f9]",  // first-color light
        "bg-[#49a84c]",  // second-color light
        "bg-[#f6bb02]",  // third-color light
        "bg-[#f6bb02]",  // fourth-color light
        "bg-[#2196f3]",  // fifth-color light
      ]
    : [
        "bg-[#8ab4f8]",  // first-color dark
        "bg-[#81c784]",  // second-color dark
        "bg-[#ffd54f]",  // third-color dark
        "bg-[#ffd54f]",  // fourth-color dark
        "bg-[#64b5f6]",  // fifth-color dark
      ];

  return (
    <div className="flex justify-center items-center w-full h-screen gap-1.5">
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