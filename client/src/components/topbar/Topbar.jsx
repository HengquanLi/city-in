import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { createOrGetUser } from 'utils';
import './topbar.scss';

import { GiModernCity } from 'react-icons/gi';
import { HiOutlineLogout } from 'react-icons/hi';

import useAuthStore from 'store/authStore';

const Topbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <div className="app__topbar">
      <div className="app__topbar-left">
        <GiModernCity fontSize={28} /> <span>PERTH</span>
      </div>
      <div className="app__topbar-right">
        {userProfile ? (
          <div className="app__topbar-right-user">
            {userProfile.image && (
              <Link to="/">
                <img
                  className="app__topbar-right-user-image"
                  width={35}
                  height={35}
                  src={userProfile?.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </Link>
            )}
            <button
              type="button"
              className="app_topbar-right-logout-btn"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <HiOutlineLogout color="white" fontSize={28} />
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
