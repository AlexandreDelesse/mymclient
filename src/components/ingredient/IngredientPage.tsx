import React, { useState } from 'react'
import IngredientList from './IngredientList'
import { Box, Button, Stack, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import IngredientForm from './IngredientForm'
import packageJson from '../../../package.json'

export default function IngredientPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [filter, setFilter] = useState('')

  const toggleFormOpen = () => setFormOpen(!formOpen)

  return (
    <Box sx={{ marginTop: 4 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          size="small"
          label="Rechercher"
          sx={{ flexGrow: 1 }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button
          variant={formOpen ? 'outlined' : 'contained'}
          startIcon={formOpen ? <CloseIcon /> : <AddIcon />}
          onClick={toggleFormOpen}
          color={formOpen ? 'warning' : 'primary'}
        >
          {formOpen ? 'Annuler' : 'Ajouter'}
        </Button>
      </Box>

      <Box sx={{ marginTop: 3 }}>
        {formOpen && <IngredientForm onSave={toggleFormOpen} />}
        {!formOpen && <IngredientList filter={filter} />}
      </Box>
      <Box>Version : {packageJson.version}</Box>
    </Box>
  )
}
