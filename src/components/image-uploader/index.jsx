import Modal from "../modal/index.jsx";
import { images } from "../../constants/images.js";
import useModal from "../modal/useModal.jsx";
import { useState } from "react";

const ImageUploader = () => {
  const [isModalOpen, toggleModal] = useModal();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [selectedMask, setSelectedMask] = useState(null);

  const importData = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = (e) => {
      e.preventDefault();

      let reader = new FileReader();
      let inputFile = e.target.files[0];

      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        toggleModal();
      };
      reader.readAsDataURL(inputFile);
    };
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
        <h3>Upload Image</h3>
        <button
          onClick={importData}
          className="rounded-md bg-[#088178] px-5 py-2 text-sm text-teal-50"
        >
          Choose from Device
        </button>
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
