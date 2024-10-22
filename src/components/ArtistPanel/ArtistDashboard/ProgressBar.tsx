import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ProgressBar.css";
const ProgressBar = ({ progress }: any) => {
  const percentage = progress;
  const pathColor = "#FF536B"; // Custom path color (progress color)
  const trailColor = "#d6d6d6"; // Custom trail color

  return (
    <div className="h-[180px] w-[250px]">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        circleRatio={0.5}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: "butt",
          textSize: "14px",
          pathTransitionDuration: 0.5,
          pathColor: pathColor,
          textColor: "black",
          trailColor: trailColor,
          backgroundColor: "red",
          // strokeLinecap: "LuKeyRound",
        })}
        strokeWidth={10}
        className="custom-progress-bar"
      />
    </div>
  );
};

export default ProgressBar;
