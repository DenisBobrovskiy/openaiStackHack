import csv
import json

path = 'backend/datasets/winemag/'
csv_files = [f'{path}winemag-1-800.csv', f'{path}winemag-801-1600.csv', f'{path}winemag-1601-2400.csv', f'{path}winemag-2401-3200.csv', f'{path}winemag-3201-4000.csv', 
             f'{path}winemag-4001-4800.csv', f'{path}winemag-4801-5600.csv', f'{path}winemag-5601-6400.csv', f'{path}winemag-6401-7200.csv', f'{path}winemag-7201-8000.csv', 
             f'{path}winemag-8001-8800.csv', f'{path}winemag-8801-9600.csv', f'{path}winemag-9601-10400.csv', f'{path}winemag-10401-11200.csv', f'{path}winemag-11201-12000.csv', 
             f'{path}winemag-12001-12800.csv']

with open('winemag-data.jsonl', 'w') as jsonl_file:
    for csv_file in csv_files:
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                price = row['price']
                alcohol = row['alcohol']
                country = row['country']
                region = row['region']
                description = row['description']
                prompt = f"This wine from {region}, {country} has an alcohol content of {alcohol} and costs {price}. {description}"
                completion = row['title']
                data = {'prompt': prompt, 'completion': completion}
                jsonl_file.write(json.dumps(data) + '\n')
