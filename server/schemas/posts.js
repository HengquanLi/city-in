export default {
  name: 'posts',
  title: 'Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'string',
    },
    {
      name: 'postedByNum',
      title: 'PostedByNum',
      type: 'number',
    },
    {
      name: 'postedByEmail',
      title: 'PostedByEmail',
      type: 'email',
    },
    {
      name: 'postedByWeixin',
      title: 'PostedByWeixin',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'categories' }],
    },
  ],
};
