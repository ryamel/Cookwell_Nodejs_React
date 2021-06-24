import React from 'react';
import { Link } from "react-router-dom";
import './photoShow.sass';
const images = require.context('../../../public/user_profile_img', true);




const PhotoShow = (props) => {

   // const check = images(`./${props.profileImg}`).default;
   //console.log(props.profileImg);

	return (
      <div id='photo-container' className='clearfix'>
         <label className='std-field-label ph-label'>
            User photo
         </label>
         {
            props.profileImg.length > 0 ? 
            <div id='img-container'>
               <img id='img-show' src={tryReqPath(props.profileImg)} />
            </div>
               : 
            <div id='photo-msg'>
               An image on your profile identifies you as a contributor. 
               And for other people to recognize your awesome recipes! 
               It can be artwork, a logo, or just of you.
            </div>
         }
      </div>
	);
}


function tryReqPath(image) {
   try {
      return images(`./${image}`).default;
   }
   catch (err) {
      console.log(err);
      return null;
   }
}


export default PhotoShow;


