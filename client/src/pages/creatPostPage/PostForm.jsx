import { client } from 'client';
import { Spinner } from 'components';
import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import { ImSpinner6 } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useForm } from 'utils/useForm';
// import {formatPhonenumber} from 'utils'
import './postForm.scss';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

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
        <div className="app__postForm-container">
          <div className="app__postForm-container-1 ">
            <div className="app__postForm-container-2 flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {isLoading && <Spinner />}
              {wrongImageType && <p>It&apos;s wrong file type.</p>}
              {!imageAsset ? (
                <label>
                  <div className="app__postForm-label-container flex flex-col items-center justify-center h-full">
                    <div className="app__postForm-label-top flex flex-col justify-center items-center">
                      <p className="font-bold text-2xl">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="text-lg">点击上传</p>
                    </div>

                    <p className="mt-32 text-gray-400">
                      图片类型: JPG, JPEG, SVG, PNG, GIF or TIFF 文件大小小于
                      5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="app__postForm-img relative h-full">
                  <img
                    src={imageAsset?.url}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="app__postForm-right ">
            <input
              type="text"
              // value={title}
              onChange={handleChange('title')}
              placeholder="标题"
              className="app__postForm-right-title"
              required
            />
            {errors.title && <p className="error">{errors.title}</p>}
            <textarea
              required
              rows="6"
              type="text"
              value={data.description}
              onChange={handleChange('description')}
              placeholder="描述"
              className="app__postForm-right-description"
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
            <div>
              <div className="app__postForm-price">
                <p>价格:</p>
                <div className="app__postForm-price-container">
                  <BsCurrencyDollar className="app__postForm-dollar" />
                  <input type="text" onChange={handleChange('price')} />
                </div>
              </div>
              {errors.price && <p className="error">{errors.price}</p>}
              <div className="app__postForm-name">
                <p>联系人:</p>
                <input type="text" onChange={handleChange('contact')} />
              </div>
              {errors.contact && <p className="error">{errors.contact}</p>}
              <div className="app__postForm-phone">
                <p>moblie:</p>
                <input
                  type="text"
                  onChange={handleChange('phoneNum')}
                  required
                />
              </div>
              {errors.phoneNum && <p className="error">{errors.phoneNum}</p>}
            </div>

            <div className="app__postForm-btn-container ">
              <button type="submit" className="app__postForm-btn">
                {isLoadingBtn && <ImSpinner6 className="btn-spinner" />}
                {isLoadingBtn && <span>发布中...</span>}
                {!isLoadingBtn && <span>点击发布</span>}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
