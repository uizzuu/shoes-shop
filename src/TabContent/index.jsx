import { useEffect, useState } from "react";
import DetailInfo from "../TabInfo/DetailInfo";
import Shipping from "../TabInfo/Shipping";
import SizeGuide from "../TabInfo/SizeGuide";

function TabContent({ tabState, product, className }) {
  // fade 값으로 css를 지정하도록 ...
  let [fade, setFade] = useState('');
  // useEffect로 타이머를 설정
  // 0.2초 후에 fade = ani_end 로 바꿔줌
  useEffect(() => {
    let timer = setTimeout(() => {
        setFade('ani_end');
    }, 100);
    return(() => {
        clearTimeout(timer);
        setFade('');
    });
  }, [tabState]
);

  return (
    <div className={`ani_start ${fade} ${className || ''}`}>
      {[
        <DetailInfo product={product}/>,
        <SizeGuide />,
        <Shipping />, 
      ] [tabState]}
    </div>
  );
}

export default TabContent;
