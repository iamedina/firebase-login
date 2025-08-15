import { useState, useEffect } from "react";
import { Search } from "lucide-react"
import ModalImg from "./ModalImg";
import ProductDetailModal from "./DetallesModal";

function Fake() {
    const [productos, setProductos] = useState([]);
    const [copia, setCopia] = useState([]);
    const [buscar, setBuscar] = useState('');
    const [categoria, setCategoria] = useState('todas');
    const [categoriaArray, setCategoriaArray] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalDetail, setMostrarModalDetail] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const apiUrl = 'https://dummyjson.com/products?limit=200';

    const fake = async () => {
        const respuesta = await fetch(apiUrl);
        const datos = await respuesta.json();
        console.log(datos.products);
        setProductos(datos.products);
        setCopia(datos.products);

        const selectCategory = [...new Set(datos.products.map
            (producto => producto.category))];
        setCategoriaArray(selectCategory)
    }

    useEffect(() => {
        fake();
    }, []);

    const searchProductos = () => {
        fetch(`https://dummyjson.com/products/?title=${title}`)
            .then(response => response.json())
            .then(data => {
                setProductos(data.products)
            })
    }

    useEffect(() => {
        let filtrado = productos;

        if (buscar.trim()) {
            filtrado = filtrado.filter(producto =>
                producto.title.toLowerCase().includes(buscar.toLowerCase()) ||
                producto.description.toLowerCase().includes(buscar.toLowerCase())
            )
        }

        if (categoria !== 'todas') {
            filtrado = filtrado.filter(producto => producto.category === categoria); 
        }
        setCopia(filtrado);

    }, [buscar, categoria, productos]);

    {/*
    const palabras = ["Filo", "Papa", "Pedro", "Juegos", "Caperucita", "Pecas"]
    useEffect(() => {
        //esto es un ejemplo
        const nom = "HOLA"
        const minuscula = palabras.map(nombre => nombre.toLowerCase());
        console.log(minuscula)

        const results = palabras.filter((word) => word.includes('e'))
        console.log(results);
    }, []);{*/}

  console.log(productoSeleccionado)

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-6">Fake Store</h1>
            <p className="text-center text-gray-600 mb-6">Explora nuestra colección de productos</p>
            <section className="buscador flex flex-wrap justify-center items-center gap-4 p-6  bg-gray-100 rounded-lg shadow-sm">
                <div className="input-group relative">
                    <input
                        type="text"
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                        id="title"
                        placeholder="Buscar producto"
                        className="px-12 py-2 w-80 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        id="buscar"
                        onClick={() => searchProductos()}
                        className="cursor-pointer absolute left-0 top-0 bottom-0 text-gray-400 px-4 py-2 rounded-md transition"
                    >
                        <Search size={20} />
                    </button>
                </div>

                <select
                    name="categoria"
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="px-6 py-2 border w-80 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="todas">Todas las categorías</option>
                    {
                        categoriaArray.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))
                    }
                </select>

                <button id="limpiar-filtros" onClick={() => setBuscar('')} className="bg-gray-200 w-80 cursor-pointer px-6 py-2 rounded-md hover:bg-gray-300 transition">
                    Limpiar filtros
                </button>
            </section>

            <section className="section-cards p-10 rounded-lg grid grid-cols-1  sm:grid-cols-2  md:grid-cols-2  lg:grid-cols-3 gap-6 p-5">
                {
                    copia.map((items) => (
                        <article
                            key={items.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={items.images?.[0] || productos.thumbnail}
                                onClick={() => {setProductoSeleccionado(items); setMostrarModal(true)}}
                                className="w-full h-48 object-contain bg-gray-200 p-4 cursor-pointer hover:opacity-70 transition duration-300"
                            />
                            <div className="p-4 space-y-2">
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <p className="text-indigo-600 font-medium bg-indigo-200 rounded-xl px-2 ">{items.category}</p>
                                    <p className="text-green-600 font-bold">${items.price}</p>
                                </div>
                                <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                                    {items.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-3">{items.description.slice(0, 400)}</p>
                            </div>
                            <div className="mx-5 mt-2 mb-3 hover:scale-105 duration-300">
                                <button onClick={() => {setProductoSeleccionado(items); setMostrarModalDetail(true)}} className="bg-blue-600 rounded-md py-2 w-full font-semibold cursor-pointer">
                                    Ver detalles
                                </button>
                            </div>
                        </article>
                    ))
                }
            </section>
            <ProductDetailModal isOpen={mostrarModalDetail} onClose={() => setMostrarModalDetail(false)} producto={productoSeleccionado} />
            <ModalImg isOpen={mostrarModal} onClose={() =>setMostrarModal(false)} producto={productoSeleccionado} />
        </div>
    );
}

export default Fake