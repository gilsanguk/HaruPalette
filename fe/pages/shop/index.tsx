import { ColorTypes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import Header from '../../components/common/Header';
import Model from '../../components/common/Model';
import ShopNav from '../../components/nav/ShopNav';
import useTheme from '../../hooks/useTheme';
import { useAppDispatch } from '../../hooks/reduxHook';
import { setCompIdx } from '../../store/modules/shop';

const ShopPage = styled.div<{ theme: ColorTypes }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.background};
`;
const DiaryStyles = styled.div<{ theme: ColorTypes }>`
  width: 100vw;
  height: calc(100vh - 5.5rem);
  padding-top: 5.5rem;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.background};
`;

function Shop() {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(setCompIdx(0));
  }, []);
  return (
    <ShopPage theme={theme}>
      <DiaryStyles theme={theme}>
        <Header />
        <Model />
        <ShopNav />
      </DiaryStyles>
    </ShopPage>
  );
}

export default Shop;
