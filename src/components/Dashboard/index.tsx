import { Container } from './styles'
import { Summary } from '../Summary'
import { TransactionsTable } from '../TransactionsTable'
import { api } from '../../services/api'
import { useEffect } from 'react'

export const Dashboard = () => {
    useEffect(() => {
        api.get('/reminders').then(response => console.log(response.data))
    }, [])
    return (
        <Container>
            <Summary />
            <TransactionsTable />
        </Container>
    )
} 