import { useState } from "react";
import Button from "../ui/Button";
import P from "../ui/P";
import image_icon from "./assets/primary-shape3.png";
import stream from "./assets/primary-shape4.png";
import CircleUserComment from "./CircleUserComment";

const CircleRight = () => {

  const [textAreaContent, setTextAreaContent] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);


  const handleImage = (e) => {
    const selectedFile = e.target.files[0]; // Get the first file selected
    if (selectedFile) {
      setFile(selectedFile);
    
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };


  return (
    <div className="2xl:w-[75%] xl:w-[70%] lg:w-[65%] w-full">
      <div className="shadow-xl sm:p-6 p-3 w-full rounded-lg">
        <textarea
          placeholder="Share what you are thinking here..."
          className="border w-full p-2 h-32 rounded-lg outline-none"
          value={textAreaContent}
          onChange={(e) => setTextAreaContent(e.target.value)}
        ></textarea>

        <div className="flex justify-between">
          <div className="flex flex-wrap gap-2 items-center sm:justify-normal justify-center">
          <div>
      {/* File input, hidden for styling */}
      <input
        type="file"
        accept="image/*, video/*" // Accept both images and videos
        hidden
        onChange={handleImage} // Trigger handleImage function on change
      />

      {/* Button that opens the file input */}
      <Button
        variant={{ rounded: "full" }}
        className="flex gap-2 bg-[#919EAB14]"
        onClick={() => document.querySelector('input[type="file"]').click()} // Trigger file input click on button click
      >
        <img src={image_icon} alt="image/video" />
        <P variant={{ size: "small", theme: "dark", weight: "semiBold" }}>
          Image/Video
        </P>
      </Button>

      {/* Preview of the selected image/video */}
      {previewUrl && (
        <div className="mt-4">
          {file.type.startsWith("image") ? (
            <img src={previewUrl} alt="Preview" className="w-full h-auto" />
          ) : file.type.startsWith("video") ? (
            <video controls className="w-full h-auto">
              <source src={previewUrl} type={file.type} />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      )}
    </div>
            <Button
              variant={{ rounded: "full" }}
              className="flex gap-2 bg-[#919EAB14]"
            >
              <img src={stream} alt="image" />
              <P variant={{ size: "small", theme: "dark", weight: "semiBold" }}>
                Streaming
              </P>
            </Button>
          </div>
          <div className="">
            <Button
              variant={{ fontSize: "small", theme: "dark", fontWeight: "500" }}
            >
              Post
            </Button>
          </div>
        </div>
      </div>

      <CircleUserComment />
    </div>
  );
};

export default CircleRight;
