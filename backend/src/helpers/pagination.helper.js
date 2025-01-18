function paramPaginate(req) {
  const { page = 1, per_page = 10 } = req.query;
  const pageNumber = parseInt(page);
  const take = parseInt(per_page);
  const skip = (pageNumber - 1) * take;

  return {
    pageNumber,
    skip,
    take,
  }
}

function paginationResponse(total, data, per_page, page, skip) {
  const last_page = Math.ceil(total / per_page);
  const from = skip + 1;
  const to = Math.min(skip + per_page, total);

  return {
    items: data,
    meta: {
      pagination: {
        total,
        per_page,
        current_page: page,
        last_page,
        from,
        to,
      },
    },
  };
}

module.exports = {
  paramPaginate,
  paginationResponse
}

