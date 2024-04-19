import React, { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeModalFlag, selectTable } from '../redux/slice/tableSlice';

interface PropsModal{
  src: string
}

const ModalPrimer= ({src}:PropsModal) => {
  const dispatch = useAppDispatch();
  const {modalFlag} = useAppSelector(selectTable)
  if (!src) return null;
  return (
    <div>
      <Button onClick={()=> dispatch(changeModalFlag())} ><img alt='img' src={src} /></Button>
      <Modal
        open={modalFlag}
        onClose={()=> dispatch(changeModalFlag())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img src={src} />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
          <Button onClick={()=> dispatch(changeModalFlag())}>Закрыть</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPrimer;
