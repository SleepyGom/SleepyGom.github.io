import React,{useEffect, useRef, useState} from 'react';
import './App.css';
import {Link} from 'react-router-dom'


function Company (){
    let [Content , setContent] = useState(false);
    let scrollLength = document.documentElement.scrollTop;
    const onToggle = () => {setContent(!Content)}
    let [More , setMore] = useState(false);
    const moreToggle = ()=> {setMore(!More)};
    const [position, setPosition] = useState(0);
    
    function isScroll (){
        setPosition(window.scrollY);
    }
    useEffect(()=>{
        window.addEventListener('scroll',isScroll);
        return()=>{
        window.removeEventListener('scroll',isScroll);
        }
    },[])

    return(
        <div className ={scrollLength <= 700 ? 'company bg-black dark-tem' : 'company'}>
            <header>
                <div className ={scrollLength >= 700 ? 'head' : 'head dark-tem'}>
                <div className = {scrollLength >= 700 ? 'logo' : 'logo logo-dark'}>
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
            <div className ='company-top'>
                <div className ="company-top-text">
                    <p>카카오VX 소개</p>
                    <h3>우리는<br/>이런 회사예요</h3>
                </div>
                <div className ="earth">
                    <img src="img/eatrh.gif"/>
                </div>
            </div>
            <div className="company-content">
                <div className="content-title">
                    <h3>카카오VX가 걸어온 길</h3>
                </div>
                <div className="history" style={More ? {height:'2450px'} : {height:'1225px'}}>
                    <span className="half-bar"></span>
                    <span className="half-bar"></span>
                    <div className ="history-map">
                        <article className="archive">
                            <div className="archive-content">
                                <span className="year">2021</span>
                                <p className="mg30">
                                    <strong className="month">08</strong>
                                    <span className="happen">세라지오 골프클럽 운영 대행 계약 체결</span>
                                </p>
                                <p>
                                    <strong className="month">05</strong>
                                    <span className="happen">스크린 연습장 프렌차이즈 ‘프렌즈 아카데미’ 론칭</span>
                                </p>
                                <p>
                                    <strong className="month">02</strong>
                                    <span className="happen">KLPGA ‘한진선프로’ 메인 후원 계약 체결</span>
                                </p>
                            </div>
                        </article>
                        <article className="archive">
                            <div className="archive-content">
                                <span className="year">2020</span>
                                <p className="mg30">
                                    <strong className="month">09</strong>
                                    <span className="happen">카카오프렌즈 골프 골프공 ‘R’ 론칭</span>
                                </p>
                                <p>
                                    <strong className="month">08</strong>
                                    <span className="happen">플래그십 스토어 ‘카카오 VX 한남’ 오픈</span>
                                </p>
                                <p>
                                    <strong className="month">06</strong>
                                    <span className="happen">스크린 골프 브랜드 ‘프렌즈 스크린’통합</span>
                                </p>
                            </div>
                        </article>
                        <article className="archive">
                            <div className="archive-content">
                                <span className="year">2019</span>
                                <p className="mg30">
                                    <strong className="month">11</strong>
                                    <span className="happen">SKT와 ‘VR 서비스’ 파트너십 체결</span>
                                </p>
                                <p>
                                    <strong className="month">09</strong>
                                    <span className="happen">AI 홈트레이닝 서비스 ‘스마트홈트’ 론칭</span>
                                </p>
                                <p>
                                    <strong className="month">06</strong>
                                    <span className="happen">골프예약 서비스 ‘카카오골프예약’ 론칭</span>
                                </p>
                                <p>
                                    <strong className="month">04</strong>
                                    <span className="happen">골프용품 브랜드 ‘카카오프렌즈 골프’ 론칭</span>
                                </p>
                            </div>
                        </article>
                        <article className="archive">
                            <div className="archive-content">
                                <span className="year">2018</span>
                                <p className="mg30">
                                    <strong className="month">12</strong>
                                    <span className="happen">스카이뷰 골프클럽 운영 대행 계약 체결</span>
                                </p>
                                <p>
                                    <strong className="month">08</strong>
                                    <span className="happen">플래그십 스토어 ‘카카오 VX 판교’ 오픈</span>
                                </p>
                            </div>
                        </article>
                        <article className="archive">
                            <div className="archive-content">
                                <span className="year">2017</span>
                                <p className="mg30">
                                    <strong className="month">11</strong>
                                    <span className="happen">사명 변경 ‘(주) 카카오 VX’</span>
                                </p>
                                <p>
                                    <strong className="month">09</strong>
                                    <span className="happen">업계 최초 음성인식 AI 적용한 티업비전2 출시</span>
                                </p>
                                <p>
                                    <strong className="month">01</strong>
                                    <span className="happen">스크린 골프 기업 ‘지스윙’합병 발표</span>
                                </p>
                            </div>
                        </article>
                        <article className="archive">
                            <div className="archive-content">
                                <span className="year">2016</span>
                                <p className="mg30">
                                    <strong className="month">08</strong>
                                    <span className="happen">사회적기업 베어베터 장애인 연계 고용 협약</span>
                                </p>
                            </div>
                        </article>
                        <article className="archive">
                            <div className="archive-content">
                                <span className="year">2015</span>
                                <p className="mg30">
                                    <strong className="month">09</strong>
                                    <span className="happen">‘티업비전 아이템전’ 서비스 오픈</span>
                                </p>
                                <p className="mg30">
                                    <strong className="month">02</strong>
                                    <span className="happen">‘티업비전 마이 T-캐디’ 서비스 오픈</span>
                                </p>
                            </div>
                        </article>
                        <article className="archive">
                            <div className="archive-content">
                                <span className="year">2014</span>
                                <p className="mg30">
                                    <strong className="month">05</strong>
                                    <span className="happen">스크린 골프 브랜드 ‘티업비전’ 출시</span>
                                </p>
                            </div>
                        </article>
                        <article className="archive">
                            <div className="archive-content">
                                <span className="year">2013</span>
                                <p className="mg30">
                                    <strong className="month">05</strong>
                                    <span className="happen">중국 법인 太植(上海)商貿有限公司 설립</span>
                                </p>
                            </div>
                        </article>
                        <article className="archive">
                            <div className="archive-content">
                                <span className="year">2012</span>
                                <p className="mg30">
                                    <strong className="month">02</strong>
                                    <span className="happen">스크린 골프 브랜드 ‘티업(T-up)’ 론칭</span>
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
                    <button className="history-more" onClick={moreToggle} >{More ? '접기' : '더보기'}</button>
            </div>
        </div>
    )
}

export default Company