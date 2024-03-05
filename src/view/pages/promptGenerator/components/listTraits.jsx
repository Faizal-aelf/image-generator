/**
 * 
 * Prompt Generator Page component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {Box, Button, Chip, Accordion, AccordionSummary, AccordionDetails, TextField, Alert, Tooltip} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from 'react';
import axios from 'axios';

// COMPONENT IMPORT
import {Loader} from '../../../atom';
import {promptItems} from '../constants';

// API
import {GENERATE_IMAGE_API} from '../../../../api/constants';

// STYLE IMPORT
import useStyles from '../styles';

const ListTraits = () => {
  const classes = useStyles();
  
  // STATE VARIABLE
  const [isLoading, setLoading] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [generatedMessage, setGeneratedMessage] = useState();
  const [generatedImage, setGeneratedImage] = useState();
  const [basePromptMessage, setBasePromptMessage] = useState("Make sure there's only cat in the image. Keep the style of the image as per the image input. Keep the image clean. Keep all the characteristics. A cat wearing a %hat% cap, %mouth%, sporting a %clothes%, and having %eyes% eyes, while wearing %shoes%. The cat should be accompanied by a %pets% companion.");
  const traitsKey = ['%hat%', '%mouth%', '%clothes%', '%eyes%', '%shoes%', '%pets%'];
    
  const checkAddTraits = (value, id) => {
    if (isSameCategory(id)) {
      alert("Please select from different category, You have already selected one item from here.");
      return;
    }
    if (!isExists(value, id)) {
      setSelectedTraits((prevList => [...prevList, {value, id}]));
    } else {
      const updatedList = selectedTraits.filter(item => !(item.value == value && item.id == id));
      setSelectedTraits(updatedList);
    }
  }

  const isSameCategory = (id) => {
    return selectedTraits.some(item => item.id == id)
  }

  const removeTraits = (value, id) => {
    const updatedList = selectedTraits.filter(item => !(item.value == value && item.id == id));
      setSelectedTraits(updatedList);
  }

  const isExists = (value, id) => {
    return selectedTraits.some(item => item.value == value && item.id == id)
  }

  const handleGeneratePrompts = async () => {
    setLoading(true);
    const output = await selectedTraits.reduce((acc, cur) => {
            return acc.replace(RegExp(`%${cur.id}%`, "g"), cur.value);
        }, basePromptMessage);
    setGeneratedMessage(output);
    setLoading(false);
  }

  const generateImage = async () => {
    /* const params = {
      seed:"423432543545",
      newTrait: {
          "name": "mouth",
          "value": "wide open"
      },
      baseImage: {
          image: "",
          traits: [
            selectedTraits.map(item => ({name: item.id, value: item.value}))
          ]
      }
    }
    try {
        const response = await axios.post(
            GENERATE_IMAGE_API,
                {
                    ...params
                },
                {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response.data);
        setGeneratedImage(response.data);
    } catch (error) {
        console.error('Error generating prompts:', error);
        setGeneratedImage();
        setLoading(true);
    } finally {
        console.log("Finally: ");
        setLoading(false);
    } */
  }

  return (
    <> 
        { isLoading && <Loader/>} <br/>
        <Alert severity="info">Please select six traits from the list to proceed with generating your message.</Alert><br/>
        {traitsKey.map((item) => <Chip color="primary" label={item} className={classes.chipItem} key={`${item}-selected-traits`} size='small' />)}<br/><br/>
        <TextField  label="Format" variant="outlined" 
            fullwidth value={basePromptMessage} disabled
            multiline maxRows={5} className={classes.formTextfield}
            onChange={(event) => setBasePromptMessage(event.target.value)}/>
        {generatedMessage && <TextField  label="Generated message" variant="outlined" 
            fullwidth value={generatedMessage}
            multiline maxRows={5} className={classes.formTextfield}
            onChange={(event) => setGeneratedMessage(event.target.value)}/>}
        {selectedTraits.map((item) => <Chip color="primary" onDelete={() => removeTraits(item.value, item.id)} label={item.value} className={classes.chipItem} key={`${item.value}-selected-traits`} />)}
        <br/>
        <Box className={classes.btnContainer} textAlign='right'>
            <Tooltip title="API not yet ready" arrow style={{ backgroundColor: 'transparent' }}>
                <Box component={'span'}><Button variant="outlined" onClick={() => generateImage()} disabled>Generate Image</Button></Box>
            </Tooltip>
            <Tooltip title={selectedTraits.length != 6 ? "You can generate message only if you select 6 traits from the below list.": ''} arrow style={{ backgroundColor: 'transparent' }}>
                <Box component={'span'}><Button variant="contained" onClick={() => handleGeneratePrompts()} disabled={selectedTraits.length != 6}>Generate Prompts</Button></Box>
            </Tooltip>
        </Box>

        {promptItems.map(item => (
            <Accordion key={item.id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-content-${item.id}`}
                id={`panel-header-${item.id}`}
            >
                {item.title}
            </AccordionSummary>
            <AccordionDetails>
            {item.values.map((trait, index) => (
                <Chip color="primary" onClick={() => checkAddTraits(trait, item.id)} label={trait} 
                variant={isExists(trait, item.id) ? 'filled' : "outlined"} className={classes.chipItem} key={`${trait}-${item.id}-${index}`} 
                {...(isExists(trait, item.id) && { onDelete: () => removeTraits(trait, item.id)})} />
                ))}
            </AccordionDetails>
            </Accordion>
        ))}
    </>
  )
}

export default ListTraits;