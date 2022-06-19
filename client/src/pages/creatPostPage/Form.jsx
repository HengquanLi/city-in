import { client } from 'client';
import { Spinner } from 'components';
import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDocumentTitle, useRouteType } from 'utils';
import './form.scss';

const PostForm = () => {
  useDocumentTitle('新发布', false);
  const { catetoryId } = useParams();
  const routeType = useRouteType(1);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [fields, setFields] = useState();
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

  const savePost = () => {
    if (postedBy && title && description) {
      const doc = {
        _type: 'posts',
        title,
        description,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        // userId: user._id,
        // artistId: artistId,
        // postedBy: {
        //   _type: 'postedBy',
        //   _ref: user._id,
        // },
        postedBy: postedBy,
        price: Number(price),
        postedByNum: Number(phoneNum),
        category: {
          _type: 'reference',
          _ref: catetoryId,
        },
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };
  return (
    <div>
      {fields && <p>输入所有</p>}
      <div className="app__postForm-container flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="app__postForm-container-1 bg-secondaryColor p-3 flex flex-0.7 w-full">
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
                    图片类型: JPG, JPEG, SVG, PNG, GIF or TIFF 文件大小小于 5MB
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
        <div className="app__postForm-right flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="标题"
            className="app__postForm-right-title"
          />
          <textarea
            rows="6"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="描述"
            className="app__postForm-right-description"
          />
          <div>
            <div className="app__postForm-price">
              <p>价格:</p>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="app__postForm-name">
              <p>联系人:</p>
              <input
                type="text"
                value={postedBy}
                onChange={(e) => setPostedBy(e.target.value)}
              />
            </div>
            <div className="app__postForm-phone">
              <p>联系电话:</p>
              <input
                type="text"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </div>
          </div>

          <div className="app__postForm-btn flex justify-end items-end mt-5">
            <button
              type="button"
              onClick={savePost}
              className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
            >
              发布
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
