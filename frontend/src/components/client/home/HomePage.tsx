import CategoryCircles from "../layout/CategoryCircles";
import SubCategoryCarousel from "../layout/SubCategoryCarousel";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
//import bannerImage from "../../../assets/images/Group 1 (1).png"
import bannerImage from "../../../assets/images/Group 2 (1).png"

const HomePage = () => {
    return (
        <div>
            {/* Великий банер на всю ширину */}
            <div className="w-full">
                <img 
                    src={bannerImage} 
                    alt="Banner" 
                    className="w-full h-[500px] object-cover" 
                />
            </div>

            {/* <div 
                className="w-full h-[500px] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bannerImage})` }}
            >
            </div> */}
            {/* Кружечки категорій */}
            <CategoryCircles />

            {/* Карусель підкатегорій */}
            <SubCategoryCarousel />
        </div>
    );
};

export default HomePage;
