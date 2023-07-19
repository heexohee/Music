import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Link } from "react-router-dom";
//import { useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [cookie, setCookie] = useCookies(['User']);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState(true);
  const [password, setPassword] = useState('');
  const [pwState, setPwState] = useState(true);

  //const history = useHistory();

  const checkFrame = () => {
    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}[.]');
    if (regex.test(email)) setEmailState(false);
    else setEmailState(true);

    if (password.length >= 5) setPwState(false);
    else setPwState(true);

  }

  useEffect(() => {
    checkFrame()
  }, [email, password])


  const handleLogin = () => {

    if (emailState) {
      alert("이메일 형식이 아닙니다");
      return -1;
    }

    // 로그인 로직


    // 로그인 로직을 구현하고 성공 시에 다음 경로로 이동(메인페이지)
    axios.post('http://3.38.191.164/login', { id: email, password: password }) //로컬호스트가 아니라 주소가같아서 CORS 안켜도됨
      .then(response => {
        if (response.status === 201) {
          //토큰의 유효시간 부여
          /*             let expires = new Date();
                      expires.setMinutes(expires.getMinutes() + 1) */
          /*  console.log(response.data.token); */

          setCookie('User', response.data.token, {
            path: "/",
            expire: 0
          });

          alert("로그인!");
          navigate("/")
        }
      })

      .catch(error => {
        alert(error.response.data.message)
      });


  };



  return (
    <Wrap>
      <Box>
        <h1>로그인</h1>
        <form onSubmit={login} ref={formRef}>
          <label>사용자 이름</label>
          <input
            type="text"
            name="id"
            placeholder='사용자 이름을 입력해주세요.'
            required
          />
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder='비밀번호를 입력해주세요.'
            required
          />
          <ButtonGroup>
            <Button type="submit">로그인</Button>
            <Link to="/signup"><Button>회원가입</Button></Link>
          </ButtonGroup>
        </form>
      </Box>

      {
        emailState
          ?
          <StyledSpan>email 형식이 아닙니다</StyledSpan>
          :
          <></>
      }

      <Box>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호를 입력해주세요.'
        />
      </Box>
      {
        pwState
          ?
          <StyledSpan>PW 5자리 이상으로 해주세요.</StyledSpan>
          :
          <></>
      }


      <ButtonGroup>
        <Button onClick={handleLogin}>로그인</Button>
        <Link to="/register"><Button>회원가입</Button></Link>
      </ButtonGroup>

    </Wrap>
  );
};

export default Login;

const Wrap = styled.div`
  display: flex;
  color: aliceblue;
  flex-direction: column;
  padding: 5%;
  width: 100%;
  border: 1px solid black;
  gap: 10px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  color: aliceblue;
  flex-direction: column;
  width: 100%;
  height: 10vh;
  min-height: 50px;
  border-bottom: 2px solid darkolivegreen;
  gap: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: darkolivegreen;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
`;


const StyledSpan = styled.span`
  color: #f44646;;
  font-size:10px;
`;


