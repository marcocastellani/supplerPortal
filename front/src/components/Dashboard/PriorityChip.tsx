import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import { AccessTime, Warning, Error, CheckCircle } from '@mui/icons-material';

interface PriorityChipProps extends Omit<ChipProps, 'color'> {
  daysToDeadline: number;
  isOverdue: boolean;
}

export const PriorityChip: React.FC<PriorityChipProps> = ({ 
  daysToDeadline, 
  isOverdue, 
  ...props 
}) => {
  const getPriorityConfig = () => {
    if (isOverdue) {
      return {
        color: '#d32f2f',
        bg: '#ffebee',
        label: 'Overdue',
        icon: <Error sx={{ fontSize: 14 }} />,
      };
    }
    
    if (daysToDeadline <= 2) {
      return {
        color: '#d32f2f',
        bg: '#ffebee',
        label: 'Critical',
        icon: <Error sx={{ fontSize: 14 }} />,
      };
    }
    
    if (daysToDeadline <= 7) {
      return {
        color: '#f57c00',
        bg: '#fff3e0',
        label: 'High',
        icon: <Warning sx={{ fontSize: 14 }} />,
      };
    }
    
    if (daysToDeadline <= 14) {
      return {
        color: '#fbc02d',
        bg: '#fffde7',
        label: 'Medium',
        icon: <AccessTime sx={{ fontSize: 14 }} />,
      };
    }
    
    return {
      color: '#388e3c',
      bg: '#e8f5e8',
      label: 'Low',
      icon: <CheckCircle sx={{ fontSize: 14 }} />,
    };
  };

  const config = getPriorityConfig();

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      size="small"
      sx={{
        backgroundColor: config.bg,
        color: config.color,
        fontWeight: 500,
        fontSize: '0.75rem',
        '& .MuiChip-label': {
          px: 1,
        },
        '& .MuiChip-icon': {
          color: config.color,
        },
      }}
      {...props}
    />
  );
};
