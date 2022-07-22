import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const KEY = "27654686-05934a78c08f4d5934ea79694";

async function searchImage(name, page) {
    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`)
    const selectedData = response.data;

    return selectedData;

}

export default searchImage;