import csv
import json

with open('backend/datasets/winemag/winemag-1-800.csv', 'r', encoding='utf-8') as csv_file:
    reader = csv.DictReader(csv_file)
    with open('winemag-data.jsonl', 'w') as jsonl_file:
        for row in reader:
            prompt = row['description']
            completion = row['title']
            data = {'prompt': prompt, 'completion': completion}
            jsonl_file.write(json.dumps(data) + '\n')
