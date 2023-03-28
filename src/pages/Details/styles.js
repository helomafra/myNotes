import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas:
    "header"
    "content";

  > main {
    grid-area: content;
    overflow-y: scroll;
    padding: 64px 0;
  }
`;

export const Links = styled.ul`
  list-style: none;

  > li {
    margin-top: 12px;

    a {
      color: ${({ theme }) => theme.COLORS.PRIMARY};
      word-break: break-all;
      text-decoration: underline;
    }
  }
`;

export const Content = styled.div`
  max-width: 550px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;

    align-items: center;

    > button:first-child {
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 4px;
      align-self: flex-start;
    }
  }

  .content {
    padding: 32px;
    margin-top: 32px;
    background: ${({ theme }) => theme.COLORS.BACKGROUND_700_OP};
    border-radius: 10px;

    > h1 {
      font-size: 36px;
      font-weight: 500;
    }

    p {
      font-size: 16px;
      margin-top: 16px;
      text-align: justify;
    }
  }

  > button:last-child {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: center;

    margin-top: 32px;
    margin-right: 20px;

    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.RED};
  }
`;
