from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app=FastAPI()

@app.get('/api')
def greeting():
    return{"message":"Welcome to Homepage"}


@app.get('/movies')
def msg():
    return("wait for the website to update to watch/stream movies")