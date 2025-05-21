import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Song, SongFormData } from '../../types';
import { createSongRequest, updateSongRequest } from '../../store/slices/songsSlice';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface SongFormComponentProps {
  song?: Song | null;
  isEditing?: boolean;
}

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.primary[600]};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const FormTitle = styled.h2`
  margin: 0;
`;

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const genreOptions = [
  'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 
  'Jazz', 'Classical', 'Electronic', 'Folk', 'Reggae',
  'Blues', 'Metal', 'Punk', 'Soul', 'Alternative'
];

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  background-color: white;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[400]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[100]};
  }
`;

const SelectContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SelectLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const SongFormComponent: React.FC<SongFormComponentProps> = ({ song, isEditing = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<SongFormData>({
    title: '',
    artist: '',
    album: '',
    genre: 'Pop',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof SongFormData, string>>>({});
  
  useEffect(() => {
    if (isEditing && song) {
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album,
        genre: song.genre,
      });
    }
  }, [isEditing, song]);
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SongFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.artist.trim()) {
      newErrors.artist = 'Artist is required';
    }
    
    if (!formData.album.trim()) {
      newErrors.album = 'Album is required';
    }
    
    if (!formData.genre) {
      newErrors.genre = 'Genre is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is being edited
    if (errors[name as keyof SongFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (isEditing && song) {
      dispatch(updateSongRequest({ id: song._id, data: formData }));
    } else {
      dispatch(createSongRequest(formData));
    }
    
    navigate('/songs');
  };
  
  const handleBack = () => {
    navigate('/songs');
  };
  
  return (
    <FormContainer>
      <FormHeader>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={18} /> Back
        </BackButton>
        <FormTitle>{isEditing ? 'Edit Song' : 'Add New Song'}</FormTitle>
      </FormHeader>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter song title"
              error={errors.title}
            />
            
            <Input
              label="Artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              placeholder="Enter artist name"
              error={errors.artist}
            />
          </FormGroup>
          
          <FormGroup>
            <Input
              label="Album"
              name="album"
              value={formData.album}
              onChange={handleChange}
              placeholder="Enter album name"
              error={errors.album}
            />
            
            <SelectContainer>
              <SelectLabel htmlFor="genre">Genre</SelectLabel>
              <Select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              >
                {genreOptions.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Select>
              {errors.genre && <p>{errors.genre}</p>}
            </SelectContainer>
          </FormGroup>
          
          <FormActions>
            <Button 
              type="submit" 
              variant="primary"
              leftIcon={<Save size={16} />}
            >
              {isEditing ? 'Update Song' : 'Save Song'}
            </Button>
          </FormActions>
        </form>
      </Card>
    </FormContainer>
  );
};

export default SongFormComponent;