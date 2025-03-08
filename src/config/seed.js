const { pool } = require('./db');

// Sample school data
const sampleSchools = [
  {
    name: 'Central High School',
    address: '123 Main Street, Downtown, City',
    latitude: 37.7749,
    longitude: -122.4194
  },
  {
    name: 'Westside Elementary',
    address: '456 West Avenue, Westside, City',
    latitude: 37.7850,
    longitude: -122.4300
  },
  {
    name: 'Northridge Academy',
    address: '789 North Boulevard, Northside, City',
    latitude: 37.8000,
    longitude: -122.4150
  },
  {
    name: 'Eastview Middle School',
    address: '321 East Road, Eastside, City',
    latitude: 37.7700,
    longitude: -122.4050
  },
  {
    name: 'South Community College',
    address: '654 South Street, Southside, City',
    latitude: 37.7600,
    longitude: -122.4200
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await pool.execute('TRUNCATE TABLE schools');
    console.log('Cleared existing school data');

    // Insert sample schools
    for (const school of sampleSchools) {
      await pool.execute(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [school.name, school.address, school.latitude, school.longitude]
      );
    }

    console.log(`Successfully seeded database with ${sampleSchools.length} schools`);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = { seedDatabase };