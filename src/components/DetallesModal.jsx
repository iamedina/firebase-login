import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function ProductDetailModal({ isOpen, onClose, producto }) {
    const [currentImage, setCurrentImage] = useState(0);
    if (!isOpen || !producto) return null;

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % producto.images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) =>
            prev === 0 ? producto.images.length - 1 : prev - 1
        );
    };

    return (
        <div className="fixed inset-0 z-50  flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.88)' }}>
            <div className="bg-white w-full max-w-4xl h-[80vh] rounded-xl shadow-xl relative overflow-hidden">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 text-gray-500 hover:text-red-500 cursor-pointer transition duration-300"
                >
                    <X size={28} />
                </button>

                <div className="flex flex-col md:flex-row gap-6 p-6 h-full justify-between">

                    <div className="relative w-full md:w-1/2 h-[50vh] md:h-full">
                        <img
                            src={producto.images[currentImage]}
                            alt="Product"
                            className="rounded-lg w-full h-full ms:h-[20vh] object-contain bg-gray-100"
                        />
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-blue-200 cursor-pointer"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-blue-200 cursor-pointer"
                        >
                            <ChevronRight />
                        </button>
                    </div>


                    <div className="w-full md:w-1/2 text-gray-800 overflow-y-auto pr-2 h-full flex flex-col justify-between">
                        <div>
                            <h2 className="md:text-3xl text-2xl font-bold text-black mb-2">{producto.title}</h2>
                            <p className="text-sm md:text-lg  text-gray-500 mb-1">Marca: <span className="font-semibold">{producto.brand}</span></p>
                            <p className="text-sm md:text-lg  text-gray-500 mb-1">Categoría: <span className="font-semibold capitalize">{producto.category}</span></p>
                            <div className="flex items-center gap-2 text-yellow-500 mb-2">
                                {'★'.repeat(Math.floor(producto.rating))}<span className="text-sm md:text-lg text-gray-500">{producto.rating} of 5</span>
                            </div>
                            <div className="text-sm md:text-lg  font-semibold text-green-600 mb-1">${producto.price}</div>
                            {producto.discountPercentage > 0 && (
                                <p className="text-red-500 text-sm  mb-2">-{producto.discountPercentage}% de descuento</p>
                            )}
                            <p className="text-gray-600 text-sm md:text-lg lg:text-xl  mb-4">{producto.description}</p>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow cursor-pointer">Agregar al carrito</button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg cursor-pointer">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailModal;
