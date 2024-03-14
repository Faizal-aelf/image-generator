/**
 * 
 * Prompt constants
 * @author - NA 
 * @date - 4th March, 2024
 * 
 */
// JSON DATA
//BASE
import eyesList from './traitsPrompts/eyes.json';
import shoesList from './traitsPrompts/shoes.json';
import clothesList from './traitsPrompts/clothes.json';

import accessoryRightList from './traitsPrompts/accessoryRight.json';
import backgroundList from './traitsPrompts/background.json';
import beltsList from './traitsPrompts/belts.json';
import breedList from './traitsPrompts/breed.json';
import capList from './traitsPrompts/cap.json';
import faceList from './traitsPrompts/face.json';
import mouthList from './traitsPrompts/mouth.json';

import necklaceList from './traitsPrompts/necklace.json';
import pawsList from './traitsPrompts/paws.json';
import petsList from './traitsPrompts/pets.json';
import quantumStateList from './traitsPrompts/quantumState.json';
import mustachesList from './traitsPrompts/mustaches.json';


import rideList from './traitsPrompts/ride.json';
import tailsList from './traitsPrompts/tails.json';
import trousersList from './traitsPrompts/trousers.json';
import weaponLeftList from './traitsPrompts/weaponLeft.json';
import wingsList from './traitsPrompts/wings.json';
import zodicaList from './traitsPrompts/zodica.json';

export const traitsBaseItems = [
    { id: 'clothes', title: 'Clothes', values: clothesList},
    { id: 'breed', title: 'Breed', values: breedList},
    { id: 'background', title: 'BackgroundList', values: backgroundList},
]

export const traitsOtherItems = [
    { id: 'eyes', title: 'Eyes', values: eyesList},
    { id: 'shoes', title: 'Shoes', values: shoesList},
    { id: 'accessoryRight', title: 'Accessory Right', values: accessoryRightList},
    { id: 'belts', title: 'Belts', values: beltsList},
    { id: 'hat', title: 'Hat', values: capList},
    { id: 'face', title: 'Face', values: faceList},
    { id: 'mouth', title: 'Mouth', values: mouthList},
    { id: 'ride', title: 'ride', values: rideList},
    { id: 'tails', title: 'tails', values: tailsList},
    { id: 'trousers', title: 'trousers', values: trousersList},
    { id: 'weaponLeft', title: 'weaponLeft', values: weaponLeftList},
    { id: 'wings', title: 'wings', values: wingsList},
    { id: 'zodica', title: 'zodica', values: zodicaList},

    { id: 'necklace', title: 'necklace', values: necklaceList},
    { id: 'paws', title: 'paws', values: pawsList},
    { id: 'pets', title: 'pets', values: petsList},
    { id: 'quantumState', title: 'quantumState', values: quantumStateList},
    { id: 'mustaches', title: 'mustaches', values: mustachesList},
];

const output = {
    eyes: eyesList,
    shoes: shoesList,
    accessoryRight: accessoryRightList,
    belts: beltsList,
    hat: capList,
    face: faceList,
    mouth: mouthList,
    ride: rideList,
    tails: tailsList,
    trousers: trousersList,

    weaponLeft: weaponLeftList,
    wings: wingsList,
    zodica: zodicaList,
    necklace: necklaceList,
    paws: petsList,
    pets: petsList,
    quantumState: quantumStateList,
    mustaches: mustachesList,
}

console.log(output)
