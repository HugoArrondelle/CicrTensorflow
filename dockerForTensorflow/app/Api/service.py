from flask import Flask, jsonify, request, render_template
from flask import send_file
from flask import Response

from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity


from werkzeug.utils import secure_filename
from bson import ObjectId

import cv2
import os
from pathlib import Path

from algorithme.skin_blemishes.test import *

from config import *


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


def skinUpload():
    if verifyToken(request.headers.get('Authorization')) :

        file = request.files['file']
        print("@@@@@@@@@@@@@@ file.append : ", file)
        file1 = request.files['masque']
        print("@@@@@@@@@@@@@@ file1.append : ", file1)



        filename0 = secure_filename(file.filename)
        filename1 = secure_filename(file1.filename)

        target = os.path.join(os.getcwd(),'temp')
        if not os.path.isdir(target):
            os.mkdir(target)
        destination0 = "/".join([target , filename0])
        destination1 = "/".join([target , filename1])
        file.save(destination0)
        file1.save(destination1)


        img = skin_blemishes(destination0, destination1)

        os.remove(destination0)
        os.remove(destination1)

        cv2.imwrite("oh.png", img)
        data=open("oh.png","rb")
        os.remove("oh.png")
        thedata=data.read()
        stored=fs.put(thedata,filename=filename0)

        date_limit = datetime.now() + timedelta(days=1)
        refresh_token = create_refresh_token(request.headers.get('current_user_mail'))
        dbtoken.update_one({'token': request.headers.get('Authorization')}, {"$set": {
          'token': refresh_token,
          'datetime' : date_limit
        }})

        data = []
        data.append({
                '_id': stored,
                'refresh_token': refresh_token,
                'request' : "201"
            })
        return (data)
    else :
        data = []
        data.append({
                'message': "Token not valide Test",
                'request' : "401"
            })
        return (data)
