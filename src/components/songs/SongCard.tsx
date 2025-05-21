import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Edit, Trash, Music } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Song } from '../../types';
import { deleteSongRequest } from '../../store/slices/songsSlice';
import Card from '../ui/Card';

interface SongCardProps {
  song: Song;
}

const SongCardWrapper = styled(motion.div)`
  height: 100%;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[600]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SongTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const SongInfo = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const SongMeta = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const GenreTag = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.secondary[100]};
  color: ${({ theme }) => theme.colors.secondary[700]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Actions = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.lg};
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, variant }) => 
    variant === 'delete' ? theme.colors.error[100] : 
    variant === 'edit' ? theme.colors.primary[100] : 
    'transparent'};
  color: ${({ theme, variant }) => 
    variant === 'delete' ? theme.colors.error[600] : 
    variant === 'edit' ? theme.colors.primary[600] : 
    theme.colors.gray[600]};
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme, variant }) => 
      variant === 'delete' ? theme.colors.error[200] : 
      variant === 'edit' ? theme.colors.primary[200] : 
      theme.colors.gray[100]};
  }
`;

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/songs/edit/${song._id}`);
  };
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${song.title}"?`)) {
      dispatch(deleteSongRequest(song._id));
    }
  };
  
  // Format date from ISO string
  const formattedDate = new Date(song.createdAt).toLocaleDateString();
  
  return (
    <SongCardWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card hoverable>
        <CardContent>
          <SongIcon>
            <Music size={20} />
          </SongIcon>
          <SongTitle>{song.title}</SongTitle>
          <SongInfo>by {song.artist}</SongInfo>
          <SongMeta>Album: {song.album}</SongMeta>
          <GenreTag>{song.genre}</GenreTag>
          
          <Actions>
            <ActionButton variant="edit" onClick={handleEdit} aria-label="Edit">
              <Edit size={16} />
            </ActionButton>
            <ActionButton variant="delete" onClick={handleDelete} aria-label="Delete">
              <Trash size={16} />
            </ActionButton>
          </Actions>
        </CardContent>
      </Card>
    </SongCardWrapper>
  );
};

export default SongCard;