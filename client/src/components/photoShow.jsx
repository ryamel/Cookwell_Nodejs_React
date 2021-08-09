import React from 'react';
import { Link } from "react-router-dom";
import './photoShow.sass';
import photoIcon from '../media/icons/photo45.png';

if (process.env.NODE_ENV == 'production') {
   const imagesRecipe = require.context(process.env.PUBLIC_URL + '/user_recipes_img/card/', true);
   const imagesProfile = require.context(process.env.PUBLIC_URL + '/user_profile_img/card/', true);
} else {
   const imagesRecipe = require.context('../../public/user_recipes_img/card/', true);
   const imagesProfile = require.context('../../public/user_profile_img/card/', true);
}

  


const PhotoShow = React.forwardRef((props, ref) => {

   const displayImg = (file, fileName, fileObjURL, imageType) => {
      try {
         if (!file && !fileName && !fileObjURL) return null;

         if (!file && fileName && !fileObjURL) {
            if (imageType == 'recipe') var img = <img src={imagesRecipe(`./${fileName}`).default} />; // case of download from sever --> fileName only
            if (imageType == 'user') var img = <img src={imagesProfile(`./${fileName}`).default} />;
         }

         //if (fileObjURL) var img = <img src={fileObjURL} />;// case of upload on client --> file fileName fileObjURL

         return <div id='photo-container' className='clearfix'> {img} </div>;
      }
      catch(err) {
         console.log(err);
         return null;
      }
   }


   return (
      <React.Fragment>
         {  displayImg(props.file, props.fileName, props.fileObjURL, props.imageType)  }
         <label className='img-upload-btn'>
            <input className='fileUploadInput' ref={ref} onChange={props.onChange} type='file' name='file' />
            <img className='phIcon' src={photoIcon} />
            <div className='uploadText fileUpload'>
               Upload Image ( .png or .jpg file type )
            </div> 
         </label>
      </React.Fragment>
   );
})





export default PhotoShow;

