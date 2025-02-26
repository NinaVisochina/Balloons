export interface ISubCategoryItem {
    id: number;
    slug: string;
    name: string;
    categoryId: number;
    categoryName: string;
    imageSubCategory: string;
}

export interface ISubCategoryName {
    id: number;
    slug: string;
    name: string;
}
export interface ISubCategoryEdit {
    id: number;
    slug?: string;
    name: string;
    categoryId: number | "";
    currentImagePath: string;
    newImageSubCategory: File | null;
}

export interface IUploadedFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    thumbUrl: string;
    type: string;
    uid: string;
}
export interface ISubCategoryCreate {
    slug?: string;
    name: string;
    categoryId: number | "";
    imageSubCategory: File | null;
}

export interface IUploadedFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    thumbUrl: string;
    type: string;
    uid: string;
}

