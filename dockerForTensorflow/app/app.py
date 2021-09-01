from flask import Flask, jsonify, request, render_template
from flask import send_file
from flask import Response

from flask_pymongo import PyMongo
from pymongo import MongoClient
import gridfs
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from bson import ObjectId

from algorithme.skin_blemishes.test import *

import cv2
import numpy as np
import base64
import bcrypt
import time
from passlib.hash import pbkdf2_sha256 as sha256

from datetime import datetime, timedelta

from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity

from Api.service import *
from config import *

from apscheduler.schedulers.background import BackgroundScheduler


# Routes services
@app.route('/skin', methods=['POST'])
def align():
    data = skinUpload()
    if data[0]["request"] == "201" :
        return jsonify({'_id': 'http://localhost:5000/img3/'+str(ObjectId(data[0]["_id"])), 'refresh_token' : data[0]["refresh_token"]  }),201
    else :
        return jsonify({'message': data[0]["message"] }),401


@app.route('/img3/<id>', methods=['GET'])
def getImg3(id):
    file = fs.get(ObjectId(id))
    response = Response(file.read(), content_type='image/jpeg')
    return response


if __name__ == "__main__":
    app.run(debug=True)
