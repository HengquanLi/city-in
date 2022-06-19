import { client } from 'client';
import { getAllPosts, searchQuery } from 'utils/data';

export const useGetPosts = (params) => {
  if (!params) {
    return client.fetch(getAllPosts);
  } else {
    return client.fetch(searchQuery(params));
  }
};
