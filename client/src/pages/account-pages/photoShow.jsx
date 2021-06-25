import React from 'react';
import { Link } from "react-router-dom";
import './photoShow.sass';
import photoIcon from '../../media/icons/photo45.png';
const imagesRecipe = require.context('../../../public/user_recipes_img', true);
const imagesProfile = require.context('../../../public/user_profile_img', true);
  


const PhotoShow = React.forwardRef((props, ref) => {

   
   // const check = images(`./${props.profileImg}`).default;
   //console.log(photoIcon);

   return (
      <React.Fragment>
         { 
            props.profileImg.length > 0 &&
            <div id='photo-container' className='clearfix'>
               <img src={tryReqPath(props.profileImg, props.imageType)} />
            </div>
         }
         <label className='img-upload-btn'>
            <input className='fileUploadInput' ref={ref} onChange={props.onChange} type='file' name='file' />
            <img className='phIcon' src={photoIcon} />
            <div className='uploadText fileUpload'>
               { props.fileName ? props.fileName : 'Upload .png or .jpg file type'  }
            </div> 
         </label>
      </React.Fragment>
   );
})


function tryReqPath(image, imageType) {
   try {
      if (imageType == 'recipe') return imagesRecipe(`./${image}`).default;
      if (imageType == 'profile') return imagesProfile(`./${image}`).default;
   }
   catch (err) {
      console.log(err);
      return null;
   }
}


export default PhotoShow;


{/*               <div id='photo-msg'>
                  An image on your profile identifies you as a contributor. 
                  And for other people to recognize your awesome recipes! 
                  It can be artwork, a logo, or just of you.
               </div>*/}