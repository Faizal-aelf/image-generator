/**
 * 
 * Prompt Generator Page component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {Box, Tabs, Tab, CustomTabPanel} from '@mui/material';
import {useState} from 'react';

// COMPONENT IMPORT
import {Container} from '../../atom';
import ListTraits from './components/listTraits';
import RandomGenerate from './components/randomGenerate';


// STYLE IMPORT
import useStyles from './styles';

const PromptGeneratorPage = () => {
  const classes = useStyles();
  
  // STATE VARIABLE
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  function tabAttr(index) {
    return {
      id: `generate-traits-tab-${index}`,
      'aria-controls': `generate-traits-tabpanel-${index}`,
    };
  }

  return (
    <Container> 
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="All traits" {...tabAttr(0)} />
          <Tab label="Generate Random Prompt" {...tabAttr(1)} />
        </Tabs>
      </Box>
      {selectedTab === 0 && <ListTraits/>}
      {selectedTab === 1 && <RandomGenerate/>}
    </Container>
  )
}

export default PromptGeneratorPage;