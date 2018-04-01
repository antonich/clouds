FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
COPY start.sh /start.sh
COPY mydatabase /mydatabase

# EXPOSE port 8000 to allow communication to/from server
# EXPOSE 8080

# CMD specifcies the command to execute to start the server running.
CMD ["/code/start.sh"]
# done!