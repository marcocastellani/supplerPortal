import React, { useState, useEffect, useCallback } from 'react';
import { Autocomplete, TextField, Box, Typography, CircularProgress, Chip } from '@mui/material';
import { SupplyNetworkEntitiesService } from '../../services/supplyNetworkEntitiesService';
import { SupplyNetworkEntitySearchResultDto, EntityType } from '../../types/supplyNetworkEntities';

// Simple debounce utility
function useDebounce<T extends any[]>(callback: (...args: T) => void, delay: number) {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

  const debouncedCallback = useCallback((...args: T) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);
    
    setDebounceTimer(newTimer);
  }, [callback, delay, debounceTimer]);

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}

interface EntitySelectorProps {
  label?: string;
  value?: SupplyNetworkEntitySearchResultDto | null;
  onChange: (entity: SupplyNetworkEntitySearchResultDto | null) => void;
  entityType?: EntityType;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}

export const EntitySelector: React.FC<EntitySelectorProps> = ({
  label = 'Select Parent Entity',
  value,
  onChange,
  entityType = EntityType.Supplier,
  disabled = false,
  error = false,
  helperText,
  placeholder = 'Type at least 3 characters to search...'
}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<SupplyNetworkEntitySearchResultDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Search function
  const performSearch = useCallback(async (searchTerm: string) => {
    if (searchTerm.length < 3) {
      setOptions([]);
      setNoResults(false);
      return;
    }

    setLoading(true);
    try {
      const results = await SupplyNetworkEntitiesService.searchSupplyNetworkEntities({
        searchTerm,
        entityType,
        maxResults: 15,
        activeOnly: true
      });
      
      setOptions(results);
      setNoResults(results.length === 0);
    } catch (error) {
      console.error('Search failed:', error);
      setOptions([]);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  }, [entityType]);

  // Debounced search function
  const debouncedSearch = useDebounce(performSearch, 300);

  // Trigger search when input changes
  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  // Clear options when input is too short
  useEffect(() => {
    if (inputValue.length < 3) {
      setOptions([]);
      setNoResults(false);
    }
  }, [inputValue]);

  const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  const handleValueChange = (event: React.SyntheticEvent, newValue: SupplyNetworkEntitySearchResultDto | null) => {
    onChange(newValue);
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleValueChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={(option) => option.displayText || option.legalName}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={loading}
      disabled={disabled}
      noOptionsText={
        inputValue.length < 3 
          ? 'Type at least 3 characters to search'
          : noResults 
            ? 'No entities found'
            : 'Start typing to search...'
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography variant="body1" component="div" sx={{ fontWeight: 500 }}>
              {option.legalName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              {option.externalCode && (
                <Chip 
                  label={`Code: ${option.externalCode}`} 
                  size="small" 
                  variant="outlined"
                  sx={{ fontSize: '0.75rem', height: '20px' }}
                />
              )}
              {option.vatCode && (
                <Chip 
                  label={`VAT: ${option.vatCode}`} 
                  size="small" 
                  variant="outlined"
                  sx={{ fontSize: '0.75rem', height: '20px' }}
                />
              )}
              {option.city && (
                <Chip 
                  label={`📍 ${option.city}${option.country ? `, ${option.country}` : ''}`} 
                  size="small" 
                  variant="outlined"
                  sx={{ fontSize: '0.75rem', height: '20px' }}
                />
              )}
              <Chip 
                label={option.entityType} 
                size="small" 
                color="primary"
                sx={{ fontSize: '0.75rem', height: '20px' }}
              />
            </Box>
          </Box>
        </Box>
      )}
      sx={{
        minWidth: 300,
        '& .MuiAutocomplete-listbox': {
          maxHeight: '300px'
        }
      }}
    />
  );
};

export default EntitySelector;
