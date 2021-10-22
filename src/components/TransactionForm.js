import BuyForm from './BuyForm'


const TransactionForm = (props) => {


    return (
            <>
                <BuyForm 
                    formType={props.type}
                    date={props.date}
                    amount={props.amount}
                    id={props.id}
                    portfolioId={props.portfolioId}
                    handleClose={props.handleClose}
                    {...props}           
                />
                
            </>
    )
}

export default TransactionForm