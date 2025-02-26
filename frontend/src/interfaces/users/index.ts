export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber?: string; 
    birthdate?: string;   
    image?: string;       // Поле необов'язкове
}