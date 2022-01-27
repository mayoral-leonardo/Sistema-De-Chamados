import { useContext } from 'react';
import './Header.css';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/images/avatar.png';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className='sidebar'>
      <div>
        <img src={user.avatarUrl === null || user.avatarUrl === undefined ? avatar : user.avatarUrl} alt='Imagem do usuário' />
      </div>
      <Link to='/dashboard'>
      <FiHome color='#FFFFFF' size={24}/>
        Chamados
      </Link>
      <Link to='/customers'>
      <FiUser color='#FFFFFF' size={24}/>
        Clientes
      </Link>
      <Link to='/profile'>
      <FiSettings color='#FFFFFF' size={24}/>
        Configurações
      </Link>
    </div>
  )
}