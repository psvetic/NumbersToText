let valuesEng = ["zero","one","two","three","four","five","six","seven","eight","nine","ten",
                 "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];

let valuesHrv = ["nula", "jedan", "dva", "tri", "četiri", "pet", "šest", "sedam", "osam", "devet", "deset",
                 "jedanaest", "dvanaest", "trinaest", "četrnaest", "petnaest", "šesnaest", "sedamnaest", "osamnaest", "devetnaest"];

let deset = ["nula", "deset", "dvadeset", "trideset", "četrdeset", "pedeset", "šezdeset", "sedamdeset", "osamdeset", "devedeset"];

function changeGender(number, word)
{
    if (number == 1 || number == 2 || number == 3 || number == 4)
    {
        switch(word) {
            case 'k':
                finalString.pop();
            
                if (number == 1) {
                    finalString.pop();
                    finalString.push("jedna", "kuna");
                    return;
                }
                if (number == 2) {
                    finalString.pop();
                    finalString.push("dvije");
                }
                finalString.push("kune");
                break;
            case 'l':
                finalString.pop();
            
                if (number == 1) {
                    finalString.pop();
                    finalString.push("jedna", "lipa");
                    return;
                }
                if (number == 2) {
                    finalString.pop();
                    finalString.push("dvije");
                }
                finalString.push("lipe");
                break;
            case 's':
                finalString.pop();
                
                if (number == 1) {
                    finalString.pop();
                    finalString.push("jedna", "stotina");
                    return;
                }
                if (number == 2) {
                    finalString.pop();
                    finalString.push("dvije");
                }
                finalString.push("stotine");
                break;
            case 't':
                finalString.pop();

                if (number == 1) {
                    finalString.pop();
                    finalString.push("jedna", "tisuća");
                    return;
                }
                if (number == 2) {
                    finalString.pop();
                    finalString.push("dvije");
                }
                finalString.push("tisuće");
                break;
            default:
                console.log("Something's wrong.");
        }
    }
}

function dictionary(number, position)
{
    if (number === 0) {
        return;
    }
    switch(position) {
        case 1:
            finalString.push("i", valuesHrv[number]);
            break;
        case 2:
            if (number < 20 && number > 10) {
                finalString.push("i", valuesHrv[number]);
            } else if (number > 19) {
                finalString.push("i", deset[number/10]);
            } else if (number > 0 && number < 10) {
                finalString.push(deset[number]);
            } else if (number == "00") {
                return;
            }
            break;
        case 5:
            if (number < 20 && number > 10) {
                finalString.push(valuesHrv[number], "tisuća");
            } else if (number > 19) {
                finalString.push(deset[number/10], "tisuća");
            } else if (number > 0 && number < 10) {
                finalString.push(deset[number]);
            } else if (number == "00") {
                finalString.push("tisuća");
            }
            break;
        case 3:
        case 6:
            finalString.push(valuesHrv[number], "stotina");
            changeGender(number, 's');
            break;
        case 4:
            finalString.push(valuesHrv[number], "tisuća");
            changeGender(number,'t');
            break;
        default:
            console.log("Something's wrong.");
    }
}

let numberToConvert = 200300.18;
let numberAsString = [];
let change = [];

if (Math.floor(numberToConvert) !== numberToConvert) {
    numberAsString = numberToConvert.toString().split('');
    
    change = numberAsString.splice(numberAsString.indexOf(".") + 1, 2);
    
    numberAsString.pop();

} else {
    numberAsString = numberToConvert.toString().split('');
    change = ["0"];
}

let numberLength = numberAsString.length;

let finalString = [];

// number on second place join with next one
if (numberAsString[numberLength-2] == 1 || numberAsString[numberLength-1] == 0)
{
    numberAsString[numberLength-2] = numberAsString[numberLength-2] + numberAsString[numberLength-1];
    numberAsString.pop();
}
// number in fifth place join with next (eg. sixteen)
if (numberAsString[numberLength-5] == 1 || numberAsString[numberLength-4] == 0)
{
    numberAsString[numberLength-5] = numberAsString[numberLength-5] + numberAsString[numberLength-4];
    numberAsString.splice(numberLength-4, 1);

    for (let i=0; i < 2; i++) {
        dictionary(numberAsString[i], numberLength-i);
    }
    for (let i=2; i < numberAsString.length; i++) {
        dictionary(numberAsString[i], numberLength-i-1);
    }

    finalString.push("kuna");
    changeGender(numberAsString[numberAsString.length-1], 'k');

} else {
    if(numberToConvert > 19) {
        for (let i=0; i < numberAsString.length; i++) {
            dictionary(numberAsString[i], numberLength-i);
        }
        finalString.push("kuna");
        changeGender(numberAsString[numberAsString.length-1], 'k');
    }
    else {
        finalString.push(valuesHrv[numberToConvert]);
        finalString.push("kuna");
    }
}

if (change[0] == 1 && change.length > 1)
{
    change[0] = change[0] + change[1];
    change.pop();

    finalString.push("i", valuesHrv[change[0]], "lipa");
} else if (change.length == 1) {
    finalString.push("i", deset[change[0]], "lipa");
} else {
    dictionary(change[0], 2);
    dictionary(change[1], 1);
    finalString.push("lipa");
    changeGender(change[1], 'l');
}

console.log(change);
console.log(numberAsString);

let finalfinal = finalString.join(' ');
console.log(finalfinal);

