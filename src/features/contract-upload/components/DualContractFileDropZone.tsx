import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { dualContractFileDropZoneStyles } from "./DualContractFileDropZone.styles";

interface DualContractFileDropZoneProps {
  onOriginalContractFileSelected: (selectedContractFile: File) => void;
  onRevisedContractFileSelected: (selectedContractFile: File) => void;
  selectedOriginalContractFile: File | null;
  selectedRevisedContractFile: File | null;
  disabled?: boolean;
}

const VALID_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function DualContractFileDropZone({
  onOriginalContractFileSelected,
  onRevisedContractFileSelected,
  selectedOriginalContractFile,
  selectedRevisedContractFile,
  disabled,
}: DualContractFileDropZoneProps): JSX.Element {
  const [isOriginalDropZoneHighlighted, setIsOriginalDropZoneHighlighted] =
    useState(false);
  const [isRevisedDropZoneHighlighted, setIsRevisedDropZoneHighlighted] =
    useState(false);
  const originalContractFileInputReference = useRef<HTMLInputElement>(null);
  const revisedContractFileInputReference = useRef<HTMLInputElement>(null);

  const handleDragOverContractFileDropZone = (
    dragEvent: DragEvent<HTMLDivElement>,
    isOriginalContractDropZone: boolean,
  ): void => {
    dragEvent.preventDefault();
    if (!disabled) {
      if (isOriginalContractDropZone) {
        setIsOriginalDropZoneHighlighted(true);
      } else {
        setIsRevisedDropZoneHighlighted(true);
      }
    }
  };

  const handleDragLeaveContractFileDropZone = (
    dragEvent: DragEvent<HTMLDivElement>,
    isOriginalContractDropZone: boolean,
  ): void => {
    dragEvent.preventDefault();
    if (isOriginalContractDropZone) {
      setIsOriginalDropZoneHighlighted(false);
    } else {
      setIsRevisedDropZoneHighlighted(false);
    }
  };

  const handleDropContractFile = (
    dragEvent: DragEvent<HTMLDivElement>,
    isOriginalContractDropZone: boolean,
  ): void => {
    dragEvent.preventDefault();
    if (isOriginalContractDropZone) {
      setIsOriginalDropZoneHighlighted(false);
    } else {
      setIsRevisedDropZoneHighlighted(false);
    }
    if (disabled) return;

    const droppedFiles = dragEvent.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedContractFile = droppedFiles[0];
      if (isSupportedContractFileType(droppedContractFile)) {
        if (isOriginalContractDropZone) {
          onOriginalContractFileSelected(droppedContractFile);
        } else {
          onRevisedContractFileSelected(droppedContractFile);
        }
      }
    }
  };

  const handleSelectedContractFileChange = (
    changeEvent: ChangeEvent<HTMLInputElement>,
    isOriginalContractInput: boolean,
  ): void => {
    if (disabled) return;
    const selectedFiles = changeEvent.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedContractFile = selectedFiles[0];
      if (isSupportedContractFileType(selectedContractFile)) {
        if (isOriginalContractInput) {
          onOriginalContractFileSelected(selectedContractFile);
        } else {
          onRevisedContractFileSelected(selectedContractFile);
        }
      }
    }
  };

  const isSupportedContractFileType = (contractFile: File): boolean => {
    return VALID_FILE_TYPES.includes(contractFile.type);
  };

  const handleOpenFilePicker = (isOriginalContractInput: boolean): void => {
    if (!disabled) {
      if (isOriginalContractInput) {
        originalContractFileInputReference.current?.click();
      } else {
        revisedContractFileInputReference.current?.click();
      }
    }
  };

  const renderDropZone = (
    isOriginalContractDropZone: boolean,
    selectedContractFile: File | null,
    isDropZoneHighlighted: boolean,
  ): JSX.Element => {
    const dropZoneLabel = isOriginalContractDropZone
      ? "First Contract (Original)"
      : "Second Contract (Revised)";

    const getDropZoneStyles = (): Record<string, unknown> => {
      const baseStyles = { ...dualContractFileDropZoneStyles.dropZone };

      if (isDropZoneHighlighted) {
        Object.assign(baseStyles, dualContractFileDropZoneStyles.dropZoneDragOver);
      }

      if (selectedContractFile) {
        Object.assign(baseStyles, dualContractFileDropZoneStyles.dropZoneSelected);
      }

      if (disabled) {
        Object.assign(baseStyles, dualContractFileDropZoneStyles.dropZoneDisabled);
      }

      return baseStyles;
    };

    return (
      <Box
        onClick={() => handleOpenFilePicker(isOriginalContractDropZone)}
        onDragOver={(dragEvent: DragEvent<HTMLDivElement>) =>
          handleDragOverContractFileDropZone(
            dragEvent,
            isOriginalContractDropZone,
          )
        }
        onDragLeave={(dragEvent: DragEvent<HTMLDivElement>) =>
          handleDragLeaveContractFileDropZone(
            dragEvent,
            isOriginalContractDropZone,
          )
        }
        onDrop={(dragEvent: DragEvent<HTMLDivElement>) =>
          handleDropContractFile(dragEvent, isOriginalContractDropZone)
        }
        sx={getDropZoneStyles()}
      >
        <input
          ref={
            isOriginalContractDropZone
              ? originalContractFileInputReference
              : revisedContractFileInputReference
          }
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(changeEvent) =>
            handleSelectedContractFileChange(
              changeEvent,
              isOriginalContractDropZone,
            )
          }
          style={{ display: "none" }}
          disabled={disabled}
        />

        <Box sx={dualContractFileDropZoneStyles.content}>
          <Typography variant="body2" sx={dualContractFileDropZoneStyles.label}>
            {dropZoneLabel}
          </Typography>
          {selectedContractFile ? (
            <>
              <CheckCircleIcon
                sx={{
                  ...dualContractFileDropZoneStyles.icon,
                  color: "success.main",
                }}
              />
              <Box>
                <Typography
                  variant="body2"
                  sx={dualContractFileDropZoneStyles.fileName}
                >
                  {selectedContractFile.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={dualContractFileDropZoneStyles.fileSize}
                >
                  {(selectedContractFile.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <UploadFileIcon sx={dualContractFileDropZoneStyles.icon} />
              <Typography
                variant="body2"
                sx={dualContractFileDropZoneStyles.instruction}
              >
                Drop file here or click to browse
              </Typography>
            </>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={dualContractFileDropZoneStyles.container}>
      {renderDropZone(
        true,
        selectedOriginalContractFile,
        isOriginalDropZoneHighlighted,
      )}
      {renderDropZone(
        false,
        selectedRevisedContractFile,
        isRevisedDropZoneHighlighted,
      )}
    </Box>
  );
}
