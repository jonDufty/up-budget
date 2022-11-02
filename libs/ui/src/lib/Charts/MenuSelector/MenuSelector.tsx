import { Alert, Box, Button, ButtonGroup, Snackbar } from '@mui/material';
import { MouseEventHandler, useState } from 'react';

export interface MenuSelectorProps {
  options: string[];
  maxSelected?: number;
  onClick?: MouseEventHandler;
}

export function MenuSelector({ options, maxSelected }: MenuSelectorProps) {
  const [selectedItems, setSelectedItems] = useState<boolean[]>(Array(options.length).fill(false));
  const [showMaxError, setShowMaxError] = useState(false);

  const canSelect = () => {
    const numSelected = selectedItems.filter((e)=> e === true).length
    return maxSelected ? numSelected < maxSelected : true;
  };

  const handleSelect = (idx: number) => {
    const newSelected = [...selectedItems]
    newSelected[idx] = !selectedItems[idx]
    if (!selectedItems[idx] && !canSelect()) {
      setShowMaxError(true)
      return
    }
    setSelectedItems(newSelected)
  };

  return (
    <Box>
      <ButtonGroup fullWidth size="small" orientation="vertical" variant="outlined">
        {options.map((item, idx) => (
          <MenuSelectorButton onClick={() => handleSelect(idx)} canSelect={canSelect} size="small" key={item}>
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
    if (selected || canSelect()) {
      setSelected(!selected);
    }
    onClick && onClick()
  };
  return (
    <Button onClick={toggleSelected} variant={selected ? 'contained' : 'outlined'} size={size}>
      {children}
    </Button>
  );
}
