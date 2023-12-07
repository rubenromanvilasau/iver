import './carousel.scss';

export const Carousel = ({ images, currentImage, handleImageClick }) => {
    return (
        <div className="flex flex-row justify-center overflow-y-hidden space-x-4">
        {
            images.length > 0 && images.map( image => (
                <img 
                    onClick={ () => { handleImageClick( image) } }
                    className={`w-24 h-24 cursor-pointer ${ currentImage.item_image_id === image.item_image_id ? 'opacity-50 border-4 border-blue-800' : '' }`}
                    key={ image.item_image_id } 
                    src={ image.image_url } 
                    // alt={ `${item.name}`}
                />
            ))
        }
        </div>   
    )
};  