import { toast } from 'react-toastify';

const handleServerError = (error) => {
  // Check the type of error and display corresponding toast message
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    if (error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Server Error. Please try again later.');
    }
  } else if (error.request) {
    // The request was made but no response was received
    toast.error('No response received from server. Please try again later.');
  } else {
    // Something happened in setting up the request that triggered an Error
    toast.error('An unexpected error occurred. Please try again later.');
  }
};

export default handleServerError;
