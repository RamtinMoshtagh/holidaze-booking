import api from './Api';

/**
 * Create a new venue.
 * @param {Object} venueData - Data for the new venue.
 * @returns {Object} - The created venue data.
 * @throws Will throw an error if the request fails.
 */
export const createVenue = async (venueData) => {
  try {
    const response = await api.post('/holidaze/venues', venueData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating venue:', error);
    throw new Error('Failed to create venue. Please try again later.');
  }
};

/**
 * Update an existing venue.
 * @param {string} id - The ID of the venue to update.
 * @param {Object} venueData - Updated data for the venue.
 * @returns {Object} - The updated venue data.
 * @throws Will throw an error if the request fails.
 */
export const updateVenue = async (id, venueData) => {
  try {
    const response = await api.put(`/holidaze/venues/${id}`, venueData);
    return response.data.data;
  } catch (error) {
    console.error('Error updating venue:', error);
    throw new Error('Failed to update venue. Please try again later.');
  }
};

/**
 * Delete a venue.
 * @param {string} id - The ID of the venue to delete.
 * @throws Will throw an error if the request fails.
 */
export const deleteVenue = async (id) => {
  try {
    await api.delete(`/holidaze/venues/${id}`);
  } catch (error) {
    console.error('Error deleting venue:', error);
    throw new Error('Failed to delete venue. Please try again later.');
  }
};

/**
 * Get venues for a specific profile.
 * @param {string} profileName - The name of the profile.
 * @returns {Array} - A list of venues.
 * @throws Will throw an error if the request fails.
 */
export const getVenuesByProfile = async (profileName) => {
  try {
    const response = await api.get(`/holidaze/profiles/${profileName}/venues`, {
      params: {
        _owner: true,
        _bookings: true
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching venues by profile:', error);
    throw new Error('Failed to fetch venues. Please try again later.');
  }
};

/**
 * Get bookings for a specific profile.
 * @param {string} profileName - The name of the profile.
 * @returns {Array} - A list of bookings.
 * @throws Will throw an error if the request fails.
 */
export const getBookingsForProfile = async (profileName) => {
  try {
    const response = await api.get(`/holidaze/profiles/${profileName}/bookings`, {
      params: {
        _venue: true
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching bookings for profile:', error);
    throw new Error('Failed to fetch bookings. Please try again later.');
  }
};
