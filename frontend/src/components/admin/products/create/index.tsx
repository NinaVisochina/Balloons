import { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Upload, UploadFile, Space, InputNumber, Select } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import { IProductCreate} from '../../../../interfaces/products';
import { http_common } from "../../../../env";
import { useGetProductsQuery } from '../../../../services/productApi';
import { ISubCategoryItem, ISubCategoryName } from '../../../../interfaces/subcategory';

const ProductCreatePage = () => {
    const { refetch } = useGetProductsQuery();
    const navigate = useNavigate();
    const [form] = Form.useForm<IProductCreate>();
    // const [loading, setLoading] = useState<boolean>(false);

    const [subcategories, setSubCategories] = useState<ISubCategoryName[]>([]);
    // const [description, setDescription] = useState<string>("");
    // const [descImages, setDescImages] = useState<IProductImageDesc[]>([]);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        http_common.get<ISubCategoryItem[]>("/api/SubCategory")
            .then(resp => {
                setSubCategories(resp.data);
            });
    }, []);

    useEffect(() => {
        const name = form.getFieldValue("name") as string;
        if (name) {
            form.setFieldsValue({
                slug: name
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
            });
        }
    }, [form.getFieldValue("name")]);

    // const onSubmit = async (values: IProductCreate) => {
    //     console.log("Send Data", values);
    //     console.log("descImages list:", descImages);
    //     http_common.post<IProductCreate>("/api/Products/create", values,
    //         { headers: { "Content-Type": "multipart/form-data" } })
    //         .then(resp => {
    //             console.log("Create product", resp.data);
    //             refetch();
    //             alert("Товар успішно додано!");  // Повідомлення про успіх
    //             navigate('/admin/products'); // Перенаправлення на список товарів
    //         })
    //         .catch((error) => {
    //             console.error("Помилка при створенні товару:", error);
    //             alert("Помилка при створенні товару");
    //         });
    // };
    const onSubmit = async (values: IProductCreate) => {
        console.log("Send Data", values);
    
        const slug = values.slug || values.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("slug", slug);
        formData.append("price", values.price.toString());
        formData.append("manufacturer", values.manufacturer || "");
        formData.append("size", values.size || "");
        formData.append("color", values.color || "");
        formData.append("type", values.type || "");
        formData.append("form", values.form || "");
        formData.append("quantityInPack", values.quantityInPack.toString());
        formData.append("quantityInStock", values.quantityInStock.toString());
        formData.append("subCategoryId", values.subCategoryId.toString());
        formData.append("description", values.description);
    
        if (values.images) {
            values.images.forEach((file) => formData.append("images", file));
        }
    
        try {
            const response = await http_common.post("/api/Products/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Create product", response.data);
            refetch();
            alert("Товар успішно додано!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Помилка при створенні товару:", error);
            alert("Помилка при створенні товару");
        }
    };
    

    return (

        <>
            <p className="text-center text-3xl font-bold mb-7">Create Product</p>
            <Form form={form} onFinish={onSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                <Form.Item name="code" label="Code" hasFeedback
                    rules={[{ required: true, message: 'Please provide a product code.' }]}>
                    <Input placeholder='Enter product code' />
                </Form.Item>
                <Form.Item name="slug" label="Slug" hasFeedback>
                    <Input placeholder="Автоматично згенеровано" disabled />
                </Form.Item>

                <Form.Item name="name" label="Name" hasFeedback
                    rules={[{ required: true, message: 'Please provide a valid category name.' }]}>
                    <Input placeholder='Type category name' />
                </Form.Item>
                <Form.Item name="price" label="Price" hasFeedback
                    rules={[{ required: true, message: 'Please enter product price.' }]}>
                    <InputNumber addonAfter="$" placeholder='0.00' />
                </Form.Item>
                <Form.Item name="manufacturer" label="Manufacturer">
                    <Input placeholder="Enter manufacturer" />
                </Form.Item>

                <Form.Item name="size" label="Size">
                    <Input placeholder="Enter size" />
                </Form.Item>

                <Form.Item name="color" label="Color">
                    <Input placeholder="Enter color" />
                </Form.Item>

                <Form.Item name="type" label="Type">
                    <Input placeholder="Enter type" />
                </Form.Item>

                <Form.Item name="form" label="Form">
                    <Input placeholder="Enter form" />
                </Form.Item>

                <Form.Item name="quantityInPack" label="Quantity in Pack">
                    <InputNumber min={1} placeholder="Enter quantity in pack" />
                </Form.Item>

                <Form.Item name="quantityInStock" label="Quantity in Stock">
                    <InputNumber min={1} placeholder="Enter stock quantity" />
                </Form.Item>
                <Form.Item name="subCategoryId" label="Subcategory" hasFeedback
                    rules={[{ required: true, message: 'Please choose a subcategory.' }]}>
                    <Select placeholder="Select a subcategory">
                        {subcategories.map(c => (
                            <Select.Option key={c.id} value={c.id}> {c.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="images"
                    label="Photo"
                    valuePropName="Image"
                    rules={[{ required: true, message: "Please choose a photo for the product." }]}
                    getValueFromEvent={(e: UploadChangeParam) => {
                        return e?.fileList.map(file => file.originFileObj);
                    }}>

                    <Upload
                        beforeUpload={() => false}
                        accept="image/*"
                        maxCount={10}
                        listType="picture-card"
                        multiple
                        onPreview={(file: UploadFile) => {
                            if (!file.url && !file.preview) {
                                file.preview = URL.createObjectURL(file.originFileObj as RcFile);
                            }

                            setPreviewImage(file.url || (file.preview as string));
                            setPreviewOpen(true);
                            setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
                        }}>

                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item name="description" label="Description" hasFeedback
                    rules={[{ required: true, message: 'Please provide a product description.' }]}>
                    {/* Якщо ви хочете використовувати просте поле вводу */}
                    <Input.TextArea placeholder="Enter product description" rows={4} />

                    {/* Або для більш складного текстового редактора */}
                    {/* <EditorTiny 
                        value={description}
                        label="Description"
                        field="description"
                        getSelectImage={(image: IProductImageDesc) => {
                        setDescImages((prevImages) => [...prevImages, image]);
                    }}
                    onEditorChange={(text: string) => {
                        setDescription(text);
                    }}
                    /> */}
                </Form.Item>

                {/* <EditorTiny
                    value={description} //Значення, яке ми вводимо в поле
                    label="Опис" //Підпис для даного інпуту
                    field="description" //Назва інпуту
                    getSelectImage={(image: IProductImageDesc) => {
                        setDescImages((prevImages) => [...prevImages, image]);
                    }}
                    onEditorChange={(text: string) => {
                        //Метод, який викликає сам компонет, коли в інпуті змінюється значення
                        //console.log("Data set value", text);
                        setDescription(text); //Текст, який в середині інпуту, записуємо у формік в поле description
                    }}
                /> */}

                <Form.Item wrapperCol={{ span: 10, offset: 10 }}>
                    <Space>
                        <Link to={"/admin/products"}>
                            <Button htmlType="button"
                                className='text-white bg-gradient-to-br from-red-400 to-purple-600 font-medium rounded-lg px-5'>Cancel</Button>
                        </Link>
                        <Button htmlType="submit"
                            className='text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg px-5'>Create</Button>
                    </Space>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>

    );
};

export default ProductCreatePage;// import {useEffect, useState} from 'react';
// import {Form, Input, Button, Modal, Upload, UploadFile, Space, InputNumber, Select} from 'antd';
// import {useNavigate, Link} from 'react-router-dom';
// import {RcFile, UploadChangeParam} from "antd/es/upload";
// import {PlusOutlined} from '@ant-design/icons';
// import {IProductCreate, IProductImageDesc} from '../../../../interfaces/products';
// import {http_common} from "../../../../env";
// import EditorTiny from "../../../common/EditorTiny";
// import { ISubCategoryItem } from '../../subcategory/list/types';
// import { useGetProductsQuery } from '../../../../services/productApi';

// // import Loader from '../../common/loader/Loader';

// export interface ISubCategoryName {
//     id: number;
//     name: string;
// }

// const ProductCreatePage = () => {
//     const { refetch } = useGetProductsQuery();
//     const navigate = useNavigate();
//     const [form] = Form.useForm<IProductCreate>();
//     // const [loading, setLoading] = useState<boolean>(false);

//     const [subcategories, setSubCategories] = useState<ISubCategoryName[]>([]);
//     const [description, setDescription] = useState<string>("");
//     const [descImages, setDescImages] = useState<IProductImageDesc[]>([]);
//     const [previewOpen, setPreviewOpen] = useState<boolean>(false);
//     const [previewImage, setPreviewImage] = useState('');
//     const [previewTitle, setPreviewTitle] = useState('');

//     // useEffect(() => {
//     //         // Завантаження підкатегорій для відображення
//     //         fetch(`http://localhost:5126/api/SubCategory`)
//     //             .then((response) => response.json())
//     //             .then((data) => setSubCategories(data))
//     //             .catch((err) => console.error("Помилка завантаження підкатегорій:", err));
//     //     }, []);
//     useEffect(() => {
//         http_common.get<ISubCategoryItem[]>("/api/SubCategory")
//             .then(resp => {
//                 setSubCategories(resp.data);
//             });
//     }, []);

//     // const onSubmit = async (values: IProductCreate) => {
//     //     // setLoading(true);
//     //     try {
//     //         console.log("Send Data:", values);
//     //         console.log("descImages list:", descImages);
//     //         const imagesDescIds = descImages.map((x) => {
//     //             return x.id;
//     //         })
//     //         const productData = { ...values, imagesDescIds };
//     //         http_common.post("/api/Product", productData,
//     //             {
//     //                 headers: { "Content-Type": "multipart/form-data" }
//     //             }).then(resp => {
//     //             console.log("Product created:", resp.data);
//     //             navigate(`/admin/products`);
//     //         });

//     //     } catch (error) {
//     //         console.error("Error creating product:", error);
//     //     } finally {
//     //         // setLoading(false);
//     //     }
//     // };
//     const onSubmit = async (values: IProductCreate) => {
//         console.log("Send Data", values);
//         console.log("descImages list:", descImages);
//         // const imagesDescIds = descImages.map((x) => {
//         //     return x.id;
//         // })
//         //const productData = { ...values, imagesDescIds };
//         http_common.post<IProductCreate>("/api/Products/create", values,
//             {headers: {"Content-Type": "multipart/form-data"}})
//             .then(resp => {
//             console.log("Create product", resp.data);
//                 refetch();                
//                 alert("Товар успішно додано!");  // Повідомлення про успіх
//                 navigate('/admin/products'); // Перенаправлення на список товарів
//             })
//             .catch((error) => {
//                 console.error("Помилка при створенні товару:", error);
//                 alert("Помилка при створенні товару");
//             });
//     };
//     // const onSubmit = async (values: ISubCategoryCreate) => {
//     //         console.log("Send Data", values);
//     //         http_common.post<ISubCategoryCreate>("/api/SubCategory/create", values,
//     //             {headers: {"Content-Type": "multipart/form-data"}})
//     //             .then(resp => {
//     //             console.log("Create subcategory", resp.data);
//     //                 refetch();
//     //                 // Повідомлення про успіх
//     //                 alert("Підкатегорію успішно додано!");
//     //                 navigate('/admin/subcategories'); // Перенаправлення на список категорій
//     //             })
//     //             .catch((error) => {
//     //                 console.error("Помилка при створенні підкатегорії:", error);
//     //                 alert("Помилка при створенні підкатегорії");
//     //             });
//     //     };
    
//     return (

//         <>
//             <p className="text-center text-3xl font-bold mb-7">Create Product</p>
//             <Form form={form} onFinish={onSubmit} labelCol={{span: 6}} wrapperCol={{span: 14}}>
//                 <Form.Item name="code" label="Code" hasFeedback
//                     rules={[{ required: true, message: 'Please provide a product code.' }]}>
//                     <Input placeholder='Enter product code' />
//                 </Form.Item>
//                 <Form.Item name="name" label="Name" hasFeedback
//                            rules={[{required: true, message: 'Please provide a valid category name.'}]}>
//                     <Input placeholder='Type category name'/>
//                 </Form.Item>
//                 <Form.Item name="price" label="Price" hasFeedback
//                            rules={[{required: true, message: 'Please enter product price.'}]}>
//                     <InputNumber addonAfter="$" placeholder='0.00'/>
//                 </Form.Item>
//                 <Form.Item name="manufacturer" label="Manufacturer">
//                     <Input placeholder="Enter manufacturer" />
//                 </Form.Item>

//                 <Form.Item name="size" label="Size">
//                     <Input placeholder="Enter size" />
//                 </Form.Item>

//                 <Form.Item name="color" label="Color">
//                     <Input placeholder="Enter color" />
//                 </Form.Item>

//                 <Form.Item name="type" label="Type">
//                     <Input placeholder="Enter type" />
//                 </Form.Item>

//                 <Form.Item name="form" label="Form">
//                     <Input placeholder="Enter form" />
//                 </Form.Item>

//                 <Form.Item name="quantityInPack" label="Quantity in Pack">
//                     <InputNumber min={1} placeholder="Enter quantity in pack" />
//                 </Form.Item>

//                 <Form.Item name="quantityInStock" label="Quantity in Stock">
//                     <InputNumber min={1} placeholder="Enter stock quantity" />
//                 </Form.Item>
//                 <Form.Item name="subCategoryId" label="Subcategory" hasFeedback
//                     rules={[{ required: true, message: 'Please choose a subcategory.' }]}>
//                     <Select placeholder="Select a subcategory">
//                         {subcategories.map(c => (
//                             <Select.Option key={c.id} value={c.id}> {c.name}</Select.Option>
//                         ))}
//                     </Select>
//                 </Form.Item>
//                 <Form.Item 
//                     name="images" 
//                     label="Photo" 
//                     valuePropName="Image"
//                            rules={[{required: true, message: "Please choose a photo for the product."}]}
//                            getValueFromEvent={(e: UploadChangeParam) => {
//                                return e?.fileList.map(file => file.originFileObj);
//                            }}>

//                     <Upload 
//                         beforeUpload={() => false} 
//                         accept="image/*" 
//                         maxCount={10} 
//                         listType="picture-card" 
//                         multiple
//                             onPreview={(file: UploadFile) => {
//                                 if (!file.url && !file.preview) {
//                                     file.preview = URL.createObjectURL(file.originFileObj as RcFile);
//                                 }

//                                 setPreviewImage(file.url || (file.preview as string));
//                                 setPreviewOpen(true);
//                                 setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
//                             }}>

//                         <div>
//                             <PlusOutlined/>
//                             <div style={{marginTop: 8}}>Upload</div>
//                         </div>
//                     </Upload>
//                 </Form.Item>                
//                 <Form.Item name="description" label="Description" hasFeedback
//                             rules={[{ required: true, message: 'Please provide a product description.' }]}>
//                     {/* Якщо ви хочете використовувати просте поле вводу */}
//                     <Input.TextArea placeholder="Enter product description" rows={4} />
    
//                     {/* Або для більш складного текстового редактора */}
//                     {/* <EditorTiny 
//                         value={description}
//                         label="Description"
//                         field="description"
//                         getSelectImage={(image: IProductImageDesc) => {
//                         setDescImages((prevImages) => [...prevImages, image]);
//                     }}
//                     onEditorChange={(text: string) => {
//                         setDescription(text);
//                     }}
//                     /> */}
//                 </Form.Item>
                
//                 {/* <EditorTiny
//                     value={description} //Значення, яке ми вводимо в поле
//                     label="Опис" //Підпис для даного інпуту
//                     field="description" //Назва інпуту
//                     getSelectImage={(image: IProductImageDesc) => {
//                         setDescImages((prevImages) => [...prevImages, image]);
//                     }}
//                     onEditorChange={(text: string) => {
//                         //Метод, який викликає сам компонет, коли в інпуті змінюється значення
//                         //console.log("Data set value", text);
//                         setDescription(text); //Текст, який в середині інпуту, записуємо у формік в поле description
//                     }}
//                 /> */}

//                 <Form.Item wrapperCol={{span: 10, offset: 10}}>
//                     <Space>
//                         <Link to={"/admin/products"}>
//                             <Button htmlType="button"
//                                     className='text-white bg-gradient-to-br from-red-400 to-purple-600 font-medium rounded-lg px-5'>Cancel</Button>
//                         </Link>
//                         <Button htmlType="submit"
//                                 className='text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg px-5'>Create</Button>
//                     </Space>
//                 </Form.Item>
//             </Form>

//             <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
//                 <img alt="example" style={{width: '100%'}} src={previewImage}/>
//             </Modal>
//         </>

//     );
// };

// export default ProductCreatePage;