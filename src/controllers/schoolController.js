const School = require('../models/school');

// Add a new school
exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    
    // Validate the input data
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, address, latitude, and longitude'
      });
    }
    
    // Validate data types
    if (typeof name !== 'string' || typeof address !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Name and address must be strings'
      });
    }
    
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude must be valid numbers'
      });
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({
        success: false,
        message: 'Latitude must be between -90 and 90 and longitude must be between -180 and 180'
      });
    }
    
    // Add the school to the database
    const schoolId = await School.create(name, address, lat, lng);
    
    res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: { id: schoolId, name, address, latitude: lat, longitude: lng }
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// List all schools sorted by proximity to a user's location
exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    
    // Validate the input data
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude as query parameters'
      });
    }
    
    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);
    
    if (isNaN(userLat) || isNaN(userLng)) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude must be valid numbers'
      });
    }
    
    if (userLat < -90 || userLat > 90 || userLng < -180 || userLng > 180) {
      return res.status(400).json({
        success: false,
        message: 'Latitude must be between -90 and 90 and longitude must be between -180 and 180'
      });
    }
    
    // Get all schools from the database
    const schools = await School.getAll();
    
    // Calculate the distance of each school from the user's location
    const schoolsWithDistance = schools.map(school => {
      const distance = School.calculateDistance(
        userLat, userLng,
        school.latitude, school.longitude
      );
      return { ...school, distance };
    });
    
    // Sort schools by distance (nearest first)
    const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    
    res.status(200).json({
      success: true,
      count: sortedSchools.length,
      data: sortedSchools
    });
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};