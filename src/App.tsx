import  React,{ReactNode, useEffect, useState} from 'react';
import './App.css';
import {Routes , Route, Link} from 'react-router-dom'

function App() {
  let [Content , setContent] = useState(false);
  const onToggle = () => {setContent(!Content)}

  
    const [mainTitle , setMainTitle] = useState('');
    let [count, setCount] = useState<number>(0);
    const completionWord = `나를 위한,\n 나로 가득한,\n 건강한 라이프.`;

    let [style , setStyle] = useState(true);
    let [blinkcount, setBlinkCount] = useState(0);



    useEffect(()=>{
      const deleteinterval = setInterval(()=>{
        setMainTitle(mainTitle.slice(0,-1))
      },100)
      return () => clearInterval(deleteinterval)
    })  

    useEffect(()=>{
      const blinkInterval = setInterval(()=>{
        setBlinkCount(blinkcount + 1)
        console.log(blinkcount)
      }, 500);
      if(blinkcount % 2 !== 0){
        setStyle(false)
      }else{
        setStyle(true)
      }
      if(blinkcount === 6){
        clearInterval(blinkInterval);
      }
      return () => clearInterval(blinkInterval)
    });

    useEffect(() => {
      const interval = setInterval(() => {
          setMainTitle(mainTitle + completionWord[count]); // 이전 set한 문자 + 다음 문자
          setCount(count + 1); // 개수 만큼 체크 
      }, 100);
      if(count === completionWord.length)  {  // Count를 따로 두지 않고 Text.length 체크도 가능
          clearInterval(interval); // 문자열 체크를 통해 setInterval을 해제합니다
          
      }
      return () => clearInterval(interval); // 언마운트시 setInterval을 해제합니다
     });

     


    return (
    <div className = 'APP'>
      <header>
        <div className ='head'>
          <div className = 'logo'>
            <Link to='/'></Link>
          </div>
          <div className='top_nav'>
            <Link to='/company'>카카오 vx 소개</Link>
            <div className='service' onClick={onToggle}>서비스</div>
            <Link to='/recruit'>크루영입</Link>
            <Link to='/alliance'>사업제휴</Link>
          </div>
          <div className={Content ? 'service_nav open' : 'service_nav'}>
                <Link to='/service/screen'>스크린골프</Link>
                <Link to='/service/goods'>골프용품</Link>
                <Link to='/service/homet'>헬스케어</Link>
                <Link to='/service/booking'>골프예약</Link>
                <Link to='/service/smartgolf'>스마트 골프장</Link>
                <Link to='/service/contract'>골프장 운영대행</Link>
                <Link to='/service/vr'>VR</Link>
            </div>
        </div>
      </header>
      <body>
        <div className='inner'>
          <div className ='text'>
            <h4>{mainTitle}<i style={style ? {display : 'inline'} : {display : 'none'}}></i></h4>
          </div>
          <div className ='visual'>
            <img src='img/morphing2.gif'/>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
