const Lead = require("../models/Lead");
const User = require("../models/User");

/*
=========================================
Create Lead (Public Form)
POST /api/leads/public
=========================================
*/

const createPublicLead = async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Phone are required",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      message,
      status: "New",
      activities: [
        {
          action: "Lead Created",
          user: null,
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      lead,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================
Get All Leads
GET /api/leads
=========================================
*/

const getAllLeads = async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const status = req.query.status || "";

    let filter = {};

    if (search) {

      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
      ];

    }

    if (status) {
      filter.status = status;
    }

    const total = await Lead.countDocuments(filter);

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      leads,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

/*
=========================================
Get Single Lead
GET /api/leads/:id
=========================================
*/

const getLeadById = async (req, res) => {
  try {

    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("notes.author", "name")
      .populate("activities.user", "name");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      lead,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
=========================================
Update Lead
PUT /api/leads/:id
=========================================
*/

const updateLead = async (req, res) => {

  try {

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.name = req.body.name || lead.name;
    lead.email = req.body.email || lead.email;
    lead.phone = req.body.phone || lead.phone;
    lead.company = req.body.company || lead.company;
    lead.message = req.body.message || lead.message;

    lead.activities.push({
      action: "Lead Updated",
      user: req.user._id,
    });

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

/*
=========================================
Delete Lead
DELETE /api/leads/:id
(Admin Only)
=========================================
*/

const deleteLead = async (req, res) => {

  try {

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

/*
=========================================
Assign Lead to Member
PATCH /api/leads/:id/assign
(Admin Only)
=========================================
*/

const assignLead = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    const user = await User.findById(assignedTo);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found",
      });
    }

    lead.assignedTo = assignedTo;

    lead.activities.push({
      action: `Lead assigned to ${user.name}`,
      user: req.user._id,
    });

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead assigned successfully",
      lead,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
=========================================
Update Lead Status
PATCH /api/leads/:id/status
=========================================
*/

const updateLeadStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.status = status;

    lead.activities.push({
      action: `Status changed to ${status}`,
      user: req.user._id,
    });

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      lead,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

/*
=========================================
Add Note
POST /api/leads/:id/notes
=========================================
*/

const addNote = async (req, res) => {

  try {

    const { text } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.notes.push({
      text,
      author: req.user._id,
    });

    lead.activities.push({
      action: "Note Added",
      user: req.user._id,
    });

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Note added successfully",
      lead,
    });

  } catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

module.exports = {
  createPublicLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  assignLead,
  updateLeadStatus,
  addNote,
};