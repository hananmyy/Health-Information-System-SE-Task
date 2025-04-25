module.exports = (req, res) => {
    res.render('doctorLogin', {
      errors: req.flash('error'),
      successMessage: req.flash('successMessage'),
    });
};
