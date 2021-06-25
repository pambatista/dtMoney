import { useState } from 'react';
import Modal from 'react-modal';

import { TransactionsProvider } from './hooks/useTransactions'


import { GlobalStyle } from './styles/global'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { NewTransactionModal } from './components/NewTransactionModal'

Modal.setAppElement('#root');

export function App() {
    const [ isNewTransactionModal, setIsNewTransactionModal] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModal(true)
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModal(false)
    }


    return (
        <TransactionsProvider>
            <GlobalStyle />
            <Header 
                onOpenNewTransactionModal={handleOpenNewTransactionModal}
            />
            <Dashboard />
            <NewTransactionModal
                isOpen={isNewTransactionModal}
                onRequestClose={handleCloseNewTransactionModal}
            />
        </TransactionsProvider>
    );
}

export default App;
