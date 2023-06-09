import './App.css';
import Matter from 'matter-js';
import {Link} from 'react-router-dom';
import React,{useEffect, useRef, useState} from 'react';
import RecruitData from './reqruitData';


function Recruit (){
  //basic
  let [Content , setContent] = useState(false);
  const onToggle = () => {setContent(!Content)}
  let scrollTop = document.documentElement.scrollTop;
  let [tabTog,setTabTog] = useState(true);
  function tabch(){
    setTabTog(false)
  }
  function tabchtrue(){
    setTabTog(true)
  }

    //matter.js
    const targetElem = useRef<HTMLDivElement>(null);
    const parentElem = useRef<HTMLDivElement>(null);
    const headerElem = useRef<HTMLDivElement>(null);
  
  useEffect(()=>{
  
  // module aliases
  let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;
      
  
  // create an engine
  let engine = Engine.create();
    
  // create a renderer
  const mobileWidthForRecruit = 760;
  const isMobileForRecruit = window.innerWidth < mobileWidthForRecruit;
  const w = window.innerWidth
  const h = window.innerHeight
  

  let render = Render.create({
      element: document.querySelector('.recruit-header') as HTMLElement,
      engine: engine,
      options: {
          width: w,
          height: h,
          showAngleIndicator: false,
          wireframes: false,
          // wireframes: true,
          background: 'transparent',
      },
  });
  
  function getRandomInt(min:number, max:number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
  }
  
  let defaultRectImageInfo = {
      type: "rectangle",
      path: "img/img_recruit_business.png",
      w: 1657,
      h: 604,
      xScale: 0.3,
      yScale: 0.3,
      charmferRadius: 10,
  };
  
  let defaultCircleImageInfo = {
      type: "circle",
      path: "img/obj_duck.png",
      w: 578,
      h: 578,
      xScale: 0.3,
      yScale: 0.3,
  };
  
  let defaultMobileRectImageInfo = {
      ...defaultRectImageInfo,
      xScale: 1,
      yScale: 1,
  };
  
  let defaultMobileCircleImageInfo = {
      ...defaultCircleImageInfo,
      xScale: 1,
      yScale: 1,
  };
  
  const minDesktopWidth = 1200;
  const minMobileWidth = 500;
  let decreaseRate = 1;
  if (window.innerWidth < minDesktopWidth) {
      decreaseRate = window.innerWidth / minDesktopWidth;
  } 
  defaultRectImageInfo["xScale"] = defaultRectImageInfo["xScale"] * decreaseRate;
  defaultRectImageInfo["yScale"] = defaultRectImageInfo["yScale"] * decreaseRate;
  defaultCircleImageInfo["xScale"] =defaultCircleImageInfo["xScale"] * decreaseRate;
  defaultCircleImageInfo["yScale"] =defaultCircleImageInfo["yScale"] * decreaseRate;
  
  // if Mobile, not use resizing the scale of objects
  /*
  if (isMobileForRecruit) {
      if (window.innerWidth < minMobileWidth) {
          decreaseRate = minMobileWidth / mobileWidthForRecruit;
      } else if (window.innerWidth < mobileWidthForRecruit) {
          decreaseRate = window.innerWidth / mobileWidthForRecruit;
      }
      defaultMobileRectImageInfo["xScale"] = defaultMobileRectImageInfo["xScale"] * decreaseRate;
      defaultMobileRectImageInfo["yScale"] = defaultMobileRectImageInfo["yScale"] * decreaseRate;
      defaultMobileCircleImageInfo["xScale"] = defaultMobileCircleImageInfo["xScale"] * decreaseRate;
      defaultMobileCircleImageInfo["yScale"] = defaultMobileCircleImageInfo["yScale"] * decreaseRate;
  } 
  */
  
  let imageInfos = [
      {
          ...defaultRectImageInfo,
          path: "img/img_recruit_business.png",
          w: 1684,
          h: 604,
      },
      {
          ...defaultRectImageInfo,
          path: "img/img_recruit_developer.png",
          w: 1833,
          h: 604,
      },
      {
          ...defaultRectImageInfo,
          path: "img/img_recruit_planner.png",
          w: 1533,
          h: 604,
      },
      {
          ...defaultRectImageInfo,
          path: "img/img_recruit_publishter.png",
          w: 1722,
          h: 604,
      },
      {
          ...defaultRectImageInfo,
          path: "img/img_recruit_designer.png",
          w: 1657,
          h: 604,
      },
      {
          ...defaultCircleImageInfo,
          path: "img/obj_smile.png",
          w: 1824,
          h: 1823,
      },
      {
          ...defaultCircleImageInfo,
          path: "img/obj_duck.png",
          w: 578,
          h: 578,
      },
      {
          ...defaultCircleImageInfo,
          path: "img/obj_gift.png",
          w: 716,
          h: 705,
      },
      {
          ...defaultCircleImageInfo,
          path: "img/obj_cake.png",
          w: 615,
          h: 605,
      },
  ];
  
  // Set the Left, Right, Bottom borders
  Composite.add(engine.world, [
      // Bot
      Bodies.rectangle(Math.ceil((w || 0) / 2), h + 20, (w || 0) * 2, 20, {
          isStatic: true,
      }),
      // Left
      Bodies.rectangle(-20, Math.ceil((h || 0) / 2), 20, h * 2, {
          isStatic: true,
      }),
      // Right
      Bodies.rectangle((w || 0) + 20, Math.ceil((h || 0) / 2), 20, h * 2, {
          isStatic: true,
      }),
  ]);
  
  let objs = [];
  let rectOverlapRate = 0.02;
  let circleOverlapRate = 0.1;
  let frictionAir = 0.01;
  let yDiff = 500;
  if (isMobileForRecruit) {
      rectOverlapRate = 0.1;
      circleOverlapRate = 0.4;
      frictionAir = 0.021;
      yDiff = 240;
  }
  const isBigDesktopForRecruit = window.innerWidth > 1920;
  if (isBigDesktopForRecruit) {
      imageInfos = [...imageInfos, ...imageInfos];
  }
  const numObj = imageInfos.length;
  
  // Sort imageInfos randomly
  imageInfos.sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < numObj; i++) {
      const centerX = Math.ceil((w || 0) / 4 * 3);
      const startPointX = getRandomInt(centerX, centerX + 50);
      const adjustedCenterY = Math.ceil(h - i * yDiff);
      const startPointY = getRandomInt(
          adjustedCenterY,
          adjustedCenterY + 50
      );
      const imageInfo = imageInfos[i];
  
      let bodyObj;
      if (imageInfo["type"] === "circle") {
          // Prototype of circle : Bodies.circle(x, y, radius, options={...somteOptions});
          const fixedScale = (imageInfo["xScale"] - circleOverlapRate) > 0 ? (imageInfo["xScale"] - circleOverlapRate) : 0.04;
          const radius = (imageInfo["w"] < imageInfo["h"] ? imageInfo["w"] : imageInfo["h"]) / 2;
          bodyObj = Bodies.circle(
              startPointX,
              startPointY,
              radius * fixedScale,
              {
                  friction: 1,
                  frictionAir: frictionAir,
                  render: {
                      sprite: {
                          texture: imageInfo["path"],
                          xScale: imageInfo["xScale"],
                          yScale: imageInfo["yScale"],
                      },
                  },
              }
          );
      } else {
          // Prototype of rectangle : Bodies.rectangle(x, y, w, h, options={...somteOptions});
          const fixedXScale = (imageInfo["xScale"] - rectOverlapRate) > 0 ? (imageInfo["xScale"] - rectOverlapRate) : 0.04;
          const fixedYScale = (imageInfo["yScale"] - rectOverlapRate) > 0 ? (imageInfo["yScale"] - rectOverlapRate) : 0.04;
          bodyObj = Bodies.rectangle(
              startPointX,
              startPointY,
              imageInfo["w"] * fixedXScale,
              imageInfo["h"] * fixedYScale,
              {
                  friction: 1,
                  frictionAir: frictionAir,
                  chamfer: { radius: 10 },
                  angle: getRandomInt(0, 180),
                  render: {
                      sprite: {
                          texture: imageInfo["path"],
                          xScale: imageInfo["xScale"],
                          yScale: imageInfo["yScale"],
                      },
                  },
              }
          );
      }
  
      objs.push(bodyObj);
  }


  // add all of the bodies to the world
  Composite.add(engine.world, objs);
  
  // run the renderer
  Render.run(render);
  
  // create runner
  let runner = Runner.create();
  
  // run the engine
  Runner.run(runner, engine);
},[])

  

    return(
    <>
    <header ref={headerElem}>
      <div className ={scrollTop >= 1700 ? 'head' : 'head dark-tem'}>
        <div className = {scrollTop >= 1700 ? 'logo' : 'logo logo-dark'}>
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

        <div className="recruit-area" ref={parentElem}>
            <div className="recruit-header" ref={targetElem} >
                
            </div>
        </div>
        <div className="recruit-text">
                <h4>카카오VX 만의<br/> 특별함</h4>
        </div>
        <div className="recruit-main">
            <div className="tabs">
                <ul>
                    <li onClick={tabchtrue} className="tab" ><a className={tabTog == true ? 'yellow-tag' : ''}>카카오VX 생활</a></li>
                    <li onClick={tabch} className="tab"><a className={tabTog == false ? 'yellow-tag' : ''}>인재 채용</a></li>
                </ul>
            </div>
            {
                tabTog == true ? <RecruitLife></RecruitLife> : <></>
            }
        </div>
    </>
    )
}

