from flask import Flask , render_template , request, jsonify,url_for
import requests
import os

API_KEY = os.getenv("WEATHER_API_KEY")

app=Flask(__name__)

from dotenv import load_dotenv
load_dotenv()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_weather", methods=["POST"])
def get_weather():
    city=request.json.get("city")
    if not city:
        return jsonify({"error": "City is requires"}),400

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()
    if response.status_code != 200:
        return jsonify({"error": data.get("message", "Error fetching weather data")}), response.status_code

    weather_info = {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"],
        "icon": data["weather"][0]["icon"]
    }
    
    return jsonify(weather_info)
  
                
if __name__ == "__main__":
    app.run(debug=True)