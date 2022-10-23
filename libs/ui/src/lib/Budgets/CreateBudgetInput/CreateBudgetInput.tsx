import { Box, Button, FormControl, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

/* eslint-disable-next-line */
export interface CreateBudgetInputProps {
  submitHandler?: any;
}

export function CreateBudgetInput({ submitHandler }: CreateBudgetInputProps) {
  const [limit, setLimit] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [filled, setFilled] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (category !== '' && limit > 0) {
      setFilled(true);
    }
  }, [limit, category]);

  return (
    <Box>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              margin="normal"
              label="Category Name"
              variant="outlined"
              type="text"
              {...register('category', { required: true })}
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={4} textAlign={'center'}>
            <TextField
              sx={{ width: '70%' }}
              margin="normal"
              label="Limit"
              variant="outlined"
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              type="number"
              {...register('limit', {
                setValueAs: (limit) => +limit,
                min: 0,
              })}
              onChange={(e) => {
                setLimit(+e.target.value);
              }}
            />
          </Grid>
        </Grid>
        {filled && (
          <Box sx={{ width: '80%', alignItems: 'center', position: 'relative', marginInline: '10%' }}>
            <Button variant="contained" color="primary" size="large" fullWidth type="submit">
              Submit
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
}

export default CreateBudgetInput;
