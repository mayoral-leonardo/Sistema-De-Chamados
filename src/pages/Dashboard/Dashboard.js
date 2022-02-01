import './Dashboard.css';
import { useState } from "react";
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Dashboard() {
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

            <table>
              <thead>
                <tr>
                  <th scope='col'>Cliente</th>
                  <th scope='col'>Assunto</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Cadastrado em</th>
                  <th scope='col'>#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label='Cliente'>Teste Cliente</td>
                  <td data-label='Assunto'>Teste Assunto</td>
                  <td data-label='Status'>
                    <span className='badge' style={{ backgroundColor: '#5CB85C' }}>Teste Status</span>
                  </td>
                  <td data-label='Cadastrado'>Teste Cadastrado</td>
                  <td data-label='#'>
                    <button className='action' style={{ backgroundColor: '#3583F6' }}>
                      <FiSearch color='#FFFFFF' size={17}/>
                    </button>
                    <button className='action' style={{ backgroundColor: '#F6A935' }}>
                      <FiEdit2 color='#FFFFFF' size={17}/>
                    </button>
                  </td>


                </tr>
              </tbody>
            </table>
          </>
        )}

      </div>
    </div>
  )
}