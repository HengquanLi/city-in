import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { cleanObject } from 'utils';

//return the parameters in current page url;

export const useUrlQueryParam =(keys) => {
  const [searchParams] = useSearchParams();
  const setSearchParam = useSetUrlSearchParams()
  return [
    useMemo(
      () =>
        keys?.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || '' };
        }),
      [searchParams]
    ),
    (params)=>{
      return setSearchParam(params)
    } 
  ] ;
};

export const useSetUrlSearchParams = ()=>{
  const [searchParams, setSearchParam] = useSearchParams();
  return (params)=>{
     const o = {
       ...Object.fromEntries(searchParams),
       ...params,
     }
     return setSearchParam(o);
  }
}
