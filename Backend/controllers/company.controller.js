import Company from "../models/company.model.js";

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      createdBy: req.user.id,
    });

    // Fixed: Removed duplicate response
    return res.status(201).json({
      message: "Company Registered Successfully",
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

export const getAllCompanies = async (req, res) => {
  try {
    // For admin, get all companies
    const isAdmin = req.userRole === "admin";
    let query = {};

    if (!isAdmin) {
      // For recruiter, get only their companies
      query = { createdBy: req.user.id };
    }

    const companies = await Company.find(query).populate(
      "createdBy",
      "fullName email",
    );

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const updateData = {
      name,
      description,
      website,
      location,
    };

    const companyId = req.params.id;
    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
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
      success: false,
    });
  }
};

// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId).populate(
      "createdBy",
      "fullName email",
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company fetched successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// Delete company (Admin only)
export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findByIdAndDelete(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export default registerCompany;
