import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../lib/supabaseClient';

const Form = ({ isOpen, onClose, initialData }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (initialData) {
      setEmail(initialData.email || '');
      if (initialData.full_name) {
        const names = initialData.full_name.split(' ');
        setFirstName(names[0] || '');
        setLastName(names.slice(1).join(' ') || '');
      }
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log("User:", user, "User Error:", userError);
      if (userError) throw userError;
      if (!user) return;

      // Update password
      console.log("Updating password...");
      const { error: passwordError } = await supabase.auth.updateUser({ password: password });
      if (passwordError) {
        console.error("Password Update Error:", passwordError);
        throw passwordError;
      }

      // Update profile (upsert to handle case where row doesn't exist)
      console.log("Upserting profile...");
      const updates = { 
        id: user.id, 
        first_name: firstName, 
        last_name: lastName,
        full_name: initialData?.full_name || `${firstName} ${lastName}`,
        updated_at: new Date()
      };
      console.log("Updates:", updates);

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(updates);

      if (profileError) {
        console.error("Profile Upsert Error:", profileError);
        throw profileError;
      }

      console.log("Success! Closing modal.");
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Erro ao atualizar perfil: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <StyledForm onSubmit={handleSubmit}>
        <p className="title">Complete seu cadastro</p>
        <p className="message">Por favor, complete seu cadastro para continuar.</p>
        <div className="flex">
          <label>
            <input 
              required 
              placeholder="" 
              type="text" 
              className="input" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span>Nome</span>
          </label>
          <label>
            <input 
              required 
              placeholder="" 
              type="text" 
              className="input" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span>Sobrenome</span>
          </label>
        </div>
        <label>
          <input 
            required 
            placeholder="" 
            type="email" 
            className="input" 
            value={email}
            readOnly
          />
          <span>Email</span>
        </label>
        <label>
          <input 
            required 
            placeholder="" 
            type="password" 
            className="input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Senha</span>
        </label>
        <label>
          <input 
            required 
            placeholder="" 
            type="password" 
            className="input" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span>Confirmar senha</span>
        </label>
        <button className="submit">Enviar</button>
      </StyledForm>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 350px;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  background-color: whitesmoke;
  color: #212121;
  border: 1px solid #333;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #d30073;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #d30073;
  }

  .message,
  .signin {
    font-size: 14.5px;
    color: #333;
  }

  .signin {
    text-align: center;
  }

  .signin a:hover {
    text-decoration: underline green;
  }

  .signin a {
    color: #d30073;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  label {
    position: relative;
    width: 100%;
    
  }

  label .input {
    background-color: transparent;
    color: #000;
    width: 100%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  label .input + span {
    color: rgba(10, 10, 10, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  label .input:focus + span,
  label .input:valid + span {
    color: #d30073;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #d30073;
    font-size: 16px;
    transform: 0.3s ease;
    background-color: whitesmoke;
    border: 1px solid #d30073;
    cursor: pointer;
  }

  .submit:hover {
    background-color: #d30073;
    color: whitesmoke;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }`;

export default Form;
