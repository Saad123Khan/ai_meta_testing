"use client";

import * as React from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CropImageModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  imageToCrop: File | null;
  onCropComplete: any;
}

const CropImageModal = ({
  isModalOpen,
  setIsModalOpen,
  imageToCrop,
  onCropComplete,
}: CropImageModalProps) => {
  const [crop, setCrop] = React.useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [aspect, setAspect] = React.useState<number | undefined>(1); // Default aspect ratio
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    if (imageToCrop) {
      const objectUrl = URL.createObjectURL(imageToCrop);
      setImageSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageToCrop]);

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspect(newAspect);

    if (imageRef.current) {
      // Adjust the crop area for the new aspect ratio
      const { naturalWidth, naturalHeight } = imageRef.current;

      const newCrop: any = newAspect
        ? makeAspectCrop(
            {
              unit: "%",
              x: 0,
              y: 0,
              width: 90,
            },
            newAspect,
            naturalWidth,
            naturalHeight
          )
        : {
            unit: "%",
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          };

      setCrop(newCrop);
    }
  };

  const getCroppedImage = () => {
    if (!imageRef.current) return null;

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return null;
          const file = new File([blob], "cropped-image.png", {
            type: blob.type,
          });
          resolve(file);
        },
        "image/png",
        1
      );
    });
  };

  const handleSave = async () => {
    const croppedImageUrl = await getCroppedImage();
    if (croppedImageUrl) {
      // Handle the cropped image URL (e.g., save it or update the parent state)
      onCropComplete(croppedImageUrl);
      setIsModalOpen(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[100vh]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        {imageSrc && (
          <>
            {/* Aspect Ratio Selection */}
            <div className="flex space-x-4 mb-4">
              <Button
                className="text-primary-color"
                onClick={() => handleAspectChange(undefined)}
              >
                Free
              </Button>
              <Button
                className="text-primary-color"
                onClick={() => handleAspectChange(1)}
              >
                1:1
              </Button>
              <Button
                className="text-primary-color"
                onClick={() => handleAspectChange(16 / 9)}
              >
                16:9
              </Button>
              <Button
                className="text-primary-color"
                onClick={() => handleAspectChange(4 / 3)}
              >
                4:3
              </Button>
            </div>

            {/* React Crop */}
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              aspect={aspect}
            >
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Crop preview"
                className="max-h-[40vh] object-contain"
              />
            </ReactCrop>
          </>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="text-primary-color">
            Save Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CropImageModal;
