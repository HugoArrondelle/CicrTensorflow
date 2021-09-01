#%%
import sys
import cv2
import numpy as np
import tensorflow as tf
import neuralgym as ng
import matplotlib.pyplot as plt

from algorithme.skin_blemishes.inpaint_model import InpaintCAModel

def skin_blemishes(image_path, mask_path):
    FLAGS = ng.Config('./algorithme/skin_blemishes/inpaint.yml')
    checkpoint_dir = './algorithme/skin_blemishes/model_logs'
    model = InpaintCAModel()
    model = InpaintCAModel()
    image = cv2.imread(image_path)
    mask = cv2.imread(mask_path)
    assert image.shape == mask.shape

    h, w, _ = image.shape
    grid = 8
    image = image[:h//grid*grid, :w//grid*grid, :]
    mask = mask[:h//grid*grid, :w//grid*grid, :]
    image = np.expand_dims(image, 0)
    mask = np.expand_dims(mask, 0)
    input_image = np.concatenate([image, mask], axis=2)
    sess_config = tf.ConfigProto()
    sess_config.gpu_options.allow_growth = True
    with tf.Session(config=sess_config) as sess:
        input_image = tf.constant(input_image, dtype=tf.float32)
        output = model.build_server_graph(FLAGS, input_image)
        output = (output + 1.) * 127.5
        output = tf.reverse(output, [-1])
        output = tf.saturate_cast(output, tf.uint8)
        # load pretrained model
        vars_list = tf.get_collection(tf.GraphKeys.GLOBAL_VARIABLES)
        assign_ops = []
        for var in vars_list:
            vname = var.name
            from_name = vname
            var_value = tf.contrib.framework.load_variable(checkpoint_dir, from_name)
            assign_ops.append(tf.assign(var, var_value))
        sess.run(assign_ops)
        result = sess.run(output)
        return result[0][:, :, ::-1]
        sys.modules[__name__].__dict__.clear()


# %%
