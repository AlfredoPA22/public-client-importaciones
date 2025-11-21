import './ImageGallery.css';

interface ImageGalleryProps {
  images: string[];
  readOnly?: boolean;
}

const ImageGallery = ({ images, readOnly = false }: ImageGalleryProps) => {
  if (!images.length) {
    return <p className="empty-message">No hay imágenes disponibles</p>;
  }

  return (
    <div className={`image-gallery ${readOnly ? 'read-only' : ''}`}>
      {images.map((url, index) => (
        <figure key={url} className="image-card">
          <img src={url} alt={`Importación ${index + 1}`} />
        </figure>
      ))}
    </div>
  );
};

export default ImageGallery;

