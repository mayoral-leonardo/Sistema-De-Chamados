import './Profile.css'
import Header from '../../components/Header/Header'
import Title from '../../components/Title/Title'
import { FiSettings } from 'react-icons/fi'

export default function Profile() {
  return (
    <div>
      <Header />
      <div className='content'>
        <Title name='Meu Perfil'>
          <FiSettings size={25}/>
        </Title>
      </div>
    </div>
  )

}