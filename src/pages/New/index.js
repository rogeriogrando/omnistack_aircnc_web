import React, {useState, useMemo} from 'react';
import api from '../../services/api'

import './styles.css';
import camera from '../../assets/camera.svg'

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])  

  async function handleSubmit(event) {
    event.preventDefault();   

    const data = new FormData();
    const user_id = localStorage.getItem('user');
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);
    await api.post('/spots', data, {
      headers: {user_id}
    })

    history.push('/dashboard');

  }

  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />        <img src={camera} alt="Select img"/>
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs">TECNONOLIAS * <span>(separadas por visgula)</span></label>
      <input
        id="techs"
        placeholder="Qauis tecnologias usan?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">VALOR DA DIÁRIA * <span>(em brando para GRATUITO)</span></label>
      <input
        id="price"
        placeholder="Sua empresa incrível"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button className="btn">Cadastrar</button>
    </form>

  );

}
