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

export const formatPhone = (value) => {
  // if input value is falsy eg if the user deletes the input, then just return
  // if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.toString().replace(/[^\d]/g, '');

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early

  if (phoneNumberLength < 4) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
  }

  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
    2,
    6
  )} ${phoneNumber.slice(6, 10)}`;
}