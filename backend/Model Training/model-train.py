# Import necessary libraries
import pandas as pd
import numpy as np
import torch
from sklearn.model_selection import train_test_split
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AdamW

# Load the dataset from a CSV file
df = pd.read_csv('winemag-data_first150k.csv')

# Split the dataset into training and validation sets
train_texts, val_texts, train_labels, val_labels = train_test_split(df['description'], df['points'], test_size=.2)

# Load a pre-trained language model tokenizer
tokenizer = AutoTokenizer.from_pretrained('bert-base-cased')

# Tokenize the texts and convert them to input tensors
train_encodings = tokenizer(list(train_texts), truncation=True, padding=True)
val_encodings = tokenizer(list(val_texts), truncation=True, padding=True)

train_labels = list(train_labels)
val_labels = list(val_labels)

# Convert the labels to tensors
train_labels = torch.tensor(train_labels)
val_labels = torch.tensor(val_labels)

# Load a pre-trained language model and add a classification head for the rating task
model = AutoModelForSequenceClassification.from_pretrained('bert-base-cased', num_labels=10)

# Set up the optimizer and scheduler for training
optimizer = AdamW(model.parameters(), lr=5e-5)
scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=1, gamma=0.9)

# Set up the training loop
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model.to(device)
model.train()

train_dataset = torch.utils.data.TensorDataset(torch.tensor(train_encodings['input_ids']), 
                                               torch.tensor(train_encodings['attention_mask']),
                                               train_labels)

train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=32, shuffle=True)

val_dataset = torch.utils.data.TensorDataset(torch.tensor(val_encodings['input_ids']), 
                                             torch.tensor(val_encodings['attention_mask']),
                                             val_labels)

val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=32, shuffle=True)

epochs = 3
for epoch in range(epochs):
    epoch_train_loss = 0
    for batch in train_loader:
        optimizer.zero_grad()
        batch = tuple(t.to(device) for t in batch)
        inputs = {'input_ids': batch[0],
                  'attention_mask': batch[1],
                  'labels': batch[2]}
        outputs = model(**inputs)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        epoch_train_loss += loss.item()
    epoch_train_loss /= len(train_loader)

    epoch_val_loss = 0
    model.eval()
    with torch.no_grad():
        for batch in val_loader:
            batch = tuple(t.to(device) for t in batch)
            inputs = {'input_ids': batch[0],
                      'attention_mask': batch[1],
                      'labels': batch[2]}
            outputs = model(**inputs)
            loss = outputs.loss
            epoch_val_loss += loss.item()
        epoch_val_loss /= len(val_loader)

    scheduler.step()
    model.train()

    print(f'Epoch {epoch+1}/{epochs} | Training Loss: {epoch_train_loss:.3f} | Validation Loss: {epoch_val_loss:.3f}')
