import { useState } from "react";
import { ChevronLeft, ChevronRight, X} from "lucide-react";

function ModalImg({ isOpen, onClose, producto }) {
    const [indexActual, setIndexActual] = useState(0);
    if (!isOpen || !producto) return null;

    const total = producto.images?.length || 0;

    const siguiente = () => {
        setIndexActual((prev) => (prev + 1) % total);
    };

    const anterior = () => {
        setIndexActual((prev) => (prev - 1 + total) % total);
    };

    return (
        <div>
            {isOpen && (
                < div id="imageModal" className="fixed inset-0 flex items-center justify-center z-50 " style={{ backgroundColor: 'rgba(0, 0, 0, 0.82)' }}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-2xl w-full relative">

                        <div className="relative w-full flex justify-center items-center">
                            <button onClick={() => onClose(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold cursor-pointer">
                            <X />
                        </button>

                            <img
                                src={producto.images?.[indexActual]}
                                alt={`Producto ${indexActual + 1}`}
                                className="w-full max-h-[400px] object-contain rounded p-4"
                            />


                            <button
                                onClick={anterior}
                                className="absolute left-2 bg-white shadow p-2 rounded-full hover:bg-blue-100"
                            >
                                <span className="text-xl font-bold"><ChevronLeft/></span>
                            </button>


                            <button
                                onClick={siguiente}
                                className="absolute right-2 bg-white shadow p-2 rounded-full hover:bg-blue-100"
                            >
                                <span className="text-xl font-bold"><ChevronRight /></span>
                            </button>
                        </div>


                        < p className="text-sm text-black mt-2 ml-4 font-medium" >
                            Imagen {indexActual + 1} de {total}
                        </p>
                    </div>
                </div>
            )
            };
        </div >
    );
}

export default ModalImg;