import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { useGetSubCategoriesQuery } from "../../../services/subcategoryApi";
import { API_URL } from "../../../env";

const SubCategoryCarousel = () => {
    const { data: subCategories, isLoading } = useGetSubCategoriesQuery();
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    
    if (isLoading) return <p>Завантаження...</p>;

    return (
        <div>
            <Slider {...settings}>
                {subCategories?.map((subCategory) => (
                    <div 
                        key={subCategory.id} 
                        className="p-4 cursor-pointer"
                        onClick={() => navigate(`/subcategory/${subCategory.slug}/products`)} // ✅ Використовуємо slug
                    >
                        <Link to={`/subcategory/${subCategory.slug}/products`}> {/* ✅ Використовуємо slug */}
                            <img
                                src={`${API_URL}/images/1200_${subCategory.imageSubCategory}`}
                                alt={subCategory.name}
                                className="w-full h-100 object-cover rounded-lg"
                            />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SubCategoryCarousel;
// import Slider from "react-slick";
// import { Link, useNavigate } from "react-router-dom";
// import { useGetSubCategoriesQuery } from "../../../services/subcategoryApi";
// import { API_URL } from "../../../env";

// const SubCategoryCarousel = () => {
//     const { data: subCategories, isLoading } = useGetSubCategoriesQuery();
//     const navigate = useNavigate();

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//     };
    

//     if (isLoading) return <p>Завантаження...</p>;

//     return (
//         <div>
//             <Slider {...settings}>
//                 {subCategories?.map((subCategory) => (
//                     <div key={subCategory.id} 
//                     className="p-4 cursor-pointer"
//                     onClick={() => navigate(`/subcategory/${subCategory.id}/products`)}
//                     >
//                         <Link to={`/subcategory/${subCategory.id}`}>
//                             <img
//                                 src={`${API_URL}/images/1200_${subCategory.imageSubCategory}`}
//                                 alt={subCategory.name}
//                                 className="w-full h-100 object-cover rounded-lg"
//                             />
//                         </Link>
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     );
// };

// export default SubCategoryCarousel;
