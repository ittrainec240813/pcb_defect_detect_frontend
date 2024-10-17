import React, { useState } from "react";
import axios from "axios";
import { InferenceResponse } from "../interfaces/InferenceInterface"

interface ImageUploadProps {
  onImageSelected: (imageUrl: string) => void;
  onImageInferenced: (result: InferenceResponse) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, onImageInferenced}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleUpload = () => {
    // 這裡放置上傳檔案的邏輯，例如使用 FileReader 讀取檔案內容，或將檔案上傳至伺服器
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        if (e.target.result.split(",")[0].split("/")[0] === "data:image") {
          await axios.post<InferenceResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/inference`,
            { image: e.target.result.split(",")[1]},
          ).then((response) => {
            // console.log(response.data)
            onImageInferenced(response.data)
          })
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(file);
      onImageSelected(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>上傳</button>
    </div>
  );
};

export default ImageUpload;