import pandas as pd
import json

# Mount Google Drive
from google.colab import drive
drive.mount('/content/drive')


import pandas as pd

# Define file path (update with your actual path)
output_file = "/content/drive/My Drive/papers.csv"

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(output_file)

# Get the number of rows
num_rows = len(df)

# Print the number of rows
print("Number of rows in the output file:", num_rows)


from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity



# Define file path (update with your actual path)
output_file = "/content/drive/My Drive/papers.csv"

# Load the dataset
def load_data():
    df = pd.read_csv(output_file)
    df.dropna(inplace=True)  # Drop missing values if any
    df['combined_text'] = df['title'] + " " + df['abstract']  # Merge title and abstract for better results
    return df

df = load_data()




# TF-IDF Vectorizer
vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(df["combined_text"])



# Function to find similar research papers
def find_similar_papers(query, top_n=5):
    query_vector = vectorizer.transform([query])
    cosine_similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    top_indices = cosine_similarities.argsort()[-top_n:][::-1]
    return df.iloc[top_indices][["year", "title", "abstract"]]





# Train KNN Model
knn = NearestNeighbors(n_neighbors=5, metric="cosine")  # Use cosine similarity
knn.fit(tfidf_matrix)

# Function to find similar research papers using KNN
def find_similar_papers_knn(query, top_n=5):
    query_vector = vectorizer.transform([query])  # Convert query to vector
    distances, indices = knn.kneighbors(query_vector, n_neighbors=top_n)  # Find nearest papers

    return df.iloc[indices[0]][["year", "title", "abstract"]]


# Load SBERT Model
model = SentenceTransformer('all-MiniLM-L6-v2')  # A lightweight & fast BERT model
df = df.reset_index(drop=True)
# Compute embeddings
paper_embeddings = model.encode(df["combined_text"], convert_to_tensor=True)



# Find similar papers using SBERT
def find_similar_papers_sbert(query, top_n=5):
    query_embedding = model.encode([query], convert_to_tensor=True)
    cosine_similarities = cosine_similarity(query_embedding.cpu(), paper_embeddings.cpu()).flatten()
    top_indices = cosine_similarities.argsort()[-top_n:][::-1]
    return df.iloc[top_indices][["year", "title", "abstract"]]

# prompt: convert all above method to pkl file

import pickle

# Assuming you have all the necessary variables defined (df, vectorizer, knn, model, paper_embeddings)

# Create a dictionary to store all the necessary objects
data_to_save = {
    'df': df,
    'vectorizer': vectorizer,
    'knn': knn,
    'model': model,
    'paper_embeddings': paper_embeddings
}

# Specify the path to your pickle file
pkl_file_path = "/content/drive/My Drive/research_paper_model.pkl"

# Save the data to the pickle file
with open(pkl_file_path, 'wb') as file:
    pickle.dump(data_to_save, file)

print(f"Data saved to {pkl_file_path}")
# Command Line UI for cosine search
# Command Line UI for cosine search
def main():
    print("🔍 Research Paper Finder")
    print("Enter a short description of your research paper to find relevant papers.")

    query = input("Describe your research: ")

    if query:
        print("\n📄 Relevant Research Papers:")
        results = find_similar_papers(query)

        for index, row in results.iterrows():
            print(f"### {row['title']} ({row['year']})")
            print(row['abstract'])
            print("---\n")

if __name__ == "__main__":
    main()
