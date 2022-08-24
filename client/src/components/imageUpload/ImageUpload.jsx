import { RiImageAddLine } from 'react-icons/ri';
import {MdOutlineDeleteForever} from 'react-icons/md'
import { Spinner } from 'components';

import { client, urlFor } from 'client';


const ImageUpload = ({ handleFile, file, removeImage, isLoading }) => {
  console.log(file);
  return (
    <>
      {file ? (
        <div className="mx-auto relative bg-gray-300 w-52 h-52 border-4 border-solide border-rose-500 rounded-md flex justify-center items-center grow-1 w-1/3 hover:shadow-lg">
          <img className="h-full w-full object-cover" src={urlFor(file.url)} />
          <MdOutlineDeleteForever
            onClick={() => {
              removeImage(file._id);
            }}
            className="absolute bottom-2 right-1 h-8 w-8 text-red-800 hover:cursor-pointer hover:scale-125 transition duration-250 ease-in"
          />
        </div>
      ) : (
        <div className="mx-auto relative w-52 h-52 bg-gray-300 border-2 border-dotted border-gray-400 rounded-md flex justify-center items-center grow-1 w-1/3 hover:shadow-lg ">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <RiImageAddLine className="w-20 h-20 text-rose-500 " />
            <p className="mt-3">click to upload image</p>
          </div>
          <input
            onChange={handleFile}
            type="file"
            className="absolute left-0 top-0 w-full h-full opacity-0 hover:cursor-pointer "
          />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
