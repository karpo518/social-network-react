import React, { useState } from "react";

import s from "./Paginator.module.css";


const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
  
  const calcPortionNumber = (pageNumber) => {    
    return  Math.floor(pageNumber/portionSize) + 1
  }

  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);

  let [portionNumber, setPortionNumber] = useState (calcPortionNumber(currentPage))

  let startPortion = (portionNumber - 1) * portionSize + 1
  let endPortion = (portionNumber - 1) * portionSize + portionSize

  const onPortionClick = (portionNumber) => {

    setPortionNumber(portionNumber)
  }

  const onPageClick = (pageNumber) => {

    onPageChanged(pageNumber)

    let newPortionNumber = calcPortionNumber(pageNumber)
    if(newPortionNumber !== portionNumber) {
      setPortionNumber(newPortionNumber)
    } 
  }

  return (

    <div className={s.pagination}>
        { portionNumber > 1 && 
          <>
          <span key={'1'} onClick={() => onPageClick(1)} >1</span> 
          <span onClick={() => onPortionClick(portionNumber -1)} className={s.beforePortion} >{'<<'}</span>
          </> 
        }

        {pages.filter(p => (p >= startPortion && p <= endPortion) ).map((p) => {
          return (
            <span
              key={p}
              onClick={() => onPageClick(p)}
              className={currentPage === p ? s.selectedPage : ""}
            >
              {p}
            </span>
          );
        })}

        { portionNumber < portionCount && 
          <>
          <span onClick={() => onPortionClick(portionNumber +1)} className={s.afterPortion} >{'>>'}</span>
          <span key={pagesCount} onClick={() => onPageClick(pagesCount)} >{pagesCount}</span>
          </> 
        }

    </div>
  );
};

export default Paginator;