function RecruitLife (){
    const [Rdata , setRdata] = useState(RecruitData);
    let [PagementCount, setPagementCount] = useState(1);
    const MoveActionRef = useRef<any>();
    let Movelength = (PagementCount * window.innerWidth);
    
    function RpagementOnclick(){
        setPagementCount(PagementCount + 1)
        MoveActionRef.current.style.transform = `translateX(-${Movelength}px)`
        if(PagementCount === 6){
            setPagementCount(6)
        }
    };
    function LpagementOnclick(){
        setPagementCount(PagementCount -1)
        MoveActionRef.current.style.transform = `translateX(${window.innerWidth}-${Movelength}px)`
        if(PagementCount === 1){
           setPagementCount(1)
        }
    };
    console.log(window.innerWidth);
    console.log(PagementCount)
    console.log(Movelength)
    

    return(
        <div className="rel" >
            <div className="R-life" ref={MoveActionRef}>
            {
                Rdata.map(Redata => (
                <div className="R-back">
                    <div className ="R-textbox">
                        <div className="R-titlebox">
                            <div className ='titlenumber'>
                                {Redata.pagement}
                            </div>
                            <div className ="R-title">
                                {Redata.title}
                            </div>
                        </div>
                        <div className="R-pagement">
                            <div className="Left-pagement" onClick={LpagementOnclick}>
                                <i></i><i></i>
                            </div>
                            <div className="Right-pagement" onClick={RpagementOnclick}>
                                <i></i><i></i>
                            </div>
                        </div>
                    </div>
                </div>
    
                ))
            }
            </div>
        </div>
    )
}
export {Recruit , RecruitLife}