export const searchQuery = (searchTerm) => {
  const query = `*[_type == "posts" && title match '${searchTerm}*' 
  || category->{title} match '${searchTerm}*' 
  || description match '${searchTerm}*'] 
  | order(_createdAt desc) 
  {category->{name,title,description},price,description,image,postedBy,title,_createdAt,_id}`;
  return query;
};

export const getAllPosts =
  '*[_type == "posts"] | order(_createdAt desc) {category->{name,title,description},price,description,image,postedBy,title,_createdAt,_id}';

export const getCategories =
  '*[_type == "categories"]{"label":title,"value":_id}';

export const useGetPostsByCategory = (category) => {
  const query = `*[_type == "posts" && category._ref in *[_type == "categories" && name == '${category}']._id] | order(_createdAt desc)`;
  return query;
};

export const useGetPostById = (postId) => {
  const query = `*[_type == "posts" && _id == '${postId}']`;
  return query;
};
