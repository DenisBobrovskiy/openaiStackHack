
import openai
import os
import json


def print_reccomendation(attributes):
    prefix = """
    You are now a wine reccomendation specialist.
    A list of wine attributes will be given to you and you must make a list of 10 suitable wines that best match these. 
    With each reccomendation, write a summary paragraph of the wine's characteristics, including the price range in dollars, 
    One or more of the attributes below will be provided to inform your descisions:
    "name": the type of food the wine goes well with
    "drinkStats": {
        "priceMin": minimum price of the bottle in dollars 
        "priceMax": maximum price of the bottle in dollars, 
        "alcoholMax": maximum alcohol concentration percentage, 
        "country": country of the wine's origin
        "region": region of origin within the country
        "color": colour of the wine: white, red or rose
        "taste": an integer from 0 to 5, where 0 is the most sweet wine and 5 is the most dry wine
        "aroma": a list of aromas that the wine should have for example, fruity, floral, herbal, spicy, woody, earthy
        "body": The body of wine can range from light to full; how much weight the wine holds on the palate
        }
    Now make reccomendations based on the following attribute(s):
    """
    attributes_string = str({k: v for k, v in attributes.items() if v is not None})
    response = openai.Completion.create(
    model="text-davinci-003",
    prompt=prefix + attributes_string,
    temperature=0.7,
    max_tokens=1024,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )

    message = response.choices[0].text.strip()
    print(message)


if __name__ == "__main__":

    api_key = "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"
    openai.api_key = api_key

    attributes = {
        "name": None,
        "drinkStats": {
            "priceMin": None, 
            "priceMax": None, 
            "alcoholMax": None, 
            "country": None,
            "region": None,
            "color": None,
            "taste": None, 
            "aroma": [None,],
            "body": None
        }
    }
    with open('attributes_empty.json', 'w') as f:
        json.dump(attributes, f)

    json_object = json.dumps(attributes)
    print(json_object)


    attributes = ['food', 'colour', 'taste', 'age', 'aroma', 'country', 'region', 'price']
    attributes = dict.fromkeys(attributes)
    attributes['food'] = 'fish'
    #attributes['colour'] = 'red'
    attributes['taste'] = 3
    attributes['country'] = 'spain'
    attributes['aroma'] = ("floral", "oak")

    # filter None elements from attributes
    attributes_string = str({k: v for k, v in attributes.items() if v is not None})
    print("\n attributes:", attributes_string)

    #print_reccomendation(attributes_string)


