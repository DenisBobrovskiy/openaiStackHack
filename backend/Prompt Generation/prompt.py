
import openai
import os
import json


def get_reccomendation(attributes):
    prefix = """You are now a wine reccomendation specialist. A list of wine attributes will be given to you and you must make a list of 5 suitable wines that best match these. 
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
        max_tokens=512,
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

    if attributes['drinkStats']['country'] and attributes['drinkStats']['region']:
        description += f"The wines should be from {attributes['drinkStats']['country']}, attributes['drinkStats']['region']"

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
    prefix = """Use all of these reccomendations to collate a list of wines that go well with mulitple of the foods:"""

    # combine reccomendations into a single menu
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt= reccomendations + prefix,
        temperature=0.7,
        max_tokens=1024,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    
    message = response.choices[0].text.strip()
    return message


def main():
    
    #api_key = "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"
    openai.api_key = api_key
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

    # specify attributes json files:
    attributes_files = ["attributes_fish.json", "attributes_cheese.json"]

    # get reccomendations for each file
    reccomendations = ""
    for file_name in attributes_files:
        file_path = os.path.join(base_dir, "backend/Prompt Generation", file_name)
        #save_empty_json(file_path)
        try:
            with open(file_path, 'r') as f:
                attributes = json.load(f)
        except FileNotFoundError:
            print("no such file")
            exit()

        # create description and get reccomendations
        description = generate_wine_description(attributes)
        reccomendation = get_reccomendation(str(description))
        reccomendations += "\n\nReccomendations for food:" + attributes['name'] + "\n" + reccomendation
        #print("RESPONSE:\n\n", reccomendation)

    print("\n\n\n")
    print(reccomendations)            

    
    # reccomend based on all reccomendations (not done yet)
    collated_reccomendations = collate_reccomendations(reccomendations)
    print("\n\nCOLLATED MENU:\n")
    print(collated_reccomendations)

    return 0

if __name__ == "__main__":
    main()



