/**
 * 
 * Output file component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import { useState } from 'react';
import {Lightbox} from "react-modal-image";
import moment from 'moment';
import {AccordionDetails, Box, Accordion, AccordionSummary, ToggleButton, ToggleButtonGroup, Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// COMMON COMPONENT
import {Container} from '../../atom';
import {CardImage} from '../../molecules';
import PageHeader from '../common/header/pageHeader';
import ImageModal from './component/imageModal';
import {copyTable} from '../../../utils/file';

// JSON DATA
import DataJSON1 from './data/1.json';
import DataJSON2 from './data/2.json';
import DataJSON3 from './data/3.json';
import DataJSON4 from './data/4.json';
import DataJSON5 from './data/5.json';
import DataJSON6 from './data/6.json';
import DataJSON7 from './data/7.json';
import DataJSON8 from './data/8.json';
import DataJSON9 from './data/9.json';
import DataJSON10 from './data/10.json';
import DataJSON11 from './data/11.json';
// 
// STYLE IMPORT
import useStyles from './styles';

const OutputPage = () => {
  // DECLARE STYLE
  const classes = useStyles();

  // STATE VARIABLE
  const [dataList, setDataList] = useState([DataJSON1, DataJSON2, DataJSON3, DataJSON4, DataJSON5, DataJSON6, DataJSON7, DataJSON8, DataJSON9, DataJSON10]);
  const [isLoading, setLoading] = useState(false);
  const [displayDefaultFormat, setDisplayDefaultFormat] = useState('default');
  const [imageModal, setImageModal] = useState({
    src: null,
    isOpen: false,
    content: ''
  });

  // HANDLE IMAGE MODAL STATE
  const handleImageModal = (src) => {

    setImageModal({...imageModal, src, isOpen: true});
  }

  // HANDLE IMAGE MODAL CLOSE
  const onCloseModal = () => {
    setImageModal({src: null, isOpen: false});
  }

  const handleAlignment = (event, newDisplayFormat) => {
    setDisplayDefaultFormat(newDisplayFormat);
  }

  

  return (
    <Container>
      <PageHeader title='Generated Output' subtitle="Here's what you're looking at"  {...{isLoading}}></PageHeader>
      <Box className={classes.container}>
        {dataList.map((item, index) => (
          <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionTitle}>
              {item.title}: {moment(item.date, 'DD-MM-YYYY').format('MMMM Do YYYY')}
            </AccordionSummary>
            <AccordionDetails>
              <Box display='flex'>
                <Box className={classes.displayFormatContainer}>
                  <ToggleButtonGroup
                  value={displayDefaultFormat}
                  exclusive
                  onChange={handleAlignment}
                  color='primary'
                  >
                    <ToggleButton value="default" aria-label="left aligned">
                      <i class="fa fa-address-card-o" ></i>
                    </ToggleButton>
                    <ToggleButton value="table" aria-label="centered">
                      <i class="fa fa-table"></i>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>

              {displayDefaultFormat == 'default' ? <ul className={classes.datalist}>
              {item.output.map((dataItem) => (
                <li className={classes.dataListItem}>
                  <CardImage file={
                    {
                      imageSrc: dataItem.image_url,
                      handleImageModal: handleImageModal,
                    }
                  }/>
                  <Box className={classes.title} marginTop={0.5}>{dataItem.prompt}&nbsp;<i className={clsx("fa fa-clone", classes.copyIcon)} onClick={() => navigator.clipboard.writeText(dataItem.prompt)}></i></Box>
                </li>
              ))}
              </ul> : 
              <table border={1} width='100%' id={`table-${index}`}>
                <tbody>
              {item.output.map((dataItem, index) => (
                <tr>
                  <td align='center' valign='center'>{index + 1}</td>
                  <td width='200'>
                    <CardImage file={
                      {
                        imageSrc: dataItem.image_url,
                        handleImageModal: handleImageModal,
                        imageSize: '200px'
                      }
                    }/>
                    </td>
                    <td>
                    <Box className={classes.title}>{dataItem.prompt}&nbsp;<i className={clsx("fa fa-clone", classes.copyIcon)} onClick={() => navigator.clipboard.writeText(dataItem.prompt)}></i></Box>
                  </td>
                </tr>
              ))}
              </tbody>
              </table>}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      {imageModal.isOpen && 
      <Lightbox
          small={imageModal.src}
          large={imageModal.src}
          onClose={() => onCloseModal()}
        />}
    </Container>
  );
};

export default OutputPage;
// {...(index == 0 && { defaultExpanded: true})}
