from flask import Flask
import requests
import json
import random
import datetime
from datetime import date
import os
from dotenv import load_dotenv

load_dotenv()

apiKey = os.getenv('YOUTUBE_API_KEY')


api=Flask(__name__)

@api.route('/')
def home():
    return "Hi"

@api.route('/test')
def test():
    return "Y"

@api.route('/randomvid')
def generateRandomVid():
    startDate, endDate = generateRandDateRange()
    api_url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&publishedAfter=2021-01-01T00%3A00%3A00Z&publishedBefore=2021-02-01T00%3A00%3A00Z&q=How%20to%20&safeSearch=strict&key=[YOUR_API_KEY]"
    url_template = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=viewCount&publishedAfter=" + startDate + "T00%3A00%3A00Z&publishedBefore=" + endDate + "T00%3A00%3A00Z&q=How%20to%20&safeSearch=strict&key=" + apiKey
    response = requests.get(url_template)
    data = json.loads(response.text)
    
    vids = data['items']
    randVidInd = int(random.random()*(len(vids)-1))
    #print(vids[randVidInd]['id']['videoId'])
    url = "https://www.youtube.com/watch?v=" + str(vids[randVidInd]['id']['videoId'])
    #print(url)
    print(json.dumps(vids[randVidInd], indent=2))
    return vids[randVidInd]
    

@api.route('/profile')
def my_profile():
    return {
        "name": "Serena",
        "desc" : "A person"
    }
def generateRandDateRange():
    start_date = datetime.date(2017, 1, 1)
    end_date = date.today()

    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)

    print(random_date)
    next_day = random_date + datetime.timedelta(days=2)
    print(next_day)
    return(str(random_date), str(next_day))



