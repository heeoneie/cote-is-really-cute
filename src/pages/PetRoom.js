import React, { useEffect } from 'react';
// import { AppContext } from '../App';

const PetRoom = () => {
  // const { userExp } = useContext(AppContext);
  const userExp = 0; //임시 변수
  const level = Math.floor(userExp / 100) + 1;

  useEffect(() => {
    // 스크립트가 이미 로드된 경우 중복 로딩 방지
    if (
      !document.querySelector(
        'script[src="https://unpkg.com/@splinetool/viewer@1.9.27/build/spline-viewer.js"]',
      )
    ) {
      const script = document.createElement('script');
      script.src =
        'https://unpkg.com/@splinetool/viewer@1.9.27/build/spline-viewer.js';
      script.type = 'module';
      document.body.appendChild(script);
    }
  }, []);

  // 레벨에 따라 다른 Spline URL을 렌더링
  const getRoom = (level) => {
    if (level > 2) {
      return 'https://prod.spline.design/tl3S3KKaSASoiAnl/scene.splinecode'; // 레벨 3 이상
    } else if (level > 1) {
      return 'https://prod.spline.design/BbXVJz7rx7U5FvcP/scene.splinecode'; // 레벨 2
    } else {
      return 'https://prod.spline.design/pI2VvHNgRZPe6A2i/scene.splinecode'; // 레벨 1
    }
  };

  const getItem = (level) => {
    if (level > 2) {
      return 'https://prod.spline.design/neyrs1rGnFWxMNm0/scene.splinecode'; // 레벨 3 이상
    } else if (level > 1) {
      return 'https://prod.spline.design/R1QC1a2qPpz6j3VM/scene.splinecode'; // 레벨 2
    } else {
      return 'https://prod.spline.design/wd2lp0v8GDqU0Utg/scene.splinecode'; // 레벨 1
    }
  };

  return (
    <div
      style={{
        display: 'flex', // Flexbox를 사용하여 가로 정렬
        width: 'calc(100vw - 290px)', // 메뉴바를 제외한 너비
        height: '100vh', // 전체 화면 높이
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        flexDirection: 'row', // 가로 방향으로 배치
        alignItems: 'center', // 수직 중앙 정렬
        justifyContent: 'space-between', // 콘텐츠 사이의 공간을 균등하게 배분
      }}
    >
      <spline-viewer
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          minWidth: '300px',
          minHeight: '300px',
        }} // flex: 1로 가용 공간을 차지하도록 설정
        url={getRoom(level)}
      ></spline-viewer>
      <div
        style={{
          width: '250px',
          margin: '0',
          padding: '10px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <div
          style={{
            height: '350px',
            border: '5px solid #d9d9d9',
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            margin: '10px',
          }}
        >
          <p>다음 레벨 아이템</p>
          <p>Lv. {level + 1}</p>
          <spline-viewer
            style={{ width: '80%', height: '180px' }} // 크기 조정
            url={getItem(level)}
          ></spline-viewer>
        </div>
      </div>
    </div>
  );
};

export default PetRoom;
