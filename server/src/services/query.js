//reusable for set pagination
const DEFAULT_PAGE_NUMBER = 1; //DEFAULT PAGE OF THEDATA IS 1
const DEFAULT_PAGE_LIMIT = 0; //DEFAULT NUMBER OF DATA ELEMENTS ON THE PAGE IS INFINITE

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}
module.exports = {
  getPagination,
};
