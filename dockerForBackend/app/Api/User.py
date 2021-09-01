
from flask import Flask, jsonify, request, render_template

from config import *

from passlib.hash import pbkdf2_sha256 as sha256

from bson import ObjectId


def createUser():
    email = request.json['email']
    # test = User.query.filter_by(email=email).first()
    test = db.find_one({"email": email})
    if test:
        return jsonify(message="User Already Exist"), 409
    else:
        print(request.json)
        id = db.insert({
          'name': request.json['name'],
          'email': request.json['email'],
          'password': sha256.hash(request.json['password']),
          'role': request.json['role'],
        })
        data = []
        data.append({
            '_id': id
        })
        return (data)

def createUserRequest(name, email , password):
    id = db.insert({
      'name': name,
      'email': email,
      'password': password,
      'role':"user"

    })
    data = []
    data.append({
        '_id': id
    })
    return (data)

def requestUser():
    email = request.json['email']
    # test = User.query.filter_by(email=email).first()
    test = db.find_one({"email": email})
    if test:
        return jsonify(message="User Already Exist"), 409
    else:
        print(request.json)
        id = dbrequest.insert({
          'name': request.json['name'],
          'email': request.json['email'],
          'password': sha256.hash(request.json['password']),
          'role': "user"
        })
        data = []
        data.append({
            '_id': id
        })
        return (data)


def getRequest():
    request = []
    for doc in dbrequest.find():
        request.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password'],
            'role':doc['role']
        })
    return (request)

def validRequest(id,role):
    request = dbrequest.find_one({'_id': ObjectId(id)})
    idInsert = db.insert({
      'name': request['name'],
      'email': request['email'],
      'password': request['password'],
      'role': role
    })
    dbrequest.delete_one({'_id': ObjectId(id)})
    return (idInsert)

def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password'],
            'role':doc['role']
        })
    return (users)

def getUser(id):
  user = db.find_one({'_id': ObjectId(id)})
  print(user)
  return ({
      '_id': str(ObjectId(user['_id'])),
      'name': user['name'],
      'email': user['email'],
      'password': user['password'],
      'role':user['role']
  })


def deleteUser(id):
  db.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'User Deleted'})


def deleteRequest(id):
  dbrequest.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'Request Deleted'})

def updateUser(id):
  db.update_one({'_id': ObjectId(id)}, {"$set": {
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password'],
    'role':request.json['role']
  }})
  return ("ok")

def updateMycount(id):
    db.update_one({'_id': ObjectId(id)}, {"$set": {
    'name': request.json['name'],
    'email': request.json['email']
    }})
    dbtoken.update_one({'idUser': ObjectId(id)}, {"$set": {
    'userName': request.json['name'],
    'email': request.json['email']
    }})
    return ("ok")

def updateMycountPassword(id):
    test = db.find_one({'_id': ObjectId(id)})
    if sha256.verify(request.json['password'], test["password"]) :
        if (request.json['newPassword'] == request.json['confirmPassword']) :
            db.update_one({'_id': ObjectId(id)}, {"$set": {
              'password': sha256.hash(request.json['newPassword'])
            }})
            return jsonify({'message': 'Password Update'})
        else :
            return jsonify({'message': 'The two passwords are different'})
    else :
        return jsonify({'message': 'Old incorrect password'})
