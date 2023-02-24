import  React,{ReactNode, useEffect, useRef, useState} from 'react';
import './App.css';
import {Routes , Route, Link} from 'react-router-dom'
import data from './data';
import interviewData from './interviewData';

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
    let [pagementCount,setPagementCount] = useState(1);
    let pagementRef = useRef<any>();
    let leftpagementRef = useRef<any>();
    let rightpagemnetRef = useRef<any>();

    const [info, setInfo] = useState(data);
    const [interview , setInterview] = useState(interviewData);

    const scrollTop = document.documentElement.scrollTop;

    const scrollRef = useRef<any>(null);
    let y = -0.815 * scrollTop + 1412.395;


    function leftclick(){
      if(pagementCount == 3){
        setPagementCount(2)
        pagementRef.current.style=`transform : translateX(-100vw)`
      }
      if(pagementCount== 2){
        setPagementCount(1)
        pagementRef.current.style=`transform : translateX(0)`
      }
    }

    function rightclick(){
      if(pagementCount == 1){
        setPagementCount(2)
        pagementRef.current.style=`transform : translateX(-100vw)`
      }
      if(pagementCount == 2){
        setPagementCount(3);
        pagementRef.current.style=`transform : translateX(-200vw)`
      }
    }


    function onScroll(){
      if(scrollTop>=1733 || scrollTop <= 3133){
        scrollRef.current.style =`margin-left : ${y}px`
      }
      if(scrollTop > 3133){
        scrollRef.current.style ='margin-left : -1141px'
      }
      if(scrollTop < 1733){
        scrollRef.current.style = 'margin-left : 0px'
      }
    }

    useEffect(()=>{
      window.addEventListener('scroll',onScroll);
      return()=>{
      window.addEventListener('scroll',onScroll);
      }
    })

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
          <div className ='scroll-section'>
        <div className = 'scroll-area'>
          <div className="scroll-ani" ref={scrollRef}>
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
        </div>
        </div>
        <div className ='recurit'>
          <div className ='title-box'>
            <p>채용</p>
            <h3>카카오 VX와 함께할<br/> 크루들을 기다리고 있습니다.</h3>
            <div className = 'support'>
              <p>지원하기</p>
            </div>
          </div>
        </div>
        <section className ='interview'>
          <div className="interview-inner" ref ={pagementRef}>
          {
            interview.map(inter =>(
            
            <div className ='interview-link'>
              <div className ='interview-img' style={{backgroundImage :`url(${inter.img})`}}>

              </div>
              <div className ='interview-post'>
              <h4>&quot;{inter.title}&quot;</h4>
              <p style={{padding : `10%`}}>{inter.content}</p>
              <div className="interview-name">
                <h3 style ={{color:'#4a4647'}}>{inter.name}</h3>
              </div>
              </div>
            </div>
            ))
          }
          </div>
        </section>
        <div className='pagement'>
          <div className = "left-pagement"  onClick={leftclick}><i></i><i></i></div>
            <h3>{pagementCount} / {interview.length}</h3>
            <div className ='right-pagement' onClick={rightclick}><i></i><i></i></div>
        </div>
        <section>
          <div className ="footer">
            <div className = "footer-inner">
              <div className="footer-left">
                <h1>(주)카카오VX 포트폴리오</h1>
                <p>
                  <span>대표이사 : ***</span>
                  <span>사업자 등록 번호 : *** - ** - *****</span>
                  <span>대표 번호 : **** - ****</span><br/>
                  <span>경기도 성남시 분당구 **** *** ****</span><br/>
                  <span>Copyright © Kakao VX Corp. All rights reserved</span>
                </p>
                <div className="footer-mn">
                  <Link to="">통합이용약관</Link>
                  <Link to="">위치기반서비스이용약관</Link>
                  <Link to="">개인정보처리방침</Link>
                  <Link to="">공지사항</Link>
                </div>
              </div>
              <div className ="footer-right">
                <span><img src="img/isms.png"/></span>
                <div className="text-certification">
                  <p><strong>인증범위</strong> 카카오VX 서비스 개발 및 운영(프렌즈스크린, 스마트홈트, 카카오골프예약, 카카오프렌즈 골프 등 서비스)</p>
                  <p><strong>유효기간</strong> 2021-08-04 ~ 2024-08-03</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </body>
    </div>
  );
}


export default App;
