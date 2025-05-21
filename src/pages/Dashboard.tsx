import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Music, User, Disc, Tag } from 'lucide-react';
import { RootState } from '../store';
import StatCard from '../components/statistics/StatCard';
import ChartCard from '../components/statistics/ChartCard';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Dashboard: React.FC = () => {
  const { data, loading } = useSelector((state: RootState) => state.statistics);
  
  if (loading || !data) {
    return <div>Loading statistics...</div>;
  }
  
  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      
      <StatsGrid>
        <StatCard 
          title="Total Songs" 
          value={data.totalSongs} 
          icon={<Music size={24} />} 
          color="primary"
          delay={0.1}
        />
        <StatCard 
          title="Total Artists" 
          value={data.totalArtists} 
          icon={<User size={24} />} 
          color="secondary"
          delay={0.2}
        />
        <StatCard 
          title="Total Albums" 
          value={data.totalAlbums} 
          icon={<Disc size={24} />} 
          color="accent"
          delay={0.3}
        />
        <StatCard 
          title="Total Genres" 
          value={data.totalGenres} 
          icon={<Tag size={24} />} 
          color="success"
          delay={0.4}
        />
      </StatsGrid>
      
      <ChartsGrid>
        <ChartCard 
          title="Songs by Genre" 
          data={data.songsPerGenre.map(item => ({ label: item.genre, value: item.count }))} 
          type="doughnut" 
        />
        <ChartCard 
          title="Songs per Artist" 
          data={data.songsPerArtist.map(item => ({ label: item.artist, value: item.count }))} 
          type="bar" 
        />
        <ChartCard 
          title="Albums per Artist" 
          data={data.albumsPerArtist.map(item => ({ label: item.artist, value: item.count }))} 
          type="bar" 
        />
        <ChartCard 
          title="Songs per Album" 
          data={data.songsPerAlbum.map(item => ({ label: item.album, value: item.count }))} 
          type="pie" 
        />
      </ChartsGrid>
    </DashboardContainer>
  );
};

export default Dashboard;