import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import styles from './styles.module.css';

const FolderCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  width: '300px',
  height: '200px',
  backgroundColor: '#F5F7FF',
  borderRadius: '16px',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '50px',
    backgroundColor: '#F5F7FF',
    borderRadius: '0 0 100% 0',
    zIndex: 1,
  },
}));

const NewFolder = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className={styles.folder}>
        <div className={styles['folder-tab']}></div>
        <div className="p-4">
          <div className="bg-blue-100 p-3 rounded-md">
            <img
              src="/assets/googlesearch.png"
              alt="Preview"
              width={300}
              height={200}
              className="rounded-md"
            />
          </div>
          <p className="mt-2 text-gray-700 font-semibold">Shot.png</p>
          <p className="text-xs text-gray-400">Edited 8m ago</p>
        </div>
      </div>
    </div>
  );
};

export default NewFolder;
