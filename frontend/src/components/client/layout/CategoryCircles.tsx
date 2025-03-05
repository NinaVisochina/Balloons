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
        slidesToShow: 6, // Кількість видимих категорій одночасно
        slidesToScroll: 1,
        arrows: true, // Відображення стрілок
    };

    if (isLoading) return <p>Завантаження категорій...</p>;

    return (
        <div className="mt-12">
            <Slider {...settings}>
                {categories?.map((category) => (
                    <div key={category.id} className="text-center">
                        <Link
                            to={`/category/${category.slug}`} // 🔹 Використовуємо slug замість id
                            className="flex flex-col items-center"
                        >
                            {/* Кружечок із зображенням */}
                            <div className="w-40 h-40 rounded-full overflow-hidden border shadow-lg">
                                <img
                                    src={`${API_URL}/images/300_${category.imageCategory}`}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Назва категорії */}
                            <p className="text-sm font-semibold mt-2">
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
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { useGetCategoriesQuery } from "../../../services/categoryApi";
// import { API_URL } from "../../../env";

// const CategoryCircles = () => {
//     const { data: categories, isLoading } = useGetCategoriesQuery();

//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 6, // Кількість видимих категорій одночасно
//         slidesToScroll: 1,
//         arrows: true, // Відображення стрілок
//     };

//     if (isLoading) return <p>Завантаження категорій...</p>;

//     return (
//         <div className="mt-12">
//             <Slider {...settings}>
//                 {categories?.map((category) => (
//                     <div key={category.id} className="text-center">
//                         <Link
//                             to={`/category/${category.id}`}
//                             className="flex flex-col items-center"
//                         >
//                             {/* Кружечок із зображенням */}
//                             <div className="w-40 h-40 rounded-full overflow-hidden border shadow-lg">
//                                 <img
//                                     src={`${API_URL}/images/300_${category.imageCategory}`}
//                                     alt={category.name}
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>
//                             {/* Назва категорії */}
//                             <p className="text-sm font-semibold mt-2">
//                                 {category.name}
//                             </p>
//                         </Link>
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     );
// };

// export default CategoryCircles;
