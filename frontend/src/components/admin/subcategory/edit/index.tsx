import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, Row, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ISubCategoryEdit } from "../../../../interfaces/subcategory";
import { API_URL, http_common } from "../../../../env";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { useGetSubCategoriesQuery } from "../../../../services/subcategoryApi";

const SubCategoryEditPage: React.FC = () => {
    const { refetch } = useGetSubCategoriesQuery();
    const { slug } = useParams<{ slug?: string }>(); // ✅ Використовуємо slug
    const navigate = useNavigate();
    const [form] = Form.useForm<ISubCategoryEdit>();

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [file, setFile] = useState<UploadFile | null>(null);
    const [subcategoryId, setSubcategoryId] = useState<number | null>(null); // ✅ Збереження id підкатегорії

    // Завантаження категорій
    useEffect(() => {
        axios.get(`${API_URL}/api/Category`)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error("Помилка: Відповідь не є масивом категорій:", response.data);
                }
            })
            .catch((error) => {
                console.error("Помилка завантаження категорій:", error);
            });
    }, []);

    // Завантаження підкатегорії за slug
    useEffect(() => {
        if (!slug) return;
        
        axios.get(`${API_URL}/api/SubCategory/slug/${slug}`) // ✅ Запит за `slug`
            .then((response) => {
                const { data } = response;
                console.log("SubCategory data:", response.data);

                setSubcategoryId(data.id); // ✅ Зберігаємо id для оновлення
                form.setFieldsValue({
                    name: data.name,
                    categoryId: data.categoryId,
                });

                if (data.imageSubCategory) {
                    setFile({
                        uid: '-1',
                        name: data.imageSubCategory,
                        status: "done",
                        url: `${API_URL}/images/300_${data.imageSubCategory}`,
                    });
                }
            })
            .catch((error) => {
                console.error("Помилка завантаження підкатегорії:", error);
            });
    }, [slug, form]);

    const onSubmit = async (values: ISubCategoryEdit) => {
        if (!subcategoryId) return; // ✅ Переконуємось, що є ID

        console.log("Send Data", values);
        const formData = new FormData();
        formData.append("id", subcategoryId.toString()); // ✅ Використовуємо `subcategoryId`
        formData.append("name", values.name);
        formData.append("categoryId", values.categoryId.toString());
        
        if (file && file.originFileObj) {
            formData.append("imageSubCategory", file.originFileObj);
        } else if (file && file.url) {
            formData.append("currentImage", file.name);
        }

        try {
            await http_common.put<ISubCategoryEdit>(`${API_URL}/api/SubCategory`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Підкатегорія успішно оновлена!");
            refetch();
            navigate("/admin/subcategories");
        } catch (error) {
            console.error("Помилка редагування підкатегорії:", error);
            alert("Помилка при редагуванні підкатегорії");
        }
    };
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Редагування підкатегорії</h1>
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item
                    label="Назва підкатегорії"
                    name="name"
                    rules={[{ required: true, message: "Це поле є обов'язковим!" }, { min: 3, message: "Довжина поля 3 символи" }]}
                >
                    <Input className="border p-2 w-full" />
                </Form.Item>

                <Form.Item
                    label="Категорія"
                    name="categoryId"
                    rules={[{ required: true, message: "Оберіть категорію!" }]}
                >
                    <select className="border p-2 w-full">
                        <option value="">Оберіть категорію</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </Form.Item>

                <Form.Item
                    name="newImageSubCategory"
                    label="Фото"
                    valuePropName="file"
                    getValueFromEvent={(e: any) => e?.fileList[0]?.originFileObj}
                >
                    <Upload
                        beforeUpload={() => false}
                        accept="image/*"
                        onPreview={(file) => {
                            if (!file.url && !file.preview) {
                                file.preview = URL.createObjectURL(file.originFileObj as RcFile);
                            }
                            setPreviewImage(file.url || (file.preview as string));
                            setPreviewOpen(true);
                            setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
                        }}
                        fileList={file ? [file] : []}
                        onChange={(data) => {
                            setFile(data.fileList[0]);
                        }}
                        listType="picture-card"
                        maxCount={1}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Button style={{ margin: 10 }} className="bg-blue-500 text-white" type="primary" htmlType="submit">
                        Зберегти
                    </Button>
                    <Button style={{ margin: 10 }} onClick={() => navigate('/admin/subcategories')}>
                        Скасувати
                    </Button>
                </Row>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </div>
    );
};

export default SubCategoryEditPage;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button, Form, Input, Modal, Row, Upload } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { ISubCategoryEdit} from "../../../../interfaces/subcategory";
// import { API_URL, http_common } from "../../../../env";
// import { RcFile, UploadFile } from "antd/es/upload/interface";
// import { useGetSubCategoriesQuery } from "../../../../services/subcategoryApi";

// const SubCategoryEditPage: React.FC = () => {
//     const { refetch } = useGetSubCategoriesQuery();
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [form] = Form.useForm<ISubCategoryEdit>();

