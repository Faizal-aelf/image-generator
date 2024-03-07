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
import moment from 'moment';
import {AccordionDetails, Box, Accordion, AccordionSummary} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// COMMON COMPONENT
import {Container} from '../../atom';
import {CardImage} from '../../molecules';
import PageHeader from '../common/header/pageHeader';
import ImageModal from './component/imageModal';

// JSON DATA
import DataJSON1 from './data/1.json';
import DataJSON2 from './data/2.json';
/*import DataJSON1 from './data/1.json';
import DataJSON1 from './data/1.json';
import DataJSON1 from './data/1.json';
import DataJSON1 from './data/1.json';
import DataJSON1 from './data/1.json';
import DataJSON1 from './data/1.json';
import DataJSON1 from './data/1.json'; */

// STYLE IMPORT
import useStyles from './styles';

const OutputPage = () => {
  // DECLARE STYLE
  const classes = useStyles();

  // STATE VARIABLE
  const [dataList, setDataList] = useState([DataJSON1, DataJSON2]);
  const [isLoading, setLoading] = useState(false);
  const [imageModal, setImageModal] = useState({
    src: null,
    isOpen: false,
  });

  // HANDLE IMAGE MODAL STATE
  const handleImageModal = (src) => {
    setImageModal({...imageModal, src, isOpen: true});
  }

  // HANDLE IMAGE MODAL CLOSE
  const onCloseModal = () => {
    setImageModal({src: null, isOpen: false});
  }

  return (
    <Container>
      <PageHeader title='Generated Output' subtitle="Here's what you're looking at"  {...{isLoading}}></PageHeader>
      <Box className={classes.container}>
        {dataList.map((item, index) => (
          <Accordion {...(index == 0 && { defaultExpanded: true})}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionTitle}>{item.title}: {moment(item.date, 'DD-MM-YYYY').format('MMMM Do YYYY')}</AccordionSummary>
            <AccordionDetails>
              <ul className={classes.datalist}>
              {item.output.map((dataItem) => (
                <li className={classes.dataListItem}>
                  <CardImage file={
                    {
                      imageSrc: dataItem.image_url,
                      handleImageModal: handleImageModal,
                    }
                  }/>
                  <Box className={classes.title}>{dataItem.prompt}&nbsp;<i className={clsx("fa fa-clone", classes.copyIcon)} onClick={() => navigator.clipboard.writeText(dataItem.prompt)}></i></Box>
                </li>
              ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      {imageModal.isOpen && <ImageModal
        imageSource={imageModal.src}
        onClose={() => onCloseModal()}
      />}
    </Container>
  );
};

export default OutputPage;