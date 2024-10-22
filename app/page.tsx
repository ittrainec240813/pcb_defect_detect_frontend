"use client"

import styles from "./page.module.css";
import ImageUpload from "@/components/ImageUpload";
import ImagePreview from "@/components/ImagePreview";
import PreviewSettings from "@/components/PreviewSettings";
import { useState } from "react";
import { InferenceResponse } from "@/interfaces/InferenceInterface";

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [inferencrResult, setInferenceResult] = useState<InferenceResponse | null>(null)
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [labelConf, setLabelConf] = useState<number>(0.25)

  const handleImageSelected = (imageUrl: string) => {
    setPreviewUrl(imageUrl);
  };

  const handelImageInferenced = (result: InferenceResponse) => {
    setInferenceResult(result);
  };

  const handelShowLoader = (showLoader: boolean) => {
    setShowLoader(showLoader);
  };

  const handelSetLabelConf = (labelConfValue: number) => {
    setLabelConf(labelConfValue);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ImagePreview 
          imageUrl={previewUrl} 
          boundingBoxes={inferencrResult} 
          showLoader={showLoader}
          labelConf={labelConf}
        />
        <div className={styles.ctas}>
          <ImageUpload 
            onImageSelected={handleImageSelected} 
            onImageInferenced={handelImageInferenced}
            onShowLoader={handelShowLoader}
          />
        </div>
        <PreviewSettings onSetValue={handelSetLabelConf} />
      </main>
    </div>
  );
}
