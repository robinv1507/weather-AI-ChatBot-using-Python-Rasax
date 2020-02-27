from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals
import requests

from rasa_sdk import Action
from rasa_sdk.events import SlotSet


class ActionWeather(Action):
    def name(self):
        return 'action_weather'

    def run(self, dispatcher, tracker, domain):
        loc = tracker.get_slot('location')
        print("location slot value=", loc)
        params = {
            'appid': '271d1234d3f497eed5b1d80a07b3fcd1',  # Put your API key
            'q': loc
        }
        api_result = requests.get('http://api.openweathermap.org/data/2.5/weather', params)
        api_response = api_result.json()
        #  print("api_response", api_response)
        print("response=", api_response['weather'][0]['description'])
        response = api_response['weather'][0]['description']
        dispatcher.utter_message(response)
    # return [SlotSet('location', loc)]
