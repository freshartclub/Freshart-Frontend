import * as Yup from 'yup';

export const formSchemas = Yup.object().shape({
  artworkname: Yup.string()
    .min(2, 'Artwork name must be at least 2 characters long')
    .required('Please enter your ArtworkName'),
  
  productDescription: Yup.string()
    .min(15, 'Product description must be at least 15 characters long')
    .required('Please enter your Product description'),

   baseprice:Yup.number()
   .required('Please enter base price'),

   weight:Yup.number()
   .required('Please enter product weight'),

   height:Yup.number()
   .required('Please enter product height'),

   lenght:Yup.number()
   .required('Please enter product lenght'),

   width:Yup.number()
   .required('Please enter product width'),

   discounpercentage:Yup.number()
   .required("Please enter discount percentage"),

   vatamount:Yup.number()
   .required("Please enter VAT Amount")
});