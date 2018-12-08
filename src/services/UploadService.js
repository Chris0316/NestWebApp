import axios from '../utils/Request';

const api = {
  uploadImage: '/images'
};

let UploadService = {
  uploadImage(image, type, callback) {
    let configs = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    let params = new FormData();
    params.append('image', image);
    params.append('type', type);
    axios.post(api.uploadImage, params, configs).then(res => {
      callback(res);
    })
  }
};

export default UploadService;
