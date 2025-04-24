import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { API_URL } from "../../../../env";
import { Button, Form, Modal, Input, Upload, UploadFile, Space, InputNumber, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IProductEdit } from "../../../../interfaces/products";
import { useGetProductBySlugQuery, useUpdateProductMutation } from "../../../../services/productApi";
import { useGetSubCategoriesQuery } from "../../../../services/subcategoryApi";

const ProductEditPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm<IProductEdit>();
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [productId, setProductId] = useState<number | null>(null);

    // Завантажуємо підкатегорії
    const { data: subcategories = [] } = useGetSubCategoriesQuery();

    // Завантажуємо продукт за slug
    const { data: productData } = useGetProductBySlugQuery(slug!, { skip: !slug });

    // Використовуємо мутацію для редагування
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    // Оновлюємо форму, коли змінюються дані продукту
    useEffect(() => {
        if (!productData) return;

        const data = productData;
        setProductId(data.id);
        form.setFieldsValue({
            id: data.id,
            code: data.code,
            name: data.name,
            price: data.price,
            manufacturer: data.manufacturer,
            size: data.size,
            color: data.color,
            type: data.type,
            form: data.form,
            quantityInPack: data.quantityInPack,
            quantityInStock: data.quantityInStock,
            subCategoryId: data.subCategoryId,
            description: data.description,
        });

        const newFileList: UploadFile[] = data.images.map((image) => ({
            uid: image,
            name: image,
            status: "done",
            url: `${API_URL}/images/300_${image}`,
        }));
        setFiles(newFileList);
    }, [productData, form]);

    const onSubmit = async (values: IProductEdit) => {
        const formData = new FormData();
        formData.append("Id", productId!.toString());
        formData.append("Slug", slug!);
        formData.append("Name", values.name);
        formData.append("Code", values.code);
        formData.append("Price", values.price.toString());
        formData.append("Manufacturer", values.manufacturer);
        formData.append("Size", values.size);
        formData.append("Color", values.color);
        formData.append("Type", values.type);
        formData.append("Form", values.form);
        formData.append("QuantityInPack", values.quantityInPack.toString());
        formData.append("QuantityInStock", values.quantityInStock.toString());
        formData.append("SubCategoryId", values.subCategoryId.toString());
        formData.append("Description", values.description);

        // Додаємо нові зображення
        const newImages = files.filter((file) => file.originFileObj);
        for (const file of newImages) {
            if (file.originFileObj) {
                formData.append("newImages[]", file.originFileObj);
            }
        }

        // Додаємо старі зображення, які потрібно залишити
        const existingImages = files
            .filter((file) => !file.originFileObj && file.url)
            .map((file) => file.name);
        formData.append("existingImages", JSON.stringify(existingImages));

        try {
            await updateProduct(formData).unwrap();
            // Більше не потрібно вручну викликати refetchProducts, адже invalidatesTags зробить це автоматично
            navigate("/admin/products");
        } catch (error) {
            console.error("Помилка оновлення товару: ", error);
        }
    };

    const subCategoriesData = subcategories.map((item) => ({
        label: item.name,
        value: item.id,
    }));

    return (
        <>
            <p className="text-center text-3xl font-bold mb-7">Редагування товару</p>
            <Form form={form} onFinish={onSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                <Form.Item name="id" hidden>
                    <Input type="hidden" />
                </Form.Item>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please provide a valid product name." }]}>
                    <Input placeholder="Type product name" />
                </Form.Item>

                <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter product price." }]}>
                    <InputNumber addonAfter="$" placeholder="0.00" />
                </Form.Item>

                <Form.Item name="manufacturer" label="Manufacturer">
                    <Input placeholder="Enter manufacturer" />
                </Form.Item>

                <Form.Item name="code" label="Code">
                    <Input placeholder="Enter code" />
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

                <Form.Item name="subCategoryId" label="Subcategory" rules={[{ required: true, message: "Please choose a subcategory." }]}>
                    <Select placeholder="Select a subcategory" options={subCategoriesData} />
                </Form.Item>

                <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please provide a product description." }]}>
                    <Input.TextArea placeholder="Enter product description" rows={4} />
                </Form.Item>

                <Form.Item label="Images">
                    <Upload
                        listType="picture-card"
                        fileList={files}
                        onPreview={(file) => {
                            setPreviewImage(file.url || (file.preview as string));
                            setPreviewOpen(true);
                            setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
                        }}
                        onChange={({ fileList }) => setFiles(fileList)}
                        beforeUpload={() => false}
                    >
                        {files.length >= 8 ? null : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 10, offset: 10 }}>
                    <Space>
                        <Link to="/admin/products">
                            <Button
                                className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-500 transition duration-200"
                                htmlType="button"
                            >
                                Відмінити
                            </Button>
                        </Link>
                        <Button
                            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-500 transition duration-200"
                            htmlType="submit"
                            loading={isUpdating}
                        >
                            Оновити
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </>
    );
};

