// AdminVenueItem.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';

const AdminVenueItemContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }
`;

const AdminVenueItem = ({ venue, onUpdate, onDelete, onViewBookings }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVenue, setEditedVenue] = useState({ ...venue });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEditedVenue({ ...editedVenue, meta: { ...editedVenue.meta, [name]: checked } });
    } else if (name.includes('media')) {
      const index = parseInt(name.split('.')[1], 10);
      const key = name.split('.')[2];
      const updatedMedia = [...editedVenue.media];
      updatedMedia[index] = { ...updatedMedia[index], [key]: value };
      setEditedVenue({ ...editedVenue, media: updatedMedia });
    } else if (name.includes('location')) {
      const key = name.split('.')[1];
      setEditedVenue({ ...editedVenue, location: { ...editedVenue.location, [key]: value } });
    } else {
      setEditedVenue({ ...editedVenue, [name]: value });
    }
  };

  const handleUpdate = () => {
    if (!editedVenue.name || !editedVenue.description || !editedVenue.price || !editedVenue.maxGuests) {
      setError('Please fill in all required fields.');
      return;
    }
    onUpdate(venue.id, editedVenue);
    setIsEditing(false);
  };

  return (
    <AdminVenueItemContainer>
      {isEditing ? (
        <>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={editedVenue.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={editedVenue.description}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={editedVenue.price}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="maxGuests">Max Guests</Label>
            <Input
              type="number"
              id="maxGuests"
              name="maxGuests"
              value={editedVenue.maxGuests}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="mediaUrl">Media URL</Label>
            <Input
              type="text"
              id="mediaUrl"
              name="media.0.url"
              value={editedVenue.media[0].url}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="mediaAlt">Media Alt</Label>
            <Input
              type="text"
              id="mediaAlt"
              name="media.0.alt"
              value={editedVenue.media[0].alt}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              name="location.address"
              value={editedVenue.location.address}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              id="city"
              name="location.city"
              value={editedVenue.location.city}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="zip">Zip</Label>
            <Input
              type="text"
              id="zip"
              name="location.zip"
              value={editedVenue.location.zip}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="country">Country</Label>
            <Input
              type="text"
              id="country"
              name="location.country"
              value={editedVenue.location.country}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="continent">Continent</Label>
            <Input
              type="text"
              id="continent"
              name="location.continent"
              value={editedVenue.location.continent}
              onChange={handleChange}
            />
          </FormGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="wifi"
              name="wifi"
              checked={editedVenue.meta.wifi}
              onChange={handleChange}
            /> Wifi
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="parking"
              name="parking"
              checked={editedVenue.meta.parking}
              onChange={handleChange}
            /> Parking
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="breakfast"
              name="breakfast"
              checked={editedVenue.meta.breakfast}
              onChange={handleChange}
            /> Breakfast
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="pets"
              name="pets"
              checked={editedVenue.meta.pets}
              onChange={handleChange}
            /> Pets
          </CheckboxLabel>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button onClick={handleUpdate}>Save</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <h2>{venue.name}</h2>
          <p>{venue.description}</p>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
          <Button onClick={() => onDelete(venue.id)}>Delete</Button>
          <Button onClick={() => onViewBookings(venue.id, venue.name)}>View Bookings</Button>
        </>
      )}
    </AdminVenueItemContainer>
  );
};

export default AdminVenueItem;
