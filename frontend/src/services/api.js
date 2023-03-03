
const { Configuration, OpenAIApi } = require("openai");

export function generateJSONFromFoodItems(foodItems) {
    let json = [];
    console.log(foodItems.length)
    console.log(foodItems);
    for (let i = 0; i < foodItems.length; i++) {
        json.push({});
        json[i].drinkStats = {};
        //Food name
        json[i].name = foodItems[i].name;

        //Price
        if (foodItems[i].drinkStats.isPriceUsed) {
            json[i].drinkStats.priceMin = foodItems[i].drinkStats.priceMin;
            json[i].drinkStats.priceMax = foodItems[i].drinkStats.priceMax;
        } else {
            json[i].drinkStats.priceMin = null;
            json[i].drinkStats.priceMax = null;
        }

        //Alchohol
        if (foodItems[i].drinkStats.isAlcoholUsed) {
            json[i].drinkStats.alcoholMin = foodItems[i].drinkStats.alcoholMin;
            json[i].drinkStats.alcoholMax = foodItems[i].drinkStats.alcoholMax;
        } else {
            json[i].drinkStats.alcoholMin = null;
            json[i].drinkStats.alcoholMax = null;
        }

        //Country/Region
        if (foodItems[i].drinkStats.isCountryUsed) {
            json[i].drinkStats.country = foodItems[i].drinkStats.country;
            if (foodItems[i].drinkStats.isRegionUsed) {
                json[i].drinkStats.region = foodItems[i].drinkStats.region;
            } else {
                json[i].drinkStats.region = null;
            }
        }
        else {
            json[i].drinkStats.country = null;
            json[i].drinkStats.region = null;
        }

        //Color
        if (foodItems[i].drinkStats.isColorUsed) {
            json[i].drinkStats.color = foodItems[i].drinkStats.color;
        } else {
            json[i].drinkStats.color = null;
        }

        //Sweetness
        if (foodItems[i].drinkStats.isSweetnessUsed) {
            json[i].drinkStats.sweetnessMin = foodItems[i].drinkStats.sweetnessMin;
            json[i].drinkStats.sweetnessMax = foodItems[i].drinkStats.sweetnessMax;
        } else {
            json[i].drinkStats.sweetnessMin = null;
            json[i].drinkStats.sweetnessMax = null;
        }

        //Acidity
        if (foodItems[i].drinkStats.isAcidityUsed) {
            console.log("ACIDITY USED")
            json[i].drinkStats.acidityMin = foodItems[i].drinkStats.acidityMin;
            json[i].drinkStats.acidityMax = foodItems[i].drinkStats.acidityMax;
        } else {
            json[i].drinkStats.acidityMin = null;
            json[i].drinkStats.acidityMax = null;
        }

        //Tannin
        if (foodItems[i].drinkStats.isTanninUsed) {
            json[i].drinkStats.tanninMin = foodItems[i].drinkStats.tanninMin;
            json[i].drinkStats.tanninMax = foodItems[i].drinkStats.tanninMax;
        } else {
            json[i].drinkStats.tanninMin = null;
            json[i].drinkStats.tanninMax = null;
        }

        //Aromas
        if (foodItems[i].drinkStats.isAromasUsed) {
            json[i].drinkStats.aromas = foodItems[i].drinkStats.aromas;
        } else {
            json[i].drinkStats.aromas = null;
        }



    }
    return JSON.stringify(json);
}

export async function sendRequest(jsonInput, setResultItems, setResultWait, setErrorMsg, apiKey) {
    setErrorMsg(false);
    console.log("Sending request");
    console.log(jsonInput);

    //KEY, Stored in frontend??
    const configuration = new Configuration({
        apiKey: apiKey,
    });

    // //Config openai
    const openai = new OpenAIApi(configuration);

    //Prefix
    let prefix = "You are now a wine reccomendation specialist. A list of wine attributes for each food item will be given to you and you must make a list of a suitable wine for each food item that best match the criteria. With each reccomendation, write a summary paragraph of the wine's characteristics, including the actual price of the wine in dollars and its actual percentage alcohol content,\'. Now make reccomendations based on the following attribute(s). Output the data in a json array of strings, where each string value corresponds to a food item and its corresponding wine criteria provided in the input json file attached with this query. If a food item provides no wine criteria provide the best wine just for that food. if a value of one of wine criteria is null it means you need to ignore it. In the end also provide the statistics for each wine and how they match the criteria. Provide output in a json array witch following fields for each array entry: 'name' - name of wine string, 'foodName' - name of corresponding food, 'description' - description of the wine and its cooresponding characteristics in string format, 'color' - wine color. Important: always output the result in same format, make sure the output is only the json file that can be used directly with a react app\n";
    let prompt = prefix + jsonInput;
    console.log(prompt);

    //Set wait state
    setResultWait(true);

    //Completion
    let completion;
    try {
        completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.3,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
    } catch (error) {
        console.log(error.response.status);
        if(error.response.status===401){
            //Invalid api key
            console.log("bad api key")
        }
        setResultWait(false);
        setErrorMsg(true);
        return;
    }
    setResultWait(false);

    //Output analyze
    let msg = completion.data.choices[0].text;
    console.log(msg);
    // const msgParsed = JSON.parse(msg.slice(msg.indexOf('['))); // slice out the "Output:" text before parsing
    let index = msg.indexOf('[');
    let msgTemp = msg.slice(index);
    let msgObj = JSON.parse(msgTemp);
    console.log(msgObj)
    // console.log(msg)
    setResultItems(msgObj);


}