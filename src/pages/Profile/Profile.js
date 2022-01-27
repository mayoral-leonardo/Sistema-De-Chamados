import { useState, useContext } from 'react';
import './Profile.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import avatar from '../../assets/images/avatar.png'
import { FiSettings, FiUpload } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

  return (
    <div>
      <Header />
      <div className='content'>
        <Title name='Meu Perfil'>
          <FiSettings size={25} />
        </Title>

        <div className='container'>
          <form className='form-profile'>
            <label className='label-avatar'>
              <span><FiUpload color='#FFFFFF' size={25} /></span>
              <input type='file' accept='image/*'></input>
              {avatarUrl === null ?
                <img src={avatar} width='250' alt='Foto de perfil do usuário' />
                : <img src={avatar} width='250' alt='Foto de perfil do usuário' />
              }
            </label>

            <label>Nome</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>

            <label>E-mail</label>
            <input type='text' value={email} disabled={true}></input>

            <button type='submit'>Salvar</button>
          </form>
        </div>

        <div className='container'>
          <button className='logout-btn' onClick={() => signOut()}>Sair</button>
        </div>
      </div>
    </div>
  )

}