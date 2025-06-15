import React, { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, Text } from '@remira/unifiedui';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Pagination,
  CardContent,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SupplyNetworkEntityDto } from '../../types/supplyNetworkEntities';
import { EntityTypeChip, EntityStatusChip } from '../EntityChips';

export interface EntityTableProps {
  entities: SupplyNetworkEntityDto[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const EntityTable: React.FC<EntityTableProps> = ({
  entities,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  isLoading,
  onPageChange,
}) => {
  const { t } = useTranslation();

  // Memoized table headers to prevent recreation [PA]
  const tableHeaders = useMemo(() => [
    { key: 'legalName', label: t('networkEntities.table.name', 'Name') },
    { key: 'vatCode', label: t('networkEntities.table.vat', 'VAT') },
    { key: 'externalCode', label: t('networkEntities.table.code', 'Code') },
    { key: 'location', label: t('networkEntities.table.location', 'Location') },
    { key: 'entityType', label: t('networkEntities.table.type', 'Type') },
    { key: 'status', label: t('networkEntities.table.status', 'Status') },
  ], [t]);

  // Memoized pagination info [PA]
  const paginationInfo = useMemo(() => ({
    from: (currentPage - 1) * pageSize + 1,
    to: Math.min(currentPage * pageSize, totalCount),
    total: totalCount
  }), [currentPage, pageSize, totalCount]);

  // Memoized navigation handler [PA]
  const handleViewEntity = useCallback((entityId: string) => {
    // navigate(`/supply-network/${entityId}`);
  }, []);

  // Memoized pagination handlers [PA]
  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, newPage: number) => {
    onPageChange(newPage);
  }, [onPageChange]);

  // Memoized table rows to prevent unnecessary re-renders [PA]
  const tableRows = useMemo(() => {
    return entities.map((entity) => (
      <TableRow key={entity.id} hover>
        <TableCell>
          <Box>
            <Link
              to={`/supply-network/entity/${entity.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Text
                variant="body1"
                color="primary"
                sx={{
                  fontWeight: 'medium',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {entity.legalName}
              </Text>
            </Link>
            {entity.shortName && entity.shortName !== entity.legalName && (
              <Text variant="body2" color="textSecondary">
                {entity.shortName}
              </Text>
            )}
          </Box>
        </TableCell>
        
        <TableCell>
          <Text variant="body2" color="textSecondary">
            {entity.vatCode || '-'}
          </Text>
        </TableCell>
        
        <TableCell>
          <Text variant="body2" color="textSecondary">
            {entity.externalCode || '-'}
          </Text>
        </TableCell>
        
        <TableCell>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnIcon fontSize="small" color="action" />
            <Text variant="body2">
              {entity.city}, {entity.country}
            </Text>
          </Box>
        </TableCell>
        
        <TableCell>
          <EntityTypeChip
            entityType={entity.entityType}
            size="small"
            style="colorful"
          />
        </TableCell>
        
        <TableCell>
          <EntityStatusChip
            active={entity.active}
            size="small"
            style="colorful"
          />
        </TableCell>
      </TableRow>
    ));
  }, [entities, handleViewEntity, t]);

  return (
    <Card>
      <TableContainer component={Paper}>
        <Table sx={{ '& .MuiTableCell-root': { padding: '16px' } }}>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header.key}>
                  <Text variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {header.label}
                  </Text>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Text variant="body2" color="textSecondary">
              {t('networkEntities.pagination.showing', {
                from: paginationInfo.from,
                to: paginationInfo.to,
                total: paginationInfo.total,
              })}
            </Text>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              disabled={isLoading}
            />
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders [PA]
export default React.memo(EntityTable);
