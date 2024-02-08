import Modal from "../modal/index.jsx";
import { images } from "../../constants/images.js";
import useModal from "../modal/useModal.jsx";
import { useState, useEffect } from "react";

const ImageUploader = () => {
  const [isModalOpen, toggleModal] = useModal();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [selectedMask, setSelectedMask] = useState(null);

  useEffect(() => {
    const dropZone = document.getElementById("drop-zone");
    dropZone.addEventListener("dragenter", handleDragEnter);
    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("dragleave", handleDragLeave);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      dropZone.removeEventListener("dragenter", handleDragEnter);
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("border-4");
    e.currentTarget.classList.add("border-blue-500");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-4");
    e.currentTarget.classList.remove("border-blue-500");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-4");
    e.currentTarget.classList.remove("border-blue-500");

    const files = e.dataTransfer.files;
    handleFileUpload(files[0]);
  };

  const importData = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = (e) => {
      e.preventDefault();
      handleFileUpload(e.target.files[0]);
    };
  };

  const handleFileUpload = (file) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      toggleModal();
    };
    reader.readAsDataURL(file);
  };

  const handleMaskSelect = (mask) => {
    setSelectedMask(mask === "original" ? null : mask);
  };

  const imgStyle = {
    maskImage: selectedMask ? `url(${selectedMask})` : "none",
    WebkitMaskImage: selectedMask ? `url(${selectedMask})` : "none",
    maskSize: selectedMask ? "contain" : "",
    maskClip: selectedMask ? "border-box" : "",
    maskRepeat: selectedMask ? "no-repeat" : "",
    maskPosition: selectedMask ? "center" : "",
  };

  return (
    <>
      <section className="mx-auto my-4 flex w-11/12  flex-col items-center justify-center gap-3 rounded-xl border border-gray-300 py-4 shadow-sm">
        <div
          id="drop-zone"
          className="rounded-md border-2 border-dashed px-20 py-2 text-sm text-gray-700"
        >
          <p className="text-center">Drag & Drop or</p>
          <button
            onClick={importData}
            className="mt-2 rounded-md bg-[#088178] px-5 py-2 text-sm text-teal-50"
          >
            Choose from Device
          </button>
        </div>
      </section>
      <div className="mx-auto flex w-11/12 items-center justify-center">
        {isModalOpen ||
          (imagePreviewUrl ? (
            <img
              className={`  ${
                selectedMask
                  ? "object-full h-96 w-full"
                  : "h-[30rem] w-full  object-contain object-top"
              }`}
              src={imagePreviewUrl}
              alt="image"
              style={imgStyle}
              onClick={toggleModal}
            />
          ) : (
            <div className="text-center">Please select an Image</div>
          ))}
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <div className="pb-1 text-center">Uploaded Image</div>
        <div className="flex items-center justify-center">
          <div className="p-4">
            <img
              className={`h-48 w-72 ${
                selectedMask ? "object-fill" : "object-contain object-center"
              }`}
              src={imagePreviewUrl}
              alt="image"
              style={imgStyle}
            />
          </div>
        </div>
        <div className="mx-auto flex max-w-96 cursor-pointer items-center justify-evenly">
          <div
            className="rounded-md border-2 p-1"
            onClick={() => handleMaskSelect("original")}
          >
            Original
          </div>
          {images.map((image, id) => (
            <div key={id} className="rounded-md border-2 p-1">
              <img
                src={image}
                alt="frame"
                width={32}
                onClick={() => handleMaskSelect(image)}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={toggleModal}
            className="w-11/12 max-w-80 rounded-md bg-teal-700 py-2 text-sm text-teal-50"
          >
            Use this image
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ImageUploader;
