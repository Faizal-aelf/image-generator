export const convertTableIntoArray = (param) => {
    // Create a temporary div element to hold the table HTML
    // imageSrc, revisedPrompt, name
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = param;

    // Initialize an empty array to store the objects
    const dataArray = [];

    // Iterate through the table rows and extract the data
    const rows = tempDiv.querySelectorAll('tr');
    for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip header row
    const row = rows[i].querySelectorAll('td');
    const name = row[0].textContent;
    const imageSrc = row[1].querySelector('img').src;
    const revisedPrompt = row[2].textContent;
    const dataObject = {
        name,
        imageSrc,
        revisedPrompt
    };
    dataArray.push(dataObject);
    }

    // Log the array of objects
    console.log(dataArray);
    return dataArray;
}