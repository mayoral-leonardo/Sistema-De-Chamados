import { useState, useContext } from 'react';
import './Profile.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import avatar from '../../assets/images/avatar.png'
import { FiSettings, FiUpload } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import { toast } from "react-toastify";

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))
      } else {
        alert('Envie uma imagem do tipo JPEG ou PNG');
        setImageAvatar(null);
        return null;
      }
    }
  }


  async function handleUpload() {
    const currentUid = user.uid;
    const uploadTask = await firebase.storage()
      .ref(`images/${currentUid}/${imageAvatar.name}`)
      .put(imageAvatar)
      .then(async () => {
        console.log('FOTO ENVIADA COM SUCESSO!');

        await firebase.storage().ref(`images/${currentUid}`)
          .child(imageAvatar.name).getDownloadURL()
          .then(async (url) => {
            let urlFoto = url;

            await firebase.firestore().collection('users')  
              .doc(user.uid)
              .update({
                avatarUrl: urlFoto,
                name: name
              })
              .then(() => {
                let data = {
                  ...user,
                  avatarUrl: urlFoto,
                  name: name
                };
                setUser(data);
                storageUser(data);
              })

          })
      })
  }

  async function handleSave(e) {
    e.preventDefault();

    if (imageAvatar === null && name !== '') {
      await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          name: name
        })
        .then(() => {
          let data = {
            ...user,
            name: name
          }
          setUser(data);
          storageUser(data);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Ops... algo deu errado !');
        })
    }

    else if (name !== '' && imageAvatar !== null) {
      handleUpload()
    }
  }

  return (
    <div>
      <Header />
      <div className='content'>
        <Title name='Meu Perfil'>
          <FiSettings size={25} />
        </Title>

        <div className='container'>
          <form className='form-profile' onSubmit={handleSave}>
            <label className='label-avatar'>
              <span><FiUpload color='#FFFFFF' size={25} /></span>
              <input type='file' accept='image/*' onChange={handleFile}></input>
              {avatarUrl === null ?
                <img src={avatar} width='250' alt='Foto de perfil do usuário' />
                : <img src={avatarUrl} width='250' alt='Foto de perfil do usuário' />
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