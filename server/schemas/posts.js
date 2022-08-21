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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'condition',
      title: 'Condition',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'contact',
      title: 'Contact',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'reference',
      to: { type: 'user' },
    },
    {
      name: 'postedByNum',
      title: 'PostedByNum',
      type: 'string',
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
