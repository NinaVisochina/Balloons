import { Button, Form, Input, Modal, Row, Upload, UploadFile } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { API_URL, http_common } from "../../../../env/index.ts";
import { useGetCategoriesQuery } from "../../../../services/categoryApi.ts";
import { ICategoryEdit} from "../../../../interfaces/categories/index.ts";

const CategoryEditPage = () => {
    const { refetch } = useGetCategoriesQuery();
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm<ICategoryEdit>();

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const [file, setFile] = useState<UploadFile | null>(null);
    //const [currentImage, setCurrentImage] = useState<string | null>(null); // Зберігаємо поточну назву зображення

    // const onSubmit = async (values: ICategoryEdit) => {
    //     console.log("Send Data", values);
    //     refetch();
    //     const formData = new FormData();
    //     formData.append("id", id!);
    //     formData.append("name", values.name);    
    //     if (file && file.originFileObj) {
    //         // Якщо нове зображення завантажено
    //         formData.append("imageCategory", file.originFileObj);
    //     } else if (file && file.url) {
    //         // Якщо зображення не змінювали
    //         formData.append("currentImage", file.name);
    //     }    
    //     try {
    //         const response = await http_common.put("/api/Category", formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });
    //         console.log("Update category", response.data);
    //         navigate("/admin/categories");
    //     } catch (error) {
    //         console.error("Помилка при редагуванні категорії:", error);
    //         alert("Помилка при редагуванні категорії");
    //     }
    // };
    const onSubmit = async (values: ICategoryEdit) => {
        console.log("Send Data", values);
    
        // Генеруємо `slug`, якщо його немає або користувач не ввів його вручну
        const slug = values.slug?.trim()
            ? values.slug.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
            : values.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    
        const formData = new FormData();
        formData.append("id", id!);
        formData.append("name", values.name);
        formData.append("slug", slug); // ✅ Передаємо `slug`
        
        if (file && file.originFileObj) {
            formData.append("imageCategory", file.originFileObj);
        }
    
        try {
            const response = await http_common.put(`/api/Category/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Update category", response.data);
            refetch();
            navigate("/admin/categories");
        } catch (error) {
            console.error("Помилка при редагуванні категорії:", error);
            alert("Помилка при редагуванні категорії");
        }
    };
    

    useEffect(() => {
        const nameValue = form.getFieldValue("name");
        if (nameValue) {
            form.setFieldsValue({
                slug: nameValue
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
            });
        }
    }, [form, form.getFieldValue("name")]);
    
    
    useEffect(() => {
        if (!id) return;
    
        http_common.get<ICategoryEdit>(`/api/Category/${id}`)
            .then((resp) => {
                const { data } = resp;
                form.setFieldsValue({ ...data });
    
                if (!data.slug) {
                    form.setFieldsValue({
                        slug: data.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                    });
                }
    
                if (data.imageCategory) {
                    setFile({
                        uid: "-1",
                        name: data.imageCategory,
                        status: "done",
                        url: `${API_URL}/images/300_${data.imageCategory}`,
                    });
                }
            })
            .catch((error) => {
                console.error("Помилка завантаження категорії:", error);
            });
    }, [id]);
    


    return (
        <>
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-2">
                Редагувати категорію
            </h1>

            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item
                    label="Назва"
                    name="name"
                    rules={[
                        { required: true, message: "Це поле є обов'язковим!" },
                        { min: 3, message: "Довжина поля має бути не менше 3 символів" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[
                        { required: true, message: "Це поле є обов'язковим!" },
                        { pattern: /^[a-z0-9-]+$/, message: "Slug може містити тільки малі латинські літери, цифри та дефіси" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="imageCategory"
                    label="Фото"
                    valuePropName="file"
                    getValueFromEvent={(e: UploadChangeParam) => {
                        return e.fileList.length > 0 ? e.fileList[0].originFileObj : null;
                    }}
                >
                    <Upload
                        beforeUpload={() => false}
                        accept="image/*"
                        onPreview={(file: UploadFile) => {
                            if (!file.url && !file.preview) {
                                file.preview = URL.createObjectURL(file.originFileObj as RcFile);
                            }
                            setPreviewImage(file.url || (file.preview as string));
                            setPreviewOpen(true);
                            setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
                        }}
                        fileList={file ? [file] : []}
                        onChange={(data) => setFile(data.fileList[0])}
                        listType="picture-card"
                        maxCount={1}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                {/* <Form.Item
                    name="imageCategory"
                    label="Фото"
                    valuePropName="imageCategory"
                    getValueFromEvent={(e: UploadChangeParam) => {
                        const image = e?.fileList[0] as IUploadedFile;
                        return image?.originFileObj;
                    }}
                >
                    <Upload
                        beforeUpload={() => false}
                        accept="image/*"
                        onPreview={(file: UploadFile) => {
                            if (!file.url && !file.preview) {
                                file.preview = URL.createObjectURL(file.originFileObj as RcFile);
                            }

                            setPreviewImage(file.url || (file.preview as string));
                            setPreviewOpen(true);
                            setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
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
                </Form.Item> */}

                <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        style={{ margin: 10 }}
                        type="primary"
                        htmlType="submit"
                    >
                        Зберегти
                    </Button>
                    <Link to="/admin/categories">
                        <Button style={{ margin: 10 }} htmlType="button">
                            Скасувати
                        </Button>
                    </Link>
                </Row>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </>
    );
};

export default CategoryEditPage;
// import { ICategoryEdit } from "./types.ts";
// import { Button, Form, Input, Modal, Row, Upload, UploadFile } from "antd";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { RcFile, UploadChangeParam } from "antd/es/upload";
// import { API_URL, http_common } from "../../../../env/index.ts";
// import { IUploadedFile } from "../create/types.ts";
// import { useGetCategoriesQuery } from "../../../../services/categoryApi.ts";

// const CategoryEditPage = () => {
//     const { refetch } = useGetCategoriesQuery();
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [form] = Form.useForm<ICategoryEdit>();

//     const [previewOpen, setPreviewOpen] = useState<boolean>(false);
//     const [previewImage, setPreviewImage] = useState("");
//     const [previewTitle, setPreviewTitle] = useState("");

//     const [file, setFile] = useState<UploadFile | null>(null);
//     //const [currentImage, setCurrentImage] = useState<string | null>(null); // Зберігаємо поточну назву зображення

//     // const onSubmit = async (values: ICategoryEdit) => {
//     //     console.log("Send Data", values);
//     //     refetch();
//     //     const formData = new FormData();
//     //     formData.append("id", id!);
//     //     formData.append("name", values.name);    
//     //     if (file && file.originFileObj) {
//     //         // Якщо нове зображення завантажено
//     //         formData.append("imageCategory", file.originFileObj);
//     //     } else if (file && file.url) {
//     //         // Якщо зображення не змінювали
//     //         formData.append("currentImage", file.name);
//     //     }    
//     //     try {
//     //         const response = await http_common.put("/api/Category", formData, {
//     //             headers: { "Content-Type": "multipart/form-data" },
//     //         });
//     //         console.log("Update category", response.data);
//     //         navigate("/admin/categories");
//     //     } catch (error) {
//     //         console.error("Помилка при редагуванні категорії:", error);
//     //         alert("Помилка при редагуванні категорії");
//     //     }
//     // };
//     const onSubmit = async(values: ICategoryEdit) => {
//         console.log("Send Data", values);
//         http_common.put<ICategoryEdit>("/api/Category", { ...values, id: id } ,
//             {headers: {"Content-Type": "multipart/form-data"}})
//             .then(resp => {
//                 console.log("Update category", resp.data);
//                 refetch();
//                 navigate('/admin/categories');
//             })
//     }

//     useEffect(() => {
//         // Завантажуємо дані категорії з бекенду
//         http_common
//             .get<ICategoryEdit>(`/api/Category/${id}`)
//             .then((resp) => {
//                 const { data } = resp;
//                 form.setFieldsValue({
//                     ...data,
//                 });
//                 if(data.imageCategory!=null) {
//                     setFile({
//                        uid: '-1',
//                        name: data.imageCategory,
//                        status: "done",
//                        url: `${API_URL}/images/300_${data.imageCategory}`
//                     });
//                 }
//             });
//     }, []);

//     return (
//         <>
//             <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-2">
//                 Редагувати категорію
//             </h1>

//             <Form form={form} onFinish={onSubmit} layout="vertical">
//                 <Form.Item
//                     label="Назва"
//                     name="name"
//                     rules={[
//                         { required: true, message: "Це поле є обов'язковим!" },
//                         { min: 3, message: "Довжина поля має бути не менше 3 символів" },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     name="imageCategory"
//                     label="Фото"
//                     valuePropName="imageCategory"
//                     getValueFromEvent={(e: UploadChangeParam) => {
//                         const image = e?.fileList[0] as IUploadedFile;
//                         return image?.originFileObj;
//                     }}
//                 >
//                     <Upload
//                         beforeUpload={() => false}
//                         accept="image/*"
//                         onPreview={(file: UploadFile) => {
//                             if (!file.url && !file.preview) {
//                                 file.preview = URL.createObjectURL(file.originFileObj as RcFile);
//                             }

//                             setPreviewImage(file.url || (file.preview as string));
//                             setPreviewOpen(true);
//                             setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
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
//                     <Button
//                         style={{ margin: 10 }}
//                         type="primary"
//                         htmlType="submit"
//                     >
//                         Зберегти
//                     </Button>
//                     <Link to="/admin/categories">
//                         <Button style={{ margin: 10 }} htmlType="button">
//                             Скасувати
//                         </Button>
//                     </Link>
//                 </Row>
//             </Form>

//             <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
//                 <img alt="example" style={{ width: "100%" }} src={previewImage} />
//             </Modal>
//         </>
//     );
// };

// export default CategoryEditPage;
