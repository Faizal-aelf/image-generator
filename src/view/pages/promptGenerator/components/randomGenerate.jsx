/**
 * 
 * Prompt Generator Page component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {Box, Button, TextField, Chip} from '@mui/material';
import {useState} from 'react';
import { saveAs } from "file-saver";

// COMPONENT IMPORT
import {Loader} from '../../../atom';
import {promptItems} from '../constants';
import {generateRandomCombinations} from '../utils';

// STYLE IMPORT
import useStyles from '../styles';

const RandomGenerator = () => {
    const classes = useStyles();
  
    // STATE VARIABLE
    const [isLoading, setLoading] = useState(false);
    const [basePromptMessage, setBasePromptMessage] = useState("Make sure there's only cat in the image. Keep the style of the image as per the image input. Keep the image clean. Keep all the characteristics. A cat wearing a %hat% cap, %mouth%, sporting a %clothes%, and having %eyes% eyes, while wearing %shoes%. The cat should be accompanied by a %pets% companion.");
    const [totalGeneration, setTotalGeneration] = useState(1000);
    const [totalTraits, setTotalTraits] = useState(6);
    const [messageList, setMessageList] = useState([]);
    const traitsKey = ['%hat%', '%mouth%', '%clothes%', '%eyes%', '%shoes%', '%pets%'];
    const [limitedTraitsKey, setLimitedTraitsKey] = useState(['hat', 'mouth', 'clothes', 'eyes', 'shoes', 'pets']);
    
    const handleCopy = () => {
        setLoading(true);
        navigator.clipboard.writeText(messageList);
        setLoading(false);
    };

    const handleDownload = () => {
        const json = messageList.split("\n\n");
        const file = new File([JSON.stringify(json)], "prompts.json", {
            type: "application/json;charset=utf-8",
        });
        saveAs(file);
    };

    const handleGeneratePrompts = async () => {
        if (limitedTraitsKey.length != totalTraits) {
            alert(`You need to select ${totalTraits} traits, but u selected only ${limitedTraitsKey.length} before generating the prompt message.`)
            return;
        }
        setLoading(true);
        var finalArray  = promptItems.map(item => item.values.map(trait => ({id: item.id, value: trait})));
        const combineArray = await generateRandomCombinations(finalArray, 1000);
        const output = await combineArray.map(item => item).map(item => {
            const generatedMessage  = selectedTraits(item).reduce((acc, cur) => {
                return acc.replace(RegExp(`%${cur.id}%`, "g"), cur.value);
            }, basePromptMessage);
            return generatedMessage;
        });
        setMessageList(output.join("\n\n\n"));
        setLoading(false);
    };

    const selectedTraits = (item) => {
        return item.filter(item => limitedTraitsKey.includes(item.id));
    };

    const isSelected = (id) => {
        return limitedTraitsKey.includes(id.replace(/%/g, ''))
    }

    const checkAddTraits = (id) => {
        if (!isSelected(id)) {
            setLimitedTraitsKey((prevList => [...prevList, id.replace(/%/g, '')]));
        } else {
            const updatedList = limitedTraitsKey.filter(item => item !== id.replace(/%/g, ''));
            setLimitedTraitsKey(updatedList);
        }
      }

    return (
        <> 
            { isLoading && <Loader/>} <br/><br/>
            {limitedTraitsKey.map(item => <>{item}, </>)}
            {traitsKey.map((item) => <Chip color="primary" label={item} className={classes.chipItem} 
            key={`${item}-selected-traits`} size='small' variant={isSelected(item) ? 'filled' : "outlined"}
            onClick={() => checkAddTraits(item)} {...(isSelected(item) && { onDelete: () => checkAddTraits(item)})}/>)}<br/><br/>
            <TextField  label="Format" variant="outlined" fullwidth value={basePromptMessage} 
                multiline maxRows={5} className={classes.formTextfield} 
                onChange={(event) => setBasePromptMessage(event.target.value)}/>
            <TextField  label="Number of generations" variant="outlined" 
                fullwidth value={totalGeneration} className={classes.formTextfield} 
                type='number' onChange={(event) => setTotalGeneration(event.target.value)}/>
            <TextField  label="Number of traits" variant="outlined" 
                fullwidth value={totalTraits} className={classes.formTextfield} 
                type='number' onChange={(event) => setTotalTraits(event.target.value)} inputProps={{min: "1", max: "6"}}/>
            <Box className={classes.btnContainer} textAlign='right'>
                <Button variant="outlined" onClick={() => handleDownload()} disabled={!messageList.length}>Download JSON</Button>
                <Button variant="outlined" onClick={() => handleCopy()}  disabled={!messageList.length}>Copy</Button>
                <Button variant="contained" onClick={() => handleGeneratePrompts()}>Generate Prompts</Button>
            </Box>  
            {messageList.length > 0 && <TextField  label="Output" variant="outlined" fullwidth value={messageList} 
                multiline maxRows={15} className={classes.formTextfield} disabled/>}
        </>
    )
}

export default RandomGenerator;