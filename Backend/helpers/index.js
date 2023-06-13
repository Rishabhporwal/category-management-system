exports.createTree = (categories) => {
  const parent = [];
  const child = {};

  categories &&
    categories.forEach((category) => {
      const { id, parentId } = category;

      child[id] = child[id] || [];
      const newCategory = Object.assign(
        category.get({
          plain: true,
        }),
        {
          children: child[id],
        }
      );

      parentId
        ? (child[parentId] = child[parentId] || []).push(newCategory)
        : parent.push(newCategory);
    });

  return parent;
};
