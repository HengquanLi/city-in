import { Route, Routes, useLocation } from 'react-router';
import React, { useRef, useEffect } from 'react';

export const resetRoute = () => (window.location.href = window.location.origin);

export const useRouteType = (num) => {
  const units = useLocation().pathname.split('/');
  return units[units.length - num];
};

export const useDocumentTitle = (
  title,
  keepOnMount
) => {
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
}