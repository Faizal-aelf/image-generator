export const generatePermutations = (arrays) => {
    const result = [];
    function permute(index, current) {
        if (index === arrays.length) {
            result.push(current);
            console.log(current);
            return;
        }
        for (let i = 0; i < arrays[index].length; i++) {
            permute(index + 1, [...current, {id: arrays[index][i].id, value: arrays[index][i].value}]);
            
        }
    }
    permute(0, []);
    return result;
}

export const generateRandomCombinations = (arrays, numCombinations) => {
    const combinations = new Set();
    const arrayLengths = arrays.map(array => array.length);

    while (combinations.size < numCombinations) {
        const combination = [];
        for (let i = 0; i < arrays.length; i++) {
            const randomIndex = Math.floor(Math.random() * arrayLengths[i]);
            combination.push(arrays[i][randomIndex]);
        }
        combinations.add(JSON.stringify(combination));
    }

    return Array.from(combinations).map(combination => JSON.parse(combination));
}