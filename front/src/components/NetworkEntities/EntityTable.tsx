import React from 'react';
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

export const EntityTable: React.FC<EntityTableProps> = ({
  entities,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  isLoading,
  onPageChange,
}) => {
  const { t } = useTranslation();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Card>
      <TableContainer component={Paper}>
        <Table sx={{ '& .MuiTableCell-root': { padding: '16px' } }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>{t('networkEntities.table.name')}</strong>
              </TableCell>
              <TableCell>
                <strong>{t('networkEntities.table.vat')}</strong>
              </TableCell>
              <TableCell>
                <strong>{t('networkEntities.table.code')}</strong>
              </TableCell>
              <TableCell>
                <strong>{t('networkEntities.table.location')}</strong>
              </TableCell>
              <TableCell>
                <strong>{t('networkEntities.table.type')}</strong>
              </TableCell>
              <TableCell>
                <strong>{t('networkEntities.table.status')}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.map((entity) => (
              <EntityTableRow key={entity.id} entity={entity} />
            ))}
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
                from: (currentPage - 1) * pageSize + 1,
                to: Math.min(currentPage * pageSize, totalCount),
                total: totalCount,
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

interface EntityTableRowProps {
  entity: SupplyNetworkEntityDto;
}

const EntityTableRow: React.FC<EntityTableRowProps> = ({ entity }) => (
  <TableRow
    hover
    sx={{
      '&:hover': {
        backgroundColor: 'action.hover',
        cursor: 'pointer',
      },
    }}
  >
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
);
