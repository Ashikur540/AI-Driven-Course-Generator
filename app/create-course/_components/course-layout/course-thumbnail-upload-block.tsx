import { Image, PenBox, Trash } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CourseImgData } from "../../providers/course-Image-form-provider";

export function CourseThumbnailBlock() {
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<CourseImgData>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setThumbnailPreview(imageURL);
      setValue("thumbnail", file);
    }
  };

  const handleUploadImageClick = () => {
    document.getElementById("course-thumbnail")?.click();
  };

  const handleRemoveImage = () => {
    setThumbnailPreview("");
    setValue("thumbnail", undefined);
  };

  return (
    <>
      <input
        id="course-thumbnail"
        {...register("thumbnail")}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleFileChange}
      />
      {errors.thumbnail && (
        <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
      )}
      {thumbnailPreview === "" ? (
        <div className="relative my-6 w-[60%]">
          <label
            onClick={handleUploadImageClick}
            className="flex flex-col items-center gap-6 px-6 py-10 text-center border border-dashed rounded cursor-pointer border-slate-300"
          >
            <span className="inline-flex items-center self-center justify-center border p-5 rounded-lg bg-slate-100/90 text-slate-400">
              <Image className="h-8 w-8" />
            </span>
            <p className="flex flex-col items-center justify-center gap-1 text-sm">
              <span className="text-emerald-500 hover:text-emerald-500">
                Upload media
                <span className="text-slate-500"> or drag and drop </span>
              </span>
              <span className="text-slate-600">PNG, JPG, WEBP up to 2MB</span>
            </p>
          </label>
        </div>
      ) : (
        <div className="relative w-[80%] h-[300px]">
          <img
            src={thumbnailPreview}
            alt="image"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="text-[2rem] flex gap-2 text-white bg-[#000000ad] rounded-r-full p-1 absolute top-0 right-0 cursor-pointer">
            <button type="button" onClick={handleUploadImageClick}>
              <PenBox />
            </button>
            <button type="button" onClick={handleRemoveImage}>
              <Trash />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
