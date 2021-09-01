import React from 'react'
import { saveAs } from 'file-saver';

export const SaveButton = () => {

    const downloadTargetImg = () => {
        const targetImg = document.querySelector(".targetImg");
        const targetImgPath = targetImg.getAttribute('src');
        const targetImgName = getTargetImgName(targetImgPath);

        saveAs(targetImgPath, targetImgName);
    }
    const getTargetImgName= (str) => {
        return str.substring(str.lastIndexOf('/')+1);
    }
    return(
        <button type="button" onClick={downloadTargetImg} className="btn btn-primary btn-block" >Save</button>
    )
}
