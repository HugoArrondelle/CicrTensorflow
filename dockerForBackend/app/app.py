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
from apscheduler.schedulers.background import BackgroundScheduler

from Api.User import *
from Api.Authentification import *
#from Api.multiService import *

from config import *


def timeToken():
    print("Verify if token is valid time")
    for doc in dbtoken.find():
        isDateValid = (datetime.now() > doc["datetime"])
        if isDateValid :
            dbtoken.delete_one({"token" : doc["token"] })
    return (print("Yes"))

scheduler = BackgroundScheduler()
scheduler.add_job(func=timeToken, trigger="interval", minutes=60)
scheduler.start()

@app.route('/')
def ping_server():
    return "Welcome to Ayoub's jungle."

def verifyToken(Token):
     isToken = dbtoken.find_one({"token" : Token })
     if isToken :
         isDateValid = (datetime.now() < isToken["datetime"])
         if isDateValid :
             print("@@@@@@@@@@@@@@@@@@@@@@ Token Time ok ")
             return True
         else :
             dbtoken.delete_one({"token" : Token })
             return False
     else :
         print("@@@@@@@@@@@@@@@@@@@@@@ Token not ok ")
         return False


# Routes users
@app.route('/users', methods=['POST'])
def createUsers():
    data = createUser()
    return jsonify(str(ObjectId(data[0]["_id"])))

@app.route('/users', methods=['GET'])
def usersGet():
    data = getUsers()
    return jsonify(data)

@app.route('/users/<id>', methods=['DELETE'])
def userDelete(id):
    return deleteUser(id)

@app.route('/signUp/<token>', methods=['DELETE'])
def tokenDelete(token):
    return deleteToken(token)


@app.route('/users/<id>', methods=['GET'])
def userGet(id):
  data = getUser(id)
  return jsonify(data)

@app.route('/users/<id>', methods=['PUT'])
def userUpdate(id):
  updateUser(id)
  return jsonify({'message': 'User Updated'})

@app.route('/mycount/<id>', methods=['PUT'])
def mycountUpdate(id):
  updateMycount(id)
  return jsonify({'message': 'User Updated'})

@app.route('/mycountPassword/<id>', methods=['PUT'])
def mycountPasswordUpdate(id):
  return updateMycountPassword(id)


@app.route('/requestUser', methods=['POST'])
def userRequest():
  requestUser()
  return jsonify({'message': 'Request valid'})

@app.route('/requestUser', methods=['GET'])
def requestGet():
    data = getRequest()
    return jsonify(data)

@app.route('/requestUser/<id>/<role>', methods=['GET'])
def requestValid(id,role):
    data = validRequest(id,role)
    return jsonify({'message': 'User Created'})

@app.route('/requestUser/<id>', methods=['DELETE'])
def requestDelete(id):
    return deleteRequest(id)

# Routes services
"""
@app.route('/multiService', methods=['POST'])
def serviceMulti():
    data = multiService()
    return jsonify({'_id': 'http://localhost:5000/img3/'+str(ObjectId(data[0]["_id"]))}),201
"""

# Routes Authentification
@app.route("/login", methods=["POST"])
def loginn():
    return login()

# DELETE button for Database
@app.route("/deleteImg/<id>", methods=['DELETE'])
def deleteImg(id):
    result = dbtest.delete_one({'_id': ObjectId(id)})
    print("@@@@@@@@@@@@@@@@@@@@ result: ", result)
    return jsonify({'message': 'Image Deleted'})


# reloadPage
@app.route("/reloadPage", methods=["POST"])
def reloadPage():
    if verifyToken(request.headers.get('Authorization')) :
        test = dbtoken.find_one({"token": request.headers.get('Authorization')})
        return jsonify({
                        'userName': test["userName"],
                        'email' : test["email"],
                        'role' : test["role"],
                        'idUser' : str(ObjectId(test['idUser']))
                        }), 201
    else :
        return jsonify({'message': "Token not valide"}), 401

@app.route('/getImg', methods=['GET'])
def getImgage():
    data = []
    for doc in dbtest.find():
        data.append({
            '_id': str(ObjectId(doc['_id'])),
        })
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@",data)
    return jsonify(data)

@app.route('/img3/<id>', methods=['GET'])
def getImg3(id):
    file = fs.get(ObjectId(id))
    response = Response(file.read(), content_type='image/jpeg')
    return response

@app.route('/hugo', methods=['GET'])
def getHugo():
    id = []
    for doc in dbtest.find().sort("_id", -1) :
        id.append({
            '_id': str(ObjectId(doc['_id'])),
        })
    return jsonify(id)


if __name__ == "__main__":
    app.run(debug=True)
