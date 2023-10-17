import React from 'react'
import "./ExpenseForm.css";

const ExpenseForm = ({handleCharge, charge, handleAmount, amount, handleSubmit, edit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
          <div className='form-group'>
              <label htmlFor='charge'>지출 항목</label>
              <input
                type="text"
                className="form-control"
                id="charge"
                name="charge"
                value={charge}
                placeholder="ex)렌트비"
                onChange={handleCharge}
              />
          </div>
          <div className='form-group'>
          <label htmlFor='amount'>비용</label>
              <input 
                  type='number' 
                  className='form-control' 
                  id='amount' 
                  name='amount' 
                  value={amount}
                  placeholder='ex)50'
                  onChange={handleAmount}
                  />
          </div>
      </div>
      <button type = "submit" className='btn'>
        {edit ? "수정": "제출"}
      </button>
    </form>
  )
}


export default ExpenseForm