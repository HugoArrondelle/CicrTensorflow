
from flask import Flask, jsonify, request, render_template
from flask.globals import current_app
from passlib.hash import pbkdf2_sha256 as sha256
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from datetime import datetime, timedelta
from config import *



def login():
    if request.is_json:
        email = request.json["email"]
        password = request.json["password"]
    else:
        email = request.form["email"]
        password = request.form["password"]

    test = db.find_one({"email": email})
    if test :
        print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",test["password"])
        if sha256.verify(password, test["password"]) :
            print("@@@@@@@@@@@@@@@@@@@verify@@@@@@@@@@@@@@@" )
            access_token = create_access_token(identity=email)
            date_limit = datetime.now() + timedelta(days=1)
            dbtoken.insert({
              'token': access_token,
              'datetime' : date_limit,
              'idUser' : test["_id"],
              'email' : test["email"],
              'userName': test["name"],
              'role': test["role"]
            })
            print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ access_token: ", access_token)
            current_user = test["name"]
            current_role = test["role"]
            current_user_mail = test["email"]
            print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ current_user: ", current_user)
            return jsonify({'access_token':access_token, "current_user": current_user, "current_user_mail": current_user_mail, "current_role" : current_role}), 201
        else:
            print("@@@@@@@@@@@@@@@@@@@NOOOOOOTTTverify@@@@@@@@@@@@@@@" )
            return jsonify(message="Bad Email or Passwor"), 401
    else :
        return jsonify(message="Bad Email or Password"), 401


def deleteToken(token):
  dbtoken.delete_one({'token': token})
  return jsonify({'message': 'Token Deleted'})
