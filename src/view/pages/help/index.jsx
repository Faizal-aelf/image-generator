/**
 * 
 * Help Page component
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

const HelpPage = () => {
  // const classes = useStyles();
  
  return (
    <Box> 
      <PageHeader title='Help' subtitle="Quick assistance for all your queries and concerns. Get help now!"></PageHeader>
    </Box>
  )
}

export default HelpPage;