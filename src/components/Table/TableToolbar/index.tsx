import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import styles from "./styles.module.css";

interface EnhancedTableToolbarProps {
  numSelected: number;
  tableFilterComponent?: any;
  onDownloadCsv?: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, tableFilterComponent, onDownloadCsv } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          December 2023
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Button
            startIcon={<FileDownloadIcon />}
            className={styles.downloadButton}
            onClick={onDownloadCsv}
          >
            Download Csv
          </Button>
          {tableFilterComponent}
        </>
      )}
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
