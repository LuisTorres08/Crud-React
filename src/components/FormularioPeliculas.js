

import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase'

const FormularioPeliculas = () => {

    const [pelicula, setPelicula] = useState('')
    const [paisProduccion, setPaisProduccion ] = useState('')
    const [añoProduccion, setAñoProduccion] = useState('')
    const [genero, setGenero] = useState('')
    const [produccion, setProduccion] = useState('')
    const [idioma, setIdioma] = useState('')
    const [productora, setProductora] = useState('')
    const [dataPeliculas, setDataPeliculas] = useState([])

    useEffect(()=>{

        const obtenerDatos = async () =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('películas').get()
                const array = data.docs.map(item =>(
                    {
                        ...item.data()
                    }
                ))
                setDataPeliculas(array)

            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos()

    })

    const insertar = async (e) =>{
        e.preventDefault()

        try{
            const db = firebase.firestore()
            const nuevapelicula = {
                nombrePelicula:pelicula,
                nombrePaisProduccion:paisProduccion,
                nombreAño:añoProduccion,
                nombreGenero:genero,
                nombreProduccion:produccion,
                nombreIdioma:idioma,
                nombreProductora:productora
            }
            await db.collection('películas').add(nuevapelicula)
            setDataPeliculas([...dataPeliculas,
                {
                    nombrePelicula: pelicula,
                    nombrePaisProduccion: paisProduccion,
                    nombreAño:añoProduccion,
                    nombreGenero:genero,
                    nombreProduccion:produccion,
                    nombreIdioma:idioma,
                    nombreProductora:productora
                }
            ])
        }catch(error){
            console.log(error)
        }

        setPelicula('')
        setPaisProduccion('')
        setAñoProduccion('')
        setGenero('')
        setProduccion('')
        setIdioma('')
        setProductora('')  
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Ficha tecnica de una pelicula</h1>
            <hr/>
            <div className='row'>

            <div>
                    <h4 className='text-center'>Insertar Peliculas</h4>
                    <form onSubmit={insertar}>
                    <input
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese pelicula'
                    onChange={(e)=>setPelicula(e.target.value)}
                    />
                     <input
                     className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese pais'
                    onChange={(e)=>setPaisProduccion(e.target.value)}
                    />
                     <input
                     className='form-control mb-2'
                    type="number"
                    placeholder='Ingrese año'
                    onChange={(e)=>setAñoProduccion(e.target.value)}
                    />
                     <input
                     className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese genero'
                    onChange={(e)=>setGenero(e.target.value)}
                    />
                     <input
                     className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese produccion'
                    onChange={(e)=>setProduccion(e.target.value)}
                    />
                     <input
                    type="text"
                    placeholder='Ingrese idioma'
                    onChange={(e)=>setIdioma(e.target.value)}
                    />
                     <input
                     className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese productora'
                    onChange={(e)=>setProductora(e.target.value)}
                    />
                    <button type='submit'>Agregar</button>

                </form>
                </div>
                
                <div className="col text-center">
                    <h4 className="text-center">Listado Peliculas</h4>
                    <ul className="col-sm- list-group">
                    {
                        dataPeliculas.map((item, index)=>(
                            <li className='list-group-item' key={index}>
                                <span className='lead'>
                                    {item.nombrePelicula} - 
                                    {item.nombrePaisProduccion} -
                                    {item.nombreAño} -
                                    {item.nombreGenero} -
                                    {item.nombreProduccion} -
                                    {item.nombreIdioma} -
                                    {item.nombreProductora}
                                    </span>
                                <button className='btn btn-danger btn-sm float-end mx-2' >Eliminar</button>
                                <button className='btn btn-warning btn-sm float-end' >editar</button>
                            </li>
                        ))
                    }
                    </ul>
                </div>
                
            </div>
        </div>
    )

}

export default FormularioPeliculas