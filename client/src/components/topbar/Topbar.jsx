import { useEffect, useState } from 'react';
import './topbar.scss';
import { Link } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createOrGetUser } from 'utils';

import useAuthStore from 'store/authStore'

const Topbar = () => {
  const {userProfile,addUser} = useAuthStore()

  return (
    <div className="app__topbar">
      <div className="app__topbar-left">perth</div>
      <div className="app__topbar-right">
        {userProfile ? (
          <div>
            {userProfile.image && (
              <Link to="/">
                <img
                className="app__topbar-right-user-image"
                  width={58}
                  height={58}
                  src={userProfile?.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </Link>
            )}
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
