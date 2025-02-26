import React, { useState } from "react";
import { ISubCategoryCreate, IUploadedFile } from "../../../../interfaces/subcategory";
import { useGetCategoriesQuery } from "../../../../services/categoryApi";
import { http_common } from "../../../../env";
import { useNavigate} from "react-router-dom";
import { Button, Form, Input, Modal, Row, Upload } from "antd";
import { useGetSubCategoriesQuery } from "../../../../services/subcategoryApi";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";

const SubCategoryCreatePage: React.FC = () => {
    const { refetch } = useGetSubCategoriesQuery();
    const navigate = useNavigate();
    const [form] = Form.useForm<ISubCategoryCreate>();
    const { data: categories} = useGetCategoriesQuery();
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const onSubmit = async (values: ISubCategoryCreate) => {
      // 🔹 Генеруємо `slug` перед відправкою
      const slug = values.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("categoryId", values.categoryId.toString());
      formData.append("slug", slug); // Додаємо slug

      if (values.imageSubCategory) {
          formData.append("imageSubCategory", values.imageSubCategory);
      }

      try {
          const response = await http_common.post("/api/SubCategory/create", formData, {
              headers: { "Content-Type": "multipart/form-data" },
          });
          console.log("Create subcategory", response.data);
          refetch();
          alert("Підкатегорію успішно додано!");
          navigate('/admin/subcategories');
      } catch (error) {
          console.error("Помилка при створенні підкатегорії:", error);
          alert("Помилка при створенні підкатегорії");
      }
  };
    // const onSubmit = async (values: ISubCategoryCreate) => {
    //     console.log("Send Data", values);
    //     http_common.post<ISubCategoryCreate>("/api/SubCategory/create", values,
    //         {headers: {"Content-Type": "multipart/form-data"}})
    //         .then(resp => {
    //         console.log("Create subcategory", resp.data);
    //             refetch();
    //             // Повідомлення про успіх
    //             alert("Підкатегорію успішно додано!");
    //             navigate('/admin/subcategories'); // Перенаправлення на список категорій
    //         })
    //         .catch((error) => {
    //             console.error("Помилка при створенні підкатегорії:", error);
    //             alert("Помилка при створенні підкатегорії");
    //         });
    // };

    return (
        <div>
          <h1 className="text-2xl font-bold mb-4">Створення підкатегорії</h1>
    
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
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Form.Item>
    
            <Form.Item
              name="imageSubCategory"
              label="Фото"
              valuePropName="file"
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
                  setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
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
                Створити
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

export default SubCategoryCreatePage;
// import React, { useState } from "react";
// import { ISubCategoryCreate, IUploadedFile } from "../../../../interfaces/subcategory";
// import { useGetCategoriesQuery } from "../../../../services/categoryApi";
// import { http_common } from "../../../../env";
// import { useNavigate} from "react-router-dom";
// import { Button, Form, Input, Modal, Row, Upload } from "antd";
// import { useGetSubCategoriesQuery } from "../../../../services/subcategoryApi";
// import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload/interface";
// import { PlusOutlined } from "@ant-design/icons";

// const SubCategoryCreatePage: React.FC = () => {
//     const { refetch } = useGetSubCategoriesQuery();
//     const navigate = useNavigate();
//     const [form] = Form.useForm<ISubCategoryCreate>();
//     const { data: categories} = useGetCategoriesQuery();
//     const [previewOpen, setPreviewOpen] = useState<boolean>(false);
//     const [previewImage, setPreviewImage] = useState('');
//     const [previewTitle, setPreviewTitle] = useState('');
    
//     const onSubmit = async (values: ISubCategoryCreate) => {
//         console.log("Send Data", values);
//         http_common.post<ISubCategoryCreate>("/api/SubCategory/create", values,
//             {headers: {"Content-Type": "multipart/form-data"}})
//             .then(resp => {
//             console.log("Create subcategory", resp.data);
//                 refetch();
//                 // Повідомлення про успіх
//                 alert("Підкатегорію успішно додано!");
//                 navigate('/admin/subcategories'); // Перенаправлення на список категорій
//             })
//             .catch((error) => {
//                 console.error("Помилка при створенні підкатегорії:", error);
//                 alert("Помилка при створенні підкатегорії");
//             });
//     };

//     return (
//         <div>
//           <h1 className="text-2xl font-bold mb-4">Створення підкатегорії</h1>
    
//           <Form form={form} onFinish={onSubmit} layout="vertical">
//             <Form.Item
//               label="Назва підкатегорії"
//               name="name"
//               rules={[{ required: true, message: "Це поле є обов'язковим!" }, { min: 3, message: "Довжина поля 3 символи" }]}
//             >
//               <Input className="border p-2 w-full" />
//             </Form.Item>
    
//             <Form.Item
//               label="Категорія"
//               name="categoryId"
//               rules={[{ required: true, message: "Оберіть категорію!" }]}
//             >
//               <select className="border p-2 w-full">
//                 <option value="">Оберіть категорію</option>
//                 {categories?.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </Form.Item>
    
//             <Form.Item
//               name="imageSubCategory"
//               label="Фото"
//               valuePropName="file"
//               getValueFromEvent={(e: UploadChangeParam) => {
//                 const image = e?.fileList[0] as IUploadedFile;
//                 return image?.originFileObj;
//               }}
//             >
//               <Upload
//                 beforeUpload={() => false}
//                 accept="image/*"
//                 onPreview={(file: UploadFile) => {
//                   if (!file.url && !file.preview) {
//                     file.preview = URL.createObjectURL(file.originFileObj as RcFile);
//                   }
//                   setPreviewImage(file.url || (file.preview as string));
//                   setPreviewOpen(true);
//                   setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
//                 }}
//                 listType="picture-card"
//                 maxCount={1}
//               >
//                 <div>
//                   <PlusOutlined />
//                   <div style={{ marginTop: 8 }}>Upload</div>
//                 </div>
//               </Upload>
//             </Form.Item>
    
//             <Row style={{ display: "flex", justifyContent: "center" }}>
//               <Button style={{ margin: 10 }} className="bg-blue-500 text-white" type="primary" htmlType="submit">
//                 Створити
//               </Button>
//               <Button style={{ margin: 10 }} onClick={() => navigate('/admin/subcategories')}>
//                 Скасувати
//               </Button>
//             </Row>
//           </Form>
    
//           <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
//             <img alt="example" style={{ width: "100%" }} src={previewImage} />
//           </Modal>
//         </div>
//       );    
// };

// export default SubCategoryCreatePage;
