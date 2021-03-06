import { client } from 'client';
import { Spinner } from 'components';
import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import {FaRegFolderOpen} from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { BsCurrencyDollar } from 'react-icons/bs';
import { ImSpinner6 } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useForm } from 'utils/useForm';
// import {formatPhonenumber} from 'utils'
// import './postForm.scss';

const PostForm = () => {
  const { categoryId } = useParams();
  // const handleNumChange = (e) => {
  //   const targetValue = formatPhonenumber(e.target.value)
  //   setPhoneNum(targetValue)
  // }
  console.log(categoryId);
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

  // const [phoneNum,setPhoneNum] = useState('')
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageArray, setImageArray] = useState([])

  const navigate = useNavigate();

  const handleFile = (e) => {
    setMessage('');
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage('only images accepted');
      }
    }
  };
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    // uploading asset to sanity
    if (
      type === 'image/png' ||
      type === 'image/jpeg' ||
      type === 'image/gif' ||
      type === 'image/tiff'
    ) {
      setWrongImageType(false);
      setIsLoading(true);
      client.assets
        .upload('image', e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setIsLoading(false);
      setWrongImageType(true);
    }
  };

  const testData = (data) => {
    setIsLoadingBtn(true);
    const doc = {
      _type: 'posts',
      title: data.title,
      description: data.description,
      image: imageAsset?._id
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset?._id,
            },
          }
        : null,
      contact:data.contact,
      postedBy:data.postedBy,
      price: Number(data.price),
      postedByNum: Number(data.phoneNum),
      category: {
        _type: 'reference',
        _ref: categoryId,
      },
    };
    client.create(doc).then((res) => {
      console.log(res);
      setIsLoadingBtn(false);
      navigate(`/posts/${res._id}`);
    });
  };
  // console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <>
          <div className="h-[460px] flex justify-center items-center bg-gray-300 px-2">
            <div className="p-3 md:w-1/2 w-[360px] bg-white rounded-md">
              <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                {message}
              </span>
              <div className="h-32 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
                <input
                  type="file"
                  onChange={handleFile}
                  className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
                  multiple="multiple"
                  name="files[]"
                />
                <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                  <div className="flex flex-col items-center">
                    <FaRegFolderOpen className="text-[30px] text-gray-400 text-center"/>
                    <span className="text-[12px]">{`Drag and Drop a file`}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {files.map((file, key) => {
                  return (
                    <div key={key} className="relative ">
                      <MdClose
                        onClick={() => {
                          removeImage(file.name);
                        }}
                        className="absolute right-[-8px] top-[-8px] z-20 hover:text-rose-900 text-rose-900 cursor-pointer"
                      />
                      <img
                        className="w-[150px] h-[150px]  rounded-md"
                        src={URL.createObjectURL(file)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      </form>
    </div>
  );
};

export default PostForm;
