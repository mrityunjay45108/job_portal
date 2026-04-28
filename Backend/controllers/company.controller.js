import Company from "../models/company.model.js";

const registerCompany = async (req, res) => {
  try {
    const { companayName } = req.body;

    if (!companayName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ companayName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    company = await Company.create({
      name: companayName,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Company Registered Successfully",
      success: true,
      company,
    });

    res.status(201).json({
      message: "Company Registered Successfully",
      success: true,
      company: newCompany,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export default registerCompany;

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.user.id;
    const companies = await Company.find();
    res.status(200).json({
      message: "Companies fetched successfully",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    // cloudinary service

    const updateData = {
      name,
      description,
      website,
      location,
    };
    const company = await company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.status(200).json({
      message: "Company Updated Successfully",
      success: true,
      company,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company Updated Successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
