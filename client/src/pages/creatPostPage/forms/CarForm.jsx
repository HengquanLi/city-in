import { client } from 'client';
import { ImageUpload } from 'components';
import { useState } from 'react';
import { CgDollar, CgSpinner } from 'react-icons/cg';

import { useNavigate } from 'react-router';
import { useLocation, useParams } from 'react-router-dom';
import useAuthStore from 'store/authStore';
import { useForm } from 'utils/useForm';

const CarForm = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const categoryTitle = location.pathname.split('/')[3];
  const userProfile = useAuthStore((state) => state.userProfile);

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      // title: {
      //   pattern: {
      //     value: '^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,16}$',
      //     message: "Not empty!",
      //   },
      // },
      description: {
        custom: {
          isValid: (value) => String(value).length >= 6,
          message: 'More details',
        },
      },
      phoneNum: {
        pattern: {
          value:
            '^\\({0,1}((0|\\+61)(2|4|3|7|8)){0,1}\\){0,1}(\\ |-){0,1}[0-9]{2}(\\ |-){0,1}[0-9]{2}(\\ |-){0,1}[0-9]{1}(\\ |-){0,1}[0-9]{3}$',
          message: 'Correct phone number',
        },
      },
    },
    onSubmit: () => testData(data),
  });

  const [files, setFiles] = useState([]);
  const [condition, setCondition] = useState('used');
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageArray, setImageArray] = useState([]);

  const navigate = useNavigate();

  const testData = (data) => {
    console.log(data);
    setIsLoadingBtn(true);
    const doc = {
      _type: 'posts',
      title: data.title,
      description: data.description,
      condition: condition,
      images: files?.map((file) => {
        return {
          _key: file._id,
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: file._id,
          },
        };
      }),
      contact: data.contact ? data.contact : userProfile.userName,
      postedBy: {
        _type: 'reference',
        _ref: userProfile?._id,
      },
      price: Number(data.price),
      postedByNum: data.phoneNum,
      category: {
        _type: 'reference',
        _ref: categoryId,
      },
    };
    client.create(doc).then((res) => {
      // console.log(res);
      setIsLoadingBtn(false);
      navigate(`/posts/${categoryTitle}/${data.title}/${res._id}`);
    });
  };

  //uploa images to sanity
  const handleFile = (e) => {
    setMessage('');
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setIsLoading(true);
        client.assets
          .upload('image', file[i], {
            contentType: fileType,
            filename: file[i].name,
          })
          .then((doc) => {
            setIsLoading(false);
            setFiles([...files, doc]);
            console.log(files);
          });
      } else {
        setIsLoading(false);
        setMessage('only images accepted');
      }
    }
  };

  const removeImage = (i) => {
    setFiles(files.filter((x) => x._id !== i));
  };

  const renderImageUpload = (limit) => {
    let containers = [];

    for (let i = 0; i < limit; i++) {
      containers.push(
        <ImageUpload
          key={i}
          handleFile={handleFile}
          file={files[i]}
          isLoading={isLoading}
          removeImage={removeImage}
        />
      );
    }
    return containers;
  };

  const handleCondition = (e) => {
    setCondition(e.target.value);
    console.log(condition);
  };

  return (
    <div className="mx-auto px-8 md:w-850">
      <form onSubmit={handleSubmit}>
        <div className="mb-5 mt-3">
          <p className="mb-1 font-semibold text-lg">Catergory</p>
          <p className="text-rose-500 font-semibold">{categoryTitle}</p>
        </div>

        <div className="border-b-2 my-5">
          <p className="mb-2 font-semibold text-lg ">Title</p>
          <input
            className="mb-2 border-2 border-solid w-210 sm:w-300 leading-5 p-3 rounded text-sm font-semibold focus:border-rose-500 focus:border-2 focus:border-solid focus:outline-none"
            type="text"
            onChange={handleChange('title')}
            placeholder="Title"
            required
          />
          {errors.title && (
            <p className="text-red-500 text-left">{errors.title}</p>
          )}
          <p className="text-sm mb-4">
            Please include details such as{' '}
            <span className="font-semibold">
              brand, colour, size, specs, etc.
            </span>
          </p>
        </div>
        <div className="border-b-2 my-5">
          <p className="mb-2 font-semibold text-lg relative">Price</p>
          <div className="relative">
            <CgDollar className="absolute my-auto inset-y-0 left-0 text-2xl justify-center flex items-center pl-2" />
            <input
              className="block pl-7 mb-5 border-2 border-solid w-250 sm:w-300 leading-5 p-3 rounded text-sm font-semibold focus:border-rose-500 focus:border-2 focus:border-solid focus:outline-none"
              type="number"
              onChange={handleChange('price')}
              min="0.00"
              step="0.5"
            />
          </div>
        </div>

        <div className="border-b-2 my-5">
          <div className="mb-5 flex flex-row">
            <p className="my-auto font-semibold text-lg">Condition</p>
            <div className="flex flex-row items-center justify-center my-auto">
              <div className="ml-5 xs:ml-10 flex flex-row">
                <input
                  type="checkbox"
                  name="condition"
                  className="w-5 h-5"
                  value="used"
                  id="used"
                  onChange={handleCondition}
                  checked={condition === 'used'}
                />
                <span className="ml-2">Used</span>
              </div>
              <div className="ml-6 xs:ml-10 flex flex-row">
                <input
                  type="checkbox"
                  name="condition"
                  className="w-5 h-5"
                  value="new"
                  id="new"
                  onChange={handleCondition}
                  checked={condition === 'new'}
                />
                <span className="ml-2">New</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b-2 my-5">
          <p className="my-auto font-semibold text-lg">Upload images</p>
          <div className="flex flex-wrap gap-2 my-5 pb-5 items-center justify-center">
            {renderImageUpload(6)}
          </div>
        </div>

        <div className="border-b-2 my-5">
          <p className="mb-2 font-semibold text-lg">Description</p>
          <textarea
            value={data.description}
            onChange={handleChange('description')}
            required
            name="description"
            id=""
            cols="30"
            rows="8"
            className="resize-none w-full sm:w-2/3 mb-2 border-2 border-solid rounded focus:border-rose-500 focus:border-2 focus:outline-none px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-left">{errors.description}</p>
          )}
        </div>
        <div className="mb-5 border-b-2 flex flex-col w-full">
          <div className="flex flex-col w-full ">
            <div className="my-5 flex flex-col justify-between">
              <p className="mb-2 mr-3 font-semibold text-lg">Contact:</p>
              <input
                className="sm:w-1/2 placeholder:italic placeholder:text-slate-400 mb-2 mr-5 border-2 flex-1 border-solid leading-5 p-3 rounded text-sm font-semibold focus:border-rose-500 focus:border-2 focus:border-solid focus:outline-none"
                type="text"
                onChange={handleChange('contact')}
                placeholder={userProfile ? userProfile.userName : 'Jack'}
              />
            </div>
            <div className="mb-5 flex flex-col justify-between">
              <p className="mb-2 mr-3 font-semibold text-lg">Phone:</p>
              <input
                className="sm:w-1/2 appearance-none placeholder:italic placeholder:text-slate-400 flex-1  mr-5 mb-2 border-2 border-solid leading-5 p-3 rounded text-sm font-semibold focus:border-rose-500 focus:border-2 focus:border-solid focus:outline-none"
                type="text"
                onChange={handleChange('phoneNum')}
                placeholder="0412345678"
                required
              />
            </div>
            {errors.phoneNum && (
              <p className="text-red-500 text-left">{errors.phoneNum}</p>
            )}
          </div>
          <div className="mb-5 flex flex-col  justify-between">
            <p className="mb-2 mr-3 font-semibold text-lg">Email:</p>
            <input
              className="placeholder:italic placeholder:text-slate-400 border-2 sm:w-1/2 flex-1 mr-5 border-solid leading-5 p-3 rounded text-sm font-semibold focus:border-rose-500 focus:border-2 focus:border-solid focus:outline-none"
              type="email"
              onChange={handleChange('email')}
              placeholder="jack@abc.com"
            />
          </div>
        </div>
        <div className="mx-auto sm:mx-0 w-40 mb-5 text-lg flex items-center justify-center text-center px-5 bg-rose-500 h-10 rounded-md text-white hover:bg-rose-600 transition ease-out duration-100 font-semibold">
          <button
            type="submit"
            className="gap-x-1 mx-3 flex items-center justify-center w-full h-full"
          >
            {isLoadingBtn && <CgSpinner className="animate-spin h-5 w-5" />}
            {isLoadingBtn && <span>posting...</span>}
            {!isLoadingBtn && <span>POST</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
