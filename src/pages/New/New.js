import { useState, useEffect, useContext } from 'react';
import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import './New.css';
import { FiPlus } from 'react-icons/fi';

export default function New() {
  const { id } = useParams();
  const history = useHistory();

  const [customers, setCustomers] = useState([]);
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customerSelected, setCustomersSelected] = useState(0);

  const [assunto, setAssunto] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [complemento, setComplemento] = useState('');

  const [idCostumer, setIdCostumer] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadId(lista) {
      await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot) => {
          setAssunto(snapshot.data().assunto);
          setStatus(snapshot.data().status);
          setComplemento(snapshot.data().complemento);

          const index = lista.findIndex(item => item.id === snapshot.data().clienteId);
          setCustomersSelected(index);
          setIdCostumer(true);
        })
        .catch((error) => {
          console.log('ERRO NO ID FORNECIDO', error);
          setIdCostumer(false);
        })
    }

    async function loadCustomers() {
      await firebase.firestore().collection('customers')
        .get()
        .then((snapshot) => {
          const lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia
            })
          })

          if (lista.length === 0) {
            console.log('NENHUMA EMPRESA ENCONTRADA');
            setCustomers([{ id: '1', nomeFantasia: '' }]);
            setLoadCustomers(false);
            return;
          }

          setCustomers(lista)
          setLoadCustomers(false);

          if (id) {
            loadId(lista);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoadCustomers(false);
          setCustomers([{ id: '1', nomeFantasia: '' }]);
        })
    }
    loadCustomers();
  }, [id])


  async function handleRegister(e) {
    e.preventDefault();

    if (idCostumer) {
      await firebase.firestore().collection('chamados').doc(id)
        .update({
          cliente: customers[customerSelected].nomeFantasia,
          clienteId: customers[customerSelected].id,
          assunto: assunto,
          status: status,
          complemento: complemento,
          userId: user.uid
        })
        .then(() => {
          toast.success('Chamado editado com sucesso !');
          setCustomersSelected(0);
          setComplemento('');
          history.push('/dashboard');
        })
        .catch((error) => {
          toast.error('Erro ao editar !');
          console.log(error);
        })

      return;
    }

    await firebase.firestore().collection('chamados')
      .add({
        created: new Date(),
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid
      })
      .then(() => {
        toast.success('Chamado registrado com sucesso !');
        setComplemento('');
        setCustomersSelected(0);
      })
      .catch((error) => {
        toast.error('Erro ao registrar');
        console.log(error);
      })
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  function handleChangeCustomers(e) {
    setCustomersSelected(e.target.value);
  }


  return (
    <div>
      <Header />

      <div className='content'>
        <Title name='Novo Chamado'>
          <FiPlus size={25} />
        </Title>

        <div className='container'>
          <form className='form-profile' onSubmit={handleRegister}>
            <label>Cliente</label>

            {loadCustomers
              ? (
                <input type='text' disabled={true} value='Carregando clientes...' />
              )
              : (
                <select value={customerSelected} onChange={handleChangeCustomers}>
                  {customers.map((item, index) => {
                    return (
                      <option key={item.id} value={index}>
                        {item.nomeFantasia}
                      </option>
                    )
                  })}
                </select>
              )}
            <br />
            <br />

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value='Suporte'>Suporte</option>
              <option value='Visita Tecnica'>Visita T??cnica</option>
              <option value='Financeiro'>Financeiro</option>
            </select>
            <br />
            <br />

            <label>Status</label>
            <div className='status'>
              <input
                type='radio'
                name='radio'
                value='Aberto'
                onChange={handleOptionChange}
                checked={status === 'Aberto'}
              />
              <span>Em aberto</span>

              <input
                type='radio'
                name='radio'
                value='Progresso'
                onChange={handleOptionChange}
                checked={status === 'Progresso'}
              />
              <span>Progresso</span>

              <input
                type='radio'
                name='radio'
                value='Atendido'
                onChange={handleOptionChange}
                checked={status === 'Atendido'}
              />
              <span>Atendido</span>
            </div>
            <br />
            <br />

            <label>Complemento</label>
            <textarea
              type='text'
              placeholder='Descreva seu problema (opcional)'
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button type='Submit'>Salvar</button>
          </form>
        </div>
      </div>
    </div>
  )
}