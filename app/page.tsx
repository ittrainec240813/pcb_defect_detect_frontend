"use client"

import styles from "./page.module.css";
import ImageUpload from "../components/ImageUpload";
import ImagePreview from "../components/ImagePreview";
import { useState } from "react";
import { InferenceResponse } from "../interfaces/InferenceInterface";

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [inferencrResult, setInferenceResult] = useState<InferenceResponse | null>(null)

  const handleImageSelected = (imageUrl: string) => {
    setPreviewUrl(imageUrl);
  };

  const handelImageInferenced = (result: InferenceResponse) => {
    setInferenceResult(result)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ImagePreview imageUrl={previewUrl} boundingBoxes={inferencrResult}/>
        <div className={styles.ctas}>
          <ImageUpload onImageSelected={handleImageSelected} onImageInferenced={handelImageInferenced}/>
        </div>
      </main>
    </div>
  );
}
