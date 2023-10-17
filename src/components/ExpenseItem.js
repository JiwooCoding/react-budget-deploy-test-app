import React from 'react'
import "./ExpenseItem.css";
import {MdEdit,MdDelete} from 'react-icons/md';

const ExpenseItem = ({expense,handleDelete,handleEdit}) => {
  return (
    <li className='item'>
      <div className='info'>
        <span className='expense'>{expense.charge}</span>
        <span className='amount'>{expense.amount}</span>
      </div>
      <div>
        <button className='edit-btn' onClick={()=>
          handleEdit(expense.id)}>
            <MdEdit/>수정</button>
        <button className='delete-btn' onClick={()=>
          handleDelete(expense.id)}>
          <MdDelete/>삭제</button>
      </div>
    </li>
  )
}


export default ExpenseItem