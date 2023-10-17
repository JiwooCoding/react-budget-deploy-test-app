import React from 'react'
import './ExpenseList.css';
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from 'react-icons/md';

const ExpenseList = ({expenses,handleDelete,handleEdit,clearItems}) => {
  return (
    <>
      <ul className='list'>
        {expenses.map(expense =>{
          return(
            <ExpenseItem
              expense={expense} //{id:1, charge:'렌트비',amount:1600}
              key={expense.id}  //유니크 한 id값 가지고 옴
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              clearItems={clearItems}
            />
          )
        })}
      </ul>
      {expenses.length > 0 &&(  //expenses배열에 항목이 1나 이상 있을 때 그 다음부분 실행 => 이 조건이 참일 때 실행할 항목 ({})
        //&& 연신지 => expenses.length > 0 이 조건이 참일 경우 뒤 ({}) 항목 실행
        <button className='btn' onClick={clearItems}>
          목록 지우기<MdDelete/>
        </button>
      )}
    </>
  )
}
export default ExpenseList