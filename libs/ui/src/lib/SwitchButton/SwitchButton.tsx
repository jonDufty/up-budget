import { Button, ButtonGroup, RadioGroup } from '@mui/material';
import { Container } from '@mui/system';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';

interface SwitchButtonProps {
  active: string;
  inactive: string
  onClick: Dispatch<SetStateAction<boolean>>
}

export function SwitchButton({ active, inactive, onClick }: SwitchButtonProps) {
  const [selected, setSelected] = useState(active)

  const handleClick = (o: string) => {
    setSelected(o)
    onClick(o === active)
  }

  return (
    <Container sx={{width:"50%"}}>
      <RadioGroup>
        <ButtonGroup variant="outlined" fullWidth>
          {[active, inactive].map((o, i) => {
            return <Button
              key={`${o}-${i}`} onClick={() => handleClick(o)}
              variant={o === selected ? "contained" : "outlined"}
            >
              {o}
            </Button>;
          })}
        </ButtonGroup>
      </RadioGroup>
    </Container>
  );
}
