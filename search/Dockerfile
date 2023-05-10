FROM python:3.10

COPY . /app

# RUN apk update \
#      apk add gcc

# COPY . /app

WORKDIR /app

EXPOSE 8000

RUN pip3 install -r requirements.txt

# ENTRYPOINT ["/bin/bash"]

ENTRYPOINT ["uvicorn","app:app"]