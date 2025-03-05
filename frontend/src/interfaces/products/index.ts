export interface IProductItem {
    id: number;
    slug: string;
    code: string,
    name: string,
    price: number,
    images: string[],
    manufacturer: string,
    size: string,
    color: string,
    type: string,
    form: string,
    quantityInPack: number,
    quantityInStock: number,
    modeles: string,
    subCategoryName: string,
    subCategoryId: number,
    description: string
}

export interface IProductCreate {
    slug?: string;
    code: string,
    name: string,
    price: number,
    images: File[],
    manufacturer: string,
    size: string,
    color: string,
    type: string,
    form: string,
    quantityInPack: number,
    quantityInStock: number,
    //model: string,
    subCategoryName: string,
    subCategoryId: number,
    description: string
}

export interface IProductImageDesc {
    id: number,
    image: string,
}

export interface IProductEdit {
    id: number,
    slug?: string;
    code: string,
    name: string,
    price: number,
    images?: File[];
    manufacturer: string,
    size: string,
    color: string,
    type: string,
    form: string,
    quantityInPack: number,
    quantityInStock: number,
    //model: string,
    subCategoryName: string,
    subCategoryId: number,
    description: string
}

export interface IUploadedFile {
    id: number;
    image: string;
    priority: number;
    preview: any;
    url: any;
    originFileObj: File;
    size: number;
    type: string;
    uid: string;
}

export interface ProductsPageProps {
    categorySlug?: string; // ✅ Замість categoryId тепер використовуємо slug
    subCategorySlug?: string;
    products?: IProductItem[]; // Додаємо цей рядок
  }

  export interface ProductFilterProps {
    products: IProductItem[];
    selectedManufacturers: string[];
    setSelectedManufacturers: React.Dispatch<React.SetStateAction<string[]>>; // <-- важливо!
    selectedQuantities: number[];
    setSelectedQuantities: React.Dispatch<React.SetStateAction<number[]>>; // <-- важливо!
  }