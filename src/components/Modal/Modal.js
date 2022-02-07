/* eslint-disable jsx-a11y/anchor-is-valid */
import './Modal.css';
import { FiX } from 'react-icons/fi';

export default function Modal({ conteudo, close }) {
  return (
    <div className='modal'>
      <div className='container'>
        <button className='close' onClick={close}>
          <FiX size={23} color='#FFFFFF' />
          Voltar
        </button>

        <div>
          <h2>Detalhes do chamado</h2>

          <div className='row'>
            <span>
              Cliente: <a>{conteudo.cliente}</a>
            </span>
          </div>

          <div className='row'>
            <span>
              Assunto: <a>{conteudo.assunto}</a>
            </span>
            <span>
              Cadastrado em: <a>{conteudo.createdFormated}</a>
            </span>
          </div>

          <div className='row'>
            <span>
              Status: <a style={{ color: '#FFFFFF', backgroundColor: conteudo.status === 'Aberto' ? '#5CB85C' : '#999999' }}>{conteudo.status}</a>
            </span>
          </div>

          {conteudo.complemento !== '' && (
            <>
              <h3>Complemento</h3>
              <p>
                {conteudo.complemento}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}