export default ProductEditPage;// import { useState, useEffect } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { API_URL } from "../../../../env";
// import { Button, Form, Modal, Input, Upload, UploadFile, Space, InputNumber, Select } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { IProductEdit } from "../../../../interfaces/products";
// import { useGetProductBySlugQuery, useUpdateProductMutation, useGetProductsQuery } from "../../../../services/productApi";
// import { useGetSubCategoriesQuery } from "../../../../services/subcategoryApi";

// const ProductEditPage = () => {
//     const { slug } = useParams();
//     const navigate = useNavigate();
//     const [form] = Form.useForm<IProductEdit>();
//     const [files, setFiles] = useState<UploadFile[]>([]);
//     const [previewOpen, setPreviewOpen] = useState<boolean>(false);
//     const [previewImage, setPreviewImage] = useState("");
//     const [previewTitle, setPreviewTitle] = useState("");
//     const [productId, setProductId] = useState<number | null>(null);

//     // Завантажуємо підкатегорії
//     const { data: subcategories = [] } = useGetSubCategoriesQuery();

//     // Завантажуємо продукт за slug
//     const { data: productData } = useGetProductBySlugQuery(slug!, { skip: !slug });

//     // Використовуємо мутацію для редагування
//     const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

//     // Отримуємо refetch для getProducts
//     const { refetch: refetchProducts } = useGetProductsQuery();

//     useEffect(() => {
//         if (!productData) return;

//         const data = productData;
//         setProductId(data.id);
//         form.setFieldsValue({
//             id: data.id,
//             code: data.code,
//             name: data.name,
//             price: data.price,
//             manufacturer: data.manufacturer,
//             size: data.size,
//             color: data.color,
//             type: data.type,
//             form: data.form,
//             quantityInPack: data.quantityInPack,
//             quantityInStock: data.quantityInStock,
//             subCategoryId: data.subCategoryId,
//             description: data.description
//         });

//         const newFileList: UploadFile[] = data.images.map((image) => ({
//             uid: image,
//             name: image,
//             status: "done",
//             url: `${API_URL}/images/300_${image}`
//         }));
//         setFiles(newFileList);
//     }, [productData, form]);

//     const onSubmit = async (values: IProductEdit) => {
//         console.log("Send Data", values);

//         const formData = new FormData();
//         formData.append("Id", productId!.toString());
//         formData.append("Slug", slug!);
//         formData.append("Name", values.name);
//         formData.append("Code", values.code);
//         formData.append("Price", values.price.toString());
//         formData.append("Manufacturer", values.manufacturer);
//         formData.append("Size", values.size);
//         formData.append("Color", values.color);
//         formData.append("Type", values.type);
//         formData.append("Form", values.form);
//         formData.append("QuantityInPack", values.quantityInPack.toString());
//         formData.append("QuantityInStock", values.quantityInStock.toString());
//         formData.append("SubCategoryId", values.subCategoryId.toString());
//         formData.append("Description", values.description);

//         // Перевіряємо, чи є хоча б одне зображення
//         // if (files.length === 0) {
//         //     alert("Будь ласка, додайте хоча б одне зображення.");
//         //     return;
//         // }

//         // Завантажуємо всі зображення (і старі, і нові) як нові
//         for (const file of files) {
//             if (file.originFileObj) {
//                 // Нове зображення
//                 formData.append("images[]", file.originFileObj);
//             } else if (file.url) {
//                 // Старе зображення: завантажуємо його з URL
//                 try {
//                     const response = await fetch(file.url);
//                     const blob = await response.blob();
//                     const fileName = file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
//                     const newFile = new File([blob], fileName, { type: blob.type });
//                     formData.append("images[]", newFile);
//                 } catch (error) {
//                     console.error(`Помилка завантаження старого зображення ${file.url}:`, error);
//                 }
//             }
//         }

