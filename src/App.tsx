import  React,{ReactNode, useEffect, useState} from 'react';
import './App.css';
import {Routes , Route, Link} from 'react-router-dom'
import data from './data';
import Business from './scrollarea';

function App() {
  let [Content , setContent] = useState(false);
  const onToggle = () => {setContent(!Content)}

  
    const [mainTitle , setMainTitle] = useState('');
    let [count, setCount] = useState<number>(0);
    const completionWord = [`스포츠가 \n 문화와 만난다면?`,`나를 위한,\n나로 가득한,\n건강한 라이프스타일`,`함께 만들어가는\n스포츠 세상`,`카카오VX는\n 기술과 스포츠를 결합하여\n 건강한 세상을 만들어갑니다.`,``];
    
    const [after, setAfter] = useState(false);
    const [secondafter,setSecondAfter] = useState(false);
    const [firstafter,setFirstAfter] = useState(true);
    let [i, setI] = useState(0);

    let [style , setStyle] = useState(true);
    let [blinkcount, setBlinkCount] = useState(0);

    const [info, setInfo] = useState(data);

    const [position , setPosition] = useState(0);
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    console.log(scrollTop)

    function onScroll(){
      setPosition(window.scrollY);
    }

    useEffect(()=>{
      window.addEventListener('scroll',onScroll);
      return() => {
        window.addEventListener('scroll',onScroll)
      }
    },[]);


    interface infoProps{
      id?: number;
      title?: string;
      content?: string;
      img?: string;  
    };

    //글자 지우기
    useEffect(()=>{
      if(secondafter === true){
      const deleteinterval = setInterval(()=>{
        setMainTitle(mainTitle.slice(0,-1))
        setCount(count -1);
        if(count === 0){
          clearInterval(deleteinterval);
          setFirstAfter(true);
          setMainTitle('');
          setCount(0);
          setSecondAfter(false)

        }
        
      },70)      
      return () => clearInterval(deleteinterval)
    } 
    });
    

    //커서 깜빡임
    useEffect(()=>{
      if(after === true){
      const blinkInterval = setInterval(()=>{
        setBlinkCount(blinkcount + 1)
      }, 500);
      if(blinkcount % 2 !== 0){
        setStyle(false)
      }else{
        setStyle(true)
      }
      if(blinkcount === 6){
        clearInterval(blinkInterval);
        setBlinkCount(0);
        setSecondAfter(true);
        setAfter(false);

      }
      return () => clearInterval(blinkInterval)
     }
    });
  

    //글자 채우기
    useEffect(() => {
      if(firstafter === true){
      const interval = setInterval(() => {
          setMainTitle(mainTitle + completionWord[i][count]); // 이전 set한 문자 + 다음 문자
          setCount(count + 1); // 개수 만큼 체크 
      }, 120);
      if(count === completionWord[i].length)  {  // Count를 따로 두지 않고 Text.length 체크도 가능
          clearInterval(interval); // 문자열 체크를 통해 setInterval을 해제합니다
          setAfter(true);
          setFirstAfter(false);
          setSecondAfter(false);
          setI(i+1);
      }
      if(i === completionWord.length-1){
        setI(0);
      }
      return () => clearInterval(interval); // 언마운트시 setInterval을 해제합니다
     }
    });

     


    return (
    <div className = 'APP'>
      <header>
        <div className ={scrollTop >= 1700 ? 'head dark-tem' : 'head'}>
          <div className = {scrollTop >= 1700 ? 'logo logo-dark' : 'logo'}>
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
      <body className = {scrollTop >= 1700 ? 'bg-black dark-tem' : scrollTop >= 800 ? 'bg-grey' : ''} >
        <div className='inner'>
          <div className ='text'>
            <h4>{mainTitle}<i style={style ? {display : 'inline'} : {display : 'none'}}></i></h4>
          </div>
          <div className ='visual'>
            <img src='img/morphing2.gif'/>
          </div>
        </div>
        <section className ='container'>
            <span className='img-box'>
              <img src = 'img/scaleBg.jpg'/>
            </span>
            <div className='textBox'>
            <h3>스포츠 디지털 트랜스포메이션<br/> 컴퍼니 카카오 VX</h3>
            <p>카카오 VX는 카카오의 스포츠 전문 계열회사로 스크린 골프와 골프용품, 골프예약 플랫폼, 골프장 운영대행 등 다양한 사업을 전개하고 있습니다. 특히, 첨단 IT 기술에 스포츠와 헬스케어를 접목하는 등 디지털 혁신 가속화에 속도를 높이며 스포츠 업계의 게임 체인저로 기대를 모으고 있습니다.</p>
          </div>
          </section>
          <div className = 'service-zone'>
            <div className='title-box'>
              <p>서비스 소개</p>
              <h3>다양한 플랫폼을 통해<br/> 리얼하고 즐거운 경험을 연구합니다.</h3>
            </div>
          </div>
        <div className = "scroll-area">
          {
            info.map(info =>(
              
              <article className = 'business'>
                <h4>{info.title}</h4>
                <p>{info.content}</p>
                <div className ='arrow'>
                  <i></i><i></i><i></i>
                </div>
                <img src={info.img} className ="business-img"/>
              </article>
              
            ))
          }
        </div>
      </body>
    </div>
  );
}


export default App;
