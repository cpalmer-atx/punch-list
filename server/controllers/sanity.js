exports.sanityCheck = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: 'Passed sanity check!' });
};