let numValues = [["zero","one","two","three","four","five","six","seven","eight","nine","ten",
                  "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],
                 ["nula", "jedan", "dva", "tri", "četiri", "pet", "šest", "sedam", "osam", "devet", "deset",
                  "jedanaest", "dvanaest", "trinaest", "četrnaest", "petnaest", "šesnaest", "sedamnaest", "osamnaest", "devetnaest"]];

let deset = [["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
             ["nula", "deset", "dvadeset", "trideset", "četrdeset", "pedeset", "šezdeset", "sedamdeset", "osamdeset", "devedeset"]];

let numberToConvert = 0;
let language = "";
let lang = 0;
let numberAsString = [];
let change = [];
let finalString = [];
let numberLength = 0;
let finalfinal = "";

function getValue() {
    finalString = [];
    finalfinal = "";

    document.querySelector(".result").innerHTML = "Result";

    numberToConvert = document.querySelector(".input-field").value;
    language = document.querySelector('input[name="lang"]:checked').value;
    if (language == "eng") {
        lang = 0;
    } else {
        lang = 1;
    }
    console.log("FIRST", numberToConvert, language);

    main();

    document.querySelector(".result").innerHTML = "Result: " + finalfinal;
}

function getRandom() {
    finalString = [];
    finalfinal = "";

    document.querySelector(".result").innerHTML = "Result";

    let temp = Math.random() * 1000000;
    numberToConvert = temp.toFixed(2);

    document.querySelector(".input-field").value = numberToConvert;

    main();

    document.querySelector(".result").innerHTML = "Result: " + finalfinal;
}

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

function dictionary(number, position, lang)
{
    if (number === 0) {
        return;
    }
    switch(position) {
        case 1:
            if (lang == 1) {
                finalString.push("i");
            }
            finalString.push(numValues[lang][number]);
            break;
        case 2:
            if (number < 20 && number > 10) {
                if (lang == 1) {
                    finalString.push("i");
                }
                finalString.push(numValues[lang][number]);
            } else if (number > 19) {
                if (lang == 1) {
                    finalString.push("i");
                }
                finalString.push(deset[lang][number/10]);
            } else if (number > 0 && number < 10) {
                finalString.push(deset[lang][number]);
            } else if (number == "00") {
                return;
            }
            break;
        case 5:
            if (number < 20 && number > 10) {
                finalString.push(numValues[lang][number]);
                if (lang == 1) {
                    finalString.push("tisuća");
                } else {
                    finalString.push("thousand");
                }
            } else if (number > 19) {
                finalString.push(deset[lang][number/10]);
                if (lang == 1) {
                    finalString.push("tisuća");
                } else {
                    finalString.push("thousand");
                }
            } else if (number > 0 && number < 10) {
                finalString.push(deset[lang][number]);
            } else if (number == "00") {
                if (lang == 1) {
                    finalString.push("tisuća");
                } else {
                    finalString.push("thousand");
                }
            }
            break;
        case 3:
        case 6:
            if (lang == 1){
                finalString.push(numValues[lang][number], "stotina");
                changeGender(number, 's');
            } else {
                finalString.push(numValues[lang][number], "hundred");
            }
            break;
        case 4:
            if (lang == 1){
                finalString.push(numValues[lang][number], "tisuća");
                changeGender(number,'t');
            } else {
                finalString.push(numValues[lang][number], "thousand");
            }
            break;
        default:
            console.log("Something's wrong.");
    }
}

function main() {

// ako postoje lipe
if (Math.floor(numberToConvert) != numberToConvert) {
    numberAsString = numberToConvert.toString().split('');
    
    change = numberAsString.splice(numberAsString.indexOf(".") + 1, 2);
    
    numberAsString.pop();

}
// number is int rather than float
else {
    numberAsString = numberToConvert.toString().split('');
    change = ["0"];
}

numberLength = numberAsString.length;

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

    if (numberLength == 5) {
        for (let i=0; i < 1; i++) {
            dictionary(numberAsString[i], numberLength-i, lang);
        }
        for (let i=1; i < numberAsString.length; i++) {
            dictionary(numberAsString[i], numberLength-i-1, lang);
        }
    } else {
        for (let i=0; i < 2; i++) {
            dictionary(numberAsString[i], numberLength-i, lang);
        }
        for (let i=2; i < numberAsString.length; i++) {
            dictionary(numberAsString[i], numberLength-i-1, lang);
        }
    }

    if (lang == 1) {
        finalString.push("kuna");
        changeGender(numberAsString[numberAsString.length-1], 'k');
    } else {
        finalString.push("dollars");
    }

} else {
    if(numberToConvert > 19) {
        for (let i=0; i < numberAsString.length; i++) {
            dictionary(numberAsString[i], numberLength-i, lang);
        }
        if (lang == 1) {
            finalString.push("kuna");
            changeGender(numberAsString[numberAsString.length-1], 'k');
        } else {
            finalString.push("dollars");
        }
    }
    else {
        finalString.push(numValues[lang][numberToConvert]);
        if (lang == 1) {
            finalString.push("kuna");
        } else {
            finalString.push("dollars");
        }
    }
}

if (change[0] == 1 && change.length > 1)
{
    change[0] = change[0] + change[1];
    change.pop();

    if (lang == 1) {
        finalString.push("i", numValues[lang][change[0]], "lipa");
    } else {
        finalString.push("and", numValues[lang][change[0]], "cents");
    }
} else if (change.length == 1) {
    if (lang == 1) {
        finalString.push("i", deset[lang][change[0]], "lipa");
    } else {
        finalString.push("and", deset[lang][change[0]], "cents");
    }
} else {
    if (lang == 1) {
        finalString.push("i");
    } else {
        finalString.push("and");
    }

    dictionary(change[0], 2, lang);
    dictionary(change[1], 1, lang);

    if (lang == 1) {
        finalString.push("lipa");
        changeGender(change[1], 'l');
    } else {
        finalString.push("cents");
    }

}

console.log(change);
console.log(numberAsString);

finalfinal = finalString.join(' ');
console.log("--->", finalfinal);

}
