import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, TablePagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Star, TrendingUp, TrendingDown } from '@mui/icons-material';

interface OracleNode {
  id: string;
  address: string;
  publicKey: string;
  stake: bigint;
  reputation: number;
  isActive: boolean;
  registeredAt: string;
  metadata: string;
}

const NodeReputationTable: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data: nodes, isLoading, error } = useQuery<OracleNode[]>({
    queryKey: ['oracle-nodes'],
    queryFn: async () => {
      const response = await fetch('/api/v2/oracle/nodes');
      if (!response.ok) throw new Error('Failed to fetch nodes');
      const result = await response.json();
      return result.data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-4)}`;
  };

  const formatStake = (stake: bigint) => {
    return (Number(stake) / 10_000_000).toFixed(2); // Convert stroops to XLM
  };

  const getReputationColor = (reputation: number) => {
    if (reputation >= 800) return 'success';
    if (reputation >= 500) return 'warning';
    return 'error';
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>{t('oracleNetwork.nodes.loading')}</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="body1" color="error">
          {t('oracleNetwork.nodes.errorLoading')}
        </Typography>
      </Box>
    );
  }

  const sortedNodes = nodes?.sort((a, b) => b.reputation - a.reputation) || [];
  const paginatedNodes = sortedNodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('oracleNetwork.nodes.title')}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('oracleNetwork.nodes.address')}</TableCell>
              <TableCell>{t('oracleNetwork.nodes.reputation')}</TableCell>
              <TableCell>{t('oracleNetwork.nodes.stake')}</TableCell>
              <TableCell>{t('oracleNetwork.nodes.status')}</TableCell>
              <TableCell>{t('oracleNetwork.nodes.registeredAt')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedNodes.map((node) => (
              <TableRow key={node.id} hover>
                <TableCell>
                  <Typography variant="body2" fontFamily="monospace">
                    {formatAddress(node.address)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star fontSize="small" color={getReputationColor(node.reputation) as any} />
                    <Typography variant="body2" fontWeight="medium">
                      {node.reputation}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatStake(node.stake)} XLM
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={node.isActive ? t('oracleNetwork.nodes.active') : t('oracleNetwork.nodes.inactive')}
                    size="small"
                    color={node.isActive ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(node.registeredAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedNodes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default NodeReputationTable;
