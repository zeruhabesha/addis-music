import React from 'react';
import styled from '@emotion/styled';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import Card from '../ui/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface ChartItem {
  label: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  data: ChartItem[];
  type: 'bar' | 'pie' | 'doughnut';
  height?: number;
}

const ChartContainer = styled.div`
  height: ${({ height }: { height: number }) => `${height}px`};
  position: relative;
`;

const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-style: italic;
`;

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  data, 
  type, 
  height = 300 
}) => {
  if (!data || data.length === 0) {
    return (
      <Card title={title}>
        <ChartContainer height={height}>
          <NoDataMessage>No data available</NoDataMessage>
        </ChartContainer>
      </Card>
    );
  }
  
  // Generate colors for chart
  const generateColors = (count: number) => {
    const baseColors = [
      'rgba(79, 70, 229, 0.8)',  // primary
      'rgba(13, 148, 136, 0.8)', // secondary
      'rgba(245, 158, 11, 0.8)', // accent
      'rgba(34, 197, 94, 0.8)',  // success
      'rgba(239, 68, 68, 0.8)',  // error
      'rgba(79, 70, 229, 0.5)',  // primary light
      'rgba(13, 148, 136, 0.5)', // secondary light
      'rgba(245, 158, 11, 0.5)', // accent light
    ];
    
    // If we need more colors than we have in baseColors, we'll repeat them
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(baseColors[i % baseColors.length]);
    }
    
    return colors;
  };
  
  // Prepare chart data
  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);
  const backgroundColors = generateColors(data.length);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace(', 0.8)', ', 1)')),
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: type === 'bar' ? 'top' as const : 'right' as const,
      },
      title: {
        display: false,
      },
    },
  };
  
  // Render appropriate chart type
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'pie':
        return <Pie data={chartData} options={options} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={options} />;
      default:
        return <Bar data={chartData} options={options} />;
    }
  };
  
  return (
    <Card title={title}>
      <ChartContainer height={height}>
        {renderChart()}
      </ChartContainer>
    </Card>
  );
};

export default ChartCard;