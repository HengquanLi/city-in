export const searchQuery = (searchTerm) => {
  const query = `*[_type == "posts" && title match '${searchTerm}*' 
  || category->{title} match '${searchTerm}*' 
  || description match '${searchTerm}*'] 
  | order(_createdAt desc) 
  {category->{name,title,description},price,description,image,images,contact,title,_createdAt,_id}`;
  return query;
};

export const getAllPosts =
  '*[_type == "posts"] | order(_createdAt desc) {category->{name,title,description},price,description,image,images,postedBy,title,_createdAt,_id}';

export const getCategoriesSelect =
  '*[_type == "categories"]{"label":name,"value":_id}';

export const getCategories = '*[_type == "categories"]';

export const useGetPostsByCategory = (category) => {
  const query = `*[_type == "posts" && category._ref in *[_type == "categories" && name == '${category}']._id] | order(_createdAt desc) {category->{name,title,description},price,description,image,images,postedBy,title,_createdAt,_id}`;
  return query;
};

export const useGetPostById = (postId) => {
  const query = `*[_type == "posts" && _id == '${postId}']{postedBy->{_id,userName},price,description,image,images,contact,title,postedByNum,_createdAt,_id}`;
  return query;
};
