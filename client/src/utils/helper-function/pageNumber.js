export const extractPageArr = (currentPage, count, length) => {
  const initPage = 1;
  const maxPage = Math.ceil(count / length);

  let arr = [];
  const startPage = currentPage - 3 > 1 ? currentPage - 3 : 1;

  const endPage = currentPage + 3 < maxPage ? currentPage + 3 : maxPage;

  for (let i = startPage; i <= endPage; i++) {
    arr.push(i);
  }

  if (startPage > 2) {
    arr.unshift(initPage, "...");
  }

  if (endPage < maxPage - 1) {
    arr.push("...");
  }
  console.log(`Page ${currentPage}: `, arr);
  return arr;
};
