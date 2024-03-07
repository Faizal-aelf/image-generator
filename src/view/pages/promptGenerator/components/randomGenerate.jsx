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
import {defaultTraitsKey} from '../constants';

// STYLE IMPORT
import useStyles from '../styles';

const RandomGenerator = () => {
    const classes = useStyles();
  
    // STATE VARIABLE
    // Make sure there's only cat in the image. Keep the style of the image as per the image input. Keep the image clean. Keep all the characteristics. A cat wearing a %hat% cap, %necklace%, sporting a %clothes%, and having %eyes% eyes. The cat should be accompanied by a %pets% companion.
    const [isLoading, setLoading] = useState(false);
    const [basePromptMessage, setBasePromptMessage] = useState("Generate the cat image with following traits: %clothes%, Picture of a cat with %eyes% on the eyes, %necklace% around the neck, %hat% above the head, %mouth%.");
    const [totalGeneration, setTotalGeneration] = useState(20);
    const [totalTraits, setTotalTraits] = useState(defaultTraitsKey.length);
    const [messageList, setMessageList] = useState([]);
    const traitsKey = defaultTraitsKey.map(item => `%${item}%`);
    const [limitedTraitsKey, setLimitedTraitsKey] = useState(defaultTraitsKey);
    const [generatedImage, setGeneratedImages] = useState([]);
    
    const handleCopy = () => {
        setLoading(true);
        navigator.clipboard.writeText(messageList);
        setLoading(false);
    };

    const handleDownload = () => {
        const json = messageList.split("\n");
        navigator.clipboard.writeText([JSON.stringify(json)]);
        
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
        if (!isTraitsAvailable()) {
            return;
        }
        setLoading(true);
        var finalArray  = promptItems.map(item => item.values.map(trait => ({id: item.id, value: trait})));
        const combineArray = await generateRandomCombinations(finalArray, totalGeneration);
        const output = await combineArray.map(item => item).map(item => {
            const generatedMessage  = selectedTraits(item).reduce((acc, cur) => {
                return acc.replace(RegExp(`%${cur.id}%`, "g"), cur.value);
            }, basePromptMessage);
            return generatedMessage;
        });
        setMessageList(output.join("\n"));
        setLoading(false);
        return output.join("\n\n\n");
    };

    const selectedTraits = (item) => {
        return item.filter(item => limitedTraitsKey.includes(item.id));
    };

    const removeTrait = (id) => {
        const updatedList = limitedTraitsKey.filter(item => item !== id.replace(/%/g, ''));
        setLimitedTraitsKey(updatedList);
    }

    const isSelected = (id) => {
        return limitedTraitsKey.includes(id.replace(/%/g, ''))
    }

    const checkAddTraits = (id) => {
        navigator.clipboard.writeText(id);
        if (!isSelected(id)) {
            setLimitedTraitsKey((prevList => [...prevList, id.replace(/%/g, '')]));
        }
    }

    const isTraitsAvailable = () => {
        const output = limitedTraitsKey.filter(item => !basePromptMessage.includes(`%${item}%`)); 
        if (output.length > 0) {
            alert(`Please add ${output.map(item => `%${item}%`).join(', ')} `);
            return false
        } else {
            return true
        }
    };

    const callGenerateImage = async () => {
        setLoading(true);
        const output = await handleGeneratePrompts();
        const json = output.split("\n\n\n");
        const prompts = [JSON.stringify(json)];
        try {
            fetch('http://127.0.0.1:5000/generate_images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompts: prompts })
            })
            .then(response => response.json())
            .then(data => {
                setGeneratedImages(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
        } catch (error) {
            console.error('Error generating prompts:', error);
            setGeneratedImages([]);
        }
    };

    return (
        <> 
            { isLoading && <Loader/>} <br/><br/>
            {traitsKey.map((item) => <Chip color="primary" label={item} className={classes.chipItem} 
            key={`${item}-selected-traits`} size='small' variant={isSelected(item) ? 'filled' : "outlined"}
            onClick={() => checkAddTraits(item)} {...(isSelected(item) && { onDelete: () => removeTrait(item)})} />)}<br/><br/>
            <TextField  label="Format" variant="outlined" fullWidth={true} value={basePromptMessage} 
                multiline maxRows={5} className={classes.formTextfield} 
                onChange={(event) => setBasePromptMessage(event.target.value)}/>
            <TextField  label="Number of generations" variant="outlined" 
                fullWidth={true} value={totalGeneration} className={classes.formTextfield} 
                type='number' onChange={(event) => setTotalGeneration(event.target.value)}/>
            <TextField  label="Number of traits" variant="outlined" 
                fullWidth={true} value={totalTraits} className={classes.formTextfield} 
                type='number' onChange={(event) => setTotalTraits(event.target.value)} inputProps={{min: "1", max: "6"}}/>
            <Box className={classes.btnContainer} textAlign='right'>
                <Button variant="contained" onClick={() => callGenerateImage()} disabled>Call API</Button>
                <Button variant="outlined" onClick={() => handleDownload()} disabled={!messageList.length}>Copy & Download JSON</Button>
                <Button variant="outlined" onClick={() => handleCopy()}  disabled={!messageList.length}>Copy Content</Button>
                <Button variant="contained" onClick={() => handleGeneratePrompts()}>Generate Prompts</Button>
            </Box>  
            {messageList.length > 0 && <TextField  label="Output" variant="outlined" fullWidth={true} value={messageList} 
                multiline maxRows={15} className={classes.formTextfield}/>}
            {generatedImage.length > 0 && generatedImage.map((item) => (
                <Box>
                    {JSON.stringify(item)}
                </Box>
            ))}
        </>
    )
}

export default RandomGenerator;