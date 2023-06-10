export const extractPageArr = (currentPage, count, length) => {
  const initPage = 1;
  const postPerPage = length ? length : 5;
  const maxPage = Math.ceil(count / postPerPage);

  let arr = [];
  let startPage = currentPage - 3 > 1 ? currentPage - 3 : 1;

  let endPage = currentPage + 3 < maxPage ? currentPage + 3 : maxPage;

  if (currentPage >= maxPage) {
    endPage = maxPage;
    console.log(`endpage`, endPage);
    console.log(`maxPage`, maxPage);
  }
  for (let i = startPage; i <= endPage; i++) {
    arr.push(i);
  }

  if (startPage > 2) {
    arr.unshift(initPage, "...");
  }

  if (endPage < maxPage - 1) {
    arr.push("...");
  }

  // console.log(`Page ${currentPage}: `, arr);
  return arr;
};
