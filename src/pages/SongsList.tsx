import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import { RootState } from '../store';
import Button from '../components/ui/Button';
import SongCard from '../components/songs/SongCard';
import { Song } from '../types';

const SongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  background-color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

const FilterLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  
  h3 {
    margin: ${({ theme }) => `${theme.spacing.md} 0 ${theme.spacing.sm}`};
    color: ${({ theme }) => theme.colors.gray[800]};
  }
  
  p {
    color: ${({ theme }) => theme.colors.gray[600]};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const SongsList: React.FC = () => {
  const navigate = useNavigate();
  const { songs, loading } = useSelector((state: RootState) => state.songs);
  
  const [genreFilter, setGenreFilter] = useState('all');
  const [artistFilter, setArtistFilter] = useState('all');
  
  // Extract unique genres and artists for filters
  const genres = [...new Set(songs.map(song => song.genre))];
  const artists = [...new Set(songs.map(song => song.artist))];
  
  // Apply filters
  const filteredSongs = songs.filter(song => {
    const matchesGenre = genreFilter === 'all' || song.genre === genreFilter;
    const matchesArtist = artistFilter === 'all' || song.artist === artistFilter;
    return matchesGenre && matchesArtist;
  });
  
  const handleAddSong = () => {
    navigate('/songs/new');
  };
  
  if (loading) {
    return <div>Loading songs...</div>;
  }
  
  return (
    <SongsContainer>
      <HeaderRow>
        <h1>Songs</h1>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={handleAddSong}
        >
          Add Song
        </Button>
      </HeaderRow>
      
      <FiltersContainer>
        <Filter size={16} />
        <div>
          <FilterLabel htmlFor="genre-filter">Genre:</FilterLabel>
          <FilterSelect
            id="genre-filter"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="all">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </FilterSelect>
        </div>
        
        <div>
          <FilterLabel htmlFor="artist-filter">Artist:</FilterLabel>
          <FilterSelect
            id="artist-filter"
            value={artistFilter}
            onChange={(e) => setArtistFilter(e.target.value)}
          >
            <option value="all">All Artists</option>
            {artists.map(artist => (
              <option key={artist} value={artist}>{artist}</option>
            ))}
          </FilterSelect>
        </div>
      </FiltersContainer>
      
      {filteredSongs.length === 0 ? (
        <EmptyState>
          {songs.length === 0 ? (
            <>
              <h3>No songs found</h3>
              <p>Start by adding your first song to the catalog.</p>
              <Button
                variant="primary"
                leftIcon={<Plus size={16} />}
                onClick={handleAddSong}
              >
                Add Your First Song
              </Button>
            </>
          ) : (
            <>
              <h3>No songs match the selected filters</h3>
              <p>Try adjusting your filters to see more results.</p>
            </>
          )}
        </EmptyState>
      ) : (
        <SongsGrid>
          {filteredSongs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </SongsGrid>
      )}
    </SongsContainer>
  );
};

export default SongsList;