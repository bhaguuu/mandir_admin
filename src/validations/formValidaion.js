import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('Name is required'),
    phone: Yup.string().max(10).required('Number is required'),
    gotra: Yup.string().required('Gotra is required'),
    address: Yup.string().required('Address is required'),
    occupation: Yup.string().required('Occupation is required'),
    gender: Yup.string().required('Male is required'),
    email: Yup.string().required('Email is required'),
});

export const validateObject=(data)=>validationSchema.validate(data)