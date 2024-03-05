/**
 * 
 * Prompt Generator Page component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {Box, Button, Chip, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, ButtonGroup} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from 'react';
import axios from 'axios';

// COMPONENT IMPORT
import {Container} from '../../../atom';
import PageHeader from '../../common/header/pageHeader';
import {promptItems} from '../constants';
import {generatePermutations} from '../utils';

// API
import {GENERATE_IMAGE_API} from '../../../../api/constants';

// STYLE IMPORT
import useStyles from '../styles';

const ListTraits = () => {
  const classes = useStyles();
  
  // STATE VARIABLE
  const [isLoading, setLoading] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [finalMessage, setFinalMessage] = useState();
  const [generatedImage, setGeneratedImage] = useState();
  const [messageList, setMessageList] = useState([]);
  const [basePromptMessage, setBasePromptMessage] = useState("Make sure there's only cat in the image. Keep the style of the image as per the image input. Keep the image clean. Keep all the characteristics.");
  
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

  const handleGeneratePrompts = () => {
    setLoading(true);
    const message = selectedTraits.map(item => pickupMessage(item.value, item.id));
    message.unshift(basePromptMessage);
    setFinalMessage(message.join(", "));
    setLoading(false);
  }

  const pickupMessage = (value, id) => {
    switch (id) {
      case 'hat': {
        return `The cat wearing ${value} hat`
      }
      case 'accessory': {
        return `The cat wearing ${value} accessory`
      }
      case 'breed': {
        return `The cat is ${value} breed`
      }
      case 'clothes': {
        return `The cat wearing ${value} clothes`
      }
      case 'eyes': {
        return `The cat have ${value} eyes`
      }
      case 'mouth': {
        return `The cat have ${value} mouth`
      }
      case 'pets': {
        return `The cat have ${value} pets`
      }
      case 'shoes': {
        return `The cat wearing ${value} shoe`
      }
      case 'type': {
        return `The cat is ${value} type`
      }
      case 'weapon': {
        return `The cat have ${value} weapon`
      }
    }
    const output = `Make sure there's only cat in the image. 
    Keep the style of the image as per the image input. 
    Keep the image clean. Keep all the characteristics: 
    A cat wearing a baseball cap, chuckling, sporting a tee with a bone print, 
    and having angry eyes, while wearing combat boots. 
    The cat should be accompanied by a baby fairy companion.`;
  }

  const pickupMessage1 = (outputList) => {
    const hat = outputList.filter(item => item.id == 'hat').map(item => item.value);
    const accessory = outputList.filter(item => item.id == 'accessory').map(item => item.value);
    // const breed = outputList.filter(item => item.id == 'breed').map(item => item.value);
    const clothes = outputList.filter(item => item.id == 'clothes').map(item => item.value);
    const eyes = outputList.filter(item => item.id == 'eyes').map(item => item.value);
    const mouth = outputList.filter(item => item.id == 'mouth').map(item => item.value);
    const pets = outputList.filter(item => item.id == 'pets').map(item => item.value);
    const shoes = outputList.filter(item => item.id == 'shoes').map(item => item.value);
    const type = outputList.filter(item => item.id == 'type').map(item => item.value);
    // const weapon = outputList.filter(item => item.id == 'weapon').map(item => item.value);
    const output = [`A cat wearing a ${hat} cap, ${mouth}, sporting a ${clothes}, 
    and having ${eyes} eyes, while wearing ${shoes}. 
    The cat should be accompanied by a ${pets} companion.`];
    return output;
  }

  const generateImage = async () => {
    var finalArray  = promptItems.map(item => item.values.map(trait => ({id: item.id, value: trait})));
    console.log(finalArray);
    const combineArray = generatePermutations(finalArray);
    console.log(combineArray)
      const output = combineArray.map(traits =>  {
      const message = pickupMessage1(traits);
      message.unshift(basePromptMessage);
      return message.join(", ")
    });
    setMessageList(output);
    console.log(output)
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
    <Container> 
      <PageHeader title='All traits' subtitle="Here's what you're looking at" {...{isLoading}}></PageHeader>
      <TextField  label="Basic message" variant="outlined" 
        fullwidth value={basePromptMessage} disabled
        multiline maxRows={5} className={classes.formTextfield}/>
      {finalMessage && <TextField  label="Generated message" variant="outlined" 
        fullwidth value={finalMessage}
        multiline maxRows={5} className={classes.formTextfield}/>}
      {selectedTraits.length > 0 && <Typography variant="h6" gutterBottom>Selected Traits</Typography>}
      {selectedTraits.map((item) => <Chip color="primary" onDelete={() => removeTraits(item.value, item.id)} label={item.value} className={classes.chipItem} key={`${item.value}-selected-traits`} />)}
      <br/><br/>
      
      <Box className={classes.btnContainer} textAlign='right'>
        <ButtonGroup variant="contained">
          <Button variant="outlined" onClick={() => generateImage()}>Generate Image</Button>
          <Button variant="contained" onClick={() => handleGeneratePrompts()} disabled={!selectedTraits.length}>Generate Prompts</Button>
        </ButtonGroup>
      </Box>

      {messageList.length > 0 && (
        <List>
            {messageList.map(item => (
              <ListItem className={classes.itemItem}>
                <ListItemText
                  primary={item}
                />
              </ListItem>
            ))}
          </List>
      )}

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
      
    </Container>
  )
}

export default ListTraits;