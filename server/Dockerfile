FROM python:3.6
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /opt/app/

COPY ./requirements.txt /opt/app/requirements.txt
RUN pip install -r /opt/app/requirements.txt

COPY . /opt/app/