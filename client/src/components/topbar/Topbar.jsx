import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { urlFor } from 'client';
import { createOrGetUser } from 'utils';

import './topbar.scss';

import { GiModernCity } from 'react-icons/gi';
import { HiOutlineLogout } from 'react-icons/hi';
import ReactTooltip from 'react-tooltip';

import useAuthStore from 'store/authStore';

const Topbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  console.log(userProfile)
  return (
    <div className="h-16 bg-rose-500 flex items-center justify-around text-white border-b border-solid border-gray-300 p-3">
      <div className="flex">
        <GiModernCity fontSize={28} />{' '}
        <div className="my-auto ml-2.5 font-bold h-4">PERTH</div>
      </div>
      <div className="text-center">
        {userProfile ? (
          <div className="flex">
            {userProfile.image && (
              <div>
                <img
                  // className="app__topbar-right-user-image "
                  className="rounded-full mr-3 hover:cursor-pointer"
                  width={35}
                  height={35}
                  src={userProfile.image}
                  alt="profile"
                  layout="responsive"
                  data-tip
                  data-for="userTip"
                />
                <ReactTooltip
                  type="light"
                  id="userTip"
                  place="bottom"
                  effect="solid"
                >
                  {userProfile?.userName}
                </ReactTooltip>
              </div>
            )}
            <button
              type="button"
              // className="app_topbar-right-logout-btn"
              className="cursor-pointer border-none transition transform ease-in-out duration-200 hover:scale-105"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <HiOutlineLogout
                color="white"
                fontSize={28}
                data-tip
                data-for="logoutTip"
              />
              <ReactTooltip
                type="light"
                id="logoutTip"
                place="bottom"
                effect="solid"
              >
                Log Out
              </ReactTooltip>
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </div>
  );
};

export default Topbar;