//         // Логування для перевірки
//         console.log("Files to send:", files);

//         try {
//             await updateProduct(formData).unwrap();
//             // Викликаємо refetch для оновлення списку товарів
//             refetchProducts();
//             navigate("/admin/products");
//         } catch (error) {
//             console.error("Помилка оновлення товару: ", error);
//         }
//     };

//     const subCategoriesData = subcategories.map(item => ({
//         label: item.name,
//         value: item.id
//     }));

//     return (
//         <>
//             <p className="text-center text-3xl font-bold mb-7">Редагування товару</p>
//             <Form form={form} onFinish={onSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
//                 <Form.Item name="id" hidden>
//                     <Input type="hidden" />
//                 </Form.Item>
//                 <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please provide a valid product name." }]}>
//                     <Input placeholder="Type product name" />
//                 </Form.Item>

//                 <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter product price." }]}>
//                     <InputNumber addonAfter="$" placeholder="0.00" />
//                 </Form.Item>

//                 <Form.Item name="manufacturer" label="Manufacturer">
//                     <Input placeholder="Enter manufacturer" />
//                 </Form.Item>

//                 <Form.Item name="code" label="Code">
//                     <Input placeholder="Enter code" />
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

//                 <Form.Item name="subCategoryId" label="Subcategory" rules={[{ required: true, message: "Please choose a subcategory." }]}>
//                     <Select placeholder="Select a subcategory" options={subCategoriesData} />
//                 </Form.Item>

//                 <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please provide a product description." }]}>
//                     <Input.TextArea placeholder="Enter product description" rows={4} />
//                 </Form.Item>

//                 <Form.Item label="Images">
//                     <Upload
//                         listType="picture-card"
//                         fileList={files}
//                         onPreview={(file) => {
//                             setPreviewImage(file.url || (file.preview as string));
//                             setPreviewOpen(true);
//                             setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
//                         }}
//                         onChange={({ fileList }) => setFiles(fileList)}
//                         beforeUpload={() => false}
//                     >
//                         {files.length >= 8 ? null : (
//                             <div>
//                                 <PlusOutlined />
//                                 <div style={{ marginTop: 8 }}>Upload</div>
//                             </div>
//                         )}
//                     </Upload>
//                 </Form.Item>

//                 <Form.Item wrapperCol={{ span: 10, offset: 10 }}>
//                     <Space>
//                         <Link to="/admin/products">
//                             <Button
//                                 className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-500 transition duration-200"
//                                 htmlType="button"
//                             >
//                                 Відмінити
//                             </Button>
//                         </Link>
//                         <Button
//                             className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-500 transition duration-200"
//                             htmlType="submit"
//                             loading={isUpdating}
//                         >
//                             Оновити
//                         </Button>
//                     </Space>
//                 </Form.Item>
//             </Form>

//             <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
//                 <img alt="example" style={{ width: "100%" }} src={previewImage} />
//             </Modal>
//         </>
//     );
// };

// export default ProductEditPage;

// import {useState, useEffect} from "react";
// import {useNavigate, useParams, Link} from "react-router-dom";
// import {http_common, API_URL} from '../../../../env';
// import {Button, Form, Modal, Input, Upload, UploadFile, Space, InputNumber, Select} from "antd";
// import {RcFile} from "antd/es/upload";
// import {PlusOutlined} from '@ant-design/icons';
// import {IProductEdit, IProductItem} from "../../../../interfaces/products";
// import {ISubCategoryName} from "../../subcategory/list/types";

// const ProductEditPage = () => {
//     const {id} = useParams();
//     const navigate = useNavigate();
//     const [form] = Form.useForm<IProductEdit>();
//     const [files, setFiles] = useState<UploadFile[]>([]);
//     const [subcategories, setSubCategories] = useState<ISubCategoryName[]>([]);
//     const [previewOpen, setPreviewOpen] = useState<boolean>(false);
//     const [previewImage, setPreviewImage] = useState('');
//     const [previewTitle, setPreviewTitle] = useState('');

//     useEffect(() => {
//         http_common.get<ISubCategoryName[]>("/api/SubCategory")
//             .then(resp => setSubCategories(resp.data));
//     }, []);
//     // useEffect(() => {
//     //         http_common.get<ISubCategoryItem[]>("/api/SubCategory")
//     //             .then(resp => {
//     //                 setSubCategories(resp.data);
//     //             });
//     //     }, []);

