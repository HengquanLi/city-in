import React from 'react';
import { client } from '../client';

export const DeleteDoc = () => {
  const deleteDoc = () => {
    // const query = `*[_type == "posts" && _id=="MIBn063RYGY6Oom8VMVWdH"]`;
    client.delete({
      query: `*[_type == "posts" && _id=="ua2B64HnO6Bb4Ci1KBTL60"]`,
    });
  };
  return (
    <div>
      <button onClick={()=>deleteDoc()}>delete</button>
    </div>
  );
};

