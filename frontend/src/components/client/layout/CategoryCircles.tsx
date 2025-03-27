import Slider from "react-slick"; 
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../services/categoryApi";
import { API_URL } from "../../../env";

const CategoryCircles = () => {
    const { data: categories, isLoading } = useGetCategoriesQuery();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              },
            },
        ],
    };

    if (isLoading) return <p>Завантаження категорій...</p>;

    const sortedCategories = categories ? [...categories].sort((a, b) => a.id - b.id) : [];

    return (
        <div className="mt-12">
            <Slider {...settings}>
                {sortedCategories.map((category) => (
                    <div key={category.id} className="text-center">
                        <Link
                            to={`/category/${category.slug}`}
                            className="flex flex-col items-center"
                        >
                            {/* Кружечок із зображенням */}
                            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-pink-100 shadow-lg hover:border-pink-300 hover:scale-105 transition duration-300">
                                <img
                                    src={`${API_URL}/images/1200_${category.imageCategory}`}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Назва категорії */}
                            <p className="text-sm font-semibold mt-2 hover:text-pink-500 transition duration-200">
                                {category.name}
                            </p>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategoryCircles;