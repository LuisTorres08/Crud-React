

import { nanoid } from 'nanoid'
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
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    useEffect(()=>{

        const obtenerDatos = async () =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('películas').get()
                const array = data.docs.map(item =>(
                    {
                        id:item.id, ...item.data()
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

        if(!pelicula.trim()){
            setError('Campo pelicula vacío')
            return
        }

        if(!paisProduccion.trim()){
            setError('Campo pais producción vacío')
            return
        }

        if(!añoProduccion.trim()){
            setError('Campo año producción vacío')
            return
        }

        if(!genero.trim()){
            setError('Campo genero vacío')
            return
        }

        if(!produccion.trim()){
            setError('Campo producción vacío')
            return
        }

        if(!idioma.trim()){
            setError('Campo idioma vacío')
            return
        }

        if(!productora.trim()){
            setError('Campo productora vacío')
            return
        }

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
                {   id:nanoid(),
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
        setModoEdicion(false)
        setError(null)
    }

    const eliminar= async (id) =>{
        try{
            const db = firebase.firestore()
            await db.collection('películas').doc(id).delete()
            const aux = dataPeliculas.filter(item => item.id !== id)
            setDataPeliculas(aux)
        }catch(error){
            console.log(error)
        }
    }
    

    const editar = (item) =>{
        setPelicula(item.nombrePelicula)
        setPaisProduccion(item.nombrePaisProduccion)
        setAñoProduccion(item.nombreAño)
        setGenero(item.nombreGenero)
        setPaisProduccion(item.nombreProduccion)
        setIdioma(item.nombreIdioma)
        setProductora(item.nombreProductora)
        setModoEdicion(true)
        setId(item.id)
    }

    const editarPelicula = async e =>{
        e.preventDefault()

        
        if(!pelicula.trim()){
            setError('Campo pelicula vacío')
            return
        }

        if(!paisProduccion.trim()){
            setError('Campo pais producción vacío')
            return
        }

        if(!añoProduccion.trim()){
            setError('Campo año producción vacío')
            return
        }

        if(!genero.trim()){
            setError('Campo genero vacío')
            return
        }

        if(!produccion.trim()){
            setError('Campo producción vacío')
            return
        }

        if(!idioma.trim()){
            setError('Campo idioma vacío')
            return
        }

        if(!productora.trim()){
            setError('Campo productora vacío')
            return
        }
       
        try{
            const db= firebase.firestore()
            await db.collection('películas').doc(id).update({
                nombrePelicula: pelicula,
                nombrePaisProduccion: paisProduccion,
                nombreAño:añoProduccion,
                nombreGenero:genero,
                nombreProduccion:produccion,
                nombreIdioma:idioma,
                nombreProductora:productora
            })

           
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
        setModoEdicion(false)
        setError(null)

    }

    const cancelar =()=>{
        setPelicula('')
        setPaisProduccion('')
        setAñoProduccion('')
        setGenero('')
        setProduccion('')
        setIdioma('')
        setProductora('')  
        setModoEdicion(false)
        setError(null)
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Ficha tecnica de una pelicula</h1>
            <hr/>
            <div className='row'>

            <div>
                    <h4 className='text-center'> 
                    {
                        modoEdicion ? 'Editar Peliculas': 'Agregar Peliculas'
                    }
                    </h4>

                    <form onSubmit={modoEdicion ? editarPelicula: insertar}>
                    {
                     error ? <span className='text-danger'>{error}</span> : null
                    }
                    <div className='row'>
                        <div className='col-4'>
                         <label>Pelicula</label>
                            <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese la pelicula'
                            onChange={(e)=>setPelicula(e.target.value)}
                            />
                        </div>

                        <div className='col-4'>
                         <label>Pais</label>
                            <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese el pais de producción '
                            onChange={(e)=>setPaisProduccion(e.target.value)}
                            />
                            
                        </div>

                        <div className='col-4'>
                         <label>Año</label>
                            <input
                            className='form-control mb-2'
                            type="number"
                            placeholder='Ingrese el año de producción '
                            onChange={(e)=>setAñoProduccion(e.target.value)}
                            />
                            
                        </div>

                        <div className='col-4'>
                         <label>Genero</label>
                            <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese el genero'
                            onChange={(e)=>setGenero(e.target.value)}
                            />
                            
                        </div>

                        <div className='col-4'>
                         <label>Produccion</label>
                            <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese la produccion'
                            onChange={(e)=>setProduccion(e.target.value)}
                            />
                            
                        </div>

                        <div className='col-4'>
                         <label>Idioma</label>
                            <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese el idioma'
                            onChange={(e)=>setIdioma(e.target.value)}
                            />
                            
                        </div>

                        <div className='col-4'>
                         <label>Productora</label>
                            <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese la productora'
                            onChange={(e)=>setProductora(e.target.value)}
                            />
                            
                        </div>
                    </div>
                   
                     
                    {
                    !modoEdicion? (
                        <button className='btn btn-success btn-block' type='submit'>Insertar</button>
                     )
                     :
                     (  <>
                        <button className='btn btn-info btn-block' type='submit'>Editar</button>
                        <button className='btn btn-dark btn-block mx-2' onClick={() => cancelar()}>Cancelar</button>
                        </>
                     )
                    }

                </form>
                <br/>
                </div>

                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Pelicula</th>
                            <th>Pais produccion</th>
                            <th>Año produccion</th>
                            <th>Genero</th>
                            <th>Produccion</th>
                            <th>Idioma</th>
                            <th>Productora</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {dataPeliculas.map(item => (
                            <tr>
                                <td>{item.nombrePelicula}</td>
                                <td>{item.nombrePaisProduccion}</td>
                                <td>{item.nombreAño}</td>
                                <td>{item.nombreGenero}</td>
                                <td>{item.nombreProduccion}</td>
                                <td>{item.nombreIdioma}</td>
                                <td>{item.nombreProductora}</td>
                                <td><button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>Eliminar</button></td>
                                <td> <button className='btn btn-warning btn-sm float-end' onClick={()=> editar(item)} >editar</button></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                
                {/* <div className="col text-center">
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
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>Eliminar</button>
                                <button className='btn btn-warning btn-sm float-end' onClick={()=> editar(item)} >editar</button>
                            </li>
                        ))
                    }
                    </ul>
                </div> */}
                
            </div>
        </div>
    )

}

export default FormularioPeliculas
