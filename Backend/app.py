from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()  # Load environment variables

app = FastAPI()

# MongoDB setup
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGODB_URL)
db = client["research_paper_db"]
searches_collection = db["searches"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load all models and data from single pickle file
pkl_file_path = "models_and_vectorizers.pkl"  # Update with your pickle file path

try:
    with open(pkl_file_path, "rb") as f:
        data = pickle.load(f)

    # Extract components
    vectorizer = data["vectorizer"]
    knn_papers = data["knn_papers"]
    interests_vectorizer = data["interests_vectorizer"]
    knn_interests = data["knn_interests"]
    papers_df = data["papers_df"]
    interests_df = data["interests_df"]

except Exception as e:
    raise RuntimeError(f"Error loading models: {str(e)}")

class QueryRequest(BaseModel):
    query: str

def find_similar_papers(query: str, top_n: int = 5):
    query_vector = vectorizer.transform([query])
    distances, indices = knn_papers.kneighbors(query_vector, n_neighbors=top_n)
    return papers_df.iloc[indices[0]][["year", "title", "abstract"]].to_dict(orient="records")

def find_similar_professors(query: str, top_n: int = 3):
    query_vector = interests_vectorizer.transform([query])
    distances, indices = knn_interests.kneighbors(query_vector, n_neighbors=top_n)
    return interests_df.iloc[indices[0]][["Name", "Field of Interest"]].to_dict(orient="records")



# Backend Work

@app.post("/search")
async def search_papers(request: QueryRequest):
    query = request.query.strip()
    if not query:
        return {"error": "Query cannot be empty"}
    
    try:
        papers = find_similar_papers(query)
        professors = find_similar_professors(query)
        
        # Save to MongoDB
        search_record = {
            "query": query,
            "papers_results": papers,
            "professors_results": professors,
            "timestamp": datetime.now()
        }
        await searches_collection.insert_one(search_record)
        
        return {
            "papers": papers,
            "professors": professors
        }
    except Exception as e:
        print(f"Error processing query: {e}")
        return {"error": "An error occurred while processing your query."}


@app.get("/search/history")
async def get_search_history():
    try:
        searches = []
        async for doc in searches_collection.find().sort("timestamp", -1).limit(50):
            doc["_id"] = str(doc["_id"])
            searches.append(doc)
        return {"history": searches}
    except Exception as e:
        print(f"Error fetching history: {e}")
        return {"error": "Failed to fetch search history"}
