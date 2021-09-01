from flask import Flask, jsonify, request, render_template
from flask_pymongo import PyMongo
from pymongo import MongoClient
import gridfs
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import datetime, timedelta


# Instantiation
app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://db'
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
#mongo = PyMongo(app)
jwt = JWTManager(app)
# Settings
CORS(app)

def mongo_conn():
    try:
        #conn = MongoClient(host='127.0.0.1', port='27017')
        #conn = MongoClient('mongodb://localhost:27017/pythonreact')
        conn = MongoClient( host='db',
                            port=27017,
                            authSource="admin"
                        )
        #conn = mongo.pythonreact
    #conn = MongoClient('mongodb://localhost')
        #return conn.grid_file
        return conn["pythonreact"]
    except Exception as e:
        print("erreur",e)



dbtest = mongo_conn()


# Database
fs = gridfs.GridFS(dbtest)
db = dbtest.pythonreact
dbtoken = dbtest.token
dbimg = dbtest.image
dbimg2 = dbtest.image2
dbtest = dbtest.fs.files
dbrequest = dbtest.request
