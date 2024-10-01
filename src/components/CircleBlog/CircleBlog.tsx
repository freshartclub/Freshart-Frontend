import AllBlogPost from './AllBlogPost'
import BannerSection from './BannerSection'
import RecentBlogPost from './RecentBlogPost'

const CircleBlog = () => {
  return (
    <div>
        <div> 
        <BannerSection/>
        <RecentBlogPost/>
        <AllBlogPost/>
        </div>
    </div>
  )
}

export default CircleBlog