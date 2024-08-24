import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        nombreEmpresa: '',
        CorreoEmpresa: '',
        tipoVenta: '',
        pais: '',
        cedulaJuridica: '',
        tipoIdentificacion: '',
        logo: [] as File[], // Cambiado para manejar múltiples archivos
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, logo: Array.from(e.target.files) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('nombreEmpresa', formData.nombreEmpresa);
        data.append('CorreoEmpresa', formData.CorreoEmpresa);
        data.append('tipoVenta', formData.tipoVenta);
        data.append('pais', formData.pais);
        data.append('cedulaJuridica', formData.cedulaJuridica);
        data.append('tipoIdentificacion', formData.tipoIdentificacion);
    
        // Añadir todos los archivos seleccionados con el nombre esperado por el backend
        formData.logo.forEach((file, index) => {
            data.append('logo', file); // Cambiado para que coincida con el nombre esperado por la API
        });
    
        try {
            const response = await axios.post('http://localhost:3000/cliente', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);

            // Limpiar los campos del formulario después del envío
            setFormData({
                nombreEmpresa: '',
                CorreoEmpresa: '',
                tipoVenta: '',
                pais: '',
                cedulaJuridica: '',
                tipoIdentificacion: '',
                logo: [] as File[], // Limpiar los archivos subidos
            });
        } catch (error) {
            console.error('Error al crear el cliente', error);
        }
    };

    return (
        <div className="caja">
            <h1>Registro de Cliente</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre de la Empresa:</label>
                <input
                    type="text"
                    name="nombreEmpresa"
                    value={formData.nombreEmpresa}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label>Correo de la Empresa:</label>
                <input
                    type="email"
                    name="CorreoEmpresa"
                    value={formData.CorreoEmpresa}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label>Tipo de Venta:</label>
                <input
                    type="text"
                    name="tipoVenta"
                    value={formData.tipoVenta}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label>País:</label>
                <select
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona un país</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="México">México</option>
                    <option value="Colombia">Colombia</option>
                    {/* Añade más opciones según sea necesario */}
                </select>
                <br /><br />

                <label>Cédula Jurídica:</label>
                <input
                    type="text"
                    name="cedulaJuridica"
                    value={formData.cedulaJuridica}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label>Tipo de Identificación:</label>
                <input
                    type="text"
                    name="tipoIdentificacion"
                    value={formData.tipoIdentificacion}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label>Logo(s):</label>
                <input
                    type="file"
                    name="logo"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*" // Acepta cualquier formato de imagen
                /><br /><br />

                <input type="submit" value="Registrar"  onClick={handleSubmit}/>
            </form>
        </div>
    );
};

export default RegistrationForm;
