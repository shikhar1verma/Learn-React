import './NewExpense.css';
import ExpenseForm from './ExpenseForm';
import { useState } from 'react';

const NewExpense = (props) => {
  const [showExpense, setShowExpense] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onAddExpense(expenseData);
    setShowExpense(false);
  }

  const showAddExpenseHandler = () => {
    setShowExpense(true);
  }

  const hideAddExpenseHandler = () => {
    setShowExpense(false);
  }

  let newExpenseContent = <button type="button" onClick={showAddExpenseHandler}>Add New Expense</button>;
  if (showExpense) {
    newExpenseContent = <ExpenseForm onHideAddExpense={hideAddExpenseHandler} onSaveExpenseData={saveExpenseDataHandler} />
  }

  return (
    <div className='new-expense'>
      {newExpenseContent}
    </div>
  );
};

export default NewExpense;