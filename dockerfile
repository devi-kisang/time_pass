FROM python:3.11-slim

WORKDIR /backend

COPY backend/requirement.txt .

RUN pip install --no-cache-dir -r requirement.txt

COPY /backend .

EXPOSE 8000

CMD ["uvicorn","main:app","--host","0.0.0.0","--port","8000"]