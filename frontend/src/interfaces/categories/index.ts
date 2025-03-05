export interface ICategoryItem {
    id: number;
    slug: string;
    name: string;
    description: string;
    imageCategory: string;
}

export interface ICategoryCreate {
    slug?: string; 
    name: string;
    description: string;
    imageCategory: File|null;
}

export interface ICategoryEdit {
    id: number;
    slug?: string; 
    name: string;
    description: string;
    imageCategory: string;
}

export interface ICategoryName {
    id: number;
    slug: string;
    name: string;
}

export interface IUploadedFile {
    preview: any;
    url: any;
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