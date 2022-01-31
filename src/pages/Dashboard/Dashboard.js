import './Dashboard.css';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import { FiMessageSquare, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // const { signOut } = useContext(AuthContext);
  const [chamados, setChamados] = useState([]);
  return (
    <div>
      <Header />
      <div className='content'>
        <Title name='Atendimentos'>
          <FiMessageSquare size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className='container dashboard'>
            <span>Nenhum chamado registrado</span>
            <Link to='/new' className='new'>
              <FiPlus size={25} color='#FFFFFF' />
              Novo Chamado
            </Link>
          </div>
        ) : (
          <>
            <Link to='/new' className='new'>
              <FiPlus size={25} color='#FFFFFF' />
              Novo Chamado
            </Link>
          </>
        )}


      </div>
    </div>
  )
}