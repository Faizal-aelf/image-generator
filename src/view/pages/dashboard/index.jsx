/**
 * 
 * Dashboard component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {Box} from '@mui/material';

// COMPONENT IMPORT
import PageHeader from '../common/header/pageHeader';

// STYLE IMPORT
// import useStyles from './styles';

const DashboardPage = () => {
  // const classes = useStyles();
  
  return (
    <Box> 
      <PageHeader title='Welcome Back, Aelf!' subtitle="Here's what you're looking at"></PageHeader>
    </Box>
  )
}

export default DashboardPage;