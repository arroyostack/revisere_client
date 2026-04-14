import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Box, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { dualContractDropZoneStyles } from './DualContractDropZone.styles';

interface DualContractDropZoneProps {
  onFirstFileSelect: (file: File) => void;
  onSecondFileSelect: (file: File) => void;
  firstFile: File | null;
  secondFile: File | null;
  disabled?: boolean;
}

const VALID_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export function DualContractDropZone({
  onFirstFileSelect,
  onSecondFileSelect,
  firstFile,
  secondFile,
  disabled,
}: DualContractDropZoneProps): JSX.Element {
  const [isDragOverFirst, setIsDragOverFirst] = useState(false);
  const [isDragOverSecond, setIsDragOverSecond] = useState(false);
  const firstFileInputRef = useRef<HTMLInputElement>(null);
  const secondFileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (
    e: DragEvent<HTMLDivElement>,
    isFirst: boolean,
  ): void => {
    e.preventDefault();
    if (!disabled) {
      if (isFirst) {
        setIsDragOverFirst(true);
      } else {
        setIsDragOverSecond(true);
      }
    }
  };

  const handleDragLeave = (
    e: DragEvent<HTMLDivElement>,
    isFirst: boolean,
  ): void => {
    e.preventDefault();
    if (isFirst) {
      setIsDragOverFirst(false);
    } else {
      setIsDragOverSecond(false);
    }
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    isFirst: boolean,
  ): void => {
    e.preventDefault();
    if (isFirst) {
      setIsDragOverFirst(false);
    } else {
      setIsDragOverSecond(false);
    }
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        if (isFirst) {
          onFirstFileSelect(file);
        } else {
          onSecondFileSelect(file);
        }
      }
    }
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    isFirst: boolean,
  ): void => {
    if (disabled) return;
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        if (isFirst) {
          onFirstFileSelect(file);
        } else {
          onSecondFileSelect(file);
        }
      }
    }
  };

  const isValidFileType = (file: File): boolean => {
    return VALID_FILE_TYPES.includes(file.type);
  };

  const handleClick = (isFirst: boolean): void => {
    if (!disabled) {
      if (isFirst) {
        firstFileInputRef.current?.click();
      } else {
        secondFileInputRef.current?.click();
      }
    }
  };

  const renderDropZone = (
    isFirst: boolean,
    file: File | null,
    isDragOver: boolean,
  ): JSX.Element => {
    const label = isFirst ? 'First Contract (Original)' : 'Second Contract (Revised)';

    const getDropZoneStyles = (): typeof dualContractDropZoneStyles.dropZone => {
      let baseStyle = dualContractDropZoneStyles.dropZone;
      if (isDragOver) {
        baseStyle = { ...baseStyle, ...dualContractDropZoneStyles.dropZoneDragOver };
      }
      if (file) {
        baseStyle = { ...baseStyle, ...dualContractDropZoneStyles.dropZoneSelected };
      }
      if (disabled) {
        baseStyle = { ...baseStyle, ...dualContractDropZoneStyles.dropZoneDisabled };
      }
      return baseStyle;
    };

    return (
      <Box
        onClick={() => handleClick(isFirst)}
        onDragOver={(e) => handleDragOver(e, isFirst)}
        onDragLeave={(e) => handleDragLeave(e, isFirst)}
        onDrop={(e) => handleDrop(e, isFirst)}
        sx={getDropZoneStyles()}
      >
        <input
          ref={isFirst ? firstFileInputRef : secondFileInputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => handleFileChange(e, isFirst)}
          style={{ display: 'none' }}
          disabled={disabled}
        />

        <Box sx={dualContractDropZoneStyles.content}>
          <Typography variant="body2" sx={dualContractDropZoneStyles.label}>
            {label}
          </Typography>
          {file ? (
            <>
              <CheckCircleIcon sx={{ ...dualContractDropZoneStyles.icon, color: 'success.main' }} />
              <Box>
                <Typography variant="body2" sx={dualContractDropZoneStyles.fileName}>
                  {file.name}
                </Typography>
                <Typography variant="caption" sx={dualContractDropZoneStyles.fileSize}>
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <UploadFileIcon sx={dualContractDropZoneStyles.icon} />
              <Typography variant="body2" sx={dualContractDropZoneStyles.instruction}>
                Drop file here or click to browse
              </Typography>
            </>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={dualContractDropZoneStyles.container}>
      {renderDropZone(true, firstFile, isDragOverFirst)}
      {renderDropZone(false, secondFile, isDragOverSecond)}
    </Box>
  );
}