//     useEffect(() => {
//         http_common.get<IProductItem>(`/api/products/${id}`)
//             .then(resp => {
//                 const {data} = resp;
//                 form.setFieldsValue({
//                     code: data.code,
//                     name: data.name,
//                     price: data.price,
//                     manufacturer: data.manufacturer,
//                     size: data.size,
//                     color: data.color,
//                     type: data.type,
//                     form: data.form,
//                     quantityInPack: data.quantityInPack,
//                     quantityInStock: data.quantityInStock,
//                     subCategoryId: data.subCategoryId,
//                     description: data.description
//                 });
//                 const newFileList: UploadFile[] = data.images.map((image) => ({
//                     uid: image,
//                     name: image,
//                     status: "done",
//                     url: `${API_URL}/images/300_${image}`
//                 }));
//                 setFiles(newFileList);
//             })
//             .catch(error => console.error("Error fetching product details:", error));
//     }, [id]);

//     const onSubmit = async (values: IProductEdit) => {
//         console.log("Send Data", values);
//         try {
//             const updatedProduct: IProductEdit = {
//                 ...values,
//                 id: Number(id),
//                 images: files.map(file => file.originFileObj as RcFile)
//             };
//             await http_common.put<IProductEdit>("/api/products", updatedProduct, {
//                 headers: {"Content-Type": "multipart/form-data"}
//             });
//             navigate('/admin/products');
//         } catch (error) {
//             console.error("Error updating product: ", error);
//         }
//     };

//     const subCategoriesData = subcategories.map(item => ({
//         label: item.name,
//         value: item.id
//     }));
    
//     return (
//         <>
//             <p className="text-center text-3xl font-bold mb-7">Edit Product</p>
//             <Form form={form} onFinish={onSubmit} labelCol={{span: 6}} wrapperCol={{span: 14}}>
//                 <Form.Item name="name" label="Name" rules={[{required: true, message: 'Please provide a valid product name.'}]}>
//                     <Input placeholder='Type product name'/>
//                 </Form.Item>

//                 <Form.Item name="price" label="Price" rules={[{required: true, message: 'Please enter product price.'}]}>
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

//                 <Form.Item name="subCategoryId" label="Subcategory" rules={[{required: true, message: 'Please choose a subcategory.'}]}>
//                     <Select placeholder="Select a subcategory" options={subCategoriesData}/>
//                 </Form.Item>

//                 <Form.Item name="description" label="Description" rules={[{required: true, message: 'Please provide a product description.'}]}>
//                     <Input.TextArea placeholder="Enter product description" rows={4} />
//                 </Form.Item>

//                 <Form.Item label="Images">
//                     <Upload
//                         listType="picture-card"
//                         fileList={files}
//                         onPreview={(file) => {
//                             setPreviewImage(file.url || (file.preview as string));
//                             setPreviewOpen(true);
//                             setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
//                         }}
//                         onChange={({ fileList }) => setFiles(fileList)}
//                         beforeUpload={() => false} // Запобігає автоматичному завантаженню файлів
//                     >
//                         {files.length >= 8 ? null : (
//                             <div>
//                                 <PlusOutlined />
//                                 <div style={{ marginTop: 8 }}>Upload</div>
//                             </div>
//                         )}
//                     </Upload>
//                 </Form.Item>

//                 <Form.Item wrapperCol={{span: 10, offset: 10}}>
//                     <Space>
//                         <Link to={"/admin/products"}>
//                             <Button htmlType="button" className='text-white bg-gradient-to-br from-red-400 to-purple-600 font-medium rounded-lg px-5'>Cancel</Button>
//                         </Link>
//                         <Button htmlType="submit" className='text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg px-5'>Update</Button>
//                     </Space>
//                 </Form.Item>
//                 {/* <Form.Item wrapperCol={{span: 10, offset: 10}}>
//                     <Space>
//                         <Link to={"/admin/products"}>
//                             <Button htmlType="button"
//                                     className='text-white bg-gradient-to-br from-red-400 to-purple-600 font-medium rounded-lg px-5'>Cancel</Button>
//                         </Link>
//                         <Button htmlType="submit"
//                                 className='text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg px-5'>Create</Button>
//                     </Space>
//                 </Form.Item> */}
//             </Form>

//             <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
//                 <img alt="example" style={{width: '100%'}} src={previewImage}/>
//             </Modal>
//         </>
//     );
// };

// export default ProductEditPage;
