/**
 * 
 * Prompt constants
 * @author - NA 
 * @date - 4th March, 2024
 * 
 */
// JSON DATA
import hatList from './data/hat.json';
import accessoryList from './data/accessory.json';
import breedList from './data/breed.json';
import clothesList from './data/clothes.json';
import eyesList from './data/eyes.json';
import mouthList from './data/mouth.json';
import petsList from './data/pets.json';
import shoesList from './data/shoes.json';
import typeList from './data/type.json';
import weaponList from './data/weapon.json';

export const promptItems = [
    // { id: 'hat', title: 'Hat', values: hatList, message: 'The cat wearing a'},
    // { id: 'necklace', title: 'Necklace', values: accessoryList, message: 'The cat wearing '},
    // { id: 'breed', title: 'Breed', values: breedList, message: 'The cat breed is '},
    { id: 'clothes', title: 'Clothes', values: clothesList, message: 'The cat wearing '},
    // { id: 'eyes', title: 'Eyes', values: eyesList, message: 'The cat have  '},
    // { id: 'mouth', title: 'Mouth', values: mouthList, message: 'The cat have '},
    // { id: 'pets', title: 'Pets', values: petsList, message: 'The cat have  '},
    //{ id: 'shoes', title: 'Shoes', values: shoesList, message: 'The cat wearing '},
    // { id: 'type', title: 'Type', values: typeList, message: 'The cat is  '},
    // { id: 'weapon', title: 'Weapon', values: weaponList, message: 'The cat have '},
];

export const defaultTraitsKey = promptItems.map(item => item.id);