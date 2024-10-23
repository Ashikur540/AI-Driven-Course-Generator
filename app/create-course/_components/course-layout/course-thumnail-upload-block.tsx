import { Image, PenBox, Trash } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

const CourseThumbnailBlock = () => {
  const [imageLink, setImageLink] = useState("");

  const handleUploadImageClick = () => {
    document.getElementById("course-thumbnail")?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageLink(imageURL);
    }
  };

  return (
    <>
      <input
        id="course-thumbnail"
        name="file-upload"
        type="file"
        className="hidden"
        accept=".jpg,.png,.jpeg"
        onChange={handleFileChange}
      />
      {imageLink === "" ? (
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
              <span className="text-slate-600">
                {" "}
                PNG, JPG or GIF up to 10MB{" "}
              </span>
            </p>
          </label>
        </div>
      ) : (
        <div className="relative w-[80%] h-[300px]">
          <img
            src={imageLink}
            alt="image"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="text-[2rem] flex gap-2 text-white bg-[#000000ad] rounded-r-full p-1 absolute top-0 right-0 cursor-pointer">
            <button type="button" onClick={handleUploadImageClick}>
              <PenBox />
            </button>
            <button type="button" onClick={() => setImageLink("")}>
              <Trash />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseThumbnailBlock;
