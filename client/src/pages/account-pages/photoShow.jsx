import React from 'react';
import { Link } from "react-router-dom";
import './photoShow.sass';
import photoIcon from '../../media/icons/photo45.png';
const imagesRecipe = require.context('../../../public/user_recipes_img', true);
const imagesProfile = require.context('../../../public/user_profile_img', true);
  


const PhotoShow = React.forwardRef((props, ref) => {
   return (
      <React.Fragment>
         { 
            displayImg(props.file, props.fileName, props.fileObjURL, props.imageType)
         }
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


function displayImg(file, fileName, fileObjURL, imageType) {
   if (!file && !fileName && !fileObjURL) return null;

   if (!file && fileName && !fileObjURL) {
      if (imageType == 'recipe') var img = <img src={imagesRecipe(`./${fileName}`).default} />; // case of download from sever --> fileName only
      if (imageType == 'profile') var img = <img src={imagesProfile(`./${fileName}`).default} />;
   }

   if (fileObjURL) var img = <img src={fileObjURL} />;// case of upload on client --> file fileName fileObjURL

   return <div id='photo-container' className='clearfix'> {img} </div>;
}


export default PhotoShow;


{/*               <div id='photo-msg'>
                  An image on your profile identifies you as a contributor. 
                  And for other people to recognize your awesome recipes! 
                  It can be artwork, a logo, or just of you.
               </div>*/}