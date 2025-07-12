import React, { FC } from 'react';
import '../../styles/files.css';
import { getFileCharacters } from '@/game/helpers/get-file-characters';

type FilesProps = {
  files: number[];
};

const Files: FC<FilesProps> = ({ files }) => {
  return (
    <div className="files">
      {files.map((file) => (
        <span key={file} className="file">
          {getFileCharacters(file)}
        </span>
      ))}
    </div>
  );
};

export default Files;
