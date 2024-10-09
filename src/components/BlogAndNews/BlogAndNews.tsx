import BannerSection from "./BannerSection"
import CommentSection from "./CommentSection"
import LeftSection from "./LeftSection/LeftSection"
import RelatedPost from "./RelatedPost"
import RightSection from "./RightSection/RightSection"

const BlogAndNews = () => {
  return (
    <>
    <BannerSection/>
    <div className="mx-auto md:px-10 px-6">
    <div className="flex md:flex-row flex-col justify-between w-full">
      <RightSection/>
      <LeftSection/>
    </div>
    <RelatedPost/>
    <CommentSection/>
  </div>
  </>
  )
}

export default BlogAndNews