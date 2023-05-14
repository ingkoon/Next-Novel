FROM python:3.10

COPY . /app

WORKDIR /app

EXPOSE 8000

RUN pip3 install -r requirements.txt

ENTRYPOINT ["uvicorn","app:app","--reload","--host=0.0.0.0","--port=8000"]