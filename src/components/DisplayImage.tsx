import React from "react";

interface DisplayImageProps {
  imgUrl: string;
  onClose: () => void;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ imgUrl, onClose }) => {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-gray-400 bg-opacity-50"
      onClick={onClose}
    >
      <div className="flex justify-center items-center bg-white max-w-md">
        <img src={imgUrl} alt="" className="" />
      </div>
    </div>
  );
};

export default DisplayImage;