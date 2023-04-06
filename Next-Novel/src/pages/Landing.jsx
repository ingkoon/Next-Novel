import React from "react";
import style from '../components/landing/landing.module.css'
// import Block1 from '../components/landing/Block1'
// import Block2 from '../components/landing/Block2'
import Block3 from '../components/landing/Block3'
import Block4 from '../components/landing/Block4'

import Type1 from '../components/landing/Type1'
import Type2 from '../components/landing/Type2'
import Type3 from '../components/landing/Type3'
import Type4 from '../components/landing/Type4'
import Type5 from '../components/landing/Type5'
import Type6 from '../components/landing/Type6'
import Type7 from '../components/landing/Type7'
import Type8 from '../components/landing/Type8'
import Type9 from '../components/landing/Type9'
import Type99 from '../components/landing/Type99'

import Footer from '../components/common/Footer'

export default function Landing() {
  return (
    <div className={style.whole}>
        {/* <Block1 /> */}
        <Block3 />
        <Type1 />
        <Type2 />
        <Type3 />
        <Type4 />
        <Type5 />
        <Type6 />
        <Type7 />
        <Type8 />
        <Type9 />
        <Type99 />
        <Block4 />
        <Footer />
    </div>
  );
}