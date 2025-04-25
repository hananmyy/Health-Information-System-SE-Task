module.exports = (req, res) => {
    let name = "";
    let dob = "";
    let email = "";
    let gender = "";
    let contact = "";
  
    const data = req.flash("data")[0];
  
    if (typeof data !== "undefined") {
      name = data.name;
      dob = data.dob;
      email = data.email;
      gender = data.gender;
      contact = data.contact;
    }
  
    res.render("clientRegistration", {
      errors: req.flash("validationErrors"),
      successMessage: req.flash("successMessage"),
      name,
      dob,
      email,
      gender,
      contact,
    });
  };