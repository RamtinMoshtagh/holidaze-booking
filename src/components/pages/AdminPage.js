// AdminPage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { createVenue, updateVenue, deleteVenue, getVenuesByProfile, getBookingsForProfile } from '../../services/VenueService';
import AdminVenueForm from '../common/AdminVenueForm';
import AdminVenueList from '../common/AdminVenueList';
import AdminBookingList from '../common/AdminBookingList';
import { AdminContainer, AdminHeading, AdminErrorMessage, AdminSuccessMessage } from '../common/AdminStyledComponents';

const AdminPage = () => {
  const { user } = useAuth();
  const [venues, setVenues] = useState(() => {
    const storedVenues = localStorage.getItem('venues');
    return storedVenues ? JSON.parse(storedVenues) : [];
  });
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedVenueTitle, setSelectedVenueTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const initialVenueData = {
    name: '',
    description: '',
    price: '',
    maxGuests: '',
    media: [{ url: '', alt: '' }],
    meta: { wifi: false, parking: false, breakfast: false, pets: false },
    location: { address: '', city: '', zip: '', country: '', continent: '', lat: 0, lng: 0 },
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        console.log(`Fetching venues for profile: ${user.name}`);
        const data = await getVenuesByProfile(user.name);
        setVenues(data || []);
        localStorage.setItem('venues', JSON.stringify(data || []));
      } catch (err) {
        console.error('Error fetching venues by profile:', err);
        setError('Failed to load venues');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [user.name]);

  const handleCreateVenue = async (venueData) => {
    // Form validation
    if (!venueData.name || !venueData.description || !venueData.price || !venueData.maxGuests) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const newVenueResponse = await createVenue(venueData);
      const updatedVenues = [...venues, newVenueResponse];
      setVenues(updatedVenues);
      localStorage.setItem('venues', JSON.stringify(updatedVenues));
      setSuccess('Venue created successfully.');
    } catch (err) {
      setError('Failed to create venue');
    }
  };

  const handleUpdateVenue = async (id, venueData) => {
    try {
      const updatedVenue = await updateVenue(id, venueData);
      const updatedVenues = venues.map(venue => (venue.id === id ? updatedVenue : venue));
      setVenues(updatedVenues);
      localStorage.setItem('venues', JSON.stringify(updatedVenues));
      setSuccess('Venue updated successfully.');
    } catch (err) {
      setError('Failed to update venue');
    }
  };

  const handleDeleteVenue = async (id) => {
    try {
      await deleteVenue(id);
      const updatedVenues = venues.filter(venue => venue.id !== id);
      setVenues(updatedVenues);
      localStorage.setItem('venues', JSON.stringify(updatedVenues));
      setSuccess('Venue deleted successfully.');
    } catch (err) {
      setError('Failed to delete venue');
    }
  };

  const handleViewBookings = async (venueId, venueTitle) => {
    try {
      console.log(`Fetching bookings for venue: ${venueId}`);
      const allBookings = await getBookingsForProfile(user.name);
      const venueBookings = allBookings.filter(booking => booking.venue.id === venueId);
      setSelectedVenue(venueId);
      setSelectedVenueTitle(venueTitle);
      setBookings(venueBookings);
    } catch (err) {
      setError('Failed to load bookings');
    }
  };

  if (loading) {
    return <AdminContainer>Loading...</AdminContainer>;
  }

  return (
    <AdminContainer>
      <AdminHeading>Admin Page</AdminHeading>
      {error && <AdminErrorMessage>{error}</AdminErrorMessage>}
      {success && <AdminSuccessMessage>{success}</AdminSuccessMessage>}
      <h2>Create Venue</h2>
      <AdminVenueForm initialData={initialVenueData} onSubmit={handleCreateVenue} />
      <AdminVenueList venues={venues} onUpdate={handleUpdateVenue} onDelete={handleDeleteVenue} onViewBookings={handleViewBookings} />
      {selectedVenue && <AdminBookingList venueTitle={selectedVenueTitle} bookings={bookings} />}
    </AdminContainer>
  );
};

export default AdminPage;
