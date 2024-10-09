import Header from "../ui/Header";
import Button from "../ui/Button";

const CommentSection = () => {
  return (
    <>
      <div className="my-8">
        <Header variant={{ size: "md", theme: "dark", weight: "semiBold" }}>
          Leave a Comment
        </Header>
        <div className="xl:w-[50%] lg:w-[70%] md:w-[100%]">
          <div className="grid grid-cols-2 gap-5 mb-4">
            <div className="flex flex-col">
              <label>Full Name</label>
              <input
                type="text"
                className="border border-gray outline-none p-3"
              />
            </div>
            <div className="flex flex-col">
              <label>Email Address</label>
              <input
                type="text"
                className=" border border-gray outline-none p-3"
              />
            </div>
          </div>
          <div className="mb-5">
            <label>Descripion</label>
            <textarea className="border border-gray outline-none p-3 w-full"></textarea>
          </div>

          <Button
            variant={{ fontSize: "base", theme: "dark", fontWeight: "500" }}
            className="uppercase py-4 xl:w-48 lg:w-44 md:w-52"
          >
            Post Comment
          </Button>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
