import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchSongRequest, clearCurrentSong } from '../store/slices/songsSlice';
import SongFormComponent from '../components/songs/SongFormComponent';

const SongForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { currentSong, loading } = useSelector((state: RootState) => state.songs);
  
  const isEditing = !!id;
  
  useEffect(() => {
    if (isEditing && id) {
      dispatch(fetchSongRequest(id));
    }
    
    return () => {
      dispatch(clearCurrentSong());
    };
  }, [dispatch, id, isEditing]);
  
  if (isEditing && loading) {
    return <div>Loading song details...</div>;
  }
  
  return (
    <SongFormComponent 
      song={currentSong} 
      isEditing={isEditing} 
    />
  );
};

export default SongForm;