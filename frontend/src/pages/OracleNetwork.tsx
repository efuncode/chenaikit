import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Tabs, Tab, Paper, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import LiveSubmissionFeed from '../components/oracle/LiveSubmissionFeed';
import NodeReputationTable from '../components/oracle/NodeReputationTable';
import DisputeFiling from '../components/oracle/DisputeFiling';
import VarianceCharts from '../components/oracle/VarianceCharts';
import NetworkStats from '../components/oracle/NetworkStats';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`oracle-tabpanel-${index}`}
      aria-labelledby={`oracle-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `oracle-tab-${index}`,
    'aria-controls': `oracle-tabpanel-${index}`,
  };
}

const OracleNetwork: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('oracleNetwork.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('oracleNetwork.description')}
        </Typography>
      </Box>

      <NetworkStats />

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="oracle network tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label={t('oracleNetwork.tabs.liveFeed')} {...a11yProps(0)} />
          <Tab label={t('oracleNetwork.tabs.nodes')} {...a11yProps(1)} />
          <Tab label={t('oracleNetwork.tabs.disputes')} {...a11yProps(2)} />
          <Tab label={t('oracleNetwork.tabs.analytics')} {...a11yProps(3)} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <LiveSubmissionFeed />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <NodeReputationTable />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <DisputeFiling />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <VarianceCharts />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default OracleNetwork;
