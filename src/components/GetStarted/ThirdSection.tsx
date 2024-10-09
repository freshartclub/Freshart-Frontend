import CommonComponent from './CommonComponent';
import image from "../../assets/proces1-il 1.png";

const ThirdSection = () => {
  return (
    <div className="py-20">
        <CommonComponent 
        paragraph = "Choose your artworks, receive them at home, enjoy them and whenever you want… exchange them for a new ones! Or if you have fallen in love with them, get them under very special conditions!"
        button="Discover now"
        image= {image}
        />
    </div>
  )
}

export default ThirdSection