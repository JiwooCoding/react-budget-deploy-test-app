import {useState} from "react"; 
//render()가 component에 있어서 import함
//render 메서드는 JSX를 사용할 수 있게 해줌
import "./App.css";
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";


const App = () => { 

    const [charge, setCharge] = useState('');
    const [amount, setAmount] = useState(0); //0원
    const [alert, setAlert] = useState({show:false});
    const [id, setId] = useState('');
    const [edit, setEdit] = useState(false);

    const [expenses, setExpenses] = useState([
        {id:1, charge:'렌트비',amount:1600},
        {id:2, charge:'식비',amount:50000},
        {id:3, charge:'숙박비',amount:70000},
    ])

    const handleCharge = (e) => {
      console.log(e.target.value); //e.target.value => String 타입일 때
      setCharge(e.target.value);
    }

    const handleAmount = (e) => {
      setAmount(e.target.valueAsNumber);//e.target.valueAsNumber number타입 일 때
    }


    const handleDelete = (id) => {
      const newExpenses = expenses.filter(expense => expense.id !== id)
      console.log(newExpenses);
      setExpenses(newExpenses);
      handleAlert({type:'danger',text:'아이템이 삭제되었습니다.'})
    }

    const handleAlert = ({type, text}) => {
      setAlert({show:true, type, text});
      setTimeout(() => {
        setAlert({show:false});
      },7000); //7초 후에 alert false되면서 사라짐
    }

    const handleEdit = (id) => {
      const expense = expenses.find(item => item.id ===id); //find()는 expenses를 하나씩 순회하면서 expenses의 id랑 함수에서 가져오는 아이디랑 일치 하면 expense변수에 return 해준다.
      const {charge, amount} = expense;
      setId(id);
      setCharge(charge);
      setAmount(amount);
      setEdit(true);
    }

    const clearItems = () => {
      setExpenses([]); //expenses안에 있는 배열을 빈 배열로 만들어줌
    }

    const handleSubmit = (e) => {
      e.preventDefault(); //기본 이벤트 막는다 (제출 눌렀을 때 refresh막음)
      if(charge !== "" && amount > 0){ //charge 값이 비어있지 않고 amount가 0 보다 크다면
        if(edit){
          const newExpenses = expenses.map(item => {
            return item.id === id ? {...item, charge, amount} : item
          })
          setExpenses(newExpenses);
          setEdit(false);
          handleAlert({type:'success',text:'아이템이 수정되었습니다!'})
        }else{
          const newExpense = {id: crypto.randomUUID(), charge, amount} //charge(:charge) -> 생략 가능
        //불변성을 지켜주기 위해서 새로운 expenses 생성
        const newExpenses = [...expenses, newExpense] //원래 있던 expenses값들(배열)에 newExpense값 추가
        setExpenses(newExpenses); // newExpenses 새로 들어온 값을 업데이트 해주기 위해서 setExpenses
        handleAlert({type: "success", text:"아이템이 생성되었습니다!"});
      }
        setCharge("");
        setAmount(0);
      }else{
        console.log('error');
        handleAlert({
          type:'danger',
          text:"charge는 빈값일 수 없으며 amount는 0보다 커야 합니다."
        })
      }
    }

  return (
    <main className = "main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div style = {{width:'100%',backgroundColor:'white',padding:'1rem'}}>
        <ExpenseForm 
            handleChange={handleCharge}
            charge={charge}
            handleAmount={handleAmount}
            amount={amount}
            handleSubmit={handleSubmit}
            edit={edit}
            />
      </div>
      <div style = {{width:'100%',backgroundColor:'white',padding:'1rem'}}>
        <ExpenseList 
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
          />
      </div>
      <div style = {{display:'flex',justifyContent:'end',marginTop:'1rem'}}>
        
        <p>총 지출 :
          <span>
            {expenses.reduce((acc,curr) => {
              return (acc += curr.amount)
            },0)}
            원
          </span>
        </p>
      </div>
    </main>
  )
}


export default App;

