/**
 * 
 * Help Page component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {useState, useEffect} from 'react';

// COMPONENT IMPORT
import PageHeader from '../common/header/pageHeader';
import {Empty} from '../../atom';

// STYLE IMPORT
// import useStyles from './styles';

const HelpPage = () => {
  // const classes = useStyles();
  // STATE VARIABLE
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
    setTimeout(setLoading(false), 1000);
  })
  return (
    <> 
      <PageHeader title='Help' subtitle="Quick assistance for all your queries and concerns. Get help now!" {...{isLoading}}></PageHeader>
      <Empty 
        title='Coming soon...' 
        subtitle='Please visit some other time.' 
        icon={<i className="fa fa-ban"></i>}/>
    </>
  )
}

export default HelpPage;