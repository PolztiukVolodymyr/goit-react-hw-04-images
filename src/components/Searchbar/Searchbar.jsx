import { useState } from "react";
import {BiSearchAlt} from 'react-icons/bi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from "./Searchbar.module.css";

export default function Searchbar({onSubmit}) {

    const [value, setValue] = useState("");

 const  handleChangeInput = evt => {
       setValue(evt.target.value);
    }

  const handleFormSubmit = evt => {
        evt.preventDefault();
        if (value.trim() === "") {
            toast.error("Enter a search value, please!");
            return;
        }
        onSubmit(value);
        setValue("");
        
    }

   
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleFormSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                        <BiSearchAlt size={32}/>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={value}
                        onChange={handleChangeInput}
                    />
                </form>
            </header>);
    
};



Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};