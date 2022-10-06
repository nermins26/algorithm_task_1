/**
 ********README*********
 Postavka zadatka je bila pomalo nejasna, i nije mi bilo bas najjasnije sta se trazi pa sam uradio po svom nahođenju onako kako sam mislio da je najbolje a to je:
 - da funkcija vraća novi struct tipa {id, value}
 - id treba da bude unikatan za postojeci niz tj. ne mora se nastavljat na zadnji najveci id, vec moze da bude prvi slobodni 
 - value treba da ima vrijednost takodjer unikatnu, koja ne postoji vec u nizu a koja je veca od barem jednog duplikata unutar niza (ukoliko postoji duplikat). Pa tako ako imamo jedan duplikat, uzimamo prvi slobodni integer poslije prvog pojavljivanja duplikata u nizu. Ako imamo vise duplikata u nizu, uzimamo prvi slobodni integer poslije prvog pojavljivanja najveceg duplikata u nizu. Ukoliko nema duplikata, onda uzimamo prvi slobodni integer iz niza (slicno kao i kod generisanja unikatnog ID-a).
 */


let arr = 
[
    {id:2,value:7},
    {id:3,value:3},
    {id:7,value:7},
    {id:6,value:3},
    {id:4,value:1},
    {id:1,value:9},
    {id:5,value:4}
]

//get the values array
const getArrValues = arr => arr.map(el => el.value);


//sort an array based on object property
const sortBy = (arr, property) => {

    let copyArr = [...arr]; //destruct array to make a copy of the array to avoid changing the original

    switch (property) {
        case 'id':
            return copyArr.sort((a, b) => a.id > b.id)
        case 'value':
            return copyArr.sort((a, b) => a.value > b.value)
        default:
            console.log("Unknown property");
            break;
    }
}


//algorithm for generating unique value based on property from array of objects
const generateUniqueValueAlg = (arr, val, property) => {
   
    let value = val;

    switch(property) {
        case "id":
            arr.forEach(e => {
                if (value == e.id) {
                    value++;
                }
            });
            break;
        case "value":
            arr.forEach(e => {
                if (value == e.value) {
                    value++;
                }
            });
            break;
        default:
            console.log("Unknown property");
            break;
    }
    
    return value;
}


//generate unique value for "value" property of new struct
const generateUniqueValue = arr => {

    let sortedByValue = sortBy(arr, 'value');   //first sort array based on value

    //if there are duplicates, then we will generate value after first appearence of biggest duplicate
    if (findDuplicates(arr).length > 0) {
        let duplicates = findDuplicates(arr);   
        let biggestDuplicate = duplicates.sort((a,b) => a-b).pop();     //get biggest duplicate
        let indexOfBiggestDuplicate = sortedByValue.findIndex(e => e.value == biggestDuplicate);    //get the index of first appearence of the biggest duplicate 
        let arrChunk = sortedByValue.slice(indexOfBiggestDuplicate + 1);    //we extract the part from the array that is important for us to generate the value. We dont need the whole array

        return generateUniqueValueAlg(arrChunk, biggestDuplicate + 1, 'value')  //generate value
        
    } else {

        return generateUniqueValueAlg(sortedByValue, 1, 'value')    //generate value

    };
}


//get the duplicates from the array
const findDuplicates = arr => {

    let arrValues = getArrValues(arr);  //get the array of values only for easier finding

    return arrValues.filter((el, index) => index !== arrValues.indexOf(el)); //get the array of duplicates
}



//generat the new struct with type of {id, value};
const generateNewStruct = arr => {

    let newStruct = {}; 
    let sortedById = sortBy(arr, 'id')  //first sort the array by Id to easier generate unique id

    newStruct.id = generateUniqueValueAlg(sortedById, 1, 'id');     //generate unique id using algorithm

    newStruct.value = generateUniqueValue(arr);     //generate unique value

    console.log(newStruct);
}

generateNewStruct(arr); //run fn