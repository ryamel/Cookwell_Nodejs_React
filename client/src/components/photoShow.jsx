import React from 'react';
import { Link } from "react-router-dom";
import './photoShow.sass';
import photoIcon from '../media/icons/photo45.png';

// need to use require context because usualy url reference will only work when the directory is inside the public folder. 

// if (process.env.NODE_ENV == 'production') {
//    //'/mnt/volume1/user_recipes_img/display/';
//    const imagesRecipe = require.context(path.join(process.env.PUBLIC_URL, 'user_recipes_img', 'card'), true);
//    const imagesProfile = require.context(process.env.PUBLIC_URL + '/user_profile_img/card/', true);
// } else {
//    const imagesRecipe = require.context('../../public/user_recipes_img/card/', true);
//    const imagesProfile = require.context('../../public/user_profile_img/card/', true);
// }


var recipeDirectory;
if (process.env.NODE_ENV == ) {
   //recipeDirectory = '/mnt/volume1/user_recipes_img/display/';
   recipeDirectory = '/user_recipes_img/display/';
} else {
   recipeDirectory = '/user_recipes_img/display/'; // dont use relative (or absolute) path for imgs URL. The root directory is public folder!
}



const PhotoShow = React.forwardRef((props, ref) => {

   const displayImg = () => {
      try {
         if (!props.file && !props.fileName && !props.fileObjURL) return null;

         if (!props.file && props.fileName && !props.fileObjURL) {
            // if (props.imageType == 'recipe') var img = <img src={imagesRecipe(`./${props.fileName}`).default} />; // case of download from sever --> fileName only
            // if (props.imageType == 'user') var img = <img src={imagesProfile(`./${props.fileName}`).default} />;
            if (props.imageType == 'recipe') var img = <img src={'/user_recipes_img/display/' + props.fileName} />; // case of download from sever --> fileName only
            if (props.imageType == 'user') var img = <img src={'/user_profile_img/display/' + props.fileName} />;
         }

         if (props.fileObjURL) var img = <img src={props.fileObjURL} />;// case of upload on client --> file fileName fileObjURL

         return <div id='photo-container' className='clearfix'> {img} </div>;
      }
      catch(err) {
         console.log(err);
         return null;
      }
   }


   return (
      <React.Fragment>
         {  displayImg()  }
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

