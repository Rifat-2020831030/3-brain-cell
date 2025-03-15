const getProfile = (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found. Please log in to access your profile.',
      });
    }

    const { id, name, email, mobile, location, role } = req.user;

    return res.status(200).json({
      status: 'success',
      message: 'User profile fetched successfully',
      data: {
        id,
        name,
        email,
        mobile,
        location,
        role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching the profile',
      error: error.message,
    });
  }
};

module.exports = { getProfile };
