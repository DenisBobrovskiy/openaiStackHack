
import openai
import os
import json


def get_reccomendation(attributes):
    prefix_old = """
    You are now a wine reccomendation specialist.
    A list of wine attributes will be given to you and you must make a list of 10 suitable wines that best match these. 
    With each reccomendation, write a summary paragraph of the wine's characteristics, including the price range in dollars, 
    One or more of the attributes below will be provided to inform your descisions:
    "name": the type of food the wine goes well with
    "drinkStats": {
        "priceMin": minimum price of the bottle in dollars 
        "priceMax": maximum price of the bottle in dollars, 
        "alcoholMax": minimum alcohol concentration percentage, 
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
    prefix = """You are now a wine reccomendation specialist. A list of wine attributes will be given to you and you must make a list of 10 suitable wines that best match these. 
    With each reccomendation, write a summary paragraph of the wine's characteristics, including the actual price of the wine in dollars and its actual percentage alcohol content.
    If the specified characteristics do not specify a real wine, reply with \'Impossible wine configutation, please try again with different characteristics\'.
    Now make reccomendations based on the following attribute(s):\n"""

    prompt = prefix + attributes
    print("PROMPT: \n", prompt, "\n\n")

    #attributes_string = str({k: v for k, v in attributes.items() if v is not None})

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=1024,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    message = response.choices[0].text.strip()
    return message

def save_empty_json(file_dir):
    attributes = {
        "name": None,
        "drinkStats": {
            "priceMin": None, 
            "priceMax": None,
            "alcoholMin": None,
            "alcoholMax": None, 
            "country": None,
            "region": None,
            "color": None,
            "taste": None, 
            "aroma": [None,],
            "body": None
        }
    }
    with open(file_dir, 'w') as f:
        json_string = json.dumps(attributes, indent=4)
        f.write(json_string)


def generate_wine_description(attributes):
    description = f"Make wine reccomendations which go well with the following food: {attributes['name']}."

    if attributes['drinkStats']['priceMin'] and attributes['drinkStats']['priceMax']:
        description += f"The wines should have a price range of ${attributes['drinkStats']['priceMin']} to ${attributes['drinkStats']['priceMax']}. "
    elif attributes['drinkStats']['priceMin']:
        description += f"The wines should have a price of at least ${attributes['drinkStats']['priceMin']}. "
    elif attributes['drinkStats']['priceMax']:
        description += f"The wines should cost no more than ${attributes['drinkStats']['priceMax']}. "

    if attributes['drinkStats']['alcoholMin'] and attributes['drinkStats']['alcoholMax']:
        description += f"The wines should have an alcohol content ranging from {attributes['drinkStats']['alcoholMin']}% to {attributes['drinkStats']['alcoholMax']}%. "
    elif attributes['drinkStats']['alcoholMin']:
        description += f"The wines should have an alcohol content of at least {attributes['drinkStats']['alcoholMin']}%. "
    elif attributes['drinkStats']['alcoholMax']:
        description += f"The wines should have an alcohol content of at most {attributes['drinkStats']['alcoholMax']}%. "

    if attributes['drinkStats']['body']:
        description += f"The wines should be of {attributes['drinkStats']['body']} body."

    if attributes['drinkStats']['taste']:
        description += f"The wines should have dryness of {attributes['drinkStats']['taste']} where 0 is the most sweet wine and 5 is the most dry wine."

    if attributes['drinkStats']['aroma'] and None not in attributes['drinkStats']['aroma']:
        description += "The wines can have "
        for i, aroma in enumerate(attributes['drinkStats']['aroma']):
            if i == 0:
                description += f"{aroma}"
            elif i == len(attributes['drinkStats']['aroma']) - 1:
                description += f", and {aroma}"
            else:
                description += f", {aroma}"

        description += " aromas, however dont just include wines with these; tell me about some of the other aromas the wines have."

    return description

def collate_reccomendations(reccomendations):
    # combine reccomendations into a single menu
    return reccomendations


def main():
    api_key = "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"
    openai.api_key = api_key

    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

    file_name = "attributes_fish.json"
    file_path = os.path.join(base_dir, "backend/Prompt Generation", file_name)
    #save_empty_json(file_path)
    try:
        with open(file_path, 'r') as f:
            attributes = json.load(f)
    except FileNotFoundError:
        print("no such file")
        exit()

    description = generate_wine_description(attributes)

    reccomendations = get_reccomendation(str(description))
    print("RESPONSE:\n\n", reccomendations)




    return 0
    """
    attributes_formatted = {}
    for k, v in attributes:
        if v == None:
            attributes[k] == "any"
        elif k == "drinkStats":
            attributes[k] = {i: v for i, j in attributes[k].items() if v is not None}
   """         

        
    """
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
    """

if __name__ == "__main__":
    main()



