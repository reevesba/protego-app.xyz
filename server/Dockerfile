FROM python:3.10.4

LABEL Bradley Reeves "reevesbra@outlook.com"

ENV PYTHONUNBUFFERED 1

RUN mkdir -p /usr/src/app

# Update working directory
WORKDIR /usr/src/app

# copy everything from this directory to server/flask docker container
COPY . /usr/src/app/

# Give execute permission to below file, so that the script can be executed by docker.
RUN chmod 777 /usr/src/app/entrypoint.sh

# Install the Python libraries
RUN pip3 install --no-cache-dir -r requirements.txt

# Install protego from TestPyPI
RUN pip3 install -i https://test.pypi.org/simple/ protego

# COPY uswgi.ini
COPY ./uwsgi.ini /etc/uwsgi.ini

EXPOSE 5000

# run server
CMD ["./entrypoint.sh"]