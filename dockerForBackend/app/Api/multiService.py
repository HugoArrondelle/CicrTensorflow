from flask import Flask, jsonify, request, render_template
from flask import send_file
from flask import Response


from werkzeug.utils import secure_filename

from bson import ObjectId

import os

import cv2

#from algorithme.align_faces.align_faces import *
from algorithme.background.background import *

from config import *
from pathlib import Path





def gray(image) :
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)


def background(image) :
    return remove_background(image)


def align(image) :
    return align_face(image)

def eyes(image="Ayoub", cord="Toulouse"):
    print("@@@@@@@@@@@@@@@ Hello Eyes: {}, {}".format(image, cord))
    # Un raitement des deux images par l'algo : image + cord
    # qui va return une image au final
    return image



switcher = {
        'background': background,
        'align': align,
        'eyes': eyes,
        'gray': gray
    }

def switcherService(image, index):
    func = switcher.get(index, "nothing")
    return func(image)

def recuFunction(image, index, myList=None, image2=None):
    if myList[0] == "eyes":
        #eyes(image, image2)
        img = eyes(image, image2)
    else:
        img = switcherService(image, myList[0])
    myList.remove(myList[0])
    index -= 1
    if index == 0:
        return img
    return recuFunction(img, index, myList, image2)


def multiService() :
    file = request.files['file']
    filename = secure_filename(file.filename)
    target = os.path.join(os.getcwd(),'temp')
    if not os.path.isdir(target):
        os.mkdir(target)

    print("header", request.headers.get('algo'))
    tabCheckBox = request.headers.get('algo').split(',')
    print("@@@@@@@ tabCheckBox1: " , tabCheckBox, type(tabCheckBox))

    tabCheckBox = list(filter(lambda element: element != "false", tabCheckBox))

    print("@@@@@@@ tabCheckBox2: " , tabCheckBox)
    destination = "/".join([target , filename])
    print("@@@@@@@ destination" , destination)
    file.save(destination)
    image = cv2.imread(destination)
    image2 = "HelloEyes"
    os.remove(destination)

    #img2 = switcherService(image, "background")
    img2 = recuFunction(image, len(tabCheckBox), tabCheckBox, image2)


    #img = align(image)
    #img2 = background(img)



    #cv2.imwrite("background.png", img)
    #destination2 = "/".join([os.getcwd() , "background.png"])
    #print("@@@@@@@ destination" , destination2)
    #image2 = cv2.imread(destination2)
    #os.remove(destination2)

    #img2 = background(image2)



    cv2.imwrite("oh.png", img2)
    data=open("oh.png","rb")
    os.remove("oh.png")
    thedata=data.read()
    stored=fs.put(thedata,filename=filename)
    datas = []
    datas.append({
            '_id': stored,
        })
    return (datas)
