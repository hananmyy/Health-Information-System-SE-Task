module.exports = (req, res) => {
    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let specialization = '';
  
    const data = req.flash('data')[0];
  
    if (typeof data !== 'undefined') {
      name = data.name;
      email = data.email;
      password = data.password;
      confirmPassword = data.confirmPassword;
      specialization = data.specialization;
    }
  
    res.render('doctorRegistration', {
      errors: req.flash('validationErrors'),
      successMessage: req.flash('successMessage'),
      name,
      email,
      password,
      confirmPassword,
      specialization,
    });
  };
  