//     const [previewOpen, setPreviewOpen] = useState<boolean>(false);
//     const [previewImage, setPreviewImage] = useState('');
//     const [previewTitle, setPreviewTitle] = useState('');
//     const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
//     const [file, setFile] = useState<UploadFile | null>(null);

//     // Завантаження категорій
//     useEffect(() => {
//         axios.get("http://localhost:5126/api/Category")
//             .then((response) => {
//                 if (Array.isArray(response.data)) {
//                     setCategories(response.data); // Збереження, якщо це масив
//                 } else {
//                     console.error("Помилка: Відповідь не є масивом категорій:", response.data);
//                 }
//             })
//             .catch((error) => {
//                 console.error("Помилка завантаження категорій:", error);
//             });
//     }, []);

//     // Завантаження даних підкатегорії для редагування
//     useEffect(() => {
//         axios.get(`http://localhost:5126/api/SubCategory/${id}`)
//             .then((response) => {
//                 const { data } = response;
//                 console.log('SubCategory data:', response.data);
//                 // Заповнення форми даними підкатегорії
//                 form.setFieldsValue(response.data);
//                 if (data.imageSubCategory) {
//                     setFile({
//                         uid: '-1',
//                         name: data.imageSubCategory,
//                         status: "done",
//                         url: `${API_URL}/images/300_${data.imageSubCategory}`,
//                     });
//                 }
//             })
//             .catch((error) => {
//                 console.error("Помилка завантаження підкатегорії:", error);
//             });
//     }, [id, form]);

//     const onSubmit = async (values: ISubCategoryEdit) => {
//         console.log("Send Data", values);
//         const formData = new FormData();
//         formData.append("id", id!);
//         formData.append("name", values.name);
//         formData.append("categoryId", values.categoryId.toString());
//         if (file && file.originFileObj) {
//             formData.append("imageSubCategory", file.originFileObj);
//         } else if (file && file.url) {
//             formData.append("currentImage", file.name); // Передаємо ім'я поточного зображення
//         }
//         try {
//             await http_common.put<ISubCategoryEdit>("/api/SubCategory", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//             alert("Підкатегорія успішно оновлена!");
//             // Оновлення даних підкатегорій після редагування
//             refetch();
//             navigate("/admin/subcategories");
//         } catch (error) {
//             console.error("Помилка редагування підкатегорії:", error);
//             alert("Помилка при редагуванні підкатегорії");
//         }
//     };
    
//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4">Редагування підкатегорії</h1>
//             <Form form={form} onFinish={onSubmit} layout="vertical">
//                 <Form.Item
//                     label="Назва підкатегорії"
//                     name="name"
//                     rules={[{ required: true, message: "Це поле є обов'язковим!" }, { min: 3, message: "Довжина поля 3 символи" }]}
//                 >
//                     <Input className="border p-2 w-full" />
//                 </Form.Item>

//                 <Form.Item
//                     label="Категорія"
//                     name="categoryId"
//                     rules={[{ required: true, message: "Оберіть категорію!" }]}
//                 >
//                     <select className="border p-2 w-full">
//                         <option value="">Оберіть категорію</option>
//                         {Array.isArray(categories) && categories.map((category) => (
//                             <option key={category.id} value={category.id}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//                 </Form.Item>

//                 <Form.Item
//                     name="newImageSubCategory"
//                     label="Фото"
//                     valuePropName="file"
//                     getValueFromEvent={(e: any) => e?.fileList[0]?.originFileObj}
//                 >
//                     <Upload
//                         beforeUpload={() => false}
//                         accept="image/*"
//                         onPreview={(file) => {
//                             if (!file.url && !file.preview) {
//                                 file.preview = URL.createObjectURL(file.originFileObj as RcFile);
//                             }
//                             setPreviewImage(file.url || (file.preview as string));
//                             setPreviewOpen(true);
//                             setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
//                         }}
//                         fileList={file ? [file] : []}
//                         onChange={(data) => {
//                             setFile(data.fileList[0]);
//                         }}
//                         listType="picture-card"
//                         maxCount={1}
//                     >
//                         <div>
//                             <PlusOutlined />
//                             <div style={{ marginTop: 8 }}>Upload</div>
//                         </div>
//                     </Upload>
//                 </Form.Item>

//                 <Row style={{ display: "flex", justifyContent: "center" }}>
//                     <Button style={{ margin: 10 }} className="bg-blue-500 text-white" type="primary" htmlType="submit">
//                         Зберегти
//                     </Button>
//                     <Button style={{ margin: 10 }} onClick={() => navigate('/admin/subcategories')}>
//                         Скасувати
//                     </Button>
//                 </Row>
//             </Form>

//             <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
//                 <img alt="example" style={{ width: "100%" }} src={previewImage} />
//             </Modal>
//         </div>
//     );
// };

// export default SubCategoryEditPage;
