import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { http_common, API_URL } from "../../../../env";
import { Button, Form, Modal, Input, Upload, UploadFile, Space, InputNumber, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IProductEdit, IProductItem } from "../../../../interfaces/products";
import { ISubCategoryName } from "../../../../interfaces/subcategory";

const ProductEditPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm<IProductEdit>();
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [subcategories, setSubCategories] = useState<ISubCategoryName[]>([]);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    useEffect(() => {
        http_common.get<ISubCategoryName[]>("/api/SubCategory")
            .then(resp => setSubCategories(resp.data));
    }, []);

    useEffect(() => {
        if (!slug) return;

        http_common.get<IProductItem>(`/api/products/slug/${slug}`)
            .then(resp => {
                const { data } = resp;
                form.setFieldsValue({
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
                    description: data.description
                });

                const newFileList: UploadFile[] = data.images.map((image) => ({
                    uid: image,
                    name: image,
                    status: "done",
                    url: `${API_URL}/images/300_${image}`
                }));
                setFiles(newFileList);
            })
            .catch(error => console.error("Error fetching product details:", error));
    }, [slug]);

    const onSubmit = async (values: IProductEdit) => {
        console.log("Send Data", values);

        const formData = new FormData();
        formData.append("slug", slug!); // Використовуємо `slug`
        formData.append("name", values.name);
        formData.append("code", values.code);
        formData.append("price", values.price.toString());
        formData.append("manufacturer", values.manufacturer);
        formData.append("size", values.size);
        formData.append("color", values.color);
        formData.append("type", values.type);
        formData.append("form", values.form);
        formData.append("quantityInPack", values.quantityInPack.toString());
        formData.append("quantityInStock", values.quantityInStock.toString());
        formData.append("subCategoryId", values.subCategoryId.toString());
        formData.append("description", values.description);

        files.forEach(file => {
            if (file.originFileObj) {
                formData.append("images", file.originFileObj);
            }
        });

        try {
            await http_common.put(`/api/products/${slug}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            navigate("/admin/products");
        } catch (error) {
            console.error("Error updating product: ", error);
        }
    };

    const subCategoriesData = subcategories.map(item => ({
        label: item.name,
        value: item.id
    }));

    return (
        <>
            <p className="text-center text-3xl font-bold mb-7">Edit Product</p>
            <Form form={form} onFinish={onSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please provide a valid product name." }]}>
                    <Input placeholder="Type product name" />
                </Form.Item>

                <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter product price." }]}>
                    <InputNumber addonAfter="$" placeholder="0.00" />
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
                        beforeUpload={() => false} // Запобігає автоматичному завантаженню файлів
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
                        <Link to={"/admin/products"}>
                            <Button htmlType="button" className="text-white bg-gradient-to-br from-red-400 to-purple-600 font-medium rounded-lg px-5">Cancel</Button>
                        </Link>
                        <Button htmlType="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg px-5">Update</Button>
                    </Space>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </>
    );
};

export default ProductEditPage;
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
