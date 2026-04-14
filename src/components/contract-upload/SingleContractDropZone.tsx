import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Box, Typography, Hidden } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { singleContractDropZoneStyles } from './SingleContractDropZone.styles';

interface SingleContractDropZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  disabled?: boolean;
}

const VALID_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export function SingleContractDropZone({
  onFileSelect,
  selectedFile,
  disabled,
}: SingleContractDropZoneProps): JSX.Element {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (disabled) return;
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        onFileSelect(file);
      }
    }
  };

  const isValidFileType = (file: File): boolean => {
    return VALID_FILE_TYPES.includes(file.type);
  };

  const handleClick = (): void => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const getDropZoneStyles = (): typeof singleContractDropZoneStyles.dropZone => {
    let baseStyle = singleContractDropZoneStyles.dropZone;
    
    if (isDragOver) {
      baseStyle = { ...baseStyle, ...singleContractDropZoneStyles.dropZoneDragOver };
    }
    if (selectedFile) {
      baseStyle = { ...baseStyle, ...singleContractDropZoneStyles.dropZoneSelected };
    }
    if (disabled) {
      baseStyle = { ...baseStyle, ...singleContractDropZoneStyles.dropZoneDisabled };
    }
    
    return baseStyle;
  };

  return (
    <Box
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={getDropZoneStyles()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      <Box sx={singleContractDropZoneStyles.content}>
        {selectedFile ? (
          <>
            <CheckCircleIcon sx={{ ...singleContractDropZoneStyles.icon, color: 'success.main' }} />
            <Box sx={singleContractDropZoneStyles.fileInfo}>
              <Typography variant="body1" sx={singleContractDropZoneStyles.fileName}>
                {selectedFile.name}
              </Typography>
              <Typography variant="body2" sx={singleContractDropZoneStyles.fileSize}>
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </Typography>
            </Box>
            <Typography variant="body2" sx={singleContractDropZoneStyles.instructionSuccess}>
              Click or drop to replace
            </Typography>
          </>
        ) : (
          <>
            <UploadFileIcon sx={singleContractDropZoneStyles.icon} />
            <Box>
              <Typography variant="body1" sx={singleContractDropZoneStyles.instruction}>
                Drop contract here or click to browse
              </Typography>
              <Typography variant="body2" sx={singleContractDropZoneStyles.fileSize}>
                PDF or DOCX, max 10MB
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
