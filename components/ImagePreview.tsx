import React, { useRef, useEffect } from 'react';
import { InferenceResponse } from "../interfaces/InferenceInterface"

interface ImagePreviewProps {
  imageUrl: string | null;
  boundingBoxes: InferenceResponse | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, boundingBoxes }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const font = "16pt Arial";

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');
    
    if (!canvas || !context) return
    // Clear the canvas before drawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image if it exists
    if (imageUrl) {
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0);

        // Draw bounding boxes if they exist
        if (boundingBoxes && boundingBoxes.results.length > 0) {
          boundingBoxes.results.forEach((boundingBox) => {
            context.strokeStyle = "red";
            context.lineWidth = 2;
            const {x1, y1, x2, y2} = boundingBox.box;
            context.strokeRect(x1, y1, x2 - x1, y2 - y1);

            const textToFill = `${boundingBox.name} ${boundingBox.confidence.toFixed(2)}`;
            const textWidth = context.measureText(textToFill).width;
            const textHeight = parseInt(font, 10);
            context.textBaseline = "top";
            context.font = font;
            context.fillStyle = "red";
            context.fillRect(x1, y1 - textHeight, textWidth, textHeight);
            context.fillStyle = "white";
            context.fillText(textToFill, x1, y1 - textHeight);
          });
        }
      };
      image.src = imageUrl;
    }

  }, [imageUrl, boundingBoxes])

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImagePreview;

