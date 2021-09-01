FROM python:3.8.10

WORKDIR /home/app

COPY ./requirements.txt /tmp

RUN pip install -r /tmp/requirements.txt --no-cache-dir

COPY ./app .
