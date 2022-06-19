import { client } from 'client';
import { Spinner } from 'components';
import { useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsArrowRightSquare } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import './postForm.scss';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [artistId, setArtistId] = useState();
  const [fields, setFields] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  // const navigate = useNavigate();
  useEffect(() => {
    const query = '*[_type == "categories"]';
    client.fetch(query).then((data) => setCategories(data));
  }, []);

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
    if (title && description && imageAsset?._id && categoryId) {
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
        category: {
          _type: 'categories',
          _ref: categoryId,
        },
      };
      client.create(doc).then(() => {
        // navigate('/');
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
      <div>
        <input type="text" />
        <BsArrowRightSquare className="app__postForm-arrowIcon" />
      </div>
      {fields && <p>输入所有</p>}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {isLoading && <Spinner />}
            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
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
              <div className="relative h-full">
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
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="标题"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="描述"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <p className="mb-2 font-semibold text:lg sm:text-xl">
              选择发布类型
            </p>
            <select
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
              className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            >
              <option value="others" className="sm:text-bg bg-white">
                发布类型
              </option>
              {categories.map((item, index) => (
                <option
                  className="text-base border-0 outline-none capitalize bg-white text-black border-gray-200"
                  value={item._id}
                  key={index}
                >
                  {item.title}
                </option>
              ))}
            </select>

            <div className="flex justify-end items-end mt-5">
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
    </div>
  );
};

export default PostForm;
