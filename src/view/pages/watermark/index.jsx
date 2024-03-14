/**
 * 
 * Watermark Page component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {useState, useEffect, useRef} from 'react';
import {Box, TextField, Button} from '@mui/material';
import Magnifier from "react-magnifier";
import { Watermark } from '@hirohe/react-watermark';
import html2canvas from 'html2canvas';


// COMPONENT IMPORT
import PageHeader from '../common/header/pageHeader';
import {Container} from '../../atom';
import {CardImage} from '../../molecules';
import {traitsBaseItems, traitsOtherItems} from './constants';
import {generateRandomCombinations} from './utils';

// STYLE IMPORT
import useStyles from './styles';

const WatermarkPage = () => {
  const classes = useStyles();

  // STATE VARIABLE
  const [isLoading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);


  const generateSamples = async () => {
    
    setLoading(true);
    var baseFinalArray  = traitsBaseItems.map(item => item.values.map(trait => ({traitType: item.id, value: trait})));
    var otherFinalArray  = traitsOtherItems.map(item => item.values.map(trait => ({traitType: item.id, value: trait})));
    const combineBaseArray = await generateRandomCombinations(baseFinalArray, 100);
    const combineOtherArray = await generateRandomCombinations(otherFinalArray, 500);
    console.log(JSON.stringify(combineBaseArray));
    console.log(otherFinalArray.length);
    combineBaseArray.forEach((item, index) => {
      let numbers = generateNonRepeatingRandomNumbers(0, 17, randomIntFromInterval(1, 6));
      console.log(numbers)
      let otherItems = [...otherFinalArray];
      numbers.forEach((itemNo) => {
        combineBaseArray[index].push(otherItems[itemNo][0])
      });
    })

    setMessageList(combineBaseArray.join("\n\n"));
    console.log(JSON.stringify(combineBaseArray));
    setLoading(false);
  };

  const randomIntFromInterval = (min = 1, max = 6) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const generateNonRepeatingRandomNumbers = (min, max, count) => {
    if (count > (max - min + 1)) {
        console.log("Error: Count exceeds the range of available numbers.");
        return [];
    }

    let numbers = [];
    while (numbers.length < count) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        }
    }

    return numbers;
}
  
  return (
    <Container> 
      <PageHeader title='Watermark' subtitle="Quick assistance for all your queries and concerns. Get help now!" {...{isLoading}}></PageHeader>
      <Box className={classes.controlLayer}>
        <Button onClick={generateSamples}>Generate</Button>
        {messageList.length > 0 && <TextField  label="Output" variant="outlined" fullWidth={true} value={messageList} 
                multiline maxRows={15} className={classes.formTextfield}/>}
      </Box>
    </Container>
  )
}

export default WatermarkPage;

// <Button variant="text" onClick={handleConvertToImage}>Convert</Button>