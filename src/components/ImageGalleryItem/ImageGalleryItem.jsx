import PropTypes from 'prop-types';
import css from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({webformatURL, alt, onClick}) {
    return (
        <li className={css.ImageGalleryItem} onClick={onClick}>
            <img className={css.ImageGalleryItemImage} src={webformatURL} alt={alt} />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}