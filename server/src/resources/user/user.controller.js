exports.getUser = function(req, res) {
  if (!req.session.dUser) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  return res.json(req.session.dUser);
};
