import openai_secret_manager

assert "openai" in openai_secret_manager.get_services()
secrets = openai_secret_manager.get_secret("openai")

import openai
openai.api_key = secrets["api_key"]

import csv

csv_file = 'winemag-data.csv'

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        price = row['price']
        alcohol = row['alcohol']
        country = row['country']
        region = row['region']
        description = row['description']

        prompt = f"This wine from {region}, {country} has an alcohol content of {alcohol} and costs {price}. {description}"

        response = openai.Completion.create(
            engine="davinci",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7
        )

        generated_text = response["choices"][0]["text"]
        print(generated_text)