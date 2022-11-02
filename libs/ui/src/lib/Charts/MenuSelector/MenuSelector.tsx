import { Alert, Box, Button, ButtonGroup, Snackbar } from '@mui/material';
import { MouseEventHandler, useState } from 'react';

export interface MenuSelectorProps {
  options: string[];
  maxSelected?: number;
  onClick?: MouseEventHandler;
}

export function MenuSelector({ options, maxSelected }: MenuSelectorProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showMaxError, setShowMaxError] = useState(false);

  const canSelect = () => {
    return maxSelected ? selectedItems.length < maxSelected : true;
  };

  const handleSelect = (idx: number, select?:boolean) => {
    if (select) {
      canSelect() ?
        setSelectedItems([...selectedItems, idx]) :
        setShowMaxError(true)
    } else {
      setSelectedItems(selectedItems.splice(idx, 1))
    }
  };

  return (
    <Box>
      <ButtonGroup fullWidth size="small" orientation="vertical" variant="outlined">
        {options.map((item, idx) => (
          <MenuSelectorButton canSelect={canSelect} size="small" key={item}>
            {item}
          </MenuSelectorButton>
        ))}
      </ButtonGroup>
      <Snackbar open={showMaxError} autoHideDuration={4000} onClose={() => setShowMaxError(false)}>
        <Alert severity="error">{`Can't select more than ${maxSelected} items at once`}</Alert>
      </Snackbar>
    </Box>
  );
}

interface ButtonSelectorProps {
  children?: React.ReactElement | string;
  onClick?: () => void;
  canSelect: () => boolean;
  size?: 'small' | 'medium' | 'large';
}

function MenuSelectorButton({ children, onClick, size, canSelect }: ButtonSelectorProps) {
  const [selected, setSelected] = useState(false);

  const toggleSelected: MouseEventHandler = (e) => {
    if (!selected && !canSelect()) {
      return;
    }
    // onClick && onClick()
    setSelected(!selected);
  };
  return (
    <Button onClick={toggleSelected} variant={selected ? 'contained' : 'outlined'} size={size}>
      {children}
    </Button>
  );
}
