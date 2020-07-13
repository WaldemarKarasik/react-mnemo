import React, {useState} from 'react'
import {Box, Button} from 'grommet'
import {Trash} from 'grommet-icons'
import {useDispatch} from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { deleteWord } from '../../redux/thunks/admin/homePageActions'

export default function HomePageAdminOptions({name}) {
    const dispatch = useDispatch()
    const [deletingPending, setDeletingPending] = useState(false)
    const onDeleteButtonHandler = async (e) => {
        if(window.confirm("Are you sure you want to delete this word?")) {
            setDeletingPending(true)
            const res = await dispatch(deleteWord(name))
        }
    }
    return (
        <Box direction="row">
            {!deletingPending ? (
            <Button hoverIndicator={true} onClick={(e) => onDeleteButtonHandler(e)} icon={<Trash/>}/>
            )
            : <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
        </Box>
    )
}
