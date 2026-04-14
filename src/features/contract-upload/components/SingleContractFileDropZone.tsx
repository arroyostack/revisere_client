import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { singleContractFileDropZoneStyles } from "./SingleContractFileDropZone.styles";

interface SingleContractFileDropZoneProps {
  onContractFileSelected: (selectedContractFile: File) => void;
  selectedContractFile: File | null;
  disabled?: boolean;
}

const VALID_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function SingleContractFileDropZone({
  onContractFileSelected,
  selectedContractFile,
  disabled,
}: SingleContractFileDropZoneProps): JSX.Element {
  const [isDropZoneHighlighted, setIsDropZoneHighlighted] = useState(false);
  const hiddenFileInputReference = useRef<HTMLInputElement>(null);

  const handleDragOverContractFileDropZone = (
    dragEvent: DragEvent<HTMLDivElement>,
  ): void => {
    dragEvent.preventDefault();
    if (!disabled) {
      setIsDropZoneHighlighted(true);
    }
  };

  const handleDragLeaveContractFileDropZone = (
    dragEvent: DragEvent<HTMLDivElement>,
  ): void => {
    dragEvent.preventDefault();
    setIsDropZoneHighlighted(false);
  };

  const handleDropContractFile = (
    dragEvent: DragEvent<HTMLDivElement>,
  ): void => {
    dragEvent.preventDefault();
    setIsDropZoneHighlighted(false);
    if (disabled) return;

    const droppedFiles = dragEvent.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedContractFile = droppedFiles[0];
      if (isSupportedContractFileType(droppedContractFile)) {
        onContractFileSelected(droppedContractFile);
      }
    }
  };

  const handleSelectedContractFileChange = (
    changeEvent: ChangeEvent<HTMLInputElement>,
  ): void => {
    if (disabled) return;
    const selectedFiles = changeEvent.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedContractFile = selectedFiles[0];
      if (isSupportedContractFileType(selectedContractFile)) {
        onContractFileSelected(selectedContractFile);
      }
    }
  };

  const isSupportedContractFileType = (contractFile: File): boolean => {
    return VALID_FILE_TYPES.includes(contractFile.type);
  };

  const handleOpenFilePicker = (): void => {
    if (!disabled) {
      hiddenFileInputReference.current?.click();
    }
  };

  const getDropZoneStyles = (): Record<string, unknown> => {
    const baseStyles = { ...singleContractFileDropZoneStyles.dropZone };

    if (isDropZoneHighlighted) {
      Object.assign(baseStyles, singleContractFileDropZoneStyles.dropZoneDragOver);
    }

    if (selectedContractFile) {
      Object.assign(baseStyles, singleContractFileDropZoneStyles.dropZoneSelected);
    }

    if (disabled) {
      Object.assign(baseStyles, singleContractFileDropZoneStyles.dropZoneDisabled);
    }

    return baseStyles;
  };

  return (
    <Box
      onClick={handleOpenFilePicker}
      onDragOver={handleDragOverContractFileDropZone}
      onDragLeave={handleDragLeaveContractFileDropZone}
      onDrop={handleDropContractFile}
      sx={getDropZoneStyles()}
    >
      <input
        ref={hiddenFileInputReference}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleSelectedContractFileChange}
        style={{ display: "none" }}
        disabled={disabled}
      />

      <Box sx={singleContractFileDropZoneStyles.content}>
        {selectedContractFile ? (
          <>
            <CheckCircleIcon
              sx={{
                ...singleContractFileDropZoneStyles.icon,
                color: "success.main",
              }}
            />
            <Box sx={singleContractFileDropZoneStyles.fileInfo}>
              <Typography
                variant="body1"
                sx={singleContractFileDropZoneStyles.fileName}
              >
                {selectedContractFile.name}
              </Typography>
              <Typography
                variant="body2"
                sx={singleContractFileDropZoneStyles.fileSize}
              >
                {(selectedContractFile.size / (1024 * 1024)).toFixed(2)} MB
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={singleContractFileDropZoneStyles.instructionSuccess}
            >
              Click or drop to replace
            </Typography>
          </>
        ) : (
          <>
            <UploadFileIcon sx={singleContractFileDropZoneStyles.icon} />
            <Box>
              <Typography
                variant="body1"
                sx={singleContractFileDropZoneStyles.instruction}
              >
                Drop contract here or click to browse
              </Typography>
              <Typography
                variant="body2"
                sx={singleContractFileDropZoneStyles.fileSize}
              >
                PDF or DOCX, max 10MB
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
