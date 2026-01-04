from fastapi import FastAPI

app=FastAPI()

@app.get('/')
def greeting():
    return("welcome to HOMEPAGE")

@app.get('/movies')
def msg():
    return("wait for the website to update to watch/stream movies")