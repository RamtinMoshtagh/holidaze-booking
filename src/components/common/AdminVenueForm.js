// AdminVenueForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';

const FormContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

const ErrorMessage = styled.p`
  color: red;
`;

const AdminVenueForm = ({ initialData, onSubmit }) => {
  const [venue, setVenue] = useState(initialData);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setVenue({ ...venue, meta: { ...venue.meta, [name]: checked } });
    } else if (name.startsWith('media.')) {
      const key = name.split('.')[1];
      const updatedMedia = [...venue.media];
      updatedMedia[0] = { ...updatedMedia[0], [key]: value };
      setVenue({ ...venue, media: updatedMedia });
    } else if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setVenue({ ...venue, location: { ...venue.location, [key]: value } });
    } else {
      setVenue({ ...venue, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(venue);
    if (errors.length > 0) {
      setError(errors.join(', '));
      return;
    }
    setError('');
    // Convert price and maxGuests to numbers
    const venueData = {
      ...venue,
      price: Number(venue.price),
      maxGuests: Number(venue.maxGuests),
    };
    onSubmit(venueData);
    setVenue(initialData); // Clear the form fields
  };

  const validateForm = (data) => {
    const errors = [];
    if (!data.name) errors.push('Name is required');
    if (!data.description) errors.push('Description is required');
    if (!data.price || isNaN(data.price)) errors.push('Price must be a number');
    if (!data.maxGuests || isNaN(data.maxGuests)) errors.push('Max guests must be a number');
    if (!data.media[0].url || !isValidUrl(data.media[0].url)) errors.push('Image URL must be a valid URL');
    return errors;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={venue.name}
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
            value={venue.description}
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
            value={venue.price}
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
            value={venue.maxGuests}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="mediaUrl">Media URL</Label>
          <Input
            type="text"
            id="mediaUrl"
            name="media.url"
            value={venue.media[0].url}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="mediaAlt">Media Alt</Label>
          <Input
            type="text"
            id="mediaAlt"
            name="media.alt"
            value={venue.media[0].alt}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            name="location.address"
            value={venue.location.address}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            name="location.city"
            value={venue.location.city}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="zip">Zip</Label>
          <Input
            type="text"
            id="zip"
            name="location.zip"
            value={venue.location.zip}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="country">Country</Label>
          <Input
            type="text"
            id="country"
            name="location.country"
            value={venue.location.country}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="continent">Continent</Label>
          <Input
            type="text"
            id="continent"
            name="location.continent"
            value={venue.location.continent}
            onChange={handleChange}
          />
        </FormGroup>
        <CheckboxLabel>
          <input
            type="checkbox"
            id="wifi"
            name="wifi"
            checked={venue.meta.wifi}
            onChange={handleChange}
          /> Wifi
        </CheckboxLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            id="parking"
            name="parking"
            checked={venue.meta.parking}
            onChange={handleChange}
          /> Parking
        </CheckboxLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            id="breakfast"
            name="breakfast"
            checked={venue.meta.breakfast}
            onChange={handleChange}
          /> Breakfast
        </CheckboxLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            id="pets"
            name="pets"
            checked={venue.meta.pets}
            onChange={handleChange}
          /> Pets
        </CheckboxLabel>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
  );
};

export default AdminVenueForm;
