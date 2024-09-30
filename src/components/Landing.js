import React from 'react';
import AuthLinks from '../components/AuthLinks';
// eslint-disable-next-line import/no-unresolved
import Spline from '@splinetool/react-spline';

const Landing = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'DNFBitBitv2',
          fontSize: '36px',
          color: '#82d21c',
          marginBottom: '20px',
        }}
      >
        코테는 정말 귀여워
      </p>
      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        이동:{' '}
        <img src="/img/arrowkeys.png" alt="방향키" style={{ width: '40px' }} />{' '}
        or{' '}
        <img src="/img/mousekey.png" alt="마우스키" style={{ width: '40px' }} />{' '}
        / 점프:{' '}
        <img
          src="/img/spacekey.png"
          alt="스페이스바"
          style={{ width: '50px' }}
        />
      </p>
      <AuthLinks />
      <div
        style={{
          width: '100%',
          height: '70vh',
          marginTop: '20px',
        }}
      >
        <Spline scene="https://prod.spline.design/TSJQ8iJNUZqLcLLy/scene.splinecode" />
      </div>
    </div>
  );
};

export default Landing;
