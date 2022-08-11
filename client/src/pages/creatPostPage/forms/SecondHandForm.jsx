import { client } from 'client';
import { useState } from 'react';
import { CgDollar, CgSpinner } from 'react-icons/cg';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useForm } from 'utils/useForm';

const SecondHandForm = () => {

const testbtn =true

  const { categoryId, categoryTitle } = useParams();
  console.log(categoryTitle);
  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      title: {
        pattern: {
          value: '^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,16}$',
          message: "标题长度4-16位，可以包含'_'或'-'",
        },
      },
      description: {
        custom: {
          isValid: (value) => String(value).length >= 6,
          message: '至少6位以上',
        },
      },
      phoneNum: {
        pattern: {
          value:
            '^\\({0,1}((0|\\+61)(2|4|3|7|8)){0,1}\\){0,1}(\\ |-){0,1}[0-9]{2}(\\ |-){0,1}[0-9]{2}(\\ |-){0,1}[0-9]{1}(\\ |-){0,1}[0-9]{3}$',
          message: '请输入正确电话号码',
        },
      },
    },
    onSubmit: () => testData(data),
  });

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageArray, setImageArray] = useState([]);

  const navigate = useNavigate();

  const testData = (data) => {
    setIsLoadingBtn(true);
    const doc = {
      _type: 'posts',
      title: data.title,
      description: data.description,
      images: files,
      image: imageAsset?._id
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset?._id,
            },
          }
        : null,
      contact: data.contact,
      postedBy: data.postedBy,
      price: Number(data.price),
      postedByNum: Number(data.phoneNum),
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

  const handleFile = (e) => {
    setMessage('');
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setIsLoading(true);
        const { type, name } = e.target.files[i];
        client.assets
          .upload('image', e.target.files[i], {
            contentType: type,
            filename: name,
            autoGenerateArrayKeys: true,
          })
          .then(setFiles([...files, file[i]]));

        console.log(files);
      } else {
        setMessage('only images accepted');
      }
    }
  };
  const removeImage = (i) => {
    setFiles(files.filter((x) => x.name !== i));
  };

  return (
    <div className="mx-auto w-[680px]">
      <form onSubmit={handleSubmit}>
        <div className="border-b-2 my-5">
          <p className="mb-2 font-semibold text-lg ">Title</p>
          <input
            className="mb-2 border-2 border-solid w-2/3 leading-5 p-3 rounded text-sm font-semibold focus:border-rose-500 focus:border-2 focus:border-solid focus:outline-none"
            type="text"
            onChange={handleChange('title')}
            placeholder="Title"
          />
          <p className="text-sm mb-4">
            Please include details such as{' '}
            <span className="font-semibold">
              brand, colour, size, specs, etc.
            </span>
          </p>
          <p className="mb-1 font-semibold text-lg">Catergory</p>
          <p className="mb-5 text-rose-500 font-semibold">{categoryTitle}</p>
        </div>
        <div className="border-b-2 my-5">
          <p className="mb-2 font-semibold text-lg relative">Price</p>
          <div className="relative">
            <CgDollar className="absolute my-auto inset-y-0 left-0 text-2xl justify-center flex items-center pl-2" />
            <input
              className="block pl-7 mb-5 border-2 border-solid w-1/3 leading-5 p-3 rounded text-sm font-semibold focus:border-rose-500 focus:border-2 focus:border-solid focus:outline-none"
              type="number"
              onChange={handleChange('price')}
              min="0.00"
              step="0.5"
            />
          </div>
        </div>
        <div className="border-b-2 my-5">
          <div className="mb-5  flex flex-row">
            <p className="my-auto font-semibold text-lg">Condition</p>
            <div className="flex flex-row items-center justify-center my-auto">
              <div className="ml-20 flex flex-row">
                <input type="checkbox" className="w-5 h-5" value="used" />
                <span className="ml-2">Used</span>
              </div>
              <div className="ml-10 flex flex-row">
                <input type="checkbox" className="w-5 h-5" value="new" />
                <span className="ml-2">New</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-2 my-5">
          <p className="mb-2 font-semibold text-lg">Description</p>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="8"
            className="w-2/3 mb-2 border-2 border-solid rounded focus:border-rose-500 focus:border-2 focus:outline-none px-3 py-2"
          ></textarea>
        </div>
        <div className="mb-5 border-b-2 flex flex-col w-full">
          <div className="flex flex-row items-center w-full">
            <div className="my-5 flex items-center">
              <p className="mb-2 mr-3 font-semibold text-lg">Contact:</p>
              <input
                className="mb-2 mr-5 border-2 border-solid leading-5 p-3 rounded text-sm font-semibold focus:border-rose-500 focus:border-2 focus:border-solid focus:outline-none"
                type="text"
                onChange={handleChange('contact')}
                placeholder="Name"
              />
            </div>
            <div className="my-5 flex items-center">
              <p className="mb-2 mr-3 font-semibold text-lg">Phone:</p>
              <input
                className="mb-2 border-2 border-solid leading-5 p-3 rounded text-sm font-semibold focus:border-rose-500 focus:border-2 focus:border-solid focus:outline-none"
                type="number"
                onChange={handleChange('phoneNum')}
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="mb-5 flex flex-row items-center">
            <p className="mb-2 mr-3 font-semibold text-lg">Email:</p>
            <input
              className="border-2 w-1/2 border-solid leading-5 p-3 rounded text-sm font-semibold focus:border-rose-500 focus:border-2 focus:border-solid focus:outline-none"
              type="email"
              onChange={handleChange('email')}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="w-40 text-lg flex items-center justify-center text-center px-5 bg-rose-500 h-10 rounded-md text-white hover:bg-rose-600 transition ease-out duration-100 font-semibold">
          <button type="submit" className="gap-x-1 mx-3 flex items-center justify-center w-full h-full">
            {testbtn && <CgSpinner className="animate-spin h-5 w-5" />}
            {testbtn && <span>posting...</span>}
            {!testbtn && <span >POST</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondHandForm;
