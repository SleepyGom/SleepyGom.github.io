import React,{useEffect, useRef, useState} from 'react';
import './App.css';
import {Link} from 'react-router-dom'
import { Footer } from './App';
import CompanyData from './companydata';
import CompanyAddress from './address';


function Company (){
    let [Content , setContent] = useState(false);
    let scrollLength = document.documentElement.scrollTop;
    const onToggle = () => {setContent(!Content)}
    let [More , setMore] = useState(false);
    const moreToggle = ()=> {setMore(!More)};
    const [position, setPosition] = useState(0);
    const [ComData, setComData] = useState(CompanyData);
    const [AD,setAD] = useState(CompanyAddress)
    let [i , setI] = useState(0)
    
    function isScroll (){
        setPosition(window.scrollY);
    }
    useEffect(()=>{
        window.addEventListener('scroll',isScroll);
        return()=>{
        window.removeEventListener('scroll',isScroll);
        }
    },[]);
    

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
                                {
                                    ComData.map(inst => (
                                        <article className="archive">
                                            <div className="archive-content">
                                                <span className="year">{inst.year}</span>
                                                <p className="mg30">
                                                    {
                                                        inst.month.map((sec , el) => (
                                                            <>
                                                            <strong className="month">{sec}</strong>
                                                            <span className="happen">{inst.content[el]}</span>
                                                            </>
                                                        ))
                                                    }
                                                </p>
                                            </div>
                                        </article>
                                        
                                    ))
                                }
                    </div>
                </div>
                    <button className="history-more" onClick={moreToggle} >{More ? '접기' : '더보기'}</button>
            </div>
            <section className="company-list">
                {
                    AD.map(conAD => (
                        <div className="company-list-box">
                        <h3>{conAD.name}</h3>
                        <article className="company-address">
                            <p>{conAD.address}</p>
                            <div className="company-link">
                                <strong><Link to={`${conAD.target}`} target='_blank'>카카오맵 바로가기</Link></strong>
                                <Link to={`${conAD.target}`} target='_blank'><div className="circle"><i></i><i></i><i></i></div></Link>
                            </div>
                        </article>
                        <div className ="line"></div>
                    </div>
    
                    ))
                }
            </section>
            <Footer/>
        </div>
    )
}


export default Company