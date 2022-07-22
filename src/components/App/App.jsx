import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from "./App.module.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Searchbar from "../Searchbar/Searchbar";
import searchImage from "../../services/Api";
import Loader from "../Loader/Loader";


export class App extends Component{

  state = {
    searchName: "",
    page: 1,
    showModal: false,
    loading: false,
    images: [],
    largeImageURL: "",
    alt: "",
    visible: false,
    };

  async componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
     try{    if (prevState.searchName !== searchName) {
        this.setState({ loading: true, images: [], page: 1, visible: false })
    }
       
    if (searchName !== prevState.searchName || page !== prevState.page) {
         const response = await searchImage(searchName, page)
         const images = response.hits.map(({ id, tags, webformatURL, largeImageURL }) => (
       { id, tags, webformatURL, largeImageURL }));
    

     if (images.length > 0) {
       this.setState({ visible: true })
        toast.success("We have found something for you!");
     } else {
      toast.warning("We haven't found anything on your request");
       this.setState({ visible: false })
     }
    
      this.setState((state) => ({ images: [...state.images, ...images], loading: false }));
      
       }
     } catch (eror) {
       console.log(eror.message);
     }
 
  }

  hendleSubmit = evt => {
    this.setState({ page: 1 });
    this.setState({ searchName: evt });
  }

  togleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal
    }))
  }

  onImgClick = (largeImageURL, alt) => {
    this.setState({ largeImageURL, alt });
    this.togleModal();
    
  }

  onLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  }

  render() {
    const { showModal, images, largeImageURL, alt, visible, loading} = this.state;
  
    return (
    
      <div className={css.Container}>
        <Searchbar onSubmit={this.hendleSubmit} />
        {loading && <Loader/>}
        <ImageGallery images={images} onClick={this.onImgClick} />
       
        {showModal && <Modal onClose={this.togleModal}>
          <img src={largeImageURL} alt={alt}/>
           {/* <button type="button" onClick={this.togleModal}>Close Modal</button> */}
        </Modal>}
        {visible && <Button onClick={this.onLoadMore}/>}
        
        <ToastContainer type="error" theme="colored" autoClose={3000}/>
    </div>
  )
}
}
