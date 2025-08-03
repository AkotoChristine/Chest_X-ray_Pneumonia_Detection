from locust import HttpUser, task, between
import os

class PneumoniaPredictUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def predict_image(self):
        with open(r"C:\Users\Hp\Downloads\Chest_X-ray_Pneumonia_Detection\testing_locust.jpeg", "rb") as img:
            self.client.post("/predict", files={"file": img})
