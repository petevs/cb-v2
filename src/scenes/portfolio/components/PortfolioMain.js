import PortfolioList from 'scenes/portfolio/components/PortfolioList'
import PageWrapper from 'styledComponents/PageWrapper'
import FormModal from 'components/FormModal'
import AddPortfolioForm from 'components/AddPortfolioForm'
import useModal from 'hooks/useModal'

const PortfolioMain = () => {

    const [open, modalContent, handleOpen, handleClose] = useModal()

    return (
        <>
        <PageWrapper>
            <h2>Portfolios</h2>
            <PortfolioList handleOpen={handleOpen} />
        </PageWrapper>

        <FormModal open={open} onClose={handleClose}>
            <AddPortfolioForm handleClose={handleClose} />
        </FormModal>
        </>
    )
}

export default PortfolioMain
