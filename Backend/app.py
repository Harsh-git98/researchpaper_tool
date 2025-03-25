import streamlit as st
import pickle
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd
import torch
import io
import pickle
import torch



class CPU_Unpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if module == 'torch.storage' and name == '_load_from_bytes':
            return lambda b: torch.load(io.BytesIO(b), map_location='cpu')
        else:
            return super().find_class(module, name)

# Load the data using the custom unpickler
def load_data(pkl_file_path):
    with open(pkl_file_path, 'rb') as file:
        data = CPU_Unpickler(file).load()
    return data

# Load the data
pkl_file_path = "research_paper_model.pkl"  # Update this path
data = load_data(pkl_file_path)

df = data['df']
vectorizer = data['vectorizer']
knn = data['knn']
model = data['model']
paper_embeddings = data['paper_embeddings']

# Ensure PyTorch models/tensors are on CPU
if isinstance(model, torch.nn.Module):
    model.to(torch.device('cpu'))
if isinstance(paper_embeddings, torch.Tensor):
    paper_embeddings = paper_embeddings.to(torch.device('cpu'))

tfidf_matrix = vectorizer.fit_transform(df["combined_text"])

# Define the search functions
def find_similar_papers(query, top_n=5):
    query_vector = vectorizer.transform([query])
    # Assuming 'tfidf_matrix' is in the data
    if 'tfidf_matrix' in data:
        cosine_similarities = cosine_similarity(query_vector, data['tfidf_matrix']).flatten()
        top_indices = cosine_similarities.argsort()[-top_n:][::-1]
        return df.iloc[top_indices][["year", "title", "abstract"]]
    else:
        st.error("TF-IDF matrix not found in the data.")
        return None

def find_similar_papers_knn(query, top_n=5):
    query_vector = vectorizer.transform([query])
    distances, indices = knn.kneighbors(query_vector, n_neighbors=top_n)
    return df.iloc[indices[0]][["year", "title", "abstract"]]

def find_similar_papers_sbert(query, top_n=5):
    query_embedding = model.encode([query], convert_to_tensor=True)
    query_embedding = query_embedding.to(device)  # Move to CPU if necessary
    cosine_similarities = cosine_similarity(query_embedding, paper_embeddings).flatten()
    top_indices = cosine_similarities.argsort()[-top_n:][::-1]
    return df.iloc[top_indices][["year", "title", "abstract"]]

#

# Set up the Streamlit page
st.set_page_config(page_title="Research Paper Finder", layout="wide")
st.title("🔍 Research Paper Finder")
st.subheader("Discover relevant research papers based on your query and research topics")

# Input query
query = st.text_area("Describe your research:", height=100, placeholder="Enter your research description here.")

# Button to trigger search
if st.button("Search"):
    if query:
        st.subheader("\n📄 **Relevant Research Papers:**")
        
        # Find similar papers using KNN
        results = find_similar_papers_knn(query)
        
        if results is not None:
            for index, row in results.iterrows():
                # Use a container to group title and abstract in a box
                with st.container():
                    st.markdown(
                        f"""
                        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 10px; background-color: black; margin-bottom: 10px;">
                            <h4>{row['title']} </br>({row['year']})</h4>
                            <p><strong>Abstract:</strong> {row['abstract']}</p>
                        </div>
                        """,
                        unsafe_allow_html=True
                    )
        else:
            st.info("No relevant papers found. Please refine your query.")
    else:
        st.warning("Please enter a research query before searching.")