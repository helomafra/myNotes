import styled from "styled-components";
import backgroundImg from "../../assets/background.png";

export const Container = styled.div`
  height: 100vh;

  display: flex;

  align-items: stretch;
  justify-content: space-between;

  p {
    margin-top: 8px;
  }

  img {
    width: 75%;
  }
`;

export const Form = styled.form`
  padding: 0 136px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  > h1 {
    font-size: 48px;
    color: ${({ theme }) => theme.COLORS.PRIMARY};
  }

  > p {
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  > h2 {
    font-size: 24px;
    margin: 48px 0;
  }

  > a {
    margin-top: 48px;
    color: ${({ theme }) => theme.COLORS.PRIMARY};
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center center;
  background-size: cover;
  opacity: 25%;
`;
