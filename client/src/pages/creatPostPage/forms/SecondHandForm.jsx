import { client } from 'client';
import { useState } from 'react';
import { CgDollar } from 'react-icons/cg';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useForm } from 'utils/useForm';

const SecondHandForm = () => {
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
            <p className="my-auto font-semibold text-lg ">Condition</p>
            <div className="flex flex-row items-center justify-center my-auto">
              <div className="ml-20 flex flex-row">
                <input type="checkbox" className="w-5 h-5" />
                <span className="ml-2">Used</span>
              </div>
              <div className="ml-10 flex flex-row">
                <input type="checkbox" className="w-5 h-5" />
                <span className="ml-2">New</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SecondHandForm;
