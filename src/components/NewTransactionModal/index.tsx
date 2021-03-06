import { useState, FormEvent } from 'react';
import Modal from 'react-modal';

import { useTransactions } from '../../hooks/useTransactions';

import { Container, TransactionContainer, RadioBox } from './styles'

import closeImg from '../../assets/close.svg'
import IncomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const { createTransaction } = useTransactions()
    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            type,
            amount,
            category
        })

        setTitle('')
        setType('deposit')
        setAmount(0)
        setCategory('')

        onRequestClose()
    }

    return (
        <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <button
                    type="button"
                    onClick={onRequestClose}
                    className="react-modal-close"
                >
                    <img src={closeImg} alt="Fechar modal" />
                </button>
                <Container onSubmit={handleCreateNewTransaction}>
                    <h2>Cadastrar Transações</h2>
                    <input
                        placeholder="Titulo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Valor"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <TransactionContainer>
                        <RadioBox
                            type="button"
                            onClick={() => setType('deposit')}
                            isActive={type === 'deposit'}
                            activeColor="green"
                        >
                            <img src={IncomeImg} alt="Entrada" />
                            <span>Entrada</span>
                        </RadioBox>
                        <RadioBox
                            type="button"
                            onClick={() => setType('withdraw')}
                            isActive={type === 'withdraw'}
                            activeColor="red"
                        >
                            <img src={outcomeImg} alt="Saída" />
                            <span>Saída</span>
                        </RadioBox>
                    </TransactionContainer>
                    <input
                        placeholder="Categoria"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <button type="submit">Cadastrar</button>
                </Container>
            </Modal>
    )
}