import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { client } from 'client';
import jwt_decode from 'jwt-decode';

export const resetRoute = () => (window.location.href = window.location.origin);

export const useRouteType = (num) => {
  const units = useLocation().pathname.split('/');
  return units[units.length - num];
};

export const useDocumentTitle = (title, keepOnMount) => {
  const initialTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnMount) document.title = initialTitle;
    };
  }, [initialTitle, keepOnMount]);
};

export const useCapitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const createOrGetUser = async (res,addUser) => {
  
  const decoded = jwt_decode(
    res.credential
  );
  console.log(decoded);

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };

  await client
    .createIfNotExists(user)

  addUser(user);

  console.log(decoded);
};