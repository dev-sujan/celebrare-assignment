import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ isOpen, toggle, children }) => {
  return (
    isOpen && (
      <div
        onClick={toggle}
        className="fixed inset-0 bg-black bg-opacity-30 z-20 backdrop-blur-sm flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-2 w-5/6 max-w-md"
        >
          <div className="flex items-center justify-end">
            <button onClick={toggle}>
              <IoMdCloseCircle size={24} className="hover:text-red-500" />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
