function paginate(req, model, query) {
  return async () => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    // change model.length to model.countDocuments() because you are counting directly from mongodb
    if (endIndex < (await model.countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      result.results = await query.limit(limit).skip(startIndex);
      return result;
    } catch (e) {
      console.log(e);
      //   res.status(500).json({ message: e.message });
    }
  };
}

module.exports = paginate;
