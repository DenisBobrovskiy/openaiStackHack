# Import necessary libraries
import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Define function to scrape wine reviews from Wine Enthusiast website
def scrape_reviews(url):
    # Send GET request to URL and parse HTML content
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all review sections on the page
    #reviews = soup.find_all('article', class_='review-item')
    reviews = soup.find_all('article', class_='communityReviewItem')

    # Extract data from each review
    data = []
    for review in reviews:
        # Extract wine name, vintage, and rating
        wine_name = review.find('h3', class_='title').get_text().strip()
        wine_vintage = review.find('span', class_='ratingVintage').get_text().strip()
        wine_rating = float(review.find('span', class_='rating').get_text().strip())
        print(wine_name)
        print("hi2")

        # Extract review text and clean it
        review_text = review.find('p', class_='description').get_text().strip()
        review_text = re.sub(r'[^\w\s]', '', review_text)
        review_text = review_text.lower()

        # Tokenize review text and remove stop words
        tokens = nltk.word_tokenize(review_text)
        stop_words = stopwords.words('english')
        tokens = [token for token in tokens if token not in stop_words]

        # Lemmatize tokens
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(token) for token in tokens]

        # Append data to list
        data.append([wine_name, wine_vintage, wine_rating, ' '.join(tokens)])

    # Convert data to DataFrame
    df = pd.DataFrame(data, columns=['Wine Name', 'Vintage', 'Rating', 'Review'])

    return df

# Example usage: Scrape wine reviews for Chardonnay wines from Wine Enthusiast website
#url = 'https://www.winemag.com/?s=chardonnay&drink_type=wine'
url = 'https://www.vivino.com/GB/en/casaloste-gran-selezione-chianti-classico/w/6447592?year=2015&price_id=18761496'
df = scrape_reviews(url)
print(df.head())