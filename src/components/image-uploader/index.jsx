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
      <section className="flex flex-col items-center justify-center w-11/12 gap-3 m-4 py-4 border border-gray-300 rounded-xl shadow-sm">
        <h3>Upload Image</h3>
        <button
          onClick={importData}
          className="bg-[#088178] px-5 py-2 text-teal-50 text-sm rounded-md"
        >
          Choose from Device
        </button>
      </section>
      <div className="w-11/12 flex items-center justify-center">
        {isModalOpen ||
          (imagePreviewUrl ? (
            <img
              className={`object-fill h-96 w-96`}
              src={imagePreviewUrl}
              alt="image"
              style={imgStyle}
              onClick={toggleModal}
            />
          ) : (
            <div className="text-center">
              Please select an Image for Preview
            </div>
          ))}
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <div className="pb-1 text-center">Uploaded Image</div>
        <div className="flex items-center justify-center">
          <div className="p-4">
            <img
              className="h-48 w-72 object-fill"
              src={imagePreviewUrl}
              alt="image"
              style={imgStyle}
            />
          </div>
        </div>
        <div className="flex items-center justify-evenly cursor-pointer">
          <div
            className="p-1 border-2 rounded-md"
            onClick={() => handleMaskSelect("original")}
          >
            Original
          </div>
          {images.map((image, id) => (
            <div key={id} className="p-1 border-2 rounded-md">
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
            className="bg-teal-700 rounded-md text-teal-50 text-sm w-11/12 max-w-72 py-2"
          >
            Use this image
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ImageUploader;
