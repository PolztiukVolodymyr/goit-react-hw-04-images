import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from "./App.module.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Searchbar from "../Searchbar/Searchbar";
import searchImage from "../../services/Api";
import Loader from "../Loader/Loader";


export function App () {

  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [alt, setAlt] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!searchName) return;
    setLoading(true);
    setVisible(false);
    searchImage(searchName, page).then(data => {
      
    const images = data.hits.map(({ id, tags, webformatURL, largeImageURL }) => (
      { id, tags, webformatURL, largeImageURL }));
     
       if (images.length > 0) {
             setVisible(true);
              toast.success("We have found something for you!");
      } else {
               toast.warning("We haven't found anything on your request");
             setVisible(false);
      }
      setImages(state => [...state, ...images]);
      setLoading(false)
    }).catch(error => console.log(error.message))
        
    },[searchName, page])


  const hendleSubmit = evt => {
    setPage(1);
    setImages([]);
    setSearchName(evt);
  }

  const togleModal = () => {
    setShowModal(show => !show);
  }

  const onImgClick = (largeImageURL, alt) => {
    setLargeImageURL(largeImageURL);
    setAlt(alt);
    togleModal();
    
  }

  const onLoadMore = () => {
    setPage(state => state + 1);
  }

 
    return (
    
      <div className={css.Container}>
        <Searchbar onSubmit={hendleSubmit} />
        {loading && <Loader/>}
        <ImageGallery images={images} onClick={onImgClick} />
       
        {showModal && <Modal onClose={togleModal}>
          <img src={largeImageURL} alt={alt}/>
           {/* <button type="button" onClick={this.togleModal}>Close Modal</button> */}
        </Modal>}
        {visible && <Button onClick={onLoadMore}/>}
        
        <ToastContainer type="error" theme="colored" autoClose={3000}/>
    </div>
  )

}
