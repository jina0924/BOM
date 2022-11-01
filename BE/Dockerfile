FROM python:3.9.15
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install default-libmysqlclient-dev

WORKDIR /var/jenkins_home/workspace/thundervolt/BE

COPY . .
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools

RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
