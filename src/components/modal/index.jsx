import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ isOpen, toggle, children }) => {
  return (
    isOpen && (
      <div
        onClick={toggle}
        className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-5/6 max-w-md bg-white p-2"
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
