import { ProductFilterProps } from "../../../interfaces/products";

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  selectedManufacturers,
  setSelectedManufacturers,
  selectedQuantities,
  setSelectedQuantities,
}) => {
  // Отримання унікальних значень
  const uniqueManufacturers = Array.from(new Set(products.map((p) => p.manufacturer)));
  const uniqueQuantities = Array.from(new Set(products.map((p) => p.quantityInPack)));

  // Фільтрація доступних кількостей залежно від виробника
  const availableQuantities = Array.from(
    new Set(
      products
        .filter((p) => selectedManufacturers.length === 0 || selectedManufacturers.includes(p.manufacturer))
        .map((p) => p.quantityInPack)
    )
  );

// Оновлення вибору виробника
const toggleManufacturer = (manufacturer: string) => {
    setSelectedManufacturers((prev: string[] | ((prev: string[]) => string[])) =>
      Array.isArray(prev) // Перевіряємо, чи prev масив
        ? prev.includes(manufacturer)
          ? prev.filter((m) => m !== manufacturer)
          : [...prev, manufacturer]
        : []
    );
  };
  
  // Оновлення вибору кількості в упаковці
  const toggleQuantity = (quantity: number) => {
    setSelectedQuantities((prev: number[] | ((prev: number[]) => number[])) =>
      Array.isArray(prev)
        ? prev.includes(quantity)
          ? prev.filter((q) => q !== quantity)
          : [...prev, quantity]
        : []
    );
  };
  
  

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">Фільтр</h2>

      {/* Фільтр виробників */}
      <div className="mb-4">
        <h3 className="font-semibold cursor-pointer">Виробники</h3>
        <ul>
          {uniqueManufacturers.map((manufacturer) => (
            <li key={manufacturer} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedManufacturers.includes(manufacturer)}
                onChange={() => toggleManufacturer(manufacturer)}
                className="mr-2"
              />
              {manufacturer}
            </li>
          ))}
        </ul>
      </div>

      {/* Фільтр кількості в упаковці */}
      <div>
        <h3 className="font-semibold cursor-pointer">Кількість в упаковці</h3>
        <ul>
          {uniqueQuantities.map((quantity) => (
            <li key={quantity} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedQuantities.includes(quantity)}
                onChange={() => toggleQuantity(quantity)}
                disabled={!availableQuantities.includes(quantity)}
                className="mr-2"
              />
              <span className={availableQuantities.includes(quantity) ? "" : "text-gray-400"}>
                {quantity} шт
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductFilter;
