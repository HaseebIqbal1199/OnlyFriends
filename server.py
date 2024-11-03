from flask import Flask,render_template,request,jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
app = Flask(__name__)

uri = "mongodb+srv://huzaifadev99:hTf9lFkQZnrWcbOt@cluster0.g0wyezg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("Connection error:", e)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=['POST'])
def chat():
    data = request.get_json()
    user = data.get("user_name")
    companion = data.get("companion_name")
    message = data.get("message")
    print(f"Data Recieved Username: ${user}, Companion: ${companion}")

    db = client[f"{user}with{companion}"]        # Replace with your database name
    collection = db[f"{user} and {companion}"]  # Replace with your collection name


    info_of_user = {
        "user": f"{user}",
        "to": f"{companion}"
    }

    data = {
        "user": f"{user}",
        "to": f"{companion}",
        "message": f"{message}",
        "timestamp": datetime.now()
    }

    # insertion
    data_push = collection.insert_one(data)
    if(data_push):
        last_message = collection.find(data).sort("timestamp", -1).limit(1)  # Sort by timestamp in descending order
        last_message_data = list(last_message)

    for msg in last_message_data:
        msg["_id"]=str(msg["_id"])

    print("New messsage", last_message_data)
    return jsonify({"newmsg":last_message_data})

@app.route("/previous_chat", methods=['POST'])
def previous_chat():
    data = request.get_json()
    user = data.get("user_name")
    companion = data.get("companion_name")
    print(user, companion)
    db = client[f"{user}with{companion}"]        # Replace with your database name
    collection = db[f"{user} and {companion}"]  # Replace with your collection name


    All_data01 = list(collection.find())
    for msg in All_data01:
        msg["_id"] = str(msg["_id"])

    db = client[f"{companion}with{user}"]        # Replace with your database name
    collection = db[f"{companion} and {user}"]
    All_data02 = list(collection.find())
    for msg in All_data02:
        msg["_id"] = str(msg["_id"])
    
    all_data = All_data01 + All_data02
    all_data.sort(key=lambda x: x["timestamp"])
    return jsonify({"all_messages": all_data})
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")