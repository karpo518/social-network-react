import React, { FC, useState } from "react";
import cn from 'classnames'
import s from "./Paginator.module.css";

type Props = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize?: number
}

const Paginator: FC<Props> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
  
  const calcPortionNumber = (pageNumber: number) => {    
    return  Math.floor(pageNumber/portionSize) + 1
  }

  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);

  let [portionNumber, setPortionNumber] = useState (calcPortionNumber(currentPage))

  let startPortion = (portionNumber - 1) * portionSize + 1
  let endPortion = (portionNumber - 1) * portionSize + portionSize

  const onPortionClick = (portionNumber: number) => {

    setPortionNumber(portionNumber)
  }

  const onPageClick = (pageNumber: number) => {

    onPageChanged(pageNumber)

    let newPortionNumber = calcPortionNumber(pageNumber)
    if(newPortionNumber !== portionNumber) {
      setPortionNumber(newPortionNumber)
    } 
  }

  return (pagesCount < 2) ? <></>  
    :(
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
              className={ cn({[s.selectedPage]: currentPage === p})}
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
  )
};

export default Paginator;
