import { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Upload, UploadFile, Space, InputNumber, Select } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import { IProductCreate } from '../../../../interfaces/products';
import { http_common } from "../../../../env";
import { useGetProductsQuery } from '../../../../services/productApi';
import { ISubCategoryItem, ISubCategoryName } from '../../../../interfaces/subcategory';

const ProductCreatePage = () => {
    const { refetch } = useGetProductsQuery();
    const navigate = useNavigate();
    const [form] = Form.useForm<IProductCreate>();
    const [subcategories, setSubCategories] = useState<ISubCategoryName[]>([]);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        http_common.get<ISubCategoryItem[]>("/api/SubCategory")
            .then(resp => {
                setSubCategories(resp.data);
            });
    }, []);

    // useEffect(() => {
    //     const subCategoryId = form.getFieldValue("subCategoryId");
    //     const currentCode = form.getFieldValue("code");

    //     if (subCategoryId && !currentCode) {
    //         const generatedCode = `${subCategoryId.toString().padStart(2, "0")}-0001`;
    //         form.setFieldsValue({ code: generatedCode });
    //     }
    // }, [form.getFieldValue("subCategoryId")]);


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
    const onSubmit = async (values: IProductCreate) => {
        console.log("Send Data", values);

        const slug = values.slug || values.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("slug", slug);
        // formData.append("price", values.price.toString());
        formData.append("price", values.price.toFixed(2).toString()); // "0.90"
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
            values.images.forEach((file) => formData.append("images[]", file));
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
               
                <Form.Item name="code" label="Code" hasFeedback>
                    <Input placeholder='Enter product code (optional)' />
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
                        >
                            Додати
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>

    );
};

export default ProductCreatePage